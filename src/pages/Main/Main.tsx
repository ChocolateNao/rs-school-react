import { useCallback, useEffect, useState } from 'react';
import { Outlet, useSearchParams } from 'react-router-dom';

import { fetchAnimeList } from '../../api/fetchCalls';
import AnimeList from '../../components/AnimeList/AnimeList';
import Header from '../../components/Header/Header';
import Loading from '../../components/Loading/Loading';
import Pagination from '../../components/Pagination/Pagination';
import Search from '../../components/Search/Search';
import { IAnime } from '../../resources/Anime.interface';
import { PaginationData } from '../../resources/Pagination.interface';

function Main() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [data, setData] = useState<IAnime[]>([]);
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
        setData([]);
        setError(data.error);
      }
      setData(data.data);
      setPaginationData(data.pagination);
    });
    setLoading(false);
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
