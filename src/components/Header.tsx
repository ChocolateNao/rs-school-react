import { ReactNode, useState } from 'react';

import Button from './Button';
import DummyError from './DummyError';

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
      {children}
      <Button className="header__throw" onClick={handleErrorThrow}>
        Throw error
      </Button>
      {dummyError && <DummyError />}
    </header>
  );
}

export default Header;
