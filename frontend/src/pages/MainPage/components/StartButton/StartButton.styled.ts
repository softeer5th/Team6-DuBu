import styled from 'styled-components';

export const StartButtonLayout = styled.button`
  ${({ theme }) => theme.fonts.body16};
  background-color: ${({ theme }) => theme.colors.green600};
  color: ${({ theme }) => theme.colors.white};

  display: flex;
  padding: 1.5rem 3rem;
  gap: 0.4rem;
  border-radius: 3.2rem;

  position: absolute;
  bottom: 1.6rem;
`;
