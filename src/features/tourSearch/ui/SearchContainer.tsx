import { Suspense, useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router-dom';

import {
  SearchForm,
  SearchResult,
  SearchSuggestionList,
} from '@/features/tourSearch';
import { useDebouncedCallback } from '@/shared';

export default function SearchContainer() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState(searchParams.get('q') ?? '');
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);
  const [isSearchTriggered, setIsSearchTriggered] = useState(false);

  const debouncedSetInput = useDebouncedCallback(
    (val: string, isSuggestionSelected: boolean) => {
      setInput(val);
      setIsSuggestionSelected(isSuggestionSelected);
      setIsSearchTriggered(false);
    },
    300,
  );

  const handleSuggestionSelect = (suggestion: string) => {
    debouncedSetInput(suggestion, true);
  };

  const applyKeyword = (kw: string) => {
    setSearchParams(kw ? { q: kw } : {}, { replace: true });
    setIsSuggestionSelected(true);
    setIsSearchTriggered(true);
  };

  return (
    <>
      <SearchForm
        setKeyword={debouncedSetInput}
        defaultValue={input}
        onSearch={() => applyKeyword(input)}
      />
      {input !== '' && !isSuggestionSelected && (
        <SearchSuggestionList
          keyword={input}
          onSelect={handleSuggestionSelect}
        />
      )}
      <section className="overflow-y-scroll pb-25 h-screen">
        <ErrorBoundary fallback={<div>검색어를 입력해주세요.</div>}>
          <Suspense fallback={<div>검색 결과를 불러오는 중...</div>}>
            {input !== '' && isSearchTriggered && (
              <SearchResult keyword={input} />
            )}
          </Suspense>
        </ErrorBoundary>
      </section>
    </>
  );
}
