import { useCallback } from 'react';
import { useGameState } from '../store/GameStateContext';

export function useImageGeneration() {
  const { state, dispatch } = useGameState();

  const generateSceneImage = useCallback(async () => {
    if (!state.settings.openaiApiKey) {
      alert('No API key configured. Open Menu → Settings.');
      return;
    }

    dispatch({ type: 'SET_GENERATING_IMAGE', payload: true });

    const prompt = buildScenePrompt(
      state.scene.locationName,
      state.scene.environmentType,
      state.scene.narrativeContext
    );

    try {
      const response = await fetch('https://api.openai.com/v1/images/generations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${state.settings.openaiApiKey}`,
        },
        body: JSON.stringify({
          model: 'dall-e-3',
          prompt,
          n: 1,
          size: '1792x1024',
          quality: 'standard',
          style: 'natural',
        }),
      });

      if (!response.ok) {
        const errData = await response.json().catch(() => ({}));
        throw new Error(
          (errData as { error?: { message?: string } })?.error?.message ??
            `DALL-E error ${response.status}`
        );
      }

      const data = await response.json() as { data: Array<{ url: string }> };
      const imageUrl = data.data[0]?.url;
      if (imageUrl) {
        dispatch({ type: 'SET_SCENE_IMAGE', payload: imageUrl });
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      alert(`Image generation failed: ${message}`);
    } finally {
      dispatch({ type: 'SET_GENERATING_IMAGE', payload: false });
    }
  }, [state.settings.openaiApiKey, state.scene, dispatch]);

  return { generateSceneImage, isGenerating: state.isGeneratingImage };
}

function buildScenePrompt(
  locationName: string,
  environmentType: string,
  narrativeContext: string
): string {
  return `NASApunk sci-fi atmosphere concept art. Location: ${locationName}. Environment: ${environmentType}. Context: ${narrativeContext}

Visual style: industrial outer solar system, worn and functional, off-white metal panels with orange safety markings, deep black void, faded teal instrument displays, amber warning lights, rusted conduit and pipe runs. No glossy sci-fi. Cinematic, documentary lighting. Desaturated palette with single amber or teal accent. Wide aspect ratio establishing shot. Ultra-detailed. Photorealistic rendered concept art.`;
}
