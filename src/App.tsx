import Main from './pages/Main/Main';
import ErrorBoundary from './shared/ErrorBoundary/ErrorBoundary';

import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  );
}

export default App;
