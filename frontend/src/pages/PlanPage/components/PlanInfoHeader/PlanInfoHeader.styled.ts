import { Link } from 'react-router';
import styled from 'styled-components';

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
