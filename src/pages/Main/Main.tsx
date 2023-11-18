import { useCallback, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { fetchAnimeList } from 'api/animeService';
import AnimeList from 'components/AnimeList';
import Header from 'components/Header';
import Pagination from 'components/Pagination';
import Search from 'components/Search';
import { useSearchContext } from 'context/SearchContext';
import { PaginationData } from 'resources/Pagination.interface';
import Loader from 'ui/Loader';

function Main() {
  const [searchParams, setSearchParams] = useSearchParams();

  const { animeList, setAnimeList } = useSearchContext();
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
    setLoading(true);
    setError('');
    if (!page || !per) {
      setInitialParams();
    }

    fetchAnimeList(search, page, per).then((data) => {
      if (data.error) {
        setLoading(false);
        setAnimeList([]);
        setError(data.error);
      }
      setAnimeList(data.data);
      setPaginationData(data.pagination);
    });
    setLoading(false);
  }, [page, per, search, setAnimeList, setInitialParams]);

  useEffect(() => {
    setError(null);
    setAnimeList([]);
    updateAnimeList();
  }, [setAnimeList, updateAnimeList]);

  return (
    <main>
      <Header>
        <Search onSearch={updateAnimeList} />
      </Header>
      {paginationData && (
        <Pagination totalPages={paginationData.last_visible_page} />
      )}
      {loading && <Loader />}
      {error && <div>{error}</div>}
      {animeList && <AnimeList data={animeList} />}
      <Outlet />
    </main>
  );
}

export default Main;
