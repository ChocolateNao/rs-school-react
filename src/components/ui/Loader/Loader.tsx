import './Loader.css';

function Loader() {
  return (
    <div className="loading">
      <div className="loading__spinner" />
      <p className="loading__text">Loading...</p>
    </div>
  );
}

export default Loader;
