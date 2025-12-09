import { type NavigateOptions, type To } from 'react-router-dom';
import {
  BookmarkPageIcon,
  HomeIcon,
  ListIcon,
  ProfileIcon,
} from '@/assets/common';

type createNavItemsParams = {
  navigate: (to: To, options?: NavigateOptions) => void | Promise<void>;
};

export const createNavItems = ({ navigate }: createNavItemsParams) => {
  const navigateTo = (path: string) => {
    navigate(path, { replace: true });
  };

  return [
    {
      id: 'home-navigation-tutorial',
      icon: HomeIcon,
      path: '/tour/geo/1234566',
      label: 'home Icon',
      onClick: () => navigateTo('/tour/geo/1234566'),
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
