import { Link } from 'react-router-dom';

function Header() {
  return (
    <header className="header">
      <h1 className="header__title">React Forms Assignment</h1>
      <Link to="/">Home</Link>
      <Link to="/controlled">Controlled form</Link>
      <Link to="/uncontrolled">Uncontrolled form</Link>
    </header>
  );
}

export default Header;
