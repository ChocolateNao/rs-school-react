import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';
import store from 'store/index';

import ErrorBoundary from 'components/ErrorBoundary';
import Header from 'components/Header';

function AppWrapper() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Header>
          <div>Mock child</div>
        </Header>
      </Provider>
    </ErrorBoundary>
  );
}

describe('Header Component', () => {
  it('renders header with title', () => {
    render(<AppWrapper />);

    const titleElement = screen.getByText(/Anime search/i);

    expect(titleElement).toBeInTheDocument();
  });

  it('renders "throw error" button', () => {
    render(<AppWrapper />);

    const buttonElement = screen.getByText(/Throw error/i);

    expect(buttonElement).toBeInTheDocument();
  });

  it('"handleErrorThrow" sets dummyError state to true', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const { getByText } = render(<AppWrapper />);
    fireEvent.click(getByText('Throw error'));
    expect(
      screen.getByText(/Oopsie Woopsie! Something went wrong/i)
    ).toBeInTheDocument();
  });
});
