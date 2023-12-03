import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import ControlledForm from 'components/ControlledForm';
import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import UncontrolledForm from 'components/UncontrolledForm/UncontrolledForm';
import NotFound from 'pages/NotFound';
import store from 'store/store';

import App from './App';

import './index.scss';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} errorElement={<ErrorFallback />}>
        <Route path="/controlled" element={<ControlledForm />} />
        <Route path="/uncontrolled" element={<UncontrolledForm />} />
      </Route>
      <Route path="*" element={<NotFound />} errorElement={<ErrorFallback />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ErrorBoundary>
  </React.StrictMode>
);
