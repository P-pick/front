import { useTransportationStore } from '@/features/navigate';

import type { SearchOptions } from '@/entities/navigate';

export default function isSelectedOptions(targetOption: SearchOptions) {
  const currentOption = useTransportationStore.getState().searchOptions;
  return currentOption === targetOption;
}
