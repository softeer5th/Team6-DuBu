import { PropsWithChildren, useState } from 'react';
import { createPortal } from 'react-dom';

import IconButton from '../Button/IconButton';
import Icon from '../Icon';
import * as S from './Toast.styled';

import ToastContext from '@/contexts/ToastContext';

interface Toast {
  id: number;
  message: string;
  isOpen: boolean;
}

const ToastProvider = ({ children }: PropsWithChildren) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = ({ message, duration = 2000 }: { message: string; duration?: number }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, isOpen: true }]);

    setTimeout(() => {
      removeToast(id);
    }, duration);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) => (toast.id === id ? { ...toast, isOpen: false } : toast)),
    );
  };

  const handleAnimationEnd = (id: number, isOpen: boolean) => {
    if (!isOpen) {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
    }
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {createPortal(
        <>
          {toasts.length > 0 && (
            <S.ToastContainer>
              {toasts.map(({ id, message, isOpen }) => (
                <S.ToastItem
                  key={id}
                  $isOpen={isOpen}
                  onAnimationEnd={() => !isOpen && handleAnimationEnd(id, isOpen)}
                >
                  <span>{message}</span>
                  <IconButton
                    icon={<Icon icon="Close" cursor="pointer" />}
                    onClick={() => removeToast(id)}
                    aria-label="닫기"
                  />
                </S.ToastItem>
              ))}
            </S.ToastContainer>
          )}
        </>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
