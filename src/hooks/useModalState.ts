import { useState } from 'react';

type ModalIdentifiers = string[];
type ModalState = Record<string, boolean>;

const useModalState = (modalIdentifiers: ModalIdentifiers) => {
  const initialModalState: ModalState = modalIdentifiers.reduce((acc, modalKey) => {
    acc[modalKey] = false;
    return acc;
  }, {} as ModalState);

  const [modalState, setModalState] = useState(initialModalState);

  const toggleModal = (modalKey: string) => {
    setModalState((prev) => ({ ...prev, [modalKey]: !prev[modalKey] }));
  };

  return { modalState, toggleModal };
};

export default useModalState;
