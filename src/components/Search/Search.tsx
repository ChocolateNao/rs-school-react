import { ChangeEvent, KeyboardEvent } from 'react';
import { useSearchParams } from 'react-router-dom';

import { useSearchContext } from 'context/SearchContext';
import Button from 'ui/Button';

import './Search.css';

interface SearchProps {
  onSearch: (input: string) => void;
}

function Search({ onSearch }: SearchProps) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [searchParams, setSearchParams] = useSearchParams();
  const { userInput, setUserInput } = useSearchContext();

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUserInput(event.target.value);
  };

  const handleSearch = () => {
    onSearch(userInput);
    if (localStorage.getItem('userInput') !== userInput) {
      localStorage.setItem('userInput', userInput);
    }
    setSearchParams((params) => {
      if (userInput) {
        params.set('search', userInput);
      } else {
        params.delete('search');
      }
      params.set('page', '1');

      return params;
    });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Type an anime title"
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button className="search__btn" onClick={handleSearch}>
        Search
      </Button>
    </section>
  );
}

export default Search;
