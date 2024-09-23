import React, { useEffect, useState } from 'react';
import { MessageContainer } from './styles';

export interface MessageProps {
  message: string | null;
  duration?: number;
}

export const Message: React.FC<MessageProps> = ({
  message,
  duration = 3000,
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        setIsVisible(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  if (!message) return null;

  return <MessageContainer isVisible={isVisible}>{message}</MessageContainer>;
};
