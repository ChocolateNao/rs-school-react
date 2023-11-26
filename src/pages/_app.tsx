/* eslint-disable react/jsx-props-no-spreading */
import { Provider } from 'react-redux';
import type { AppProps } from 'next/app';
import { wrapper } from 'store/index';

import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';

import 'styles/globals.css';

function App({ Component, ...rest }: AppProps) {
  const { store, props } = wrapper.useWrappedStore(rest);
  return (
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Provider store={store}>
        <Component {...props.pageProps} />
      </Provider>
    </ErrorBoundary>
  );
}

export default App;
