import styled from 'styled-components';

export const StartTimeBox = styled.div`
  ${({ theme }) => theme.fonts.label14Med};
  color: ${({ theme }) => theme.colors.gray500};
  padding: 1.2rem 2.4rem;
  border-bottom: 0.4rem solid ${({ theme }) => theme.colors.gray50};
`;
