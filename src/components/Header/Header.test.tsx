import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import ErrorBoundary from 'shared/ErrorBoundary';
import store from 'shared/store';

import Header from '.';

describe('Header Component', () => {
  it('renders header with title', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header>
            <div>Mock child</div>
          </Header>
        </Provider>
      </BrowserRouter>
    );

    const titleElement = screen.getByText(/Anime search/i);

    expect(titleElement).toBeInTheDocument();
  });

  it('renders "throw error" button', () => {
    render(
      <BrowserRouter>
        <Provider store={store}>
          <Header>
            <div>Mock child</div>
          </Header>
        </Provider>
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
          <Provider store={store}>
            <Header>
              <div>Mock child</div>
            </Header>
          </Provider>
        </ErrorBoundary>
      </BrowserRouter>
    );
    fireEvent.click(getByText('Throw error'));
    expect(
      screen.getByText(/Oopsie Woopsie! Something went wrong/i)
    ).toBeInTheDocument();
  });
});
