import { Link } from 'react-router-dom';

import './App.scss';

function App() {
  return (
    <>
      <Link to="/controlled">Controlled form</Link>
      <Link to="/uncontrolled">Uncontrolled form</Link>
    </>
  );
}

export default App;
