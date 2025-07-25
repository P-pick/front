import { useState } from 'react';
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
        {keyWord !== '' && <SearchResult keyword={keyWord} key={keyWord} />}
      </ErrorBoundary>
    </>
  );
}
