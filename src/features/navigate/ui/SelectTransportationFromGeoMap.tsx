import clsx from 'clsx';
import { useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useStore } from 'zustand';

import {
  selectedTransportationList,
  useTransportationStore,
} from '@/features/navigate';

import type { TransportationType } from '@/entities/navigate';
export default function SelectTransportationFromGeoMap() {
  const [searchParams, setSearchParams] = useSearchParams();
  const { vehicle, setVehicle, setSearchOptions } = useStore(
    useTransportationStore,
  );

  useEffect(() => {
    const vehicleParam = searchParams.get('vehicle');
    if (vehicleParam) {
      setVehicle(vehicleParam as TransportationType);
    }
  }, [searchParams, setVehicle]);

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

  return (
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
  );
}
