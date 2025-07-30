import { commonSVG } from '@/assets';

interface DistanceTimeInfoProps {
  dist: string;
  iconFill?: string;
  className?: string;
}

export default function DistanceTimeInfo({
  dist,
  iconFill = 'white',
  className = '',
}: DistanceTimeInfoProps) {
  return (
    <div className="flex items-center whitespace-nowrap">
      <commonSVG.LocationIcon className={iconFill} width={15} height={15} />
      <span className={className}>
        &nbsp;{Math.floor((Number(dist) / 1000) * 10) / 10} Km
      </span>
    </div>
  );
}
