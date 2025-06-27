import type { Swiper } from 'swiper/types';
import { create } from 'zustand';

type State = {
  isFollowAlong: boolean;
  swiperRef: React.RefObject<Swiper> | null;
};

type Action = {
  setIsFollowAlong: (isFollowAlong: boolean) => void;
};

const useFollowAlong = create<State & Action>(set => ({
  isFollowAlong: false,
  swiperRef: null,
  setIsFollowAlong: (isFollowAlong: boolean) => set(() => ({ isFollowAlong })),
}));

export default useFollowAlong;
