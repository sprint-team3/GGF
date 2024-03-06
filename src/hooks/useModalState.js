import { useState } from 'react';

const useModalState = (modalIdentifiers) => {
  const initialModalState = modalIdentifiers.reduce((acc, modalKey) => {
    acc[modalKey] = false;
    return acc;
  }, {});

  const [modalState, setModalState] = useState(initialModalState);

  const toggleModal = (modalKey) => {
    setModalState((prev) => ({ ...prev, [modalKey]: !prev[modalKey] }));
  };

  return { modalState, toggleModal };
};

export default useModalState;
