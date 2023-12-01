import { ButtonHTMLAttributes, MouseEvent, ReactNode } from 'react';

import styles from './Button.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

function Button({ onClick, children }: ButtonProps) {
  return (
    <button className={styles.btn} type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
