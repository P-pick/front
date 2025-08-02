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
      id: 'home-navigation-tutorial',
      icon: HomeIcon,
      path: '/tour/geo-trip',
      label: 'home Icon',
      onClick: () =>
        navigate(`/tour/geo-trip?${currentParams.toString()}`, {
          replace: true,
        }),
    },
    {
      id: 'list-navigation-tutorial',
      icon: ListIcon,
      path: '/tour/list',
      label: 'list Icon',
      onClick: () =>
        navigate(`/tour/list?${currentParams.toString()}`, { replace: true }),
    },
    {
      id: 'bookmark-navigation-tutorial',
      icon: BookMarkIcon,
      path: '/tour/bookmark',
      label: 'bookmark Icon',
      onClick: () => navigate('/tour/bookmark', { replace: true }),
    },
    {
      id: 'profile-navigation-tutorial',
      icon: ProfileIcon,
      path: '/profile',
      label: 'profile Icon',
      onClick: () => navigate('/profile', { replace: true }),
    },
  ];
};
