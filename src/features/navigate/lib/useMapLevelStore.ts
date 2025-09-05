import { create } from 'zustand';

type State = {
  mapLevel: number;
};

type Action = {
  setMapLevel: (level: number) => void;
  reset: () => void;
};

const initialState: State = {
  mapLevel: 6,
};

const useMapLevel = create<State & Action>(set => ({
  ...initialState,
  setMapLevel: (level: number) => set({ mapLevel: level }),
  reset: () => set(initialState),
}));

export default useMapLevel;
