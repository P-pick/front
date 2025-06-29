import { TouristContentsTypeFilter } from '@/components';
import type { AroundContentTypeId } from '@/pages/map/aroundSearch/types';
import { useEffect, useState, type TransitionStartFunction } from 'react';
import { useSearchParams } from 'react-router-dom';

interface TouristFilterQueryUpdaterProps {
  startTransition: TransitionStartFunction;
}
export default function TouristFilterQueryUpdater() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [contentTypeId, setContentTypeId] = useState<AroundContentTypeId>(
    searchParams.get('tour-type') as AroundContentTypeId
  );

  useEffect(() => {
    searchParams.set('tour-type', contentTypeId);
    setSearchParams(searchParams, { replace: true });
  }, [contentTypeId]);

  return (
    <>
      <TouristContentsTypeFilter
        contentTypeId={contentTypeId}
        setContentTypeId={setContentTypeId}
      />
    </>
  );
}
