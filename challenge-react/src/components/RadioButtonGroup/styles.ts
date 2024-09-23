import styled from 'styled-components';

export const GroupContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 5px;
  }
`;

export const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  color: black;
`;

export const RadioInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #4a90e2;
  border-radius: 50%;
  margin-right: 8px;
  outline: none;
  cursor: pointer;

  &:checked {
    background-color: #4a90e2;
    border: 2px solid #4a90e2;
    &::after {
      content: '';
      display: block;
      width: 10px;
      height: 10px;
      margin: 3px;
      border-radius: 50%;
      background: white;
    }
  }
`;
