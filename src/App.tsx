import Main from './pages/Main/Main';
import SearchProvider from './shared/context/SearchContext';
import ErrorBoundary from './shared/ErrorBoundary/ErrorBoundary';

import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <SearchProvider>
        <Main />
      </SearchProvider>
    </ErrorBoundary>
  );
}

export default App;
