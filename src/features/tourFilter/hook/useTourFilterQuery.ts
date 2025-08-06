import { useSearchParams } from 'react-router-dom';

import { isValidTourType } from '@/features/map';

import { isValidDistance, type Distance } from '@/features/tourFilter';
import type { AroundContentTypeId } from '@/entities/tour';

type UpdateType = {
  tourType: AroundContentTypeId;
  distance: Distance;
};

export const useTourFilterQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateQuery = ({ tourType, distance }: UpdateType) => {
    searchParams.set('tour-type', tourType);
    searchParams.set('distance', String(distance * 1000));
    // searchParams.set('sort', sortOption);
    setSearchParams(searchParams, { replace: true });
  };

  const getQuery = () => {
    const tourType = searchParams.get('tour-type');
    const distance = Number(searchParams.get('distance')) / 1000;

    if (isValidTourType(tourType) && isValidDistance(distance)) {
      return { tourType, distance };
    }
  };

  return { searchParams, updateQuery, getQuery };
};
