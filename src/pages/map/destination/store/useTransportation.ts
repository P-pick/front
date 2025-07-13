import { create } from 'zustand';
import type { SearchOptions, TransportationType } from '../types';

type State = {
  vehicle: TransportationType;
  searchOptions: SearchOptions;
};

type Actions = {
  setVehicle: (vehicle: TransportationType) => void;
  setSearchOptions: (options: SearchOptions) => void;
  reset: () => void;
};

const initialState: State = {
  vehicle: 'pedestrian' as TransportationType,
  searchOptions: 0,
};

const useTransportation = create<State & Actions>(set => ({
  ...initialState,
  setVehicle: (vehicle: TransportationType) => set(() => ({ vehicle })),
  setSearchOptions: (options: SearchOptions) =>
    set(() => ({ searchOptions: options })),
  reset: () => set(initialState),
}));

export default useTransportation;
