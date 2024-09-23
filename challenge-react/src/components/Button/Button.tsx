import React from 'react';
import { StyledButton } from './styles';

export type ButtonSize = 'medium';
export type ButtonVariant = 'primary' | 'outline';

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  size?: ButtonSize;
  variant?: ButtonVariant;
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  size = 'medium',
  children,
  ...props
}) => {
  return <StyledButton {...props}>{children}</StyledButton>;
};
