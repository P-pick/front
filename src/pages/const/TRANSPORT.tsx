import {
  BicycleIcon,
  CarIcon,
  PedestrianIcon,
  TransportationIcon,
} from '@/assets';

export const selectedTransportationList = [
  {
    id: 'pedestrian',
    icon: <PedestrianIcon />,
    label: '보행자',
  },
  {
    id: 'car',
    icon: <CarIcon />,
    label: '자동차',
  },
  {
    id: 'bicycle',
    icon: <BicycleIcon />,
    label: '자전거',
  },
  {
    id: 'public-transportation',
    icon: <TransportationIcon />,
    label: '대중교통',
  },
] as const;
