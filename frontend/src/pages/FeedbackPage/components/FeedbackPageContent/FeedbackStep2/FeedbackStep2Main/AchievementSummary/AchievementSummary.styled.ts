import styled from 'styled-components';

export const SummaryBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.4rem;
  ${({ theme }) => theme.fonts.headline17};
  color: ${({ theme }) => theme.colors.gray950};
`;

export const SummaryText = styled.span`
  display: flex;
  align-items: center;
`;

export const SummaryKeyword = styled.span`
  ${({ theme }) => theme.fonts.title32};
  color: ${({ theme }) => theme.colors.green700};
  margin: 0 0.3rem;
`;
