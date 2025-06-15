import { useRef } from 'react';
import { usePollySpeechMutation } from '../../service';

export default function PlayTTSButton() {
  const { mutate } = usePollySpeechMutation();
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const handleMutate = (text: string) => {
    const audio = audioRef.current;
    if (!audio.paused) {
      audio.pause();
      return;
    }

    mutate(text, {
      onSuccess: blob => {
        const audioUrl = URL.createObjectURL(blob);
        audio.pause();
        audio.src = audioUrl;
        audio.currentTime = 0;
        audio.play().catch(console.error);
      },
      onError: error => {
        console.error('TTS 실패:', error);
      },
    });
  };
}
