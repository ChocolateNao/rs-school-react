import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from 'hooks/redux';
import convertToBase64 from 'utils/base64';

import CountrySelector from 'components/CountrySelector';
import PasswordStrengthMeter from 'components/PasswordStrengthMeter/PasswordStrengthMeter';
import IFormFields from 'models/FormFields.interface';
import yupFormSchema from 'models/YupSchema';
import { appendControlledFormData } from 'store/slices/formDataSlice';

import styles from './ControlledForm.module.scss';

function ControlledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isDirty },
    reset,
    setValue,
    control,
    getValues,
  } = useForm<IFormFields>({
    resolver: yupResolver(yupFormSchema),
    mode: 'onChange',
  });

  const countriesData = useAppSelector((state) => state.countries.countriesArr);

  const onSubmitHandler = async (data: IFormFields) => {
    if (data.picture && data.picture.length > 0) {
      const base64String = await convertToBase64(data.picture[0]);
      dispatch(appendControlledFormData({ ...data, picture: base64String }));
    }

    dispatch(appendControlledFormData(data));
    reset();
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)} className={styles.form}>
      <h2>Controlled Form</h2>
      <label htmlFor="name">
        Name
        <input
          {...register('name')}
          id="name"
          type="text"
          placeholder="Enter your name"
        />
      </label>
      <p>{errors.name?.message}</p>

      <label htmlFor="age">
        Age
        <input
          {...register('age')}
          id="age"
          type="number"
          min="1"
          placeholder="Enter your age"
        />
      </label>
      <p>{errors.age?.message}</p>

      <label htmlFor="email">
        E-Mail
        <input
          {...register('email')}
          id="email"
          type="email"
          placeholder="Enter your email address"
        />
      </label>
      <p>{errors.email?.message}</p>

      <label htmlFor="password">
        Password
        <input
          {...register('password')}
          id="password"
          type="password"
          placeholder="Enter your password"
          className={styles.input__password}
        />
      </label>
      <PasswordStrengthMeter password={getValues('password')} />
      <p>{errors.password?.message}</p>

      <label htmlFor="passwordRepeat">
        Confirm Password
        <input
          {...register('confirmPassword')}
          id="passwordRepeat"
          type="password"
          placeholder="Confirm your password"
          className={styles.input__password}
        />
      </label>
      <p>{errors.confirmPassword?.message}</p>

      <fieldset {...register('gender')}>
        <legend>Choose your gender</legend>
        <div>
          <label htmlFor="male">
            Male
            <input
              {...register('gender')}
              type="radio"
              id="male"
              name="gender"
              value="Male"
            />
          </label>

          <label htmlFor="female">
            Female
            <input
              {...register('gender')}
              type="radio"
              id="female"
              name="gender"
              value="Female"
            />
          </label>

          <label htmlFor="other">
            Other
            <input
              {...register('gender')}
              type="radio"
              id="other"
              name="gender"
              value="Other"
            />
          </label>
        </div>
        <p>{errors.gender?.message}</p>
      </fieldset>

      <label htmlFor="picture">
        Upload Picture
        <input type="file" id="picture" {...register('picture')} />
      </label>
      <p>{errors.picture?.message}</p>

      <div>
        {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
        <label htmlFor="country">
          Select Country
          <Controller
            name="country"
            control={control}
            defaultValue=""
            render={() => (
              <CountrySelector
                countries={countriesData}
                onSelect={(selectedCountry) =>
                  setValue('country', selectedCountry?.code || '')
                }
              />
            )}
          />
        </label>
        <p>{errors.country?.message}</p>
      </div>

      <label htmlFor="isTermAccepted">
        Accept terms and conditions
        <input
          {...register('isTermAccepted')}
          id="isTermAccepted"
          type="checkbox"
        />
      </label>
      <p>{errors.isTermAccepted?.message}</p>

      <button type="submit" disabled={!isValid || !isDirty}>
        Submit
      </button>
    </form>
  );
}

export default ControlledForm;
