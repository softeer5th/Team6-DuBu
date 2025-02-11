import styled from 'styled-components';

export const TimeBlockList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  overflow: hidden;
`;

export const EmptyTimeBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.6rem;
`;

export const EmptyTimeBlockText = styled.span`
  ${({ theme }) => theme.fonts.body16};
  color: ${({ theme }) => theme.colors.gray600};
`;
