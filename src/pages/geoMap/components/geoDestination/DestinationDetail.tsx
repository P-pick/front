interface DestinationDetailProps {
  time: {
    hours: number;
    minutes: number;
  };
  distance: string | null;
}

export default function DestinationDetail({
  time,
  distance,
}: DestinationDetailProps) {
  return (
    <div className="absolute bottom-0 left-0 z-(--z-layer2) w-full h-1/5 p-3">
      <div className="w-full h-full bg-white flex-col p-3">
        <h2 className="text-xs text-blue-400 font-semibold">예상 시간</h2>
        <p className="text-xs">
          {time.hours > 0 ? (
            <>
              <span className="text-xl font-bold">{time.hours}</span>시간&nbsp;
            </>
          ) : (
            ''
          )}
          <span className="text-xl font-bold">{time.minutes}</span>분
        </p>
        <div>
          <span className="text-xs">{distance}</span>
        </div>
      </div>
    </div>
  );
}
