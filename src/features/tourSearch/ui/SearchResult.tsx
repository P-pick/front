import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { TourInfoCard } from '@/features/tourList';
import { tourQueries } from '@/entities/tour';
import { InfiniteScroll } from '@/shared';

interface SearchResultProps {
  keyword: string;
}

export default function SearchResult({ keyword }: SearchResultProps) {
  const {
    data: searchData,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useSuspenseInfiniteQuery(tourQueries.searchKeyWord(keyword));
  const filterSearchData = searchData.pages.filter(data => data.items);
  const flatSearchData = filterSearchData.flatMap(page => page.items.item);

  return (
    <>
      <ul>
        {flatSearchData.map(item => (
          <li key={item.contentid}>
            <TourInfoCard tourInfo={item} />
          </li>
        ))}
      </ul>
      <InfiniteScroll
        hasNextPage={hasNextPage}
        isFetching={isFetchingNextPage}
        onIntersect={fetchNextPage}
        triggerClassName="h-2"
        LoadingComponent={<div className="text-center">Loading...</div>}
      />
    </>
  );
}
