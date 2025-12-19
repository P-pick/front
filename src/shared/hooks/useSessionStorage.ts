import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * sessionStorage 값을 저장하고 불러오는 커스텀 훅입니다.
 * dispatchEvent를 사용하여 다른 컴포넌트에서 sessionStorage의 변경을 감지할 수 있습니다.
 *
 * @param {string} key - sessionStorage에서 사용할 키
 * @param {T} initialValue - 초기값
 * @returns {[T, (value: T | ((val: T) => T)) => void]} - 저장된 값과 업데이트 함수를 반환합니다.
 *
 * @example
 * //초기값에 의해, 스토리지에 저장된 정보가 없다면 자동으로 값을 저장합니다.
 * const [value, setValue] = useLocalStorage('myKey', 'defaultValue');
 */
export const useSessionStorage = <T>(key: string, initialValue: T) => {
  const readValue = useCallback((): T => {
    try {
      const item = window.sessionStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      throw new Error(`스토리지를 불러오는데 실패했습니다: ${error}`);
    }
  }, [key, initialValue]);

  const [storedValue, setStoredValue] = useState<T>(readValue);
  const sessionStorageEventRef = useRef(new Event('session-storage'));

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.sessionStorage.setItem(key, JSON.stringify(valueToStore));

      window.dispatchEvent(sessionStorageEventRef.current);
    } catch (error) {
      console.error(`Error setting sessionStorage key "${key}":`, error);
    }
  };

  useEffect(() => {
    const handleStorageChange = () => {
      setStoredValue(readValue());
    };

    window.addEventListener('session-storage', handleStorageChange);
    window.addEventListener('storage', handleStorageChange);

    return () => {
      window.removeEventListener('session-storage', handleStorageChange);
      window.removeEventListener('storage', handleStorageChange);
    };
  }, [readValue]);

  return [storedValue, setValue] as const;
};
