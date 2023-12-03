import { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import convertToBase64 from 'utils/base64';
import { ValidationError } from 'yup';

import CountrySelector from 'components/CountrySelector';
import PasswordStrengthMeter from 'components/PasswordStrengthMeter';
import IFormFields from 'models/FormFields.interface';
import yupFormSchema from 'models/YupSchema';
import { appendUncontrolledFormData } from 'store/slices/formDataSlice';

import styles from './UncontrolledForm.module.scss';

interface FormErrors {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  isTermAccepted?: string;
  picture?: string;
  country?: string;
}

function UncontrolledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({} as FormErrors);
  const [selectedRadioValue, setSelectedRadioValue] = useState('');
  const [password, setPassword] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleRadioChange = (value: string) => {
    setSelectedRadioValue(value);
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const isTermAcceptedRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    yupFormSchema
      .validate(
        {
          name: nameRef.current?.value,
          age: ageRef.current?.value,
          email: emailRef.current?.value,
          password: passwordRef.current?.value,
          confirmPassword: confirmPasswordRef.current?.value,
          gender: selectedRadioValue,
          isTermAccepted: isTermAcceptedRef.current?.checked,
          picture: pictureRef.current?.files,
          country: selectedCountry,
        },
        { abortEarly: false }
      )
      .then(async (validatedData: IFormFields) => {
        setErrors({});
        if (
          pictureRef.current?.files &&
          pictureRef.current?.files?.length > 0
        ) {
          const base64String = await convertToBase64(
            pictureRef.current?.files[0]
          );
          // eslint-disable-next-line no-param-reassign
          validatedData = { ...validatedData, picture: base64String };
          dispatch(appendUncontrolledFormData(validatedData));
        }
        navigate('/');
      })
      .catch((validationErrors: ValidationError) => {
        const errorMessages: FormErrors = validationErrors.inner.reduce(
          (acc, error) => {
            // eslint-disable-next-line no-param-reassign
            acc[error.path as keyof FormErrors] = error.message;
            return acc;
          },
          {} as FormErrors
        );
        setErrors(errorMessages);
      });
  };

  const countriesData = useAppSelector((state) => state.countries.countriesArr);

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h2 className="form__header">Unontrolled Form</h2>
      <label htmlFor="name">
        Name
        <input
          ref={nameRef}
          id="name"
          type="text"
          placeholder="Enter your name"
        />
      </label>
      {errors.name && <p>{errors.name}</p>}

      <label htmlFor="age">
        Age
        <input
          ref={ageRef}
          id="age"
          type="number"
          min="1"
          placeholder="Enter your age"
        />
      </label>
      {errors.age && <p>{errors.age}</p>}

      <label htmlFor="email">
        E-Mail
        <input
          ref={emailRef}
          id="email"
          type="email"
          placeholder="Enter your email address"
        />
      </label>
      {errors.email && <p>{errors.email}</p>}

      <label htmlFor="password">
        Password
        <input
          ref={passwordRef}
          id="password"
          type="password"
          placeholder="Enter your password"
          className={styles.input__password}
          onChange={handlePasswordChange}
        />
      </label>
      <PasswordStrengthMeter password={password} />
      {errors.password && <p>{errors.password}</p>}

      <label htmlFor="passwordRepeat">
        Confirm Password
        <input
          ref={confirmPasswordRef}
          id="passwordRepeat"
          type="password"
          placeholder="Confirm your password"
          className={styles.input__password}
        />
      </label>
      {errors.confirmPassword && <p>{errors.confirmPassword}</p>}

      <fieldset>
        <legend>Choose your gender</legend>
        <div>
          <label htmlFor="male">
            Male
            <input
              type="radio"
              id="male"
              name="gender"
              value="Male"
              checked={selectedRadioValue === 'Male'}
              onChange={() => handleRadioChange('Male')}
            />
          </label>

          <label htmlFor="female">
            Female
            <input
              type="radio"
              id="female"
              name="gender"
              value="Female"
              checked={selectedRadioValue === 'Female'}
              onChange={() => handleRadioChange('Female')}
            />
          </label>

          <label htmlFor="other">
            Other
            <input
              type="radio"
              id="other"
              name="gender"
              value="Other"
              checked={selectedRadioValue === 'Other'}
              onChange={() => handleRadioChange('Other')}
            />
          </label>
        </div>
        {errors.gender && <p>{errors.gender}</p>}
      </fieldset>

      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label htmlFor="country">
        Select a country
        <CountrySelector
          countries={countriesData}
          onSelect={(selectedCountry) =>
            setSelectedCountry(selectedCountry?.code || null)
          }
        />
      </label>
      {errors.country && <p>{errors.country}</p>}

      <label htmlFor="picture">
        Upload Picture
        <input ref={pictureRef} type="file" id="picture" />
      </label>
      {errors.picture && <p>{errors.picture}</p>}

      <label htmlFor="isTermAccepted">
        Accept terms and conditions
        <input ref={isTermAcceptedRef} id="isTermAccepted" type="checkbox" />
      </label>
      {errors.isTermAccepted && <p>{errors.isTermAccepted}</p>}

      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;
