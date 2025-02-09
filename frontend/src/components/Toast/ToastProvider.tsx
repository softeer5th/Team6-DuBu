import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { ToastLayout } from './Toast.styled';
import IconButton from '../Button/IconButton';
import Icon from '../Icon';

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

  const close = () => {
    setIsOpen(false);
    setMessage('');

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
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
      {isOpen &&
        createPortal(
          <ToastLayout $isOpen={isOpen}>
            <span>{message}</span>
            <IconButton icon={<Icon icon="Close" cursor="pointer" />} onClick={close} />
          </ToastLayout>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
