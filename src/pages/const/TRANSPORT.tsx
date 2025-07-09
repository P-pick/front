import { vehicleSVG } from '@/assets';

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
  {
    id: 'bicycle',
    icon: <vehicleSVG.BicycleIcon width={16} height={16} />,
    label: '자전거',
  },
] as const;
