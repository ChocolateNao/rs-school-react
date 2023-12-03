import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import countriesData from 'assets/countriesData';
import ICountry from 'models/Country.interface';

interface CountriesState {
  countries: ICountry[];
}

const initialState: CountriesState = {
  countries: { ...countriesData },
};

const countriesSlice = createSlice({
  name: 'countries',
  initialState,
  reducers: {
    addCountry: (state, action: PayloadAction<ICountry>) => {
      state.countries.push(action.payload);
    },
  },
});

export default countriesSlice.reducer;

export const { addCountry } = countriesSlice.actions;
