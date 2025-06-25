import { create } from 'zustand';

type State = {
  mapLevel: number;
};

type Action = {
  setMapLevel: (level: number) => void;
};

const useMapLevel = create<State & Action>(set => ({
  mapLevel: 6, // Default map level
  setMapLevel: (level: number) => set({ mapLevel: level }),
}));

export default useMapLevel;
