import {
  BicycleIcon,
  CarIcon,
  PedestrianIcon,
  TransportationIcon,
} from '@/assets';

export const selectedTransportationList = [
  {
    id: 'pedestrian',
    icon: <PedestrianIcon width={16} height={16} />,
    label: '도보',
  },
  {
    id: 'car',
    icon: <CarIcon width={16} height={16} />,
    label: '차량',
  },
  {
    id: 'public-transportation',
    icon: <TransportationIcon width={16} height={16} />,
    label: '대중교통',
  },
  {
    id: 'bicycle',
    icon: <BicycleIcon width={16} height={16} />,
    label: '자전거',
  },
] as const;
