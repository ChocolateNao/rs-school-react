import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import SearchProvider from 'shared/context/SearchContext';
import ErrorBoundary from 'shared/ErrorBoundary';

import Header from './Header';

describe('Header Component', () => {
  it('renders header with title', () => {
    render(
      <BrowserRouter>
        <SearchProvider>
          <Header>
            <div>Mock child</div>
          </Header>
        </SearchProvider>
      </BrowserRouter>
    );

    const titleElement = screen.getByText(/Anime search/i);

    expect(titleElement).toBeInTheDocument();
  });

  it('renders "throw error" button', () => {
    render(
      <BrowserRouter>
        <SearchProvider>
          <Header>
            <div>Mock child</div>
          </Header>
        </SearchProvider>
      </BrowserRouter>
    );

    const buttonElement = screen.getByText(/Throw error/i);

    expect(buttonElement).toBeInTheDocument();
  });

  it('"handleErrorThrow" sets dummyError state to true', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const { getByText } = render(
      <BrowserRouter>
        <ErrorBoundary>
          <SearchProvider>
            <Header>
              <div>Mock child</div>
            </Header>
          </SearchProvider>
        </ErrorBoundary>
      </BrowserRouter>
    );
    fireEvent.click(getByText('Throw error'));
    expect(
      screen.getByText(/Oopsie Woopsie! Something went wrong/i)
    ).toBeInTheDocument();
  });
});
