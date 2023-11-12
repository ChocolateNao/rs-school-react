import { createContext, ReactNode, useContext, useState } from 'react';

import { IAnime } from '../../resources/Anime.interface';
import { IAnimeDetails } from '../../resources/AnimeDetails.interface';

interface SearchContextProps {
  children: ReactNode;
}

interface SearchContextValue {
  userInput: string;
  setUserInput: (value: string) => void;
  animeList: IAnime[];
  setAnimeList: (results: IAnime[]) => void;
  animeDetails: IAnimeDetails | undefined;
  setAnimeDetails: (results: IAnimeDetails) => void;
}

const SearchContext = createContext<SearchContextValue | undefined>(undefined);

export default function SearchProvider({ children }: SearchContextProps) {
  const [userInput, setUserInput] = useState<string>(() => {
    const localInput = localStorage.getItem('userInput');
    return localInput || '';
  });
  const [animeList, setAnimeList] = useState<IAnime[]>([]);
  const [animeDetails, setAnimeDetails] = useState<IAnimeDetails | undefined>(
    undefined
  );

  return (
    <SearchContext.Provider
      // eslint-disable-next-line react/jsx-no-constructed-context-values
      value={{
        userInput,
        setUserInput,
        animeList,
        setAnimeList,
        animeDetails,
        setAnimeDetails,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
}

export const useSearchContext = (): SearchContextValue => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearchContext must be used within a SearchProvider');
  }
  return context;
};
