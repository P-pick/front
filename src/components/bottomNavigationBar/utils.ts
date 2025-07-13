import { useLocation, useNavigate } from 'react-router-dom';
import { BookMarkIcon, HomeIcon, ListIcon, ProfileIcon } from '@/assets/common';
import clsx from 'clsx';

export function useBottomNavigation() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentParams = new URLSearchParams(location.search);
  const currentPath = location.pathname;

  const getIconClass = (path: string) =>
    clsx({
      'text-black': currentPath !== path,
      'text-primary-red': currentPath === path,
    });

  const navItems = [
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

  return { navItems, getIconClass, currentPath };
}
