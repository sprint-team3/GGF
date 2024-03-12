import { useState } from 'react';

type Identifiers = string[];
type VisibilityState = Record<string, boolean>;

const useMultiState = (identifiers: Identifiers) => {
  const initialVisibilityState: VisibilityState = identifiers.reduce((acc, identifierKey) => {
    acc[identifierKey] = false;
    return acc;
  }, {} as VisibilityState);

  const [multiState, setMultiState] = useState(initialVisibilityState);

  const toggleClick = (identifierKey: string) => {
    setMultiState((prev) => ({ ...prev, [identifierKey]: !prev[identifierKey] }));
  };

  return { multiState, toggleClick };
};

export default useMultiState;
