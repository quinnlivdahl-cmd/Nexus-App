import { useCallback } from 'react';
import { useGameState } from '../store/GameStateContext';
import { buildSystemMessage } from './dmSystemPrompt';
import { parseDMMessage, applyStateBlocks } from './stateParser';
import type { ChatMessage } from '../types/game';

function generateId(): string {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
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
        const openaiMessages = [
          { role: 'system' as const, content: buildSystemMessage() },
          ...state.messages
            .filter((m) => m.role === 'user' || m.role === 'assistant')
            .map((m) => ({
              role: m.role as 'user' | 'assistant',
              content: m.rawContent ?? m.content,
            })),
          { role: 'user' as const, content: userText },
        ];

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
          id: generateId(),
          role: 'assistant',
          content: cleanContent,
          rawContent,
          timestamp: Date.now(),
          hasStateBlock: hasStateBlocks,
        };
        dispatch({ type: 'ADD_MESSAGE', payload: assistantMsg });

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
