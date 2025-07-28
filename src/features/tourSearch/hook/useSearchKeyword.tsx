import { useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useDebouncedCallback } from '@/shared';

export const useSearchKeyword = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [input, setInput] = useState(searchParams.get('q') ?? '');
  const [isTyping, setIsTyping] = useState(true);

  const debouncedSetInput = useDebouncedCallback((val: string) => {
    setInput(val);
    setIsTyping(true);
  }, 300);

  const onSearch = () => {
    setSearchParams({ q: input }, { replace: true });
    setIsTyping(false);
  };

  return {
    input,
    isTyping,
    debouncedSetInput,
    onSearch,
  };
};
