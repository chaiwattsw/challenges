import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { summaryDonations } from './helpers';

// Define types
interface Charity {
  id: number;
  name: string;
  currency: string;
}

interface RootState {
  donate: number;
  message: string;
}

const Card = styled.div`
  margin: 10px;
  border: 1px solid #ccc;
`;

const App: React.FC = () => {
  const [charities, setCharities] = useState<Charity[]>([]);
  const [selectedAmount, setSelectedAmount] = useState<number>(10);

  const dispatch = useDispatch();
  const { donate, message } = useSelector((state: RootState) => state);

  useEffect(() => {
    fetch('http://localhost:3001/charities')
      .then((resp) => resp.json())
      .then((data: Charity[]) => {
        setCharities(data);
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

  const handlePay = (id: number, amount: number, currency: string) => {
    // Implementation of handlePay function
    fetch('http://localhost:3001/payments', {
      method: 'POST',
      body: JSON.stringify({ charitiesId: id, amount, currency }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  };

  const style = {
    color: 'red',
    margin: '1em 0',
    fontWeight: 'bold',
    fontSize: '16px',
    textAlign: 'center',
  } as const;

  return (
    <div>
      <h1>Tamboon React</h1>
      <p>All donations: {donate}</p>
      <p style={style}>{message}</p>
      {charities.map((item, i) => (
        <Card key={i}>
          <p>{item.name}</p>
          {[10, 20, 50, 100, 500].map((amount, j) => (
            <label key={j}>
              <input
                type="radio"
                name="payment"
                onClick={() => setSelectedAmount(amount)}
              />
              {amount}
            </label>
          ))}
          <button
            onClick={() => handlePay(item.id, selectedAmount, item.currency)}
          >
            Pay
          </button>
        </Card>
      ))}
    </div>
  );
};

export default App;
