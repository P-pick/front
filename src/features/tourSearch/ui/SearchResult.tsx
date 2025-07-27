import { useSuspenseInfiniteQuery } from '@tanstack/react-query';

import { getDistanceFromLatLonInMeters } from '@/features/tourSearch';
import { TourInfoCard } from '@/features/tourList';
import { tourQueries } from '@/entities/tour';
import { getSuspenseLocation, InfiniteScroll } from '@/shared';

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
  const location = getSuspenseLocation();

  return (
    <>
      <ul>
        {flatSearchData.map(item => {
          const newItem = {
            ...item,
            dist: String(
              getDistanceFromLatLonInMeters(
                item.mapx,
                item.mapy,
                location.lng,
                location.lat,
              ),
            ),
          };
          console.log('newItem', newItem);
          return (
            <li key={item.contentid}>
              <TourInfoCard tourInfo={newItem} />
            </li>
          );
        })}
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
