import { Anime } from '../resources/Anime.interface';

import AnimeCard from './AnimeCard';

import './AnimeList.css';

interface AnimeListProps {
  data: Anime[];
}

function AnimeList({ data }: AnimeListProps) {
  return (
    <section className="cards">
      {data.map((item: Anime) => (
        <AnimeCard key={item.mal_id} anime={item} />
      ))}
    </section>
  );
}

export default AnimeList;
