import { MouseEvent, ReactNode, ButtonHTMLAttributes } from 'react';
import './Button.css';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  children: ReactNode;
}

function Button({ onClick, children }: ButtonProps) {
  return (
    <button className="btn" type="button" onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
