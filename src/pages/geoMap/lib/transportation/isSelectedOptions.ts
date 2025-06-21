import { useTransportation } from '../../store';
import type { SearchOptions } from '../../types';

export default function isSelectedOptions(targetOption: SearchOptions) {
  const currentOption = useTransportation.getState().searchOptions;
  return currentOption === targetOption;
}
