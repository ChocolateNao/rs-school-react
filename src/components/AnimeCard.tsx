import { Link } from 'react-router-dom';

import { Anime } from '../resources/Anime.interface';

import './AnimeCard.css';

interface AnimeCardProps {
  anime: Anime;
}

function AnimeCard({ anime }: AnimeCardProps) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { mal_id, title, type, score, airing, images } = anime;

  return (
    <Link to={mal_id.toString()}>
      <div className="card">
        <img src={images.webp.image_url} alt={title} className="card__image" />
        <div className="card__description">
          <p>Name: {title}</p>
          <p className="card__status">
            Status: {airing ? 'Airing' : 'Completed'}
          </p>
          <p>Score: {score}</p>
          <p>Type: {type}</p>
        </div>
      </div>
    </Link>
  );
}

export default AnimeCard;
