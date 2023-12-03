import { createSlice } from '@reduxjs/toolkit';

import IFormDataState from 'models/FormDataState.interface';
import IFormFields from 'models/FormFields.interface';

const initialFormDataState: IFormDataState = {
  uncontrolledFormData: [] as IFormFields[],
  controlledFormData: [] as IFormFields[],
};

const formDataSlice = createSlice({
  name: 'formData',
  initialState: initialFormDataState,
  reducers: {
    setUncontrolledFormData(state, action) {
      state.uncontrolledFormData = action.payload;
    },
    setControlledFormData(state, action) {
      state.controlledFormData = action.payload;
    },
  },
});

export default formDataSlice.reducer;

export const { setUncontrolledFormData, setControlledFormData } =
  formDataSlice.actions;
