import { BrowserRouter as Router } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import Search from './Search';

describe('Search Component', () => {
  it('saves the entered value to local storage on Search button click', () => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    render(
      <Router>
        <Search onSearch={() => {}} />
      </Router>
    );

    const searchInput = screen.getByPlaceholderText('Type an anime title');
    userEvent.type(searchInput, 'Naruto');

    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(localStorageMock.setItem).toHaveBeenCalledWith(
      'userInput',
      'Naruto'
    );
  });

  it('retrieves the value from local storage upon mounting', () => {
    const localStorageMock = {
      getItem: jest.fn(() => 'One Piece'),
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    render(
      <Router>
        <Search onSearch={() => {}} />
      </Router>
    );

    const searchInput = screen.getByPlaceholderText(
      'Type an anime title'
    ) as HTMLInputElement;
    expect(searchInput.value).toBe('One Piece');
  });
});
