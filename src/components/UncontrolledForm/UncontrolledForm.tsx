import { FormEvent, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';
import { ValidationError } from 'yup';

import CountrySelector from 'components/CountrySelector';
import IFormFields from 'models/FormFields.interface';
import yupFormSchema from 'models/YupSchema';
import { appendUncontrolledFormData } from 'store/slices/formDataSlice';

interface FormErrors {
  name?: string;
  age?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  gender?: string;
  isTermAccepted?: string;
  // picture?: string;
  country?: string;
}

function UncontrolledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [errors, setErrors] = useState({} as FormErrors);
  const [selectedRadioValue, setSelectedRadioValue] = useState('');
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);

  const handleRadioChange = (value: string) => {
    setSelectedRadioValue(value);
  };

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const isTermAcceptedRef = useRef<HTMLInputElement>(null);
  // const pictureRef = useRef<HTMLInputElement>(null);

  const handleSubmit = (event: FormEvent) => {
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
          // picture: pictureRef.current.value,
          country: selectedCountry,
        },
        { abortEarly: false }
      )
      .then((validatedData: IFormFields) => {
        setErrors({});
        dispatch(appendUncontrolledFormData(validatedData));
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

  // eslint-disable-next-line react-redux/useSelector-prefer-selectors
  const countriesData = useAppSelector((state) => state.countries.countriesArr);

  return (
    <form onSubmit={handleSubmit}>
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
        />
      </label>
      {errors.password && <p>{errors.password}</p>}

      <label htmlFor="passwordRepeat">
        Confirm Password
        <input
          ref={confirmPasswordRef}
          id="passwordRepeat"
          type="password"
          placeholder="Confirm your password"
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

      <label htmlFor="isTermAccepted">
        Accept terms and conditions
        <input ref={isTermAcceptedRef} id="isTermAccepted" type="checkbox" />
      </label>
      {errors.isTermAccepted && <p>{errors.isTermAccepted}</p>}

      {/* <label htmlFor="picture">
      Upload Picture
      <input
        ref={pictureRef}
        type="file"
        id="picture"
        onChange={handleFileChange}
      />
    </label>
    {errors.picture && <p>{errors.picture}</p>} */}

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

      <button type="submit">Submit</button>
    </form>
  );
}

export default UncontrolledForm;
