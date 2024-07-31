import React from 'react';
import './Button.css';

function Button({ type = 'button', variant, onClick, children, ...delegated }) {
  return (
    <button {...delegated} type={type} className={variant} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
