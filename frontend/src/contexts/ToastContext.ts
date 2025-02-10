import { createContext } from 'react';

interface ToastContext {
  toast: ({ message, duration }: { message: string; duration?: number }) => void;
}

const ToastContext = createContext<ToastContext | null>(null);

export default ToastContext;
