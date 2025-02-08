import styled from 'styled-components';

export const TimeContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 0.4rem;
  margin-bottom: 1.3rem;
`;

export const TotalTime = styled.span`
  ${({ theme }) => theme.fonts.heading20};
  color: ${({ theme }) => theme.colors.gray900};
`;

export const TotalSectionTimeBox = styled.div`
  ${({ theme }) => theme.fonts.label14Med};
  color: ${({ theme }) => theme.colors.gray500};
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const TotalSectionTime = styled.span`
  color: ${({ theme }) => theme.colors.gray800};
`;
