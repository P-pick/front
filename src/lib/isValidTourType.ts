import { TOUR_TYPE } from '@/pages/const/MARKER';
import type { AroundContentTypeId } from '@/pages/map/aroundSearch/types';

const isValidTourType = (value: string): value is AroundContentTypeId => {
  return value in TOUR_TYPE;
};

export default isValidTourType;
