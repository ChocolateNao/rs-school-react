import { fireEvent, render, screen } from '@testing-library/react';

import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import Header from 'components/Header';

function AppWrapper() {
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Header>
        <div>Mock child</div>
      </Header>
    </ErrorBoundary>
  );
}

describe('Error Fallback Component', () => {
  jest.spyOn(console, 'error').mockImplementation(() => {});
  const { reload } = window.location;

  beforeAll(() => {
    Object.defineProperty(window, 'location', {
      writable: true,
      value: { reload: jest.fn() },
    });
  });

  afterAll(() => {
    window.location.reload = reload;
  });

  it('renders the component', () => {
    render(<ErrorFallback />);

    const element = screen.getByText(/Something went wrong/i);

    expect(element).toBeInTheDocument();
  });

  it('ensures that clicking button reloads the page', () => {
    render(<AppWrapper />);

    const errortButton = screen.getByText(/Throw/i);
    fireEvent.click(errortButton);
    const errorElement = screen.getByText(/Something went wrong/i);
    expect(errorElement).toBeInTheDocument();

    const reloadButton = screen.getByText(/Reload/i);
    fireEvent.click(reloadButton);
    expect(window.location.reload).toHaveBeenCalled();
  });
});
