import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';

import { IAnime } from 'models/Anime.interface';

import styles from './AnimeCard.module.css';

interface AnimeCardProps {
  anime: IAnime;
}

function AnimeCard({ anime }: AnimeCardProps) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { mal_id, title, type, score, airing, images } = anime;
  const router = useRouter();

  return (
    <Link
      href={{
        pathname:
          router.pathname === '/anime/[id]'
            ? mal_id.toString()
            : `anime/${mal_id.toString()}`,
        query: { ...router.query },
      }}
    >
      <div className={styles.card}>
        <Image
          src={images.webp.image_url}
          alt={title}
          className={styles.card__image}
          width={250}
          height={150}
          priority
        />
        <div className={styles.card__description}>
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
