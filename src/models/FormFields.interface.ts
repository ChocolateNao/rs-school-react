export type TGender = 'Male' | 'Female' | 'Other';

export default interface IFormFields {
  name: string;
  age: number;
  email: string;
  password: string;
  confirmPassword: string;
  gender: TGender;
  isTermAccepted: boolean;
  // picture: ;
  country: string;
}
