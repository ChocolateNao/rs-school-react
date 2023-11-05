import { Anime } from '../resources/Anime.interface';

import AnimeCard from './AnimeCard';

import './AnimeList.css';

interface CharacterListProps {
  data: Anime[];
}

function AnimeList({ data }: CharacterListProps) {
  return (
    <section className="cards">
      {data.map((item: Anime) => (
        <AnimeCard key={item.mal_id} character={item} />
      ))}
    </section>
  );
}

export default AnimeList;
