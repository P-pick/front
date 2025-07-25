import { useState } from 'react';

import { SearchIcon } from '@/assets/common';

interface SearchFormProps {
  setKeyword: (keyword: string) => void;
}

export default function SearchForm({ setKeyword }: SearchFormProps) {
  const [localInput, setLocalInput] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setLocalInput(value);
    setKeyword(value);
  };

  return (
    <form className="flex items-center relative mx-3">
      <input
        type="text"
        className=" rounded-2xl px-4 py-2 w-full pr-10 shadow-lg"
        placeholder="검색어를 입력하세요"
        value={localInput}
        onChange={handleChange}
        ref={node => {
          if (node) {
            node.focus();
          }
        }}
      />
      <button
        type="button"
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <SearchIcon className="text-primary-red" />
      </button>
    </form>
  );
}
