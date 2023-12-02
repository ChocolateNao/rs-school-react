import ICountry from 'models/Country.interface';

export type TGender = 'Male' | 'Female' | 'Custom';

export default interface IFormFields {
  name: string;
  age: number;
  email: string;
  password: string;
  passwordRepeat: string;
  gender: TGender;
  isTermAccepted: boolean;
  country: ICountry;
}
