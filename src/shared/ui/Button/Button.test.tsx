import { fireEvent, render } from '@testing-library/react';

import Button from './Button';

describe('Button Component', () => {
  it('renders the button with correct content', () => {
    const { getByText } = render(<Button onClick={() => {}}>Click me</Button>);

    expect(getByText('Click me')).toBeInTheDocument();
  });

  it('calls the onClick handler when the button is clicked', () => {
    const handleClick = jest.fn();
    const { getByText } = render(
      <Button onClick={handleClick}>Click me</Button>
    );

    fireEvent.click(getByText('Click me'));

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('is accessible', () => {
    const { getByText } = render(<Button onClick={() => {}}>Click me</Button>);
    const button = getByText('Click me');
    expect(button).toHaveAttribute('type', 'button');
  });
});
