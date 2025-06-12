import {
  BicycleIcon,
  CarIcon,
  PedestrianIcon,
  TransportationIcon,
} from '@/assets';
import type { TransportationType } from '../../types';
import clsx from 'clsx';

type TransportationOption = {
  id: TransportationType;
  icon: React.ReactNode;
  label: string;
};

const selectedTransportationList: TransportationOption[] = [
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
];

interface SelectTransportationFromGeoMapProps {
  vehicle: TransportationType;
  setVehicle: React.Dispatch<React.SetStateAction<TransportationType>>;
}

export default function SelectTransportationFromGeoMap({
  vehicle,
  setVehicle,
}: SelectTransportationFromGeoMapProps) {
  const onChangeVehicle = (transportation: TransportationOption['id']) => {
    setVehicle(transportation);
  };

  const selectedTransportation = (transportation: TransportationOption['id']) =>
    clsx(
      'flex items-center my-2 cursor-pointer rounded-2xl hover:bg-orange-700 transition-colors duration-300',
      {
        'bg-orange-500 text-white': transportation === vehicle,
      }
    );

  return (
    <div className="absolute top-0 left-0 px-3 w-full h-auto bg-white z-(--z-layer2)">
      <div className="border-1 rounded-lg w-full h-8 border-gray-300 flex justify-center items-center p-3">
        <div className="flex-1">
          <span>출발지</span>
        </div>
        <div>&gt;</div>
        <div className="flex-1">
          <span>목적지</span>
        </div>
      </div>
      <div>
        <ul className="w-full flex justify-between items-center overflow-x-auto">
          {selectedTransportationList.map(transport => {
            return (
              <li
                key={transport.id}
                className={selectedTransportation(transport.id)}
                onClick={() => onChangeVehicle(transport.id)}
              >
                <span className="flex items-center justify-center gap-2 p-2 w-8 h-8">
                  {transport.icon}
                </span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
