import React from 'react';

import Overlay from '../Overlay';
import { Charity } from '../../types';
import {
  Card,
  CardContent,
  CardImage,
  CardImageContainer,
  CharityName,
} from './styles';
import { Button } from '../Button';

export interface CharityCardProps {
  charity: Charity;
  isOverlayVisible: boolean;
  selectedAmount: number;
  onDonateClick: () => void;
  onCloseOverlay: () => void;
  onAmountChange: (amount: number) => void;
  onPayClick: () => void;
}

export const CharityCard: React.FC<CharityCardProps> = ({
  charity,
  isOverlayVisible,
  selectedAmount,
  onDonateClick,
  onCloseOverlay,
  onAmountChange,
  onPayClick,
}) => {
  return (
    <Card>
      <CardImageContainer>
        <CardImage src={`images/${charity.image}`} alt={charity.name} />
      </CardImageContainer>
      <CardContent>
        <CharityName>{charity.name}</CharityName>
        {!isOverlayVisible && (
          <Button variant="outline" onClick={onDonateClick}>
            Donate
          </Button>
        )}
      </CardContent>
      <Overlay
        isVisible={isOverlayVisible}
        selectedAmount={selectedAmount}
        currency={charity.currency}
        onClose={onCloseOverlay}
        onAmountChange={onAmountChange}
        onPayClick={onPayClick}
      />
    </Card>
  );
};
