import styled from 'styled-components';

import IconButton from '@/components/Button/IconButton';

export const TimeBlockContentSection = styled.section`
  display: flex;
`;

export const TransportBarWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  width: 2.4rem;
  min-height: 21.1rem;
`;

export const TransportBar = styled.div<{ $trafficType: 'Subway' | 'Bus' }>`
  display: flex;
  align-items: center;

  width: 0.4rem;
  height: 100%;
  background-color: ${({ theme, $trafficType }) => theme.colors[$trafficType]};

  border-radius: 0 0 0.4rem 0.4rem;
`;

export const TimeBlockContainer = styled.div`
  padding: 0.8rem 0;
  flex-grow: 1;
`;

export const TimeBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 1.6rem;
  min-height: 19.5rem;
  max-height: 69.1rem;

  padding: 1.6rem 1.2rem;
  border-radius: 1.2rem;
  border: 0.15rem solid ${({ theme }) => theme.colors.gray100};
`;

export const TimeBlockHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const SectionTime = styled.span`
  ${({ theme }) => theme.fonts.body15};
  color: ${({ theme }) => theme.colors.Subway};
  opacity: 0.7;
`;

export const EditButton = styled(IconButton)`
  color: ${({ theme }) => theme.colors.gray600};
  gap: 0.4rem;

  span {
    ${({ theme }) => theme.fonts.label13};
  }
`;
