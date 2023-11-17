import SearchProvider from 'context/SearchContext';
import Main from 'pages/Main';
import ErrorBoundary from 'shared/ErrorBoundary';

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
