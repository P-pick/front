interface SetupButtonProps {
  hasPrevStep: boolean;
  prevStep: () => void;
  currentStep: number;
  maxStep: number;
  title: string;
}

export default function SetupHeader({
  hasPrevStep,
  prevStep,
  currentStep,
  maxStep,
  title,
}: SetupButtonProps) {
  return (
    <>
      <div className="mt-4 flex w-full justify-between">
        {hasPrevStep && (
          <button className="cursor-pointer" onClick={prevStep}>
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3.825 9L9.425 14.6L8 16L0 8L8 0L9.425 1.4L3.825 7H16V9H3.825Z"
                fill="#2D2D2D"
              />
            </svg>
          </button>
        )}
        <span className="grow text-gray-400 text-right">
          {currentStep}/{maxStep}
        </span>
      </div>
      <h1 className="whitespace-pre-line mt-[61px] mb-[55px] text-2xl font-semibold">
        {title}
      </h1>
    </>
  );
}
