import { ChangeEvent, KeyboardEvent } from 'react';

import Button from './Button';

import './Search.css';

interface SearchProps {
  userInput: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
}

function Search({ userInput, onInputChange, onButtonClick }: SearchProps) {
  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onButtonClick();
    }
  };

  return (
    <section className="search">
      <input
        className="search__input"
        type="text"
        placeholder="Type a character name"
        value={userInput}
        onChange={onInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button className="search__btn" onClick={onButtonClick}>
        Search
      </Button>
    </section>
  );
}

export default Search;
