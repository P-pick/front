import { type NavigateOptions, type To } from 'react-router-dom';
import { BookMarkIcon, HomeIcon, ListIcon, ProfileIcon } from '@/assets/common';

type createNavItemsParams = {
  currentParams: URLSearchParams;
  navigate: (to: To, options?: NavigateOptions) => void | Promise<void>;
};

export const createNavItems = ({
  currentParams,
  navigate,
}: createNavItemsParams) => {
  return [
    {
      icon: HomeIcon,
      path: '/tour/geo-trip',
      onClick: () => navigate(`/tour/geo-trip?${currentParams.toString()}`),
    },
    {
      icon: ListIcon,
      path: '/tour/list',
      onClick: () => navigate(`/tour/list?${currentParams.toString()}`),
    },
    {
      icon: BookMarkIcon,
      path: '/tour/bookmark',
      onClick: () => navigate('/tour/bookmark'),
    },
    {
      icon: ProfileIcon,
      path: '/tour/profile',
      onClick: () => navigate('/tour/profile'),
    },
  ];
};
