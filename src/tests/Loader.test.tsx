import { render } from '@testing-library/react';

import Loader from 'ui/Loader';

describe('Loader Component', () => {
  it('renders the component', () => {
    const { container } = render(<Loader />);

    expect(container.firstChild).toHaveClass('loading');
  });
});
