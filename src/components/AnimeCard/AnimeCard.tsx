import { Link } from 'react-router-dom';

import { IAnime } from '../../resources/Anime.interface';

import './AnimeCard.css';

interface AnimeCardProps {
  anime: IAnime;
}

function AnimeCard({ anime }: AnimeCardProps) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { mal_id, title, type, score, airing, images } = anime;

  return (
    <Link to={mal_id.toString()}>
      <div className="card">
        <img src={images.webp.image_url} alt={title} className="card__image" />
        <div className="card__description">
          <b>Name:</b> <p>{title}</p>
          <b>Status:</b> <p>{airing ? 'Airing' : 'Completed'}</p>
          <b>Score:</b> <p>{score}</p>
          <b>Type:</b> <p>{type}</p>
        </div>
      </div>
    </Link>
  );
}

export default AnimeCard;
