import { useAppSelector } from 'hooks/redux';
import Image from 'next/image';
import { useRouter } from 'next/router';

import Loader from 'components/ui/Loader';
import { IAnimeDetails } from 'models/AnimeDetails.interface';
import Button from 'ui/Button';

import styles from './AnimeDetails.module.css';

interface AnimeDetailsProps {
  animeDetails: IAnimeDetails;
}

function AnimeDetails({ animeDetails }: AnimeDetailsProps) {
  const { isLoadingMainPage } = useAppSelector((state) => state.storeReducer);
  const router = useRouter();

  const closeDetails = () => {
    router.push({ pathname: '/', query: { ...router.query } });
  };

  return (
    <>
      <div
        aria-label="close-details"
        className={styles.modal__overlay}
        onClick={closeDetails}
        onKeyDown={closeDetails}
        role="textbox"
        tabIndex={0}
      />
      <div className={styles.modal__container}>
        <Button onClick={closeDetails} className={styles.modal__close}>
          Close
        </Button>
        {isLoadingMainPage ? (
          <Loader />
        ) : (
          <>
            <Image
              className={styles.modal__img}
              src={animeDetails?.images.webp.large_image_url}
              alt={animeDetails?.title}
              height={350}
              width={250}
            />
            <div className={styles.modal__description}>
              <p>{animeDetails?.title}</p>
              <p>Type: {animeDetails?.type}</p>
              <p>
                Status: {animeDetails?.airing ? 'Airing' : 'Finished Airing'}
              </p>
              <p>MAL Score: {animeDetails?.score}</p>
              <p>Year: {animeDetails?.year}</p>
              <p>Synopsis: {animeDetails?.synopsis}</p>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default AnimeDetails;
