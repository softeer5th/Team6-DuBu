import styled from 'styled-components';

export const ButtonLayout = styled.button`
  display: flex;
  align-items: center;
  padding: 1.1rem 1.4rem;
  background-color: #fee500;
  color: #000000;
  border: none;
  ${({ theme }) => theme.fonts.body15Med};
  border-radius: 0.6rem;
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  padding: 0 2.4rem;
  gap: 0.8rem;
`;
