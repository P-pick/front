import { vehicleSVG, followSVG, destinationSVG } from '@/assets';

import type { TurnType } from '@/entities/navigate';

interface FollowInfo {
  name: string;
  svg: React.ReactElement;
}

export const followInfo: Record<TurnType, FollowInfo> = {
  11: {
    name: '직진',
    svg: <followSVG.Straight className="fill-white" />,
  },
  12: {
    name: '좌회전',
    svg: <followSVG.TurnLeft />,
  },
  13: {
    name: '우회전',
    svg: <followSVG.TurnRight />,
  },
  14: {
    name: '유턴',
    svg: <followSVG.UTurn className="fill-white" />,
  },
  16: {
    name: '8시 방향 좌회전',
    svg: <followSVG.EightOClockDirection />,
  },
  17: {
    name: '10시 방향 좌회전',
    svg: <followSVG.TenOClockDirection />,
  },
  18: {
    name: '2시 방향 우회전',
    svg: <followSVG.TwoOClockDirection />,
  },
  19: {
    name: '4시 방향 우회전',
    svg: <followSVG.FourOClockDirection />,
  },
  119: {
    name: '지하차도',
    svg: <followSVG.Tunnel />,
  },
  121: {
    name: '터널 진입',
    svg: <followSVG.Tunnel />,
  },
  124: {
    name: '고차도로 옆',
    svg: <followSVG.RoadLeft className="fill-white" />,
  },
  125: {
    name: '육교',
    svg: <followSVG.PedestrianOverpass className="fill-white" />,
  },
  126: {
    name: '지하보도',
    svg: <followSVG.Underpass className="fill-white" />,
  },
  127: {
    name: '계단 진입',
    svg: <followSVG.Stairs className="fill-white" />,
  },
  128: {
    name: '경사로 진입',
    svg: <followSVG.Ramp className="fill-white" />,
  },
  129: {
    name: '계단 + 경사로 진입',
    svg: <followSVG.Ramp className="fill-white" />,
  },
  184: {
    name: '경유지',
    svg: <followSVG.Straight className="fill-white" />,
  },
  185: {
    name: '첫 번째 경유지',
    svg: <followSVG.Straight className="fill-white" />,
  },
  186: {
    name: '두 번째 경유지',
    svg: <followSVG.Straight className="fill-white" />,
  },
  187: {
    name: '세 번째 경유지',
    svg: <followSVG.Straight className="fill-white" />,
  },
  188: {
    name: '네 번째 경유지',
    svg: <followSVG.Straight className="fill-white" />,
  },
  189: {
    name: '다섯 번째 경유지',
    svg: <followSVG.Straight className="fill-white" />,
  },
  200: {
    name: '출발지',
    svg: <destinationSVG.StartPin className="fill-white" />,
  },
  201: {
    name: '목적지',
    svg: <destinationSVG.EndPin className="fill-white" />,
  },
  211: {
    name: '횡단보도',
    svg: <followSVG.CrossWalk className="fill-white" />,
  },
  212: {
    name: '좌측 횡단보도',
    svg: <followSVG.CrossWalk className="fill-white" />,
  },
  213: {
    name: '우측 횡단보도',
    svg: <followSVG.CrossWalk className="fill-white" />,
  },
  214: {
    name: '8시 방향 횡단보도',
    svg: <followSVG.CrossWalk className="fill-white" />,
  },
  215: {
    name: '10시 방향 횡단보도',
    svg: <followSVG.CrossWalk className="fill-white" />,
  },
  216: {
    name: '2시 방향 횡단보도',
    svg: <followSVG.CrossWalk className="fill-white" />,
  },
  217: {
    name: '4시 방향 횡단보도',
    svg: <followSVG.CrossWalk className="fill-white" />,
  },
  218: {
    name: '엘리베이터',
    svg: <followSVG.Elevator className="fill-white" />,
  },
};

export const selectedTransportationList = [
  {
    id: 'pedestrian',
    icon: <vehicleSVG.PedestrianIcon width={16} height={16} />,
    label: '도보',
  },
  {
    id: 'car',
    icon: <vehicleSVG.CarIcon width={16} height={16} />,
    label: '차량',
  },
  {
    id: 'publictransit',
    icon: <vehicleSVG.TransportationIcon width={16} height={16} />,
    label: '대중교통',
  },
] as const;

export const TRAFFIC = {
  none: '#888888',
  normal: '#24aa24',
  slowly: '#ffc107',
  delay: '#dc3545',
} as const;
