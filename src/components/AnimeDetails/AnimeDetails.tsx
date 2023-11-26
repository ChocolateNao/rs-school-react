import Image from 'next/image';
import { useRouter } from 'next/router';

import { IAnimeDetails } from 'models/AnimeDetails.interface';
import Button from 'ui/Button';

import './AnimeDetails.module.css';

interface AnimeDetailsProps {
  animeDetails: IAnimeDetails;
}

function AnimeDetails({ animeDetails }: AnimeDetailsProps) {
  const router = useRouter();
  const closeDetails = () => {
    router.push('/');
  };
  return (
    <>
      <div
        aria-label="close-details"
        className="modal__overlay"
        onClick={closeDetails}
        onKeyDown={closeDetails}
        role="textbox"
        tabIndex={0}
      />
      <div className="modal__container">
        <div className="loader" />
        <Button onClick={closeDetails} className="modal__close">
          Close
        </Button>
        <Image
          className="modal__img"
          src={animeDetails?.images.webp.large_image_url}
          alt={animeDetails?.title}
          height={100}
          width={100}
        />
        <div className="modal__description">
          <p>{animeDetails?.title}</p>
          <p>Type: {animeDetails?.type}</p>
          <p>Status: {animeDetails?.airing ? 'Airing' : 'Finished Airing'}</p>
          <p>MAL Score: {animeDetails?.score}</p>
          <p>Year: {animeDetails?.year}</p>
          <p>Synopsis: {animeDetails?.synopsis}</p>
        </div>
      </div>
    </>
  );
}

export default AnimeDetails;
