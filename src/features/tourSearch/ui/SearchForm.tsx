import { useEffect, useState } from 'react';

import { SearchIcon } from '@/assets/common';

interface SearchFormProps {
  setKeyword: (keyword: string, isSuggestionSelected: boolean) => void;
  defaultValue: string;
  onSearch: () => void;
}

export default function SearchForm({
  setKeyword,
  defaultValue,
  onSearch,
}: SearchFormProps) {
  const [localInput, setLocalInput] = useState(defaultValue);

  useEffect(() => {
    setLocalInput(defaultValue);
  }, [defaultValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalInput(value);
    setKeyword(value, false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onSearch();
    }
  };

  return (
    <form
      className="flex items-center relative mx-3"
      onSubmit={e => {
        e.preventDefault();
        onSearch();
      }}
    >
      <input
        type="text"
        className="rounded-2xl px-4 py-2 w-full pr-10 shadow-lg"
        placeholder="검색어를 입력하세요"
        value={localInput}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        ref={node => {
          if (node) {
            node.focus();
          }
        }}
      />
      <button
        type="submit"
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <SearchIcon className="text-primary-red" />
      </button>
    </form>
  );
}
