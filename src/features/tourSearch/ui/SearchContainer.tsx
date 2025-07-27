import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import {
  SearchForm,
  SearchResult,
  useSearchKeyword,
} from '@/features/tourSearch';

export default function SearchContainer() {
  const { input, debouncedSetInput, onSearch, isTyping } = useSearchKeyword();

  return (
    <div className="relative">
      <SearchForm
        setKeyword={debouncedSetInput}
        defaultValue={input}
        onSearch={onSearch}
      />
      <section className="overflow-y-scroll pb-25 h-screen">
        <ErrorBoundary fallback={<div>검색어를 입력해주세요.</div>}>
          <Suspense fallback={<div>검색 결과를 불러오는 중...</div>}>
            {input !== '' && !isTyping && <SearchResult keyword={input} />}
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  );
}
