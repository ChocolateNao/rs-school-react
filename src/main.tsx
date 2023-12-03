import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import ControlledFormPage from 'pages/ControlledFormPage';
import NotFound from 'pages/NotFound';
import UncontrolledFormPage from 'pages/UncontrolledFormPage';
import store from 'store/store';

import App from './App';

import './index.scss';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} errorElement={<ErrorFallback />} />
      <Route path="/controlled" element={<ControlledFormPage />} />
      <Route path="/uncontrolled" element={<UncontrolledFormPage />} />
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
