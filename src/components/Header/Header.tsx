import { ReactNode, useState } from 'react';

import Button from '../Button/Button';
import DummyError from '../DummyError/DummyError';

import './Header.css';

interface HeaderProps {
  children: ReactNode;
}

function Header({ children }: HeaderProps) {
  const [dummyError, setDummyError] = useState<boolean>(false);

  const handleErrorThrow = () => {
    setDummyError(true);
  };

  return (
    <header className="header">
      <h1 className="header__title">Anime search</h1>
      {children}
      <Button className="header__throw" onClick={handleErrorThrow}>
        Throw error
      </Button>
      {dummyError && <DummyError />}
    </header>
  );
}

export default Header;
