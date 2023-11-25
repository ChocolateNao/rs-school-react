import Image from 'next/image';
import Link from 'next/link';

import { IAnime } from 'models/Anime.interface';

import './AnimeCard.css';

interface AnimeCardProps {
  anime: IAnime;
}

function AnimeCard({ anime }: AnimeCardProps) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { mal_id, title, type, score, airing, images } = anime;

  return (
    <Link href={mal_id.toString()}>
      <div className="card">
        <Image
          src={images.webp.image_url}
          alt={title}
          className="card__image"
          width={100}
          height={100}
        />
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
