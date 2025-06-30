import { followSVG, destinationSVG } from '@/assets';
import type { TurnType } from '../map/destination/types';

interface FollowInfo {
  name: string;
  svg: React.ReactElement;
}

export const followInfo: Record<TurnType, FollowInfo> = {
  11: {
    name: '직진',
    svg: <followSVG.Straight />,
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
    svg: <followSVG.UTurn />,
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
  121: {
    name: '터널 진입',
    svg: <followSVG.Tunnel />,
  },
  125: {
    name: '육교',
    svg: <followSVG.PedestrianOverpass />,
  },
  126: {
    name: '지하보도',
    svg: <followSVG.Underpass />,
  },
  127: {
    name: '계단 진입',
    svg: <followSVG.Stairs />,
  },
  128: {
    name: '경사로 진입',
    svg: <followSVG.Ramp />,
  },
  129: {
    name: '계단 + 경사로 진입',
    svg: <followSVG.Ramp />,
  },
  184: {
    name: '경유지',
    svg: <followSVG.Straight />,
  },
  185: {
    name: '첫 번째 경유지',
    svg: <followSVG.Straight />,
  },
  186: {
    name: '두 번째 경유지',
    svg: <followSVG.Straight />,
  },
  187: {
    name: '세 번째 경유지',
    svg: <followSVG.Straight />,
  },
  188: {
    name: '네 번째 경유지',
    svg: <followSVG.Straight />,
  },
  189: {
    name: '다섯 번째 경유지',
    svg: <followSVG.Straight />,
  },
  200: {
    name: '출발지',
    svg: <destinationSVG.StartPin />,
  },
  201: {
    name: '목적지',
    svg: <destinationSVG.EndPin />,
  },
  211: {
    name: '횡단보도',
    svg: <followSVG.CrossWalk />,
  },
  212: {
    name: '좌측 횡단보도',
    svg: <followSVG.CrossWalk />,
  },
  213: {
    name: '우측 횡단보도',
    svg: <followSVG.CrossWalk />,
  },
  214: {
    name: '8시 방향 횡단보도',
    svg: <followSVG.CrossWalk />,
  },
  215: {
    name: '10시 방향 횡단보도',
    svg: <followSVG.CrossWalk />,
  },
  216: {
    name: '2시 방향 횡단보도',
    svg: <followSVG.CrossWalk />,
  },
  217: {
    name: '4시 방향 횡단보도',
    svg: <followSVG.CrossWalk />,
  },
  218: {
    name: '엘리베이터',
    svg: <followSVG.Elevator />,
  },
};
