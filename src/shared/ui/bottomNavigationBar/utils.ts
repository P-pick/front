import { type NavigateOptions, type To } from 'react-router-dom';
import {
  BookmarkPageIcon,
  HomeIcon,
  ListIcon,
  ProfileIcon,
} from '@/assets/common';

type createNavItemsParams = {
  currentParams: URLSearchParams;
  navigate: (to: To, options?: NavigateOptions) => void | Promise<void>;
};

export const createNavItems = ({
  currentParams,
  navigate,
}: createNavItemsParams) => {
  const saveTourSearchToSession = () => {
    sessionStorage.setItem('prevTourSearch', currentParams.toString());
  };

  return [
    {
      id: 'home-navigation-tutorial',
      icon: HomeIcon,
      path: '/tour/geo-trip',
      label: 'home Icon',
      onClick: () => {
        const prevSearch = sessionStorage.getItem('prevTourSearch') || '';
        navigate(`/tour/geo-trip?${prevSearch}`, {
          replace: true,
        });
      },
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
      icon: BookmarkPageIcon,
      path: '/tour/bookmark',
      label: 'bookmark Icon',
      onClick: () =>
        navigate(`/tour/bookmark?${currentParams.toString()}`, {
          replace: true,
        }),
    },
    {
      id: 'profile-navigation-tutorial',
      icon: ProfileIcon,
      path: '/profile',
      label: 'profile Icon',
      onClick: () => {
        saveTourSearchToSession();
        navigate(`/profile`, { replace: false });
      },
    },
  ];
};
