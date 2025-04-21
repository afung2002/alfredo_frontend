import { createContext, useContext, useState, ReactNode } from 'react';

// Define the context type
interface AppContextType {
  app: string;
  setApp: React.Dispatch<React.SetStateAction<string>>;
}

// Create the context with a default value
const AppContext = createContext<AppContextType | undefined>(undefined);

// AppProvider component
export const AppProvider = ({ children }: { children: ReactNode }) => {
  const [app, setApp] = useState<string>(''); // Initial app value is an empty string

  const value = {
    app,
    setApp,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

// Custom hook to use the context
export const useAppContext = (): AppContextType => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};
