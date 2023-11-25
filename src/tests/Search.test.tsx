import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import store from 'store/index';

import Search from 'components/Search';

function SearchWrapper() {
  return (
    <Provider store={store}>
      <Search />
    </Provider>
  );
}

describe('Search Component', () => {
  it('saves the entered value to local storage on "Search" button click', () => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    render(<SearchWrapper />);

    const searchInput = screen.getByPlaceholderText('Type an anime title');
    fireEvent.change(searchInput, { target: { value: 'One Piece' } });
    const searchButton = screen.getByText('Search');
    fireEvent.click(searchButton);

    expect(localStorage.setItem).toHaveBeenCalledWith('userInput', 'One Piece');
  });

  it('retrieves the value from local storage on mounting', () => {
    const localStorageMock = {
      getItem: jest.fn(),
      setItem: jest.fn(),
    };
    Object.defineProperty(window, 'localStorage', { value: localStorageMock });

    render(<SearchWrapper />);

    const searchInput = screen.getByPlaceholderText(
      'Type an anime title'
    ) as HTMLInputElement;
    expect(searchInput.value).toBe('One Piece');
  });
});
