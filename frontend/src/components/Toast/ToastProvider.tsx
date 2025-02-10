import { PropsWithChildren, useRef, useState } from 'react';
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
  const toastTimers = useRef(new Map<number, NodeJS.Timeout>());

  const toast = ({ message, duration = 2000 }: { message: string; duration?: number }) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message, isOpen: true }]);

    const timer = setTimeout(() => {
      removeToast(id);
    }, duration);

    toastTimers.current.set(id, timer);
  };

  const removeToast = (id: number) => {
    setToasts((prevToasts) =>
      prevToasts.map((toast) => (toast.id === id ? { ...toast, isOpen: false } : toast)),
    );

    if (toastTimers.current.has(id)) {
      clearTimeout(toastTimers.current.get(id)!);
      toastTimers.current.delete(id);
    }
  };

  const handleAnimationEnd = (id: number, isOpen: boolean) => {
    if (!isOpen) {
      setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));

      if (toastTimers.current.has(id)) {
        clearTimeout(toastTimers.current.get(id));
        toastTimers.current.delete(id);
      }
    }
  };

  return (
    <ToastContext.Provider value={{ toast }}>
      {children}
      {createPortal(
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
        </S.ToastContainer>,
        document.body,
      )}
    </ToastContext.Provider>
  );
};

export default ToastProvider;
