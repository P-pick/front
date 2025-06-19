import { selectedTransportationList } from '@/pages/const/TRANSPORT';
import type { TransportationType } from '../../types';
import clsx from 'clsx';
import { DeleteIcon, EndPoint, RightArrowIcon, StartPoint } from '@/assets';
import { truncate } from '@/pages/geotrip/lib';

interface SelectTransportationFromGeoMapProps {
  vehicle: TransportationType;
  setVehicle: React.Dispatch<React.SetStateAction<TransportationType>>;
}

export default function SelectTransportationFromGeoMap({
  vehicle,
  setVehicle,
}: SelectTransportationFromGeoMapProps) {
  const onChangeVehicle = (transportation: TransportationType) => {
    setVehicle(transportation);
  };

  const selectedTransportation = (transportation: TransportationType) =>
    clsx(
      'flex items-center justify-center px-3 py-2 my-3 cursor-pointer rounded-2xl hover:bg-[#FA4032] hover:text-white transition-colors duration-300 gap-1',
      {
        'bg-[#FA4032] text-white': transportation === vehicle,
      }
    );

  return (
    <div className="absolute top-0 left-0 px-5 w-full h-auto bg-white z-(--z-layer2)">
      <div className="border-1 rounded-2xl w-full border-gray-300 flex justify-between items-center py-3 px-6">
        <div className="flex justify-center items-center gap-2 text-xs font-bold">
          <StartPoint width={10} height={10} />
          <span>{truncate('출발지', { length: 10 })}</span>
        </div>
        <RightArrowIcon />
        <div className="flex justify-center items-center gap-2 text-xs font-bold">
          <EndPoint width={10} height={10} />
          <span>{truncate('목적지', { length: 10 })}</span>
        </div>
        <DeleteIcon className="cursor-pointer" />
      </div>
      <div>
        <ul className="w-full flex justify-between items-center overflow-x-auto gap-2">
          {selectedTransportationList.map(transport => {
            return (
              <li
                key={transport.id}
                className={selectedTransportation(transport.id)}
                onClick={() => onChangeVehicle(transport.id)}
              >
                {transport.icon}
                <span className="text-[10px]">{transport.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
