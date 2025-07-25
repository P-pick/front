import { tourQueries } from '@/entities/tour';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

interface SearchResultProps {
  keyword: string;
}

export default function SearchResult({ keyword }: SearchResultProps) {
  const { data } = useSuspenseInfiniteQuery(tourQueries.searchKeyWord(keyword));
  const flatData = data.pages.flatMap(page => page.items.item);
  console.log(flatData);
  return <div>{keyword}</div>;
}
