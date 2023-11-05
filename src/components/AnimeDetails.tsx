import { useCallback, useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import fetchAnimeById from '../api/fetchCalls';
import { IAnimeDetails } from '../resources/Anime.interface';

import Button from './Button';
import Loading from './Loading';

import './AnimeDetails.css';

function AnimeDetails() {
  const navigate = useNavigate();
  const { pathname, search } = useLocation();
  const [animeData, setAnimeData] = useState<IAnimeDetails | undefined>(
    undefined
  );
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateAnime = useCallback(() => {
    setIsLoading(true);

    fetchAnimeById(pathname.slice(1)).then((data) => {
      setAnimeData(data);
      setIsLoading(false);
    });
  }, [pathname]);

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
          src={animeData?.images.webp.large_image_url}
          alt={animeData?.title}
        />
        <div className="modal__description">
          <p>{animeData?.title}</p>
          <p>Type: {animeData?.type}</p>
          <p>Status: {animeData?.airing ? 'Airing' : 'Finished Airing'}</p>
          <p>MAL Score: {animeData?.score}</p>
          <p>Year: {animeData?.year}</p>
          <p>Synopsis: {animeData?.synopsis}</p>
        </div>
      </div>
    </>
  );
}

export default AnimeDetails;
