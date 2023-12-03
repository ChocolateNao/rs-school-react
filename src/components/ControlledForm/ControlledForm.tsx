import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAppSelector } from 'hooks/redux';

import CountrySelector from 'components/CountrySelector';
import IFormFields from 'models/FormFields.interface';
import yupFormSchema from 'models/YupSchema';
import { appendControlledFormData } from 'store/slices/formDataSlice';

function ControlledForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    setValue,
    control,
  } = useForm<IFormFields>({
    resolver: yupResolver(yupFormSchema),
    mode: 'onChange',
  });

  // eslint-disable-next-line react-redux/useSelector-prefer-selectors
  const countriesData = useAppSelector((state) => state.countries.countriesArr);

  // const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const file = e.target.files && e.target.files[0];
  //   if (file) {
  //     setValue('picture', file);
  //   }
  // };

  const onSubmitHandler = (data: IFormFields) => {
    // const reader = new FileReader();
    // reader.onload = (event) => {
    //   if (event.target !== null) {
    //     const base64String = event.target.result;
    //     dispatch(addUserAction({ ...data, picture: base64String }));
    //   }
    // };
    // reader.readAsDataURL(data.picture);

    dispatch(appendControlledFormData(data));
    reset();
    navigate('/');
  };

  return (
    <form onSubmit={handleSubmit(onSubmitHandler)}>
      <h2 className="form__header">Controlled Form</h2>
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
        />
      </label>
      <p>{errors.password?.message}</p>

      <label htmlFor="passwordRepeat">
        Confirm Password
        <input
          {...register('confirmPassword')}
          id="passwordRepeat"
          type="password"
          placeholder="Confirm your password"
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

      <label htmlFor="isTermAccepted">
        Accept terms and conditions
        <input
          {...register('isTermAccepted')}
          id="isTermAccepted"
          type="checkbox"
        />
      </label>
      <p>{errors.isTermAccepted?.message}</p>

      {/* <label htmlFor="picture">
        Upload Picture
        <input
          {...register('picture')}
          type="file"
          id="picture"
          onChange={handleFileChange}
        />
      </label>
      <p>{errors.picture?.message}</p> */}

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

      <button type="submit" disabled={!isValid}>
        Submit
      </button>
    </form>
  );
}

export default ControlledForm;
