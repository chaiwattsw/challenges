import styled, { css } from 'styled-components';
import { ButtonProps, ButtonSize, ButtonVariant } from './Button';

export const getButtonStyles = (size: ButtonSize) => {
  switch (size) {
    default:
      return css`
        font-size: 1rem;
        padding: 0.625rem 1.25rem;
      `;
  }
};

export const getButtonVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case 'outline':
      return css`
        background-color: transparent;
        color: ${({ theme }) => theme.colors.primary};
        border: 2px solid ${({ theme }) => theme.colors.primary};
        &:hover {
          background-color: ${({ theme }) => theme.colors.primary};
          color: ${({ theme }) => theme.colors.background};
        }
      `;
    default:
      return css`
        background-color: ${({ theme }) => theme.colors.primary};
        color: ${({ theme }) => theme.colors.background};
      `;
  }
};

export const StyledButton = styled.button<ButtonProps>`
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s, border-color 0.3s;
  font-family: ${({ theme }) => theme.fonts.main};
  width: ${({ fullWidth }) => (fullWidth ? '100%' : 'auto')};

  ${({ size = 'medium' }) => getButtonStyles(size)}
  ${({ variant = 'primary' }) => getButtonVariant(variant)}
  
    &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  &:focus {
    outline: none;
    box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.3);
  }
`;
