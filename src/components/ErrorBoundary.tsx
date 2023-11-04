import { Component, ErrorInfo } from 'react';
import './ErrorBoundary.css';
import Button from './Button';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('ErrorBoundary caught an error: ', error, errorInfo);
    this.setState({ hasError: true });
  }

  render() {
    const { hasError } = this.state;
    const { children } = this.props;

    if (hasError) {
      return (
        <div className="errorboundary">
          <h1 className="errorboundary__header">
            Oopsie Woopsie! Something went wrong.
          </h1>
          <p className="errorboundary__text">
            You can try to refresh the page or simply click the button here that
            will do it for you.
          </p>
          <Button onClick={() => window.location.reload()}>Reload page</Button>
        </div>
      );
    }

    return children;
  }
}

export default ErrorBoundary;
