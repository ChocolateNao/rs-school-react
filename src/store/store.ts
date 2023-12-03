import { combineReducers, configureStore } from '@reduxjs/toolkit';

import countriesDataSlice from './slices/countriesDataSlice';
import formDataSlice from './slices/formDataSlice';
import loadingSlice from './slices/loadingSlice';

const rootReducer = combineReducers({
  formData: formDataSlice,
  countries: countriesDataSlice,
  loading: loadingSlice,
});

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export default store;
