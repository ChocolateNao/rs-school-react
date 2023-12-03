/* eslint-disable consistent-return */
import * as yup from 'yup';

import IFormFields, { TGender } from 'models/FormFields.interface';

const yupFormSchema: yup.ObjectSchema<IFormFields> = yup.object().shape({
  name: yup
    .string()
    .min(1, 'Name should contain at least one character')
    .matches(
      /^[A-Z][a-z]*(-[A-Z][a-z]*)?$/,
      'First letter must be uppercased and contain only one word'
    )
    .required('Name is required'),
  age: yup
    .number()
    .integer('Age should be a number')
    .positive('Age should be a positive number')
    .required('Age is required'),
  email: yup
    .string()
    .email('Please provide a valid email address')
    .required('Email address is required'),
  password: yup
    .string()
    .min(4, 'Password should contain at least four characters')
    .max(64, 'Password should contain only up to 64 characters')
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{4,}$/,
      'Password must contain at least 1 number, 1 uppercased letter, 1 lowercased letter, 1 special character'
    )
    .required('Password is required'),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Passwords must match')
    .required('Password confirmation is required'),
  gender: yup
    .string()
    .oneOf<TGender>(['Male', 'Female', 'Other'], 'Please specify your gender')
    .required('Gender is required'),
  isTermAccepted: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions')
    .required(),
  picture: yup
    .mixed<FileList>()
    .test('fileExist', 'Please upload picture', (file) => {
      return !!file && !!file[0];
    })
    .test(
      'fileFormat',
      'The file is in wrong format. Only JPEG and PNG are allowed',
      (file) => {
        if (file && file[0]) {
          return (
            (file && file[0].type === 'image/jpeg') ||
            (file && file[0].type === 'image/png')
          );
        }
      }
    )
    .test('fileSize', 'The file is too large (up to 3mb)', (file) => {
      if (file && file[0]) {
        return file && file[0].size <= 3000000;
      }
    })
    .defined()
    .required('You should upload a picture'),
  country: yup
    .string()
    .min(2, 'Please select a valid country')
    .required('Country is required. Please select one from the dropdown menu'),
});

export default yupFormSchema;
