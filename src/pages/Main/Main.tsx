import { Outlet, useSearchParams } from 'react-router-dom';

import AnimeList from 'components/AnimeList';
import Header from 'components/Header';
import Pagination from 'components/Pagination';
import Search from 'components/Search';
import { useFetchAnimeList } from 'shared/store/jikanApi';
import { setAnimeList, setPagination } from 'shared/store/slice';
import { useAppDispatch, useAppSelector } from 'shared/store/types';
import Loader from 'ui/Loader';

function Main() {
  const dispatch = useAppDispatch();
  const { errorMessage, pagination, animeList } = useAppSelector(
    (state) => state.storeReducer
  );

  const [searchParams] = useSearchParams();

  const search =
    searchParams.get('search') || localStorage.getItem('userInput');
  const page = searchParams.get('page');
  const per = searchParams.get('per');

  const querystring = `${search ? `?q=${search.trim()}` : '?q='}${
    page ? `&page=${page}` : ''
  }${per ? `&limit=${per}` : ''}`;

  const { data, isLoading } = useFetchAnimeList(querystring);

  dispatch(setAnimeList(data?.data));
  dispatch(setPagination(data?.pagination));

  return (
    <main>
      <Header>
        <Search />
      </Header>
      {pagination && (
        <Pagination
          totalPages={
            pagination.last_visible_page ? pagination.last_visible_page : 1
          }
        />
      )}
      {isLoading && <Loader />}
      {errorMessage && <div>{errorMessage}</div>}
      {data && <AnimeList data={animeList} />}
      <Outlet />
    </main>
  );
}

export default Main;
