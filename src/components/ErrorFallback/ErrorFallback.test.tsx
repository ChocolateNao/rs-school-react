import { render, screen } from '@testing-library/react';

import ErrorFallback from './ErrorFallback';

describe('Error Fallback Component', () => {
  it('renders the component', () => {
    render(<ErrorFallback />);
    const element = screen.getByText(/Something went wrong/i);
    expect(element).toBeInTheDocument();
  });
});
