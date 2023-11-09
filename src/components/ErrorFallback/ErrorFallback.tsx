import Button from '../Button/Button';

import './ErrorFallback.css';

function ErrorFallback() {
  return (
    <div className="errorboundary">
      <h1 className="errorboundary__header">
        Oopsie Woopsie! Something went wrong.
      </h1>
      <p className="errorboundary__text">
        You can try to refresh the page or simply click the button here that
        will do it for you.
      </p>
      <Button onClick={() => window.location.reload()}>Reload page</Button>
    </div>
  );
}

export default ErrorFallback;
