import type { AroundContentTypeId } from '@/entities/tour';

export type GetSelectedPinDetailRequest = {
  contentId: string | null;
  contentTypeId: AroundContentTypeId;
};
