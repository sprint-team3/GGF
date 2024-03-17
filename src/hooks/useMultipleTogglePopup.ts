import { RefObject, useEffect, useRef, useState } from 'react';

type TogglePopupResult = {
  isOpen: boolean;
  popupRef: RefObject<HTMLDivElement>;
  buttonRef: RefObject<HTMLButtonElement>;
  togglePopup: () => void;
};

const useMultipleTogglePopup = (count: number): TogglePopupResult[] => {
  const CreateTogglePopup = (): TogglePopupResult => {
    const [isOpen, setIsOpen] = useState(false);
    const popupRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (
          isOpen &&
          popupRef.current &&
          !popupRef.current.contains(event.target as Node) &&
          buttonRef.current &&
          !buttonRef.current.contains(event.target as Node)
        ) {
          setIsOpen(false);
        }
      };

      if (isOpen) {
        window.addEventListener('mousedown', handleClickOutside);
      } else {
        window.removeEventListener('mousedown', handleClickOutside);
      }

      return () => {
        window.removeEventListener('mousedown', handleClickOutside);
      };
    }, [isOpen]);

    const togglePopup = () => {
      setIsOpen((prev) => !prev);
    };

    return { isOpen, popupRef, buttonRef, togglePopup };
  };

  const multipleTogglePopupResults: TogglePopupResult[] = [];

  for (let i = 0; i < count; i++) {
    multipleTogglePopupResults.push(CreateTogglePopup());
  }

  return multipleTogglePopupResults;
};

export default useMultipleTogglePopup;
