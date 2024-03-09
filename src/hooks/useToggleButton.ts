import { useState } from 'react';

const useToggleButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const handleToggleClick = () => {
    setIsVisible((prev) => !prev);
  };

  return { isVisible, handleToggleClick };
};

export default useToggleButton;
