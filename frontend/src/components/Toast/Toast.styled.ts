import styled, { keyframes } from 'styled-components';

export const ToastLayout = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  bottom: 1.6rem;
  left: 50%;
  transform: translateX(-50%);

  width: 87.2%;
  padding: 1.4rem 1.6rem;
  border-radius: 0.8rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  ${({ theme }) => theme.fonts.body15Med};
  color: ${({ theme }) => theme.colors.gray950};
  background-color: ${({ theme }) => theme.colors.white};
  border: 0.1rem solid ${({ theme }) => theme.colors.gray300};

  animation: ${({ $isOpen }) => ($isOpen ? fadeIn : fadeOut)} 0.3s ease forwards;
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
