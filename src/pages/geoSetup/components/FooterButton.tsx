interface FooterButtonProps {
  onClick: () => void;
  text: string;
}

export default function FooterButton({ onClick, text }: FooterButtonProps) {
  return (
    <button
      className="cursor-pointer w-[320px] h-[50px] bg-primary-red rounded-2xl text-white font-bold text-[16px]"
      onClick={onClick}
    >
      {text}
    </button>
  );
}
