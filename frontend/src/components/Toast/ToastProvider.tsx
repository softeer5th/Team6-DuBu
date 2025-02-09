import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { ToastLayout } from './Toast.styled';

import ToastContext from '@/contexts/ToastContext';

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const toast = ({ message, duration = 2000 }: { message: string; duration?: number }) => {
    setIsOpen(true);
    setMessage(message);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setIsOpen(false);
      setMessage('');
    }, duration);
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {isOpen && createPortal(<ToastLayout $isOpen={isOpen}>{message}</ToastLayout>, document.body)}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
