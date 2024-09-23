import React from 'react';
import RadioButtonGroup from '../RadioButtonGroup';
import {
  CloseButton,
  DonationInstruction,
  OverlayContainer,
  OverlayContent,
} from './styles';
import { DONATE_AMOUNT_OPTIONS } from '../../constants';
import { Button } from '../Button';

export interface DonationOverlayProps {
  isVisible: boolean;
  selectedAmount: number;
  currency: string;
  onClose: () => void;
  onAmountChange: (amount: number) => void;
  onPayClick: () => void;
}

export const Overlay: React.FC<DonationOverlayProps> = ({
  isVisible,
  selectedAmount,
  currency,
  onClose,
  onAmountChange,
  onPayClick,
}) => (
  <OverlayContainer isVisible={isVisible}>
    <OverlayContent>
      <CloseButton onClick={onClose}>×</CloseButton>
      <DonationInstruction>
        Select the amount to donate ({currency})
      </DonationInstruction>
      <RadioButtonGroup
        options={DONATE_AMOUNT_OPTIONS}
        selectedValue={selectedAmount}
        onChange={onAmountChange}
      />
      <Button variant="outline" onClick={onPayClick}>
        Pay
      </Button>
    </OverlayContent>
  </OverlayContainer>
);
