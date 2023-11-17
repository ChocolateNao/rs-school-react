import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import { fetchAnimeById } from 'api/animeService';
import { useSearchContext } from 'context/SearchContext';
import Button from 'ui/Button';
import Loading from 'ui/Loading';

import './AnimeDetails.css';

function AnimeDetails() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const { animeDetails, setAnimeDetails } = useSearchContext();

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateAnime = useCallback(() => {
    setIsLoading(true);

    fetchAnimeById(pathname.slice(1)).then((data) => {
      setAnimeDetails(data);
    });

    setIsLoading(false);
  }, [pathname, setAnimeDetails]);

  const close = () => {
    navigate({
      pathname: '/',
      search,
    });
  };

  useEffect(() => {
    updateAnime();
  }, [updateAnime]);

  return (
    <>
      <div
        aria-label="close-details"
        className="modal__overlay"
        onClick={close}
        onKeyDown={close}
        role="textbox"
        tabIndex={0}
      />
      <div className="modal__container">
        <div className="loader" />
        {isLoading && <Loading />}
        <Button onClick={close} className="modal__close">
          Close
        </Button>
        <img
          className="modal__img"
          src={animeDetails?.images.webp.large_image_url}
          alt={animeDetails?.title}
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
