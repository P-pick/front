import {
  useQueryClient,
  useSuspenseInfiniteQuery,
} from '@tanstack/react-query';

import { getDistanceFromLatLonInMeters } from '@/features/tourSearch';
import { TourInfoCard } from '@/features/tourList';
import { tourQueries } from '@/entities/tour';
import { authOptions } from '@/entities/auth';
import { getSuspenseLocation, InfiniteScroll, LoadingSpinner } from '@/shared';

interface SearchResultProps {
  keyword: string;
}

export default function SearchResult({ keyword }: SearchResultProps) {
  const queryClient = useQueryClient();
  
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
        LoadingComponent={<LoadingSpinner />}
      />
    </>
  );
}
