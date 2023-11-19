import { BrowserRouter } from 'react-router-dom';
import { fireEvent, render, screen } from '@testing-library/react';

import Pagination from '.';

function PaginationWrapper() {
  return (
    <BrowserRouter>
      <Pagination totalPages={2} />
    </BrowserRouter>
  );
}

describe('Pagination Component', () => {
  it('renders navigation buttons, page information and a way to change quantity of items per page', () => {
    render(<PaginationWrapper />);

    const previousButton = screen.getByText(/Previous/i);
    const nextButton = screen.getByText(/Next/i);
    const pageInfo = screen.getByText(/1 \/ 2/);
    const pageSizeInput = screen.getByPlaceholderText(/1 - 25/i);
    const pageSizeButton = screen.getByText(/Update page size/i);

    expect(previousButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
    expect(pageInfo).toBeInTheDocument();
    expect(pageSizeInput).toBeInTheDocument();
    expect(pageSizeButton).toBeInTheDocument();
  });

  it('updates URL query parameter when page changes', () => {
    render(<PaginationWrapper />);
    const pageSizeButton = screen.getByText(/Update page size/i);
    fireEvent.click(pageSizeButton); // to init query params

    expect(window.location.search).toContain('page=1');

    const nextButton = screen.getByText(/Next/i);
    fireEvent.click(nextButton);

    expect(window.location.search).toContain('page=2');
  });

  it('updates URL query parameter for quantity of items per page', () => {
    render(<PaginationWrapper />);

    expect(window.location.search).toContain('per=25');

    const pageSizeInput = screen.getByPlaceholderText(/1 - 25/i);
    const pageSizeButton = screen.getByText(/Update page size/i);
    fireEvent.change(pageSizeInput, { target: { value: 5 } });
    fireEvent.click(pageSizeButton);

    expect(window.location.search).toContain(
      `per=${pageSizeInput.getAttribute('value')}`
    );
  });
});
