import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router-dom';

import { SearchForm, SearchResult } from '@/features/tourSearch';
import { useDebouncedCallback } from '@/shared';

export default function SearchContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const keyword = searchParams.get('q') ?? '';

  const debouncedSetKeyword = useDebouncedCallback((kw: string) => {
    setSearchParams(kw ? { q: kw } : {}, { replace: true });
  }, 300);

  return (
    <>
      <SearchForm setKeyword={debouncedSetKeyword} defaultValue={keyword} />
      <section className="overflow-y-scroll pb-25 h-screen">
        <ErrorBoundary fallback={<div>검색어를 입력해주세요.</div>}>
          <Suspense fallback={<div>검색 결과를 불러오는 중...</div>}>
            {keyword !== '' && <SearchResult keyword={keyword} />}
          </Suspense>
        </ErrorBoundary>
      </section>
    </>
  );
}
