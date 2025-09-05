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
  const paramsString = currentParams.toString();

  const navigateTo = (path: string) => {
    const destination = paramsString ? `${path}?${paramsString}` : path;
    navigate(destination, { replace: false });
  };

  return [
    {
      id: 'home-navigation-tutorial',
      icon: HomeIcon,
      path: '/tour/geo-trip',
      label: 'home Icon',
      onClick: () => navigateTo('/tour/geo-trip'),
    },
    {
      id: 'list-navigation-tutorial',
      icon: ListIcon,
      path: '/tour/list',
      label: 'list Icon',
      onClick: () => navigateTo('/tour/list'),
    },
    {
      id: 'bookmark-navigation-tutorial',
      icon: BookmarkPageIcon,
      path: '/tour/bookmark',
      label: 'bookmark Icon',
      onClick: () => navigateTo('/tour/bookmark'),
    },
    {
      id: 'profile-navigation-tutorial',
      icon: ProfileIcon,
      path: '/profile',
      label: 'profile Icon',
      onClick: () => navigateTo('/profile'),
    },
  ];
};
