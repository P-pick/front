import { TOUR_TYPE } from '@/entities/tour';

import { type AroundContentTypeId } from '@/entities/tour';

const isValidTourType = (value: string): value is AroundContentTypeId => {
  return value in TOUR_TYPE;
};

export default isValidTourType;
