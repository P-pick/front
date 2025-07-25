import type { AroundContentTypeId } from '@/entities/tour';
import { TOUR_TYPE } from '@/pages/const/MARKER';

const isValidTourType = (value: string): value is AroundContentTypeId => {
  return value in TOUR_TYPE;
};

export default isValidTourType;
