import { Provider } from 'react-redux';

import Main from 'pages/Main';
import ErrorBoundary from 'shared/ErrorBoundary';
import store from 'shared/store';

import './App.css';

function App() {
  return (
    <ErrorBoundary>
      <Provider store={store}>
        <Main />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
