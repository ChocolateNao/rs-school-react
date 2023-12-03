import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="notfound">
      <h1 className="notfound__header">Oops. Nothing is found here.</h1>
      <p className="notfound__description">
        You can return to home page or go back to the previous page.
      </p>
      <button
        className="notfound__home_btn"
        onClick={() => navigate('/')}
        type="button"
      >
        Go home
      </button>
      <button
        className="notfound__home_btn"
        onClick={() => navigate(-1)}
        type="button"
      >
        Go back
      </button>
    </div>
  );
}

export default NotFound;
