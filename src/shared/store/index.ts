import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/dist/query/react';

import { jikanApi } from './jikanApi';
import storeReducer from './slice';

const rootReducer = combineReducers({
  storeReducer,
  [jikanApi.reducerPath]: jikanApi.reducer,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }).concat(jikanApi.middleware),
});

setupListeners(store.dispatch);

export default store;
