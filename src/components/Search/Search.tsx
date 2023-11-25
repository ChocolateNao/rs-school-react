import { ChangeEvent, KeyboardEvent } from 'react';
import { setUserInput } from 'store/slice';
import { useAppDispatch, useAppSelector } from 'store/types';

import Button from 'ui/Button';

import './Search.css';

function Search() {
  const [, setSearchParams] = useSearchParams();
  const dispatch = useAppDispatch();
  const { userInput } = useAppSelector((state) => state.storeReducer);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserInput(event.target.value));
  };

  const handleSearch = () => {
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
