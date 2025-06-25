import { create } from 'zustand';

type State = {
  isFollowAlong: boolean;
};

type Action = {
  setIsFollowAlong: (isFollowAlong: boolean) => void;
};

const useFollowAlong = create<State & Action>(set => ({
  isFollowAlong: false,
  setIsFollowAlong: (isFollowAlong: boolean) => set(() => ({ isFollowAlong })),
}));

export default useFollowAlong;
