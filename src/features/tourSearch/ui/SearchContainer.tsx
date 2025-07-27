import { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

import {
  SearchForm,
  SearchResult,
  useSearchKeyword,
} from '@/features/tourSearch';
import { SkeletonCard } from '@/features/tour/ui';
const fallbackList = [1, 2, 3, 4, 5];

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
            fallback={fallbackList.map(item => (
              <div className="p-2" key={item}>
                <SkeletonCard />
              </div>
            ))}
          >
            {input !== '' && !isTyping && <SearchResult keyword={input} />}
          </Suspense>
        </ErrorBoundary>
      </section>
    </div>
  );
}
