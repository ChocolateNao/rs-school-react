import { MemoryRouter } from 'react-router-dom';
import { render } from '@testing-library/react';

import App from './App';

const mockData = { mal_id: 1, title: 'Cowboy Bebop' };
global.fetch = jest.fn().mockImplementation(() =>
  Promise.resolve({
    status: 200,
    json: () => Promise.resolve({ data: mockData }),
  })
);

describe('App Component', () => {
  it('renders App component', () => {
    jest.spyOn(console, 'error').mockImplementation(() => {});
    jest.spyOn(console, 'warn').mockImplementation(() => {});
    const { getByText } = render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );

    const textElement = getByText('Anime search');

    expect(textElement).toBeInTheDocument();
  });
});
