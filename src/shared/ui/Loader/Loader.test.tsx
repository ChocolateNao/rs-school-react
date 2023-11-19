import { render } from '@testing-library/react';

import Loader from '.';

describe('Loader Component', () => {
  it('renders the component', () => {
    const { container } = render(<Loader />);

    expect(container.firstChild).toHaveClass('loading');
  });
});
