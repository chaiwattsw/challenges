import styled, { keyframes } from 'styled-components';

export const slideIn = keyframes`
  from {
    transform: translateY(-100%);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
`;

export const slideOut = keyframes`
  from {
    transform: translateY(0);
    opacity: 1;
  }
  to {
    transform: translateY(-100%);
    opacity: 0;
  }
`;

export const MessageContainer = styled.div<{ isVisible: boolean }>`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border-radius: 4px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  animation: ${(props) => (props.isVisible ? slideIn : slideOut)} 1s ease
    forwards;

  @media (max-width: 768px) {
    right: 10px;
    left: 10px;
    text-align: center;
  }
`;
