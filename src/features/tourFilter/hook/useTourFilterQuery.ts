import { useSearchParams } from 'react-router-dom';

import { isValidTourType } from '@/features/map';
import { isValidDistance } from '@/features/tourFilter';

import type { Distance } from '@/features/tourFilter';
import type { AroundContentTypeId } from '@/entities/tour';

type UpdateType = {
  tourType: AroundContentTypeId;
  distance: Distance;
};

export const useTourFilterQuery = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateQuery = ({ tourType, distance }: UpdateType) => {
    const nextParams = new URLSearchParams(searchParams);
    nextParams.set('tour-type', tourType);
    nextParams.set('distance', String(distance * 1000));
    // nextParams.set('sort', sortOption);
    nextParams.delete('slide-index');
    nextParams.delete('page-param');
    setSearchParams(nextParams, { replace: true });
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
