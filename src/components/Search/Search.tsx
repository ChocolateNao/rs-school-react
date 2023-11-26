import { ChangeEvent, KeyboardEvent, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/redux';
import useUpdateQueryParams from 'hooks/useUpdateQueryParams';
import { useRouter } from 'next/router';
import { setUserInput } from 'store/slice';

import Button from 'ui/Button';

import styles from './Search.module.css';

function Search() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { userInput } = useAppSelector((state) => state.storeReducer);
  const { updateQueryParams } = useUpdateQueryParams();

  const setInitialQueryInput = () => {
    const searchQuery = router.query.search;
    if (!searchQuery) {
      const searchLocal = localStorage.getItem('userInput') as string;
      dispatch(setUserInput(searchLocal));
      updateQueryParams({ search: searchLocal });
    } else {
      localStorage.setItem('userInput', String(searchQuery));
      dispatch(setUserInput(searchQuery));
    }
  };

  useEffect(() => {
    setInitialQueryInput();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.query.search]);

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    dispatch(setUserInput(event.target.value));
  };

  const handleSearch = () => {
    if (localStorage.getItem('userInput') !== userInput) {
      localStorage.setItem('userInput', userInput);
    }
    updateQueryParams({ search: userInput });
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <section className={styles.search}>
      <input
        className={styles.search__input}
        type="text"
        placeholder="Type an anime title"
        value={userInput}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
      <Button className={styles.search__btn} onClick={handleSearch}>
        Search
      </Button>
    </section>
  );
}

export default Search;
