import styled from 'styled-components';

export const RouteDetailList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 0.5rem;
`;

export const RouteDetailItem = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
`;

export const DetailItemLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.4rem;
`;

export const DetailItemType = styled.div<{ $color: string }>`
  width: 4rem;
  color: ${({ $color }) => $color};
  ${({ theme }) => theme.fonts.body15Med};
`;

export const DetailItemPath = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.gray500};
  ${({ theme }) => theme.fonts.label14Med};
`;
