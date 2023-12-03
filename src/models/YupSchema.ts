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
    .matches(
      /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[\W_]).{8,}$/,
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
  // picture: yup
  //   .mixed()
  //   .test(
  //     'fileSize',
  //     'File Size is too large',
  //     (value) => value && value.size <= 1000000
  //   )
  //   .test(
  //     'fileType',
  //     'Invalid File Format',
  //     (value) =>
  //       value && (value.type === 'image/png' || value.type === 'image/jpeg')
  //   )
  //   .required('You have to upload a file'),
  // countryCode: yup.string().required('Country is required'),
});

export default yupFormSchema;
