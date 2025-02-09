import styled, { keyframes } from 'styled-components';

export const ToastLayout = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  bottom: 4.4rem;
  left: 50%;
  padding: 1rem 2rem;
  border-radius: 3.2rem;

  background-color: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.gray300};

  color: black;
  font-size: 1.2rem;

  animation: ${({ $isOpen }) => ($isOpen ? fadeIn : fadeOut)} 0.5s ease forwards;
  transform: translateX(-50%);
  box-shadow: 0 0.2rem 0.4rem rgb(0 0 0 / 20%);
  transition: opacity 0.3s ease-in-out;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(1rem);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
`;

const fadeOut = keyframes`
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(0);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(1rem);
  }
`;
