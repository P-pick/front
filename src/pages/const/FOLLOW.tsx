import StraightIcon from '@/assets/follow/직진.svg?react';
import LeftTurnIcon from '@/assets/follow/좌회전.svg?react';
import RightTurnIcon from '@/assets/follow/우회전.svg?react';
import UTurnIcon from '@/assets/follow/유턴.svg?react';
import ElevatorIcon from '@/assets/follow/엘리베이터.svg?react';
import CrosswalkIcon from '@/assets/follow/횡단보도.svg?react';
import StairsIcon from '@/assets/follow/계단.svg?react';
import OverPassIcon from '@/assets/follow/육교.svg?react';
import RampIcon from '@/assets/follow/경사로.svg?react';
import UnderGroundIcon from '@/assets/follow/지하도.svg?react';
import TwoStraightIcon from '@/assets/follow/2시방향.svg?react';
import FourStraightIcon from '@/assets/follow/4시방향.svg?react';
import TenStraightIcon from '@/assets/follow/10시방향.svg?react';
import EightStraightIcon from '@/assets/follow/8시방향.svg?react';
import StartPoint from '@/assets/출발핀2.svg?react';
import EndPoint from '@/assets/도착핀3.svg?react';
import { CarTunnelIcon } from '@/assets';
import type { TurnType } from '../map/destination/types';

interface FollowInfo {
  name: string;
  svg: React.ReactElement;
}

export const followInfo: Record<TurnType, FollowInfo> = {
  11: {
    name: '직진',
    svg: <StraightIcon />,
  },
  12: {
    name: '좌회전',
    svg: <LeftTurnIcon />,
  },
  13: {
    name: '우회전',
    svg: <RightTurnIcon />,
  },
  14: {
    name: '유턴',
    svg: <UTurnIcon />,
  },
  16: {
    name: '8시 방향 좌회전',
    svg: <EightStraightIcon />,
  },
  17: {
    name: '10시 방향 좌회전',
    svg: <TenStraightIcon />,
  },
  18: {
    name: '2시 방향 우회전',
    svg: <TwoStraightIcon />,
  },
  19: {
    name: '4시 방향 우회전',
    svg: <FourStraightIcon />,
  },
  121: {
    name: '터널 진입',
    svg: <CarTunnelIcon />,
  },
  125: {
    name: '육교',
    svg: <OverPassIcon />,
  },
  126: {
    name: '지하보도',
    svg: <UnderGroundIcon />,
  },
  127: {
    name: '계단 진입',
    svg: <StairsIcon />,
  },
  128: {
    name: '경사로 진입',
    svg: <RampIcon />,
  },
  129: {
    name: '계단 + 경사로 진입',
    svg: <StairsIcon />,
  },
  184: {
    name: '경유지',
    svg: <StraightIcon />,
  },
  185: {
    name: '첫 번째 경유지',
    svg: <StraightIcon />,
  },
  186: {
    name: '두 번째 경유지',
    svg: <StraightIcon />,
  },
  187: {
    name: '세 번째 경유지',
    svg: <StraightIcon />,
  },
  188: {
    name: '네 번째 경유지',
    svg: <StraightIcon />,
  },
  189: {
    name: '다섯 번째 경유지',
    svg: <StraightIcon />,
  },

  200: {
    name: '출발지',
    svg: <StartPoint />,
  },
  201: {
    name: '목적지',
    svg: <EndPoint />,
  },
  211: {
    name: '횡단보도',
    svg: <CrosswalkIcon />,
  },
  212: {
    name: '좌측 횡단보도',
    svg: <CrosswalkIcon />,
  },
  213: {
    name: '우측 횡단보도',
    svg: <CrosswalkIcon />,
  },
  214: {
    name: '8시 방향 횡단보도',
    svg: <CrosswalkIcon />,
  },
  215: {
    name: '10시 방향 횡단보도',
    svg: <CrosswalkIcon />,
  },
  216: {
    name: '2시 방향 횡단보도',
    svg: <CrosswalkIcon />,
  },
  217: {
    name: '4시 방향 횡단보도',
    svg: <CrosswalkIcon />,
  },
  218: {
    name: '엘리베이터',
    svg: <ElevatorIcon />,
  },
};
