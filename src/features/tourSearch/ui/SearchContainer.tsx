import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import {
  SearchForm,
  SearchResult,
  useSearchKeyword,
} from '@/features/tourSearch';
import { SkeletonCard } from '@/features/tour';
import { FALLBACK_LIST } from '@/features/tourList';

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
          <Suspense
            fallback={FALLBACK_LIST.map(item => (
              <div className="p-2" key={item}>
                <SkeletonCard />
              </div>
            ))}
          >
            {!isTyping && <SearchResult keyword={input} />}
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  );
}
