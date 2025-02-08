import { Link } from 'react-router';
import styled from 'styled-components';

import IconButton from '@/components/Button/IconButton';

export const PlanPageLayout = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  overflow-y: scroll;
`;

// PlanHeader (이동 정보)
export const PlanHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.8rem;
  padding: 0 2.4rem;
`;

export const TimeInfoHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
`;

export const TimeWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const TotalUsableTimeWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.4rem;
`;

export const TotalUsableTime = styled.span`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  ${({ theme }) => theme.fonts.title32};
  color: ${({ theme }) => theme.colors.green600};
`;

export const TotalUsableTimeText = styled.span`
  ${({ theme }) => theme.fonts.body16};
  color: ${({ theme }) => theme.colors.green500};
`;

export const DateHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  ${({ theme }) => theme.fonts.label14Med};
  color: ${({ theme }) => theme.colors.gray500};
`;

export const VerticalLine = styled.span`
  position: relative;

  &::after {
    content: '';
    width: 0.15rem;
    height: 1.8rem;
    position: absolute;
    top: 50%;
    right: 0;
    transform: translateY(-50%);
    background-color: ${({ theme }) => theme.colors.gray200};
  }

  &:last-child::after {
    display: none;
  }
`;

export const MapLink = styled(Link)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 0.8rem;

  ${({ theme }) => theme.fonts.body15};
  color: ${({ theme }) => theme.colors.green400};
  background-color: ${({ theme }) => theme.colors.green50};

  padding: 1.2rem 0.8rem;
  border-radius: 1.2rem;
`;

export const HorizontalLine = styled.div`
  width: 100%;
  height: 1.2rem;
  background-color: ${({ theme }) => theme.colors.gray50};
`;

// PlanContent (타임 블럭)
export const PlanContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  overflow-y: scroll;
`;

export const RouteContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 2.4rem;
`;

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

export const RouteTodoContentContainer = styled.div`
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

export const TimeBlockList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  overflow: hidden;
`;

export const TimeBlockItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.2rem;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    right: 0;
    bottom: -1.2rem;
    height: 0.15rem;
    background-color: ${({ theme }) => theme.colors.gray100};
  }

  &:last-child::after {
    content: none;
  }
`;

export const TimeBlockContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 23.1rem;
`;

export const TodoTitle = styled.span`
  ${({ theme }) => theme.fonts.body15};
  color: ${({ theme }) => theme.colors.gray950};
`;

export const TodoMemo = styled.span`
  ${({ theme }) => theme.fonts.caption12Reg};
  color: ${({ theme }) => theme.colors.gray300};

  /* 말줄임표 처리 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// 이동 완료 버튼
export const FinishButtonWrapper = styled.div`
  position: absolute;
  bottom: 0;

  display: flex;
  justify-content: center;
  width: 100%;
  height: 13.9rem;
  background: linear-gradient(
    to bottom,
    ${({ theme }) => theme.colors.lightWhite},
    ${({ theme }) => theme.colors.white}
  );
`;

export const FinishButton = styled.button`
  position: absolute;
  bottom: 1.6rem;

  display: flex;
  padding: 1.5rem 3rem;
  gap: 0.4rem;
  border-radius: 3.2rem;

  ${({ theme }) => theme.fonts.body16};
  background-color: ${({ theme }) => theme.colors.green600};
  color: ${({ theme }) => theme.colors.white};
`;
