// hooks/useTTS.ts
import { useRef, useEffect, useCallback } from 'react';
import { usePollySpeechMutation } from '../service';
import type { VoiceId } from '@aws-sdk/client-polly';

interface UseTTSOptions {
  voiceId: VoiceId;
  autoPlay?: boolean;
}

const useTTS = (text: string, options?: UseTTSOptions) => {
  const { autoPlay = true, voiceId = 'Seoyeon' } = options || {};
  const { mutate, ...dist } = usePollySpeechMutation({ voiceId });
  const audioRef = useRef(new Audio());
  const lastTextRef = useRef<string | null>(null);

  const checkedCacheAudio = () => {
    if (text === lastTextRef.current && !!audioRef.current.src) {
      return true;
    }
    return false;
  };

  const playAudio = (blob: Blob) => {
    const audioUrl = URL.createObjectURL(blob);
    const audio = audioRef.current;
    audio.src = audioUrl;
    audio.currentTime = 0;
    audio.play().catch(console.error);
    audio.onended = () => {
      URL.revokeObjectURL(audioUrl);
    };
  };

  const fetchAudio = () => {
    mutate(text, {
      onSuccess: blob => {
        if (autoPlay) {
          playAudio(blob);
        }
        lastTextRef.current = text;
      },
      onError: err => {
        console.error('TTS 실패:', err);
      },
    });
  };

  const handleAudio = useCallback(() => {
    if (checkedCacheAudio()) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(console.error);
    } else {
      fetchAudio();
    }
  }, [text]);

  const toggleAudio = useCallback(() => {
    if (!audioRef.current.paused) {
      audioRef.current.pause();
      return;
    }

    handleAudio();
  }, [handleAudio]);

  useEffect(() => {
    audioRef.current.pause();
    audioRef.current.currentTime = 0;
  }, [text]);

  return { toggleAudio, ...dist };
};

export default useTTS;
