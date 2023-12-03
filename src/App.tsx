/* eslint-disable react/no-array-index-key */
import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';

import FormResult from 'components/FormResult';
import Header from 'components/Header';
import ResultData from 'models/FormResult.interface';

import './App.scss';

function App() {
  const controlledFormData = useAppSelector(
    (state) => state.formData.controlledFormData
  );

  const uncontrolledFormData = useAppSelector(
    (state) => state.formData.uncontrolledFormData
  );

  return (
    <>
      <Header />
      {controlledFormData.length > 0 && (
        <div>
          <h2>Controlled Form Data</h2>
          {controlledFormData.map((formData, index) => (
            <FormResult key={index} data={formData as unknown as ResultData} />
          ))}
        </div>
      )}

      {uncontrolledFormData.length > 0 && (
        <div>
          <h2>Uncontrolled Form Data</h2>
          {uncontrolledFormData.map((formData, index) => (
            <FormResult key={index} data={formData as unknown as ResultData} />
          ))}
        </div>
      )}
      <Outlet />
    </>
  );
}

export default App;
