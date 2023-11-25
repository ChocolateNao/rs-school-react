import { Component, ReactNode } from 'react';
import { render } from '@testing-library/react';

import DummyError from '../components/DummyError/DummyError';

interface MockErrorBoundaryProps {
  children: ReactNode;
}

interface MockErrorBoundaryState {
  hasError: boolean;
  errorMsg: string | null;
}

class MockErrorBoundary extends Component<
  MockErrorBoundaryProps,
  MockErrorBoundaryState
> {
  constructor(
    props: MockErrorBoundaryProps | Readonly<MockErrorBoundaryProps>
  ) {
    super(props);
    this.state = { hasError: false, errorMsg: null };
  }

  static getDerivedStateFromError(errorMsg: string) {
    return { hasError: true, errorMsg };
  }

  render() {
    const { hasError, errorMsg } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div>
          {errorMsg ? errorMsg.toString() : 'An unexpected error occurred.'}
        </div>
      );
    }

    return children;
  }
}

describe('DummyError Component', () => {
  it('throws error', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    const { getByText } = render(
      <MockErrorBoundary>
        <DummyError />
      </MockErrorBoundary>
    );

    expect(getByText('Error: Dummy Error!')).toBeInTheDocument();
  });

  it('logs error to the console', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});

    render(
      <MockErrorBoundary>
        <DummyError />
      </MockErrorBoundary>
    );

    expect(console.error).toHaveBeenCalled();

    jest.restoreAllMocks();
  });
});
