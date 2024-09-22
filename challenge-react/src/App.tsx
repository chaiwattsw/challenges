import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { summaryDonations } from './helpers';

interface Charity {
  id: number;
  name: string;
  currency: string;
  image: string;
}

interface RootState {
  donate: number;
  message: string;
}

const AppContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Header = styled.h1`
  text-align: center;
  color: #333;
  font-size: 2rem;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const TotalDonations = styled.div`
  text-align: center;
  font-size: 1.2rem;
  margin-bottom: 20px;
  color: #28a745;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const CharitiesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }

  @media (max-width: 480px) {
    grid-template-columns: 1fr;
  }
`;

const Card = styled.div`
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
`;

const CardImageContainer = styled.div`
  position: relative;
  width: 100%;
  padding-top: 56.25%; // 16:9 aspect ratio
`;

const CardImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const DonateButton = styled.button`
  background-color: white;
  color: #4a90e2;
  border: 1px solid #4a90e2;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s, color 0.3s;

  &:hover {
    background-color: #4a90e2;
    color: white;
  }

  @media (max-width: 768px) {
    padding: 6px 12px;
    font-size: 0.9rem;
    width: 80px; // Slightly smaller for mobile
  }
`;

const CardContent = styled.div`
  padding: 16px;
  display: flex;
  align-items: flex-start;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 12px;
  }
`;

const CharityName = styled.h2`
  margin: 0;
  font-size: 1.2rem;
  text-align: left;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const DonationAmounts = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 10px;
  margin: 0 auto;

  @media (max-width: 768px) {
    gap: 5px;
  }
`;

const DonationInstruction = styled.div`
  color: white;
  font-size: 1.1rem;
  font-weight: bold;
  text-align: center;
  margin-bottom: 10px;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const AmountButton = styled.button<{ selected: boolean }>`
  padding: 5px 10px;
  border: 1px solid #007bff;
  border-radius: 20px;
  background-color: ${(props) => (props.selected ? '#007bff' : 'white')};
  color: ${(props) => (props.selected ? 'white' : '#007bff')};
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    background-color: #007bff;
    color: white;
  }

  @media (max-width: 768px) {
    padding: 4px 8px;
    font-size: 0.9rem;
  }
`;

const RadioLabel = styled.label`
  display: inline-flex;
  align-items: center;
  cursor: pointer;
  font-size: 1rem;
  color: white;
  gap: 4px;
`;

const RadioInput = styled.input`
  appearance: none;
  width: 20px;
  height: 20px;
  border: 2px solid #4a90e2;
  border-radius: 50%;
  margin-right: 8px;
  outline: none;
  cursor: pointer;
  margin: 0;

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

const Message = styled.div`
  position: fixed;
  top: 20px;
  right: 20px;
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border-radius: 4px;
  opacity: 0;
  transition: opacity 0.3s ease;
  z-index: 1000;

  &.visible {
    opacity: 1;
  }

  @media (max-width: 768px) {
    right: 10px;
    left: 10px;
    text-align: center;
  }
`;

const DonateOverlay = styled.div<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 16px;
  opacity: ${(props) => (props.isVisible ? 1 : 0)};
  pointer-events: ${(props) => (props.isVisible ? 'auto' : 'none')};
  transition: opacity 0.3s ease;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
`;

const App: React.FC = () => {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [selectedAmounts, setSelectedAmounts] = useState<{
    [key: number]: number;
  }>({});
  const [message, setMessage] = useState<string | null>(null);
  const [visibleOverlay, setVisibleOverlay] = useState<number | null>(null);

  const dispatch = useDispatch();
  const { donate } = useSelector((state: RootState) => state);

  useEffect(() => {
    fetch('http://localhost:3001/charities')
      .then((resp) => resp.json())
      .then((data: Charity[]) => {
        setCharities(data);
        const initialAmounts = data.reduce(
          (acc, charity) => ({ ...acc, [charity.id]: 10 }),
          {}
        );
        setSelectedAmounts(initialAmounts);
      });

    fetch('http://localhost:3001/payments')
      .then((resp) => resp.json())
      .then((data: { amount: number }[]) => {
        dispatch({
          type: 'UPDATE_TOTAL_DONATE',
          amount: summaryDonations(data.map((item) => item.amount)),
        });
      });
  }, [dispatch]);

  const handlePay = (
    id: number,
    amount: number,
    currency: string,
    name: string
  ) => {
    fetch('http://localhost:3001/payments', {
      method: 'POST',
      body: JSON.stringify({ charitiesId: id, amount, currency }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      dispatch({
        type: 'UPDATE_TOTAL_DONATE',
        amount,
      });
      setMessage(`Thank you for donating ${amount} ${currency} to ${name}!`);
      setTimeout(() => setMessage(null), 3000);
      setVisibleOverlay(null);
    });
  };

  const handleAmountChange = (charityId: number, amount: number) => {
    setSelectedAmounts((prev) => ({ ...prev, [charityId]: amount }));
  };

  return (
    <AppContainer>
      <Header>Opn Tamboon React</Header>
      <TotalDonations>Total Donations: {donate}</TotalDonations>
      <CharitiesGrid>
        {charities.map((charity) => (
          <Card key={charity.id}>
            <CardImageContainer>
              <CardImage src={`images/${charity.image}`} alt={charity.name} />
              <DonateOverlay isVisible={visibleOverlay === charity.id}>
                <CloseButton onClick={() => setVisibleOverlay(null)}>
                  ×
                </CloseButton>
                <DonationInstruction>
                  Select the amount to donate (USD)
                </DonationInstruction>
                <DonationAmounts>
                  {[10, 20, 50, 100, 500].map((amount) => (
                    <RadioLabel key={amount}>
                      <RadioInput
                        type="radio"
                        name={`donation-amount-${charity.id}`}
                        value={amount}
                        checked={selectedAmounts[charity.id] === amount}
                        onChange={() => handleAmountChange(charity.id, amount)}
                      />
                      {amount}
                    </RadioLabel>
                  ))}
                </DonationAmounts>
                <DonateButton
                  onClick={() =>
                    handlePay(
                      charity.id,
                      selectedAmounts[charity.id],
                      charity.currency,
                      charity.name
                    )
                  }
                >
                  Pay
                </DonateButton>
              </DonateOverlay>
            </CardImageContainer>
            <CardContent>
              <CharityName>{charity.name}</CharityName>
              <DonateButton onClick={() => setVisibleOverlay(charity.id)}>
                Donate
              </DonateButton>
            </CardContent>
          </Card>
        ))}
      </CharitiesGrid>
      <Message className={message ? 'visible' : ''}>{message}</Message>
    </AppContainer>
  );
};

export default App;
