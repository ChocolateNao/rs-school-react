import { render } from '@testing-library/react';

import DummyError from 'components/DummyError';
import ErrorFallback from 'components/ErrorFallback';

import ErrorBoundary from '../components/ErrorBoundary';

jest.mock('components/ErrorFallback', () =>
  jest.fn(() => 'Mock ErrorFallback')
);

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Mock child</div>
      </ErrorBoundary>
    );

    expect(getByText('Mock child')).toBeInTheDocument();
    expect(ErrorFallback).not.toHaveBeenCalled();
  });

  it('renders ErrorFallback when there is an error', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');

    const { getByText } = render(
      <ErrorBoundary>
        <div>Mock child</div>
        <DummyError />
      </ErrorBoundary>
    );

    expect(ErrorFallback).toHaveBeenCalled();
    expect(getByText(/Mock ErrorFallback/i)).toBeInTheDocument();

    jest.restoreAllMocks();
  });
});
