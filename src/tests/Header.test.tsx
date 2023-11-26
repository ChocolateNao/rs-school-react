import { Provider } from 'react-redux';
import { fireEvent, render, screen } from '@testing-library/react';

import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import Header from 'components/Header';

import mockStore from './mock/reduxStoreMock';

function AppWrapper() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Provider store={mockStore}>
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
