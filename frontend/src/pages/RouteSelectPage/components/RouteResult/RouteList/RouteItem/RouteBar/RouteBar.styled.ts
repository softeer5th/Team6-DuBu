import styled from 'styled-components';

export const RouteBarContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 0.4rem;
  background-color: ${({ theme }) => theme.colors.gray200};
  border-radius: 0.4rem;
  margin-bottom: 1.6rem;
`;

export const RouteItem = styled.div<{ $barWidth: number }>`
  display: flex;
  position: relative;
  flex-direction: row;
  width: ${({ $barWidth }) => $barWidth}%;
  height: 0.4rem;
`;

export const IconWrapper = styled.div<{ $color: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: -1rem;
  width: 2.4rem;
  height: 2.4rem;
  background-color: ${({ $color }) => $color};
  border-radius: 0.8rem;
`;

export const RouteProgressBar = styled.div<{ $isTraffic: boolean; $color: string }>`
  width: 100%;
  height: 100%;
  background: ${({ $isTraffic, $color }) => ($isTraffic ? $color : 'transparent')};
  border-radius: 0.4rem;
`;
