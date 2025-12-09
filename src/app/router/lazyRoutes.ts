import { lazy } from 'react';

export const Map = lazy(() => import('@/pages/map/Map'));
export const Destination = lazy(
  () => import('@/pages/map/destination/Destination'),
);
export const AroundSearch = lazy(
  () => import('@/pages/map/aroundSearch/AroundSearch'),
);
export const TourList = lazy(() => import('@/pages/tour/tourList/TourList'));
export const TourSearch = lazy(() => import('@/pages/tour/search/TourSearch'));
export const TourShare = lazy(() => import('@/pages/tour/geotrip/Share'));
