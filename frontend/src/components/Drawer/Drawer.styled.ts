import styled from 'styled-components';

export const DrawerLayout = styled.div<{ $isOpen: boolean }>`
  position: fixed;
  top: 0;
  bottom: 0;
  right: 50%;
  transform: translateX(50%);
  width: 37.5rem;
  overflow: hidden;

  height: 100vh;

  z-index: 5;
  visibility: ${({ $isOpen }) => ($isOpen ? 'visible' : 'hidden')};
  opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};

  transition:
    visibility 0.3s ease-in-out,
    opacity 0.3s ease-in-out;
`;

export const Overlay = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
`;

export const Content = styled.div<{ $isOpen: boolean }>`
  position: absolute;
  top: 0;
  right: 0;

  width: 22.5rem;
  height: 100%;
  padding: 2rem 2.8rem;

  background-color: ${({ theme }) => theme.colors.white};
  border-radius: 0 0 0 3.2rem;

  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  transform: translateX(${({ $isOpen }) => ($isOpen ? '0' : '100%')});
  transition: transform 0.3s ease-in-out;
  will-change: transform;
`;

export const MenuList = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100%;
  gap: 1rem;
`;

export const MenuItem = styled.li`
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
    background-color: ${({ theme }) => theme.colors.gray100};

    position: absolute;
    bottom: 0;
    left: 0;
  }

  a {
    display: block;
  }
`;
