import type { SearchOptions } from '@/entities/navigate';
import { useTransportationStore } from '@/features/navigate';

export default function isSelectedOptions(targetOption: SearchOptions) {
  const currentOption = useTransportationStore.getState().searchOptions;
  return currentOption === targetOption;
}
