import { useCallback, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { Anime } from '../resources/Anime.interface';
import { PaginationData } from '../resources/Pagination.interface';

import AnimeList from './AnimeList';
import Header from './Header';
import Loading from './Loading';
import Pagination from './Pagination';
import Search from './Search';

function Main() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState<Anime[]>([]);
  const [paginationData, setPaginationData] = useState<PaginationData>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const search =
    searchParams.get('search') || localStorage.getItem('userInput');
  const page = searchParams.get('page');
  const per = searchParams.get('per');

  const setInitialParams = useCallback(() => {
    setSearchParams({
      page: page || '1',
      per: per || '25',
    });
  }, [page, per, setSearchParams]);

  const updateAnimeList = useCallback(() => {
    if (!page || !per) {
      setInitialParams();
    }

    const fetchData = (
      query: string | null,
      page?: string | null,
      limit?: string | null
    ) => {
      setLoading(true);
      fetch(
        `https://api.jikan.moe/v4/anime${query ? `?q=${query.trim()}` : '?q='}${
          page ? `&page=${page}` : ''
        }${limit ? `&limit=${limit}` : ''}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (!data.data || data.data.length === 0) {
            setError('Nothing was found that satisfies your desires, master.');
          }
          if (data.error) {
            setLoading(false);
            setData([]);
            setError(data.error);
            return;
          }
          setData(data.data);
          setPaginationData(data.pagination);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          setError(error.message);
        });
    };
    fetchData(search, page, per);
  }, [page, per, search, setInitialParams]);

  useEffect(() => {
    setError(null);
    setData([]);
    updateAnimeList();
  }, [updateAnimeList]);

  return (
    <main>
      <Header>
        <Search onSearch={updateAnimeList} />
      </Header>
      {paginationData && (
        <Pagination totalPages={paginationData.last_visible_page} />
      )}
      {loading && <Loading />}
      {error && <div>{error}</div>}
      {data && <AnimeList data={data} />}
      <Outlet />
    </main>
  );
}

export default Main;
