import { render, screen } from '@testing-library/react';

import NotFound from '../components/NotFound';

describe('NotFound Component', () => {
  it('renders Not Found page', () => {
    render(<NotFound />);

    const headingElement = screen.getByText(/404 - Not Found/i);

    expect(headingElement).toBeInTheDocument();
  });

  it('displays link to return to home page', () => {
    render(<NotFound />);

    const linkElement = screen.getByRole('link', {
      name: /return to home page/i,
    });

    expect(linkElement).toBeInTheDocument();
  });
});
