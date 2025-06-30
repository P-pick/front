import { commonSVG } from '@/assets';
import clsx from 'clsx';
interface SetupButtonProps {
  label: string;
  checked: boolean;
  value: string;
  onClick: (value: string) => void;
}

export default function SetupButton({
  label,
  checked,
  value,
  onClick,
}: SetupButtonProps) {
  const bgColor = clsx({
    'bg-[#FFE5E5] inset-shadow-sm inset-shadow-rose-300 ring': checked,
    'bg-[#ffffff] shadow-[0_4px_4px_0_rgba(0,0,0,0.25)]': !checked,
  });

  const checkButtonColor = clsx({
    'text-primary-red': checked,
    'text-primary-gray': !checked,
  });

  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`cursor-pointer flex items-center  justify-between px-4.5 w-[320px] h-[75px] rounded-2xl ${bgColor}`}
    >
      <span className="font-bold text-lg">{label}</span>
      <commonSVG.CheckIcon className={checkButtonColor} />
    </button>
  );
}
