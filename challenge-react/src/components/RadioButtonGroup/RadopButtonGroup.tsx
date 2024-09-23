import React from 'react';
import { GroupContainer, RadioInput, RadioLabel } from './styles';

export interface RadioButtonGroupProps {
  options: number[];
  selectedValue: number;
  onChange: (value: number) => void;
}

export const RadioButtonGroup: React.FC<RadioButtonGroupProps> = ({
  options,
  selectedValue,
  onChange,
}) => (
  <GroupContainer>
    {options.map((value) => (
      <RadioLabel key={value}>
        <RadioInput
          type="radio"
          value={value}
          checked={selectedValue === value}
          onChange={() => onChange(value)}
        />
        {value}
      </RadioLabel>
    ))}
  </GroupContainer>
);
