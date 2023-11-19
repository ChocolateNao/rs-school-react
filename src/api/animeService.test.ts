import { fetchAnimeById, fetchAnimeList } from './animeService';

describe('Anime Service', () => {
  it('fetches anime details by id', async () => {
    const mockData = { mal_id: 1, title: 'Cowboy Bebop' };
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve({ data: mockData }),
      })
    );

    const animeDetails = await fetchAnimeById('1');

    expect(animeDetails).toEqual(mockData);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.jikan.moe/v4/anime/1'
    );
  });

  it('fetches anime list based on query, page, and limit', async () => {
    const mockListData = [
      { mal_id: 1, title: 'Cowboy Bebop' },
      { mal_id: 51235, title: 'Deko Boko Friends 2' },
    ];
    const query = 'CowboyBebop';
    const page = '1';
    const limit = '10';

    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        status: 200,
        json: () => Promise.resolve(mockListData),
      })
    );

    const animeList = await fetchAnimeList(query, page, limit);

    expect(animeList).toEqual(mockListData);
    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.jikan.moe/v4/anime?q=CowboyBebop&page=1&limit=10'
    );
  });
});
