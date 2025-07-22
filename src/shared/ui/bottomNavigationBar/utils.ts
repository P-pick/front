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
      label: 'home Icon',
      onClick: () =>
        navigate(`/tour/geo-trip?${currentParams.toString()}`, {
          replace: true,
        }),
    },
    {
      icon: ListIcon,
      path: '/tour/list',
      label: 'list Icon',
      onClick: () =>
        navigate(`/tour/list?${currentParams.toString()}`, { replace: true }),
    },
    {
      icon: BookMarkIcon,
      path: '/bookmark',
      label: 'bookmark Icon',
      onClick: () => navigate('/bookmark', { replace: true }),
    },
    {
      icon: ProfileIcon,
      path: '/profile',
      label: 'profile Icon',
      onClick: () => navigate('/profile', { replace: true }),
    },
  ];
};
