import { Anime } from '../resources/Anime.interface';

import './AnimeCard.css';

interface CharacterCardProps {
  character: Anime;
}

function CharacterCard({ character }: CharacterCardProps) {
  const { title, type, score, airing, images } = character;

  return (
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
  );
}

export default CharacterCard;
