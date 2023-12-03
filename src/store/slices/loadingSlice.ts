import { createSlice } from '@reduxjs/toolkit';

import ILoadingState from 'models/LoadingState.interface';

const initialLoadingState: ILoadingState = {
  isSubmittingUncontrolled: false,
  isSubmittingControlled: false,
};
const loadingSlice = createSlice({
  name: 'loading',
  initialState: initialLoadingState,
  reducers: {
    setSubmittingUncontrolled(state, action) {
      state.isSubmittingUncontrolled = action.payload;
    },
    setSubmittingControlled(state, action) {
      state.isSubmittingControlled = action.payload;
    },
  },
});

export default loadingSlice.reducer;

export const { setSubmittingUncontrolled, setSubmittingControlled } =
  loadingSlice.actions;
