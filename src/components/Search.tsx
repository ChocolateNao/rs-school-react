import React, { Component, ChangeEvent } from 'react';
import Button from './Button';
import './Search.css';

interface SearchProps {
  userInput: string;
  onInputChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onButtonClick: () => void;
}

interface SearchState {
  dummyError: boolean;
}

class Search extends Component<SearchProps, SearchState> {
  handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    const { onButtonClick } = this.props;
    if (event.key === 'Enter') {
      onButtonClick();
    }
  };

  render() {
    const { userInput, onInputChange, onButtonClick } = this.props;
    return (
      <section className="search">
        <input
          className="search__input"
          type="text"
          placeholder="Type a character name"
          value={userInput}
          onChange={onInputChange}
          onKeyDown={this.handleKeyDown}
        />
        <Button onClick={onButtonClick}>Search</Button>
      </section>
    );
  }
}

export default Search;
