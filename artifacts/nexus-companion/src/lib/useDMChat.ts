import { useCallback } from 'react';
import { useGameState } from '../store/GameStateContext';
import { buildSystemMessage } from './dmSystemPrompt';
import { estimateTokens } from './contextSelector';
import { parseDMMessage, applyStateBlocks } from './stateParser';
import type { ChatMessage, GameState } from '../types/game';

const COMPRESSION_KEEP_TAIL = 8;
const COMPRESSION_SUMMARY_MAX_TOKENS = 200;
const NEXUS_API_BASE_URL =
  import.meta.env.VITE_NEXUS_API_BASE_URL ?? 'http://127.0.0.1:5000';

function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
}

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

type DMDebugLogPayload = {
  event: 'request' | 'response' | 'error';
  messageId: string;
  campaignName: string;
  currentLocation: string;
  model: string;
  payload: Record<string, unknown>;
};

async function writeDMDebugLog(payload: DMDebugLogPayload): Promise<void> {
  try {
    const response = await fetch(`${NEXUS_API_BASE_URL}/api/dm-debug-log`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      console.warn('[Nexus DM Debug] Local log write failed:', response.status);
    }
  } catch (err) {
    console.warn('[Nexus DM Debug] Local log write unavailable:', err);
  }
}

async function buildCompressedHistory(
  messages: ChatMessage[],
  state: GameState,
  apiKey: string
): Promise<OpenAIMessage[]> {
  const threshold = state.settings.compressionThreshold ?? 20;
  const conversationMessages = messages.filter(
    (m) => m.role === 'user' || m.role === 'assistant'
  );

  const effectiveThreshold = Math.max(threshold, COMPRESSION_KEEP_TAIL + 1);

  if (conversationMessages.length <= effectiveThreshold) {
    return conversationMessages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.rawContent ?? m.content,
    }));
  }

  const toCompress = conversationMessages.slice(0, -COMPRESSION_KEEP_TAIL);
  const tail = conversationMessages.slice(-COMPRESSION_KEEP_TAIL);

  if (toCompress.length === 0) {
    return conversationMessages.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.rawContent ?? m.content,
    }));
  }

  const historyText = toCompress
    .map((m) => `${m.role === 'user' ? 'Player' : 'DM'}: ${m.rawContent ?? m.content}`)
    .join('\n\n');

  const summaryPrompt = [
    {
      role: 'system' as const,
      content:
        'You are a concise session recorder for a tabletop RPG. Summarize the following session log into a compact "Session so far:" block (max 200 tokens). Preserve key events, decisions, NPC names, clocks advanced, and any narrative consequences. Do not editorialize.',
    },
    { role: 'user' as const, content: historyText },
  ];

  const summaryResponse = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      model: state.settings.model || 'gpt-4o',
      messages: summaryPrompt,
      temperature: 0.3,
      max_tokens: COMPRESSION_SUMMARY_MAX_TOKENS,
    }),
  });

  let summaryText = '[Session history compressed — earlier events summarized below.]';
  if (summaryResponse.ok) {
    const summaryData = await summaryResponse.json() as {
      choices: Array<{ message: { content: string } }>;
    };
    const raw = summaryData.choices[0]?.message?.content ?? '';
    if (raw) {
      summaryText = `Session so far:\n${raw}`;
    }
  }

  const summaryMessage: OpenAIMessage = {
    role: 'assistant',
    content: summaryText,
  };

  return [
    summaryMessage,
    ...tail.map((m) => ({
      role: m.role as 'user' | 'assistant',
      content: m.rawContent ?? m.content,
    })),
  ];
}

