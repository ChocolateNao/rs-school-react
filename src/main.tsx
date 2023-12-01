import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import ErrorBoundary from 'components/ErrorBoundary';
import ErrorFallback from 'components/ErrorFallback';
import NotFound from 'pages/NotFound';

import App from './App';

import './index.scss';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} errorElement={<ErrorFallback />}>
        <Route
          path="/controlled"
          element={<App />}
          errorElement={<ErrorFallback />}
        />
        <Route
          path="/uncontrolled"
          element={<App />}
          errorElement={<ErrorFallback />}
        />
      </Route>
      <Route path="*" element={<NotFound />} errorElement={<ErrorFallback />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorFallback />}>
      <RouterProvider router={router} />
    </ErrorBoundary>
  </React.StrictMode>
);
