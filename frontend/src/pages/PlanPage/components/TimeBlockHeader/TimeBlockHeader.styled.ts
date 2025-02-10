import styled from 'styled-components';

export const TransportHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;
`;

export const TransportIconWrapper = styled.div<{ $trafficType: 'Subway' | 'Bus' }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;

  background-color: ${({ theme, $trafficType }) => theme.colors[$trafficType]};
  border-radius: 0.8rem;
  padding: 0.4rem;

  color: ${({ theme }) => theme.colors.white};
`;

export const SubwayNumber = styled.span`
  ${({ theme }) => theme.fonts.label14Semi};
  color: ${({ theme }) => theme.colors.white};
  line-height: inherit;
`;

export const TransportType = styled.span<{ $trafficType: 'Subway' | 'Bus' }>`
  flex-grow: 1;
  ${({ theme }) => theme.fonts.label14Med};
  color: ${({ theme, $trafficType }) => theme.colors[$trafficType]};
`;
