import { useLocation, useNavigate } from 'react-router-dom';

import { useFetchAnimeById } from 'shared/store/jikanApi';
import { setAnimeDetails } from 'shared/store/slice';
import { useAppDispatch, useAppSelector } from 'shared/store/types';
import Button from 'ui/Button';
import Loader from 'ui/Loader';

import './AnimeDetails.css';

function AnimeDetails() {
  const dispatch = useAppDispatch();
  const { animeDetails } = useAppSelector((state) => state.storeReducer);
  const { pathname, search } = useLocation();
  const animeId = pathname.slice(1);

  const { data, isLoading } = useFetchAnimeById(animeId);
  dispatch(setAnimeDetails(data?.data));

  const navigate = useNavigate();

  const close = () => {
    navigate({
      pathname: '/',
      search,
    });
  };

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
        {isLoading && <Loader />}
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
