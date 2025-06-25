import { MapIcon } from '@/assets';

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
    <span className="flex items-center">
      <MapIcon style={{ color: iconFill }} width={15} height={15} />
      <p className={className}>
        &nbsp;{Math.floor((Number(dist) / 1000) * 10) / 10} Km
      </p>
    </span>
  );
}
