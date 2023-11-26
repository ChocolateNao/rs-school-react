import { fireEvent, render, screen } from '@testing-library/react';
import mockRouter from 'next-router-mock';

import Pagination from 'components/Pagination';

jest.mock('next/router', () => jest.requireActual('next-router-mock'));

function AppWrapper() {
  return <Pagination totalPages={2} />;
}

describe('Pagination Component', () => {
  it('renders navigation buttons, page information and a way to change quantity of items per page', () => {
    render(<AppWrapper />);

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
    render(<AppWrapper />);
    const pageSizeButton = screen.getByText(/Update page size/i);
    fireEvent.click(pageSizeButton); // to init query params

    expect(mockRouter.query.page).toContain('1');

    const nextButton = screen.getByText(/Next/i);
    const prevButton = screen.getByText(/Prev/i);

    fireEvent.click(nextButton);
    expect(mockRouter.query.page).toContain('2');

    fireEvent.click(prevButton);
    expect(mockRouter.query.page).toContain('1');
  });

  it('updates URL query parameter for quantity of items per page', () => {
    render(<AppWrapper />);

    expect(mockRouter.query.per).toContain('25');

    const pageSizeInput = screen.getByPlaceholderText(/1 - 25/i);
    const pageSizeButton = screen.getByText(/Update page size/i);
    fireEvent.change(pageSizeInput, { target: { value: 5 } });
    fireEvent.click(pageSizeButton);

    expect(mockRouter.query.per).toContain(pageSizeInput.getAttribute('value'));
  });

  it('does not allow page size to exceed max value', () => {
    render(<AppWrapper />);

    expect(mockRouter.query.per).toContain('5');

    const pageSizeInput = screen.getByPlaceholderText(/1 - 25/i);
    const pageSizeButton = screen.getByText(/Update page size/i);

    fireEvent.change(pageSizeInput, { target: { value: 6 } });
    fireEvent.click(pageSizeButton);
    expect(mockRouter.query.per).toContain(pageSizeInput.getAttribute('value'));

    fireEvent.change(pageSizeInput, { target: { value: 50 } });
    fireEvent.click(pageSizeButton);
    expect(mockRouter.query.per).toContain('25');
  });

  it('does not allow page number to set value below one', () => {
    render(<AppWrapper />);

    expect(mockRouter.query.page).toContain('1');

    const prevButton = screen.getByText(/Prev/i);
    fireEvent.click(prevButton);
    expect(mockRouter.query.page).toContain('1');
  });
});
