import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { formatCurrency, summaryDonations } from './helpers';
import { Charity, RootState } from './types';
import CharityCard from './components/CharityCard';
import Message from './components/Message';

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
      setVisibleOverlay(null);
    });
  };

  const handleAmountChange = (charityId: number, amount: number) => {
    setSelectedAmounts((prev) => ({ ...prev, [charityId]: amount }));
  };

  return (
    <AppContainer>
      <Header>Opn Tamboon React</Header>
      <TotalDonations>Total Donations: {formatCurrency(donate)}</TotalDonations>
      <CharitiesGrid>
        {charities.map((charity) => (
          <CharityCard
            key={charity.id}
            charity={charity}
            isOverlayVisible={visibleOverlay === charity.id}
            selectedAmount={selectedAmounts[charity.id]}
            onDonateClick={() => setVisibleOverlay(charity.id)}
            onCloseOverlay={() => setVisibleOverlay(null)}
            onAmountChange={(amount) => handleAmountChange(charity.id, amount)}
            onPayClick={() =>
              handlePay(
                charity.id,
                selectedAmounts[charity.id],
                charity.currency,
                charity.name
              )
            }
          />
        ))}
      </CharitiesGrid>
      <Message message={message} />
    </AppContainer>
  );
};

export default App;
