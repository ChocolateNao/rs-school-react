import { Outlet } from 'react-router-dom';
import { useAppSelector } from 'hooks/redux';

import Footer from 'components/Footer';
import Header from 'components/Header';

import './App.scss';

function App() {
  // eslint-disable-next-line react-redux/useSelector-prefer-selectors
  const controlledFormData = useAppSelector(
    (state) => state.formData.controlledFormData
  );
  // eslint-disable-next-line react-redux/useSelector-prefer-selectors
  const uncontrolledFormData = useAppSelector(
    (state) => state.formData.uncontrolledFormData
  );

  return (
    <>
      <Header />
      <p>controlledFormData</p>
      {JSON.stringify(controlledFormData)}
      <p>uncontrolledFormData</p>
      {JSON.stringify(uncontrolledFormData)}
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