export function useDMChat() {
  const { state, dispatch } = useGameState();

  const sendMessage = useCallback(
    async (userText: string) => {
      if (!state.settings.openaiApiKey) {
        dispatch({
          type: 'ADD_MESSAGE',
          payload: {
            id: generateId(),
            role: 'assistant',
            content:
              '[ No API key configured. Open Menu → Settings and enter your OpenAI API key. ]',
            timestamp: Date.now(),
          },
        });
        return;
      }

      const userMsg: ChatMessage = {
        id: generateId(),
        role: 'user',
        content: userText,
        timestamp: Date.now(),
      };
      dispatch({ type: 'ADD_MESSAGE', payload: userMsg });
      dispatch({ type: 'SET_AI_THINKING', payload: true });

      try {
        const assistantMessageId = generateId();
        const systemContent = buildSystemMessage(state);

        const compressedHistory = await buildCompressedHistory(
          state.messages,
          state,
          state.settings.openaiApiKey
        );

        const openaiMessages: OpenAIMessage[] = [
          { role: 'system', content: systemContent },
          ...compressedHistory,
          { role: 'user', content: userText },
        ];

        if (state.settings.debugMode) {
          const promptTokenEstimate = estimateTokens(systemContent);
          const historyTokenEstimate = compressedHistory.reduce(
            (acc, m) => acc + estimateTokens(m.content),
            0
          );
          const totalEstimate = promptTokenEstimate + historyTokenEstimate + estimateTokens(userText);
          console.log(
            '[Nexus DM Debug] Token estimates:',
            `system=${promptTokenEstimate}`,
            `history=${historyTokenEstimate}`,
            `user=${estimateTokens(userText)}`,
            `total≈${totalEstimate}`,
            `| history turns=${compressedHistory.length}`,
            `| threshold=${state.settings.compressionThreshold ?? 20}`
          );

          void writeDMDebugLog({
            event: 'request',
            messageId: assistantMessageId,
            campaignName: state.campaign.campaignName,
            currentLocation: state.campaign.currentLocation,
            model: state.settings.model || 'gpt-4o',
            payload: {
              userText,
              tokenEstimate: {
                system: promptTokenEstimate,
                history: historyTokenEstimate,
                user: estimateTokens(userText),
                total: totalEstimate,
              },
              compression: {
                historyTurns: compressedHistory.length,
                threshold: state.settings.compressionThreshold ?? 20,
              },
              systemContent,
              compressedHistory,
            },
          });
        }

        const response = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${state.settings.openaiApiKey}`,
          },
          body: JSON.stringify({
            model: state.settings.model || 'gpt-4o',
            messages: openaiMessages,
            temperature: 0.85,
            max_tokens: 2048,
          }),
        });

        if (!response.ok) {
          const errData = await response.json().catch(() => ({}));
          const errMsg =
            (errData as { error?: { message?: string } })?.error?.message ??
            `OpenAI error ${response.status}`;
          throw new Error(errMsg);
        }

        const data = await response.json() as {
          choices: Array<{ message: { content: string } }>;
        };
        const rawContent = data.choices[0]?.message?.content ?? '';

        const { cleanContent, stateBlocks, hasStateBlocks } = parseDMMessage(rawContent);

        const assistantMsg: ChatMessage = {
          id: assistantMessageId,
          role: 'assistant',
          content: cleanContent,
          rawContent,
          timestamp: Date.now(),
          hasStateBlock: hasStateBlocks,
        };
        dispatch({ type: 'ADD_MESSAGE', payload: assistantMsg });

        if (state.settings.debugMode) {
          void writeDMDebugLog({
            event: 'response',
            messageId: assistantMessageId,
            campaignName: state.campaign.campaignName,
            currentLocation: state.campaign.currentLocation,
            model: state.settings.model || 'gpt-4o',
            payload: {
              rawContent,
              cleanContent,
              hasStateBlocks,
              stateBlocks,
            },
          });
        }

        if (hasStateBlocks) {
          const stateUpdates = applyStateBlocks(state, stateBlocks);
          dispatch({ type: 'APPLY_DM_STATE', payload: stateUpdates });

          const firstBlock = stateBlocks[0];
          if (
            firstBlock?.type === 'encounter_start' ||
            (firstBlock?.encounter?.active === true)
          ) {
            dispatch({ type: 'SET_VIEW', payload: 'encounter' });
          } else if (
            firstBlock?.type === 'scene_transition' ||
            (firstBlock?.encounter?.active === false && state.encounter.active)
          ) {
            dispatch({ type: 'SET_VIEW', payload: 'scene' });
          }
        }
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Unknown error';
        if (state.settings.debugMode) {
          void writeDMDebugLog({
            event: 'error',
            messageId: generateId(),
            campaignName: state.campaign.campaignName,
            currentLocation: state.campaign.currentLocation,
            model: state.settings.model || 'gpt-4o',
            payload: { message },
          });
        }
        dispatch({
          type: 'ADD_MESSAGE',
          payload: {
            id: generateId(),
            role: 'assistant',
            content: `[ DM connection failed: ${message} ]`,
            timestamp: Date.now(),
          },
        });
      } finally {
        dispatch({ type: 'SET_AI_THINKING', payload: false });
      }
    },
    [state, dispatch]
  );

  return { sendMessage };
}
