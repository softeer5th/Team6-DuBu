import styled from 'styled-components';

export const DrawerLayout = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 50%;
  transform: translateX(50%);
  width: 37.5rem;
  overflow: hidden;

  z-index: ${({ $isOpen }) => ($isOpen ? 5 : -1)};
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
`;

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.3);
`;

export const Content = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  right: 0;

  width: 22.5rem;
  height: 100%;
  padding: 2rem 2.8rem;

  background: ${({ theme }) => theme.colors.white};
  border-radius: 0 0 0 1.2rem;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  will-change: transform;
`;

export const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 1rem;
`;

export const Button = styled.button`
  width: 100%;
  text-align: left;
  ${({ theme }) => theme.fonts.body16};
  font-weight: 500;

  position: relative;
  padding-bottom: 1rem;

  &:not(:last-child)::after {
    content: '';
    display: block;
    width: 100%;
    height: 0.15rem;
    background: ${({ theme }) => theme.colors.gray100};

    position: absolute;
    bottom: 0;
    left: 0;
  }
`;
