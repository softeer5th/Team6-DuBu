import styled, { keyframes } from 'styled-components';

export const SheetContainer = styled.div`
  position: absolute;
  bottom: 0;
  height: 100%;
`;

export const Backdrop = styled.div`
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  width: 37.5rem; // 반응형 필요
  height: 100%;
`;

export const Sheet = styled.div<{ $isOpen: boolean; $delay: number }>`
  position: absolute;
  width: 37.5rem; // 반응형 필요
  bottom: 0;
  border-radius: 2.4rem 2.4rem 0 0;
  padding: 0 2.4rem 1.6rem 2.4rem;

  background-color: ${({ theme }) => theme.colors.white};

  animation: ${({ $isOpen }) => ($isOpen ? slideUp : slideDown)}
    ${({ $delay }) => `${($delay / 1000).toFixed(1)}s`} ease-out;
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2.4rem;
`;

export const Title = styled.h2`
  ${({ theme }) => theme.fonts.headline18};
  color: ${({ theme }) => theme.colors.gray950};
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  padding-top: 2.4rem;
`;

export const Footer = styled.div`
  display: flex;
  gap: 0.8rem;
  height: 5rem;
`;

export const CancelButton = styled.button`
  flex-grow: 1;
  padding: 1.3rem 0;
  border-radius: 0.8rem;
  ${({ theme }) => theme.fonts.body16};
  color: ${({ theme }) => theme.colors.green600};
  background-color: ${({ theme }) => theme.colors.green50};
`;

export const ConfirmButton = styled.button`
  flex-grow: 1;
  padding: 1.3rem 0;
  border-radius: 0.8rem;
  ${({ theme }) => theme.fonts.body16};
  color: ${({ theme }) => theme.colors.white};
  background-color: ${({ theme }) => theme.colors.green600};

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.green100};
  }
`;

const slideUp = keyframes`
    from {
      transform: translateY(100%);
    }
    to {
      transform: translateY(0);
    }
  `;

const slideDown = keyframes`
    from {
      transform: translateY(0);
    }
    to {
      transform: translateY(100%);
    }
  `;
