import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import { SearchForm, SearchResult } from '@/features/tourSearch';
import { useDebouncedCallback } from '@/shared';

export default function SearchContainer() {
  const [keyWord, setKeyWord] = useState('');
  const debouncedSetKeyword = useDebouncedCallback(setKeyWord, 300);

  return (
    <>
      <SearchForm setKeyword={debouncedSetKeyword} />
      <ErrorBoundary fallback={<div>검색어를 입력해주세요.</div>}>
        <Suspense fallback={<div>검색 결과를 불러오는 중...</div>}>
          {keyWord !== '' && <SearchResult keyword={keyWord} />}
        </Suspense>
      </ErrorBoundary>
    </>
  );
}
