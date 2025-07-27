import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { highlightKeyword } from '@/features/tourSearch';
import { tourQueries } from '@/entities/tour';
import { TourTypeBadge } from '@/shared';

interface SearchSuggestionListProps {
  keyword: string;
  onSelect: (suggestion: string) => void;
}

export default function SearchSuggestionList({
  keyword,
  onSelect,
}: SearchSuggestionListProps) {
  const { data: searchData } = useSuspenseInfiniteQuery(
    tourQueries.searchKeyWord(keyword),
  );
  const filterData = searchData.pages.filter(data => data.items);
  const flatData = filterData.flatMap(page => page.items.item);
  const data = flatData.map(item => ({
    title: item.title,
    contentTypeId: item.contenttypeid,
  }));

  if (data.length === 0) return null;

  return (
    <ul className="absolute z-10 bg-white border w-full mt-1 rounded shadow">
      {data.map((suggestion, index) => (
        <li
          key={index}
          className="px-4 py-2 cursor-pointer hover:bg-gray-100 text-sm"
          onClick={() => onSelect(suggestion.title)}
        >
          {highlightKeyword(suggestion.title, keyword)}
          <TourTypeBadge contenttypeid={suggestion.contentTypeId} />
        </li>
      ))}
    </ul>
  );
}
