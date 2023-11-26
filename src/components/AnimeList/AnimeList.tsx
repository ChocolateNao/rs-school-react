import { useAppSelector } from 'hooks/redux';

import AnimeCard from 'components/AnimeCard';
import Loader from 'components/ui/Loader';
import { IAnime } from 'models/Anime.interface';

import styles from './AnimeList.module.css';

interface AnimeListProps {
  data: IAnime[];
}

function AnimeList({ data }: AnimeListProps) {
  const { isLoadingMainPage } = useAppSelector((state) => state.storeReducer);
  return (
    // eslint-disable-next-line react/jsx-no-useless-fragment
    <>
      {isLoadingMainPage ? (
        <Loader />
      ) : (
        <section className={styles.cards}>
          {data.length === 0 ? (
            <div>Nothing was found that satisfies your desires, master</div>
          ) : (
            data.map((item: IAnime) => (
              <AnimeCard key={item.mal_id} anime={item} />
            ))
          )}
        </section>
      )}
    </>
  );
}

export default AnimeList;
