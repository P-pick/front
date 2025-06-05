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
    '#FA4032': checked,
    '#D9D9D9': !checked,
  });

  return (
    <button
      type="button"
      onClick={() => onClick(value)}
      className={`cursor-pointer flex items-center  justify-between px-4.5 w-[320px] h-[75px] rounded-2xl ${bgColor}`}
    >
      <span className="font-bold text-lg">{label}</span>
      <svg
        width="25"
        height="25"
        viewBox="0 0 25 25"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="12.5" cy="12.5" r="12.5" fill={checkButtonColor} />
        <path
          d="M10.546 18L6 13.2599L7.1365 12.0748L10.546 15.6299L17.8635 8L19 9.18503L10.546 18Z"
          fill="white"
        />
      </svg>
    </button>
  );
}
