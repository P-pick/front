import type { AroundContentTypeId } from '@/pages/types';
import { TouristContentsTypeFilter } from '@/shared/ui';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

export default function TouristFilterQueryUpdater() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [contentTypeId, setContentTypeId] = useState<AroundContentTypeId>(
    searchParams.get('tour-type') as AroundContentTypeId,
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
