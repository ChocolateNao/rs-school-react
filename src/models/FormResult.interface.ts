import { TGender } from './FormFields.interface';

export default interface ResultData {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: TGender;
  isTermAccepted: boolean;
  picture: string;
  country: string;
}
