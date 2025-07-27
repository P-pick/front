import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router-dom';

import { SearchForm, SearchResult } from '@/features/tourSearch';
import { useDebouncedCallback } from '@/shared';

export default function SearchContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyWord, setKeyWord] = useState(searchParams.get('q') ?? '');

  const handleSetKeyword = (keyword: string) => {
    setSearchParams(keyword ? { q: keyword } : {});
    setKeyWord(keyword);
  };
  const debouncedSetKeyword = useDebouncedCallback(handleSetKeyword, 300);

  return (
    <>
      <SearchForm setKeyword={debouncedSetKeyword} defaultValue={keyWord} />
      <section className="overflow-y-scroll pb-25 h-screen">
        <ErrorBoundary fallback={<div>검색어를 입력해주세요.</div>}>
          <Suspense fallback={<div>검색 결과를 불러오는 중...</div>}>
            {keyWord !== '' && <SearchResult keyword={keyWord} />}
          </Suspense>
        </ErrorBoundary>
      </section>
    </>
  );
}
