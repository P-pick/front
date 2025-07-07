import { create } from 'zustand';

type State = {
  isFollowAlong: boolean;
  currentFollowIndex: number;
};

type Action = {
  setIsFollowAlong: (isFollowAlong: boolean) => void;
  setCurrentFollowIndex: (index: number) => void;
};

const useFollowAlong = create<State & Action>(set => ({
  isFollowAlong: false,
  currentFollowIndex: 0,
  setIsFollowAlong: (isFollowAlong: boolean) => set(() => ({ isFollowAlong })),
  setCurrentFollowIndex: (index: number) =>
    set(() => ({ currentFollowIndex: index })),
}));

export default useFollowAlong;
