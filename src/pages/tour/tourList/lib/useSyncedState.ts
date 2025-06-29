import { useEffect, useState } from 'react';

const useSyncedState = <T>(
  externalValue: T
): [T, React.Dispatch<React.SetStateAction<T>>] => {
  const [localValue, setLocalValue] = useState(externalValue);

  useEffect(() => {
    setLocalValue(externalValue);
  }, [externalValue]);

  return [localValue, setLocalValue];
};

export default useSyncedState;
