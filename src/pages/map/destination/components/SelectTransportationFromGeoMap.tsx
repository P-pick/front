import { commonSVG, destinationSVG } from '@/assets';
import { truncate } from '@/lib';
import { selectedTransportationList } from '@/pages/const/TRANSPORT';
import type { GeoTripLocation } from '@/pages/types';
import { LoadingSpinner } from '@/shared';
import clsx from 'clsx';
import { useStore } from 'zustand';
import { useAddressFromCoords } from '../lib/useAddressFromCoords';
import { useTransportation } from '../store';
import type { TransportationType } from '../types';
interface SelectTransportationFromGeoMapProps {
  start: GeoTripLocation;
  end: GeoTripLocation;
}

export default function SelectTransportationFromGeoMap({
  start,
  end,
}: SelectTransportationFromGeoMapProps) {
  const { vehicle, setVehicle, setSearchOptions } = useStore(useTransportation);

  const startName = useAddressFromCoords(start);
  const endName = useAddressFromCoords(end);

  const onChangeVehicle = (transportation: TransportationType) => {
    setVehicle(transportation);
    setSearchOptions(0);
  };

  const selectedTransportation = (transportation: TransportationType) =>
    clsx(
      'flex items-center justify-center px-3 py-2 my-3 cursor-pointer fill-black rounded-2xl hover:bg-primary-red hover:text-white hover:fill-white transition-colors duration-300 gap-1',
      {
        'bg-primary-red text-white fill-white': transportation === vehicle,
      },
    );

  if (!startName.address || !endName.address) {
    return <LoadingSpinner />;
  }

  return (
    <div className="absolute top-0 left-0 px-5 w-full h-auto bg-white z-(--z-layer2)">
      <div className="border-1 rounded-2xl w-full border-gray-300 flex justify-between items-center py-3 px-6">
        <div className="flex justify-center items-center gap-2 text-xs font-bold">
          <destinationSVG.StartPoint width={10} height={10} />
          <span>{truncate(startName.address, { length: 10 })}</span>
        </div>
        <commonSVG.RightArrowIcon />
        <div className="flex justify-center items-center gap-2 text-xs font-bold">
          <destinationSVG.EndPoint width={10} height={10} />
          <span>{truncate(endName.address, { length: 10 })}</span>
        </div>
        <commonSVG.DeleteIcon className="cursor-pointer" />
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
                <span>{transport.icon}</span>
                <span className="text-[10px]">{transport.label}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
