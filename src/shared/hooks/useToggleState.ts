import { useState } from 'react';

/**
 * useToggleState
 * @description true와 false로 구분되는 토글의 상태를 관리하는 훅입니다.
 *
 * @return { isToggle: boolean, toggle: () => void, enable: () => void, disable: () => void }
 */
export const useToggleState = () => {
  const [isToggle, setIsToggle] = useState(false);

  const toggle = () => {
    setIsToggle(prev => !prev);
  };

  const enable = () => {
    setIsToggle(true);
  };

  const disable = () => {
    setIsToggle(false);
  };

  return { isToggle, setIsToggle, toggle, enable, disable };
};
