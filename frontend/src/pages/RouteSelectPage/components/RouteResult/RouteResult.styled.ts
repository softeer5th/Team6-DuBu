import styled from 'styled-components';

export const RouteResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.white};
  flex-grow: 1;
  border-radius: 3.2rem 3.2rem 0 0;
  overflow: hidden;
`;

export const StartButton = styled.button`
  position: fixed;
  bottom: 2.5rem;
  left: 50%;
  transform: translateX(-50%);
  width: calc(100% - 3.2rem);
  max-width: 32.7rem;
  ${({ theme }) => theme.fonts.body15Med};
  color: ${({ theme }) => theme.colors.white};
  border-radius: 0.8rem;
  padding: 1.6rem;
  background-color: ${({ theme }) => theme.colors.green600};
  box-shadow:
    0 0.6rem 1.2rem rgba(0, 0, 0, 0.2),
    0 1rem 2rem rgba(0, 0, 0, 0.15);
`;
