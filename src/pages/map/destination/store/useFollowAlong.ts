import { create } from 'zustand';

type State = {
  isFollowAlong: boolean;
  currentFollowIndex: number;
};

type Action = {
  setIsFollowAlong: (isFollowAlong: boolean) => void;
  setCurrentFollowIndex: (index: number) => void;
  reset: () => void;
};

const initialState: State = {
  isFollowAlong: false,
  currentFollowIndex: -1,
};

const useFollowAlong = create<State & Action>(set => ({
  ...initialState,
  setIsFollowAlong: (isFollowAlong: boolean) => set(() => ({ isFollowAlong })),
  setCurrentFollowIndex: (index: number) =>
    set(() => ({ currentFollowIndex: index })),
  reset: () => set(initialState),
}));

export default useFollowAlong;
