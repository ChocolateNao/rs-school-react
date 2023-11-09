import Main from './pages/Main/Main';
import ErrorBoundary from './shared/ErrorBoundary';

import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  );
}

export default App;
