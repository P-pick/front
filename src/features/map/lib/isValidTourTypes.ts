import { TOUR_TYPE } from '@/entities/tour';

import { type AroundContentTypeId } from '@/entities/tour';

const isValidTourType = (value: unknown): value is AroundContentTypeId => {
  return typeof value === 'string' && value in TOUR_TYPE;
};

export default isValidTourType;
