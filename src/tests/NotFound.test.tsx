import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import NotFound from '../components/NotFound';

function MockRoutes() {
  return (
    <MemoryRouter initialEntries={['/not-existing-route']}>
      <Routes>
        <Route path="/" element={<div>Mock Home</div>} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </MemoryRouter>
  );
}

describe('NotFound Component', () => {
  it('renders Not Found page', () => {
    render(<MockRoutes />);

    const headingElement = screen.getByText(/404 - Not Found/i);

    expect(headingElement).toBeInTheDocument();
  });

  it('displays link to return to home page', () => {
    render(<MockRoutes />);

    const linkElement = screen.getByRole('link', {
      name: /return to home page/i,
    });

    expect(linkElement).toBeInTheDocument();
  });

  it('navigates to home page when link is clicked', () => {
    const { container } = render(<MockRoutes />);

    fireEvent.click(screen.getByRole('link', { name: /return to home page/i }));

    expect(container.innerHTML).not.toContain('404 - Not Found');
  });
});
