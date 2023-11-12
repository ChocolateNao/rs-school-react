import { createContext, ReactNode, useContext, useState } from 'react';

const SearchContext = createContext<string | undefined>(undefined);
interface SearchProviderProps {
  children: ReactNode;
}

function SearchProvider({ children }: SearchProviderProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userInput, setUserInput] = useState<string>(() => {
    const localInput = localStorage.getItem('userInput');
    return localInput || '';
  });

  return (
    <SearchContext.Provider value={userInput}>
      {children}
    </SearchContext.Provider>
  );
}

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (context === undefined) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};

export default SearchProvider;
