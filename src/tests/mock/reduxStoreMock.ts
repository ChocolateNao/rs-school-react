import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from 'store/index';

const mockStore = configureStore({ reducer: rootReducer });

export default mockStore;
