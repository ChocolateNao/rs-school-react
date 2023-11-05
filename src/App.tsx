import ErrorBoundary from './components/ErrorBoundary';
import Main from './components/Main';

import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Main />
    </ErrorBoundary>
  );
}

export default App;
