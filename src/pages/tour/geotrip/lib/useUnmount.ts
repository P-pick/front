import { useEffect } from 'react';

const useUnmount = (callback: () => void) => {
  useEffect(() => {
    return () => {
      callback();
    };
  }, []);
};

export default useUnmount;
