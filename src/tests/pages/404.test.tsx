import { render } from '@testing-library/react';

import NotFoundPage from 'pages/404';

describe('404 Page', () => {
  it('renders the page', () => {
    const { getByText } = render(<NotFoundPage />);

    const message = getByText(/404 - Not Found/i);

    expect(message).toBeInTheDocument();
  });
});
