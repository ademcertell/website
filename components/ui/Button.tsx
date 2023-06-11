import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  className?: string;
  title: string;
  onClick?: () => void;
}

const Button: React.FC<ButtonProps> = ({ children, className, onClick }) => {
  return (
    <button
      className={`p-2 rounded-md ${className}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;