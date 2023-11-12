import React from 'react';
import { render } from '@testing-library/react';

import DummyError from '../../components/DummyError/DummyError';
import ErrorFallback from '../../components/ErrorFallback/ErrorFallback';

import ErrorBoundary from './ErrorBoundary';

jest.mock('../../components/ErrorFallback/ErrorFallback', () =>
  jest.fn(() => null)
);

describe('ErrorBoundary Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders children when there is no error', () => {
    const { getByText } = render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    expect(getByText('Child Component')).toBeInTheDocument();
    expect(ErrorFallback).not.toHaveBeenCalled();
  });

  it('renders ErrorFallback when there is an error', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(ErrorBoundary.prototype, 'componentDidCatch');

    const { getByText } = render(
      <ErrorBoundary>
        <div>Child Component</div>
      </ErrorBoundary>
    );

    render(
      <ErrorBoundary>
        <DummyError />
      </ErrorBoundary>
    );

    expect(getByText(/Something went wrong/i)).toBeInTheDocument();
    expect(ErrorFallback).toHaveBeenCalled();

    jest.restoreAllMocks();
  });
});
