import { tourQueries } from '@/entities/tour';
import { TourInfoCard } from '@/features/tourList';
import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

interface SearchResultProps {
  keyword: string;
}

export default function SearchResult({ keyword }: SearchResultProps) {
  const { data: searchData } = useSuspenseInfiniteQuery(
    tourQueries.searchKeyWord(keyword),
  );
  const filterSearchData = searchData.pages.filter(data => data.items);
  const flatSearchData = filterSearchData.flatMap(page => page.items.item);
  console.log(flatSearchData);

  return (
    <div>
      {flatSearchData.map(item => (
        <TourInfoCard key={item.contentid} tourInfo={item} />
      ))}
    </div>
  );
}
