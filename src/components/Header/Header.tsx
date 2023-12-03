import { Link } from 'react-router-dom';

import styles from './Header.module.scss';

function Header() {
  return (
    <header className={styles.header}>
      <h1 className={styles.header__title}>React Forms Assignment</h1>
      <nav className={styles.header__nav}>
        <Link to="/" className={styles.header__link}>
          Home
        </Link>
        <Link to="/controlled" className={styles.header__link}>
          Controlled form
        </Link>
        <Link to="/uncontrolled" className={styles.header__link}>
          Uncontrolled form
        </Link>
      </nav>
    </header>
  );
}

export default Header;
