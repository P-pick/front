import clsx from 'clsx';
import { conversionSecToHour } from '@/features/navigate';

export default function TakeTimeToGo({
  time,
  isStyled = true,
}: {
  time: number | undefined;
  isStyled?: boolean;
}) {
  if (time === undefined || time <= 0) {
    return <p className="text-xs">시간 정보 없음</p>;
  }

  const takeTimeToGo = conversionSecToHour(time);
  const timeStyle = clsx({
    'text-xs': !isStyled,
    'text-xl font-bold': isStyled,
  });

  return (
    <span className="text-xs">
      {takeTimeToGo && takeTimeToGo.hours > 0 ? (
        <>
          <span className={timeStyle}>{takeTimeToGo.hours}</span>
          시간&nbsp;
        </>
      ) : (
        ''
      )}
      {takeTimeToGo && (
        <span className={timeStyle}>{takeTimeToGo.minutes}</span>
      )}
      분
    </span>
  );
}
