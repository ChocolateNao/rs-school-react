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
        <>
          <h2 style={{ fontSize: '20px' }}>Controlled Form Data</h2>
          <section
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {controlledFormData.map((formData, index) => (
              <FormResult
                key={index}
                data={formData as unknown as ResultData}
              />
            ))}
          </section>
        </>
      )}

      {uncontrolledFormData.length > 0 && (
        <>
          <h2 style={{ fontSize: '20px' }}>Uncontrolled Form Data</h2>
          <section
            style={{
              display: 'flex',
              flexDirection: 'row',
              gap: '20px',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {uncontrolledFormData.map((formData, index) => (
              <FormResult
                key={index}
                data={formData as unknown as ResultData}
              />
            ))}
          </section>
        </>
      )}
      <Outlet />
    </>
  );
}

export default App;
