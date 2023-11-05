import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import AnimeDetails from './components/AnimeDetails';
import ErrorFallback from './components/ErrorFallback';
import NotFound from './components/NotFound';
import App from './App';

import './index.css';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<App />} errorElement={<ErrorFallback />}>
        <Route
          path=":id"
          element={<AnimeDetails />}
          errorElement={<ErrorFallback />}
        />
      </Route>
      <Route path="*" element={<NotFound />} />
    </Route>
  )
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
