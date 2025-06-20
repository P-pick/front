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
const pedestrianSearchTypeValues = {
  0: '추천',
  4: '추천 + 대로우선',
  10: '최단거리',
  30: '최단거리 + 계산제외',
};

const carSearchTypeValues = {
  0: '교통최적 + 추천',
  1: '교통최적 + 무료우선',
  2: '교통최적 + 최소시간',
  3: '교통최적 + 초보',
  4: '교통최적 + 고속도로우선',
  10: '최단거리 + 유/무료',
  12: '이륜차도로우선',
  19: '교통최적 + 어린이보호구역 회피',
};

const useTransportation = create<State & Actions>(set => ({
  vehicle: 'pedestrian' as TransportationType,
  searchOptions: 0,
  setVehicle: (vehicle: TransportationType) => set(() => ({ vehicle })),
  setSearchOptions: (options: SearchOptions) =>
    set(() => ({ searchOptions: options })),
}));

export default useTransportation;
