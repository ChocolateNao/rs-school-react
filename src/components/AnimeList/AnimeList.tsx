import AnimeCard from 'components/AnimeCard';
import { IAnime } from 'resources/Anime.interface';

import './AnimeList.css';

interface AnimeListProps {
  data: IAnime[];
}

function AnimeList({ data }: AnimeListProps) {
  return (
    <section className="cards">
      {data.length === 0 ? (
        <div>Nothing was found that satisfies your desires, master</div>
      ) : (
        data.map((item: IAnime) => <AnimeCard key={item.mal_id} anime={item} />)
      )}
    </section>
  );
}

export default AnimeList;
