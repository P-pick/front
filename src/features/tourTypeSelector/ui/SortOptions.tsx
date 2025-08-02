import { SORT_OPTIONS } from '@/features/tourTypeSelector';
import type { SortOption } from '@/features/tourTypeSelector/type';

import type { Dispatch } from 'react';

interface SortOptionsProps {
  selected: SortOption;
  setSelected: Dispatch<
    React.SetStateAction<'distance' | 'popularity' | 'latest'>
  >;
}
export default function SortOptions({
  selected,
  setSelected,
}: SortOptionsProps) {
  return (
    <div className="flex gap-6">
      {SORT_OPTIONS.map(option => (
        <label
          key={option.value}
          className="flex items-center gap-1 cursor-pointer"
        >
          <input
            type="radio"
            name="sort"
            value={option.value}
            checked={selected === option.value}
            onChange={() => setSelected(option.value)}
          />
          <span className="text-sm text-black">{option.label}</span>
        </label>
      ))}
    </div>
  );
}
