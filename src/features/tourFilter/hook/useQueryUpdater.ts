import { useSearchParams } from 'react-router-dom';

import type { AroundContentTypeId } from '@/entities/tour';
import type { Distance } from '@/features/tourFilter';

export const useQueryUpdater = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const updateQuery = () => {};

  const defaultValue = {
    tourType: searchParams.get('tour-type') as AroundContentTypeId,
    distance: (Number(searchParams.get('distance')) / 1000) as Distance,
    // sortOption: searchParams.get('sort') as SortOption,
  };

  return { searchParams, updateQuery, defaultValue };
};
