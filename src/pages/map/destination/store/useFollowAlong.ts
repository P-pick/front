import type { Swiper } from 'swiper/types';
import { create } from 'zustand';

type State = {
  isFollowAlong: boolean;
  swiperRef: React.RefObject<Swiper> | null;
  currentFollowIndex: number;
};

type Action = {
  setIsFollowAlong: (isFollowAlong: boolean) => void;
  setCurrentFollowIndex: (index: number) => void;
};

const useFollowAlong = create<State & Action>(set => ({
  isFollowAlong: false,
  swiperRef: null,
  followIndex: [],
  currentFollowIndex: 0,
  setIsFollowAlong: (isFollowAlong: boolean) => set(() => ({ isFollowAlong })),
  setCurrentFollowIndex: (index: number) =>
    set(() => ({ currentFollowIndex: index })),
}));

export default useFollowAlong;
