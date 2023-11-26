import { ReactNode, useState } from 'react';
import Link from 'next/link';

import DummyError from 'components/DummyError';
import Button from 'ui/Button';

import styles from './Header.module.css';

interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: HeaderProps) {
  const [dummyError, setDummyError] = useState<boolean>(false);

  const handleErrorThrow = () => {
    setDummyError(true);
  };

  return (
    <header className={styles.header}>
      <Link href="/">
        <h1 className={styles.header__title}>Anime search</h1>
      </Link>
      {children}
      <Button className={styles.header__throw} onClick={handleErrorThrow}>
        Throw error
      </Button>
      {dummyError && <DummyError />}
    </header>
  );
}

export default Header;
