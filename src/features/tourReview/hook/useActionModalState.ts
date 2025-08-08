import { getAuth } from 'firebase/auth';
import { useState } from 'react';

export const useReviewModalState = () => {
  const auth = getAuth();
  const [isOpen, setIsOpen] = useState(false);

  const handleOpenModal = () => {
    if (!auth.currentUser) {
      alert('로그인이 필요합니다.');
      return;
    }
    setIsOpen(true);
  };

  const handleCloseModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    setIsOpen,
    handleOpenModal,
    handleCloseModal,
  };
};
