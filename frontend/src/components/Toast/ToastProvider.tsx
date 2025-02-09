import { PropsWithChildren, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

import { ToastLayout } from './Toast.styled';
import IconButton from '../Button/IconButton';
import Icon from '../Icon';

import ToastContext from '@/contexts/ToastContext';

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toastState, setToastState] = useState({
    isOpen: false,
    message: '',
  });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const toast = ({ message, duration = 2000 }: { message: string; duration?: number }) => {
    setToastState((prev) => ({ ...prev, isOpen: true, message }));

    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }

    timerRef.current = setTimeout(() => {
      setToastState((prev) => ({ ...prev, isOpen: false, message: '' }));
    }, duration);
  };

  const close = () => {
    setToastState((prev) => ({ ...prev, isOpen: false, message: '' }));

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
      {toastState.isOpen &&
        createPortal(
          <ToastLayout $isOpen={toastState.isOpen}>
            <span>{toastState.message}</span>
            <IconButton icon={<Icon icon="Close" cursor="pointer" />} onClick={close} />
          </ToastLayout>,
          document.body,
        )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
