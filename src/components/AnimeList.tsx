import { IAnime } from '../resources/Anime.interface';

import AnimeCard from './AnimeCard';

import './AnimeList.css';

interface AnimeListProps {
  data: IAnime[];
}

function AnimeList({ data }: AnimeListProps) {
  return (
    <section className="cards">
      {data.map((item: IAnime) => (
        <AnimeCard key={item.mal_id} anime={item} />
      ))}
    </section>
  );
}

export default AnimeList;
