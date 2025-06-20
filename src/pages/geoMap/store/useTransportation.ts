import { create } from 'zustand';
import type { SearchOptions, TransportationType } from '../types';

type State = {
  vehicle: TransportationType;
  searchOptions: SearchOptions;
};

type Actions = {
  setVehicle: (vehicle: TransportationType) => void;
  setSearchOptions: (options: SearchOptions) => void;
};

const useTransportation = create<State & Actions>(set => ({
  vehicle: 'pedestrian' as TransportationType,
  searchOptions: 0,
  setVehicle: (vehicle: TransportationType) => set(() => ({ vehicle })),
  setSearchOptions: (options: SearchOptions) =>
    set(() => ({ searchOptions: options })),
}));

export default useTransportation;
