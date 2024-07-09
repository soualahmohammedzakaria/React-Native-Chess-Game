import React, { createContext, useState, ReactNode } from 'react';

interface SettingsContextType {
  isSoundEnabled: boolean;
  setIsSoundEnabled: React.Dispatch<React.SetStateAction<boolean>>;
  isFlipPiecesEnabled: boolean;
  setIsFlipPiecesEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);
  const [isFlipPiecesEnabled, setIsFlipPiecesEnabled] = useState(false);

  return (
    <SettingsContext.Provider value={{ isSoundEnabled, setIsSoundEnabled, isFlipPiecesEnabled, setIsFlipPiecesEnabled }}>
      {children}
    </SettingsContext.Provider>
  );
};