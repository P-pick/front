import clsx from 'clsx';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useStore } from 'zustand';

import { commonSVG, destinationSVG } from '@/assets';

import { useAddressFromCoords } from '@/features/map';
import {
  selectedTransportationList,
  useTransportationStore,
} from '@/features/navigate';

import type { TransportationType } from '@/entities/navigate';
import type { GeoTripLocation } from '@/shared';

interface SelectTransportationFromGeoMapProps {
  start: GeoTripLocation;
  end: GeoTripLocation;
}

export default function SelectTransportationFromGeoMap({
  start,
  end,
}: SelectTransportationFromGeoMapProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { vehicle, setVehicle, setSearchOptions } = useStore(
    useTransportationStore,
  );

  useEffect(() => {
    const vehicleParam = searchParams.get('vehicle');
    if (vehicleParam) {
      setVehicle(vehicleParam as TransportationType);
    }
  }, [searchParams, setVehicle]);

  const startName = useAddressFromCoords(start);
  const endName = useAddressFromCoords(end);

  const onChangeVehicle = (transportation: TransportationType) => {
    setVehicle(transportation);
    setSearchOptions(0);
    setSearchParams(
      prev => {
        prev.set('vehicle', transportation);
        return prev;
      },
      { replace: true },
    );
  };

  const selectedTransportation = (transportation: TransportationType) =>
    clsx(
      'flex items-center justify-center px-3 py-2 my-3 cursor-pointer fill-black rounded-2xl hover:bg-primary-red hover:text-white hover:fill-white transition-colors duration-300 gap-1',
      {
        'bg-primary-red text-white fill-white': transportation === vehicle,
      },
    );

  if (!startName || !endName) {
    return null;
  }

  return (
    <div className="px-5 w-full h-auto bg-white z-(--z-layer2)">
      <div className="border-1 rounded-2xl w-full border-gray-300 flex justify-between items-center py-3 px-6">
        <div className="flex justify-center items-center gap-2 text-xs font-bold">
          <destinationSVG.StartPoint width={10} height={10} />
          <span>{startName}</span>
        </div>
        <commonSVG.RightArrowIcon />
        <div className="flex justify-center items-center gap-2 text-xs font-bold">
          <destinationSVG.EndPoint width={10} height={10} />
          <span>{endName}</span>
        </div>
        <commonSVG.DeleteIcon
          className="cursor-pointer"
          onClick={() => navigate(-1)}
        />
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
