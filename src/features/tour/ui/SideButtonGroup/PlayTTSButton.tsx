import { commonSVG } from '@/assets';
import { useTTS } from '../../';

interface PlayTTSButtonProps {
  text: string;
}

export default function PlayTTSButton({ text }: PlayTTSButtonProps) {
  const { toggleAudio } = useTTS(text);

  return (
    <>
      <button
        type="button"
        onClick={toggleAudio}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white cursor-pointer"
      >
        <commonSVG.SoundIcon />
      </button>
    </>
  );
}
