import styled from 'styled-components';

import { Tab } from '@/components/Tab';

export const RouteTodoEditLayout = styled.div`
  background-color: ${({ theme }) => theme.colors.green500};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
`;

export const InfoSection = styled.section`
  height: 11.8rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 1.2rem;
`;

export const InfoWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
`;

export const SectionTimeWrapper = styled.div`
  display: flex;
  align-items: flex-end;
  gap: 0.2rem;
`;

export const DifficultyWRapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.4rem;
  ${({ theme }) => theme.fonts.label14Med};
  color: ${({ theme }) => theme.colors.gray100};
`;

export const Badge = styled.span`
  ${({ theme }) => theme.fonts.caption12Semi};
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.OTHERS};
  padding: 0.4rem 0.8rem;
  border-radius: 0.8rem;
`;

export const SectionTime = styled.span`
  ${({ theme }) => theme.fonts.title32};
  color: ${({ theme }) => theme.colors.white};
`;

export const UnitTimeText = styled.span`
  ${({ theme }) => theme.fonts.body16};
  color: ${({ theme }) => theme.colors.gray200};
`;

export const TabList = styled(Tab.List)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 4.8rem;

  border-radius: 0.8rem 0.8rem 0 0;
  background-color: white;

  button {
    border-radius: 4rem;
    ${({ theme }) => theme.fonts.body15};

    color: ${({ theme }) => theme.colors.gray400};

    &[data-state='active'] {
      color: ${({ theme }) => theme.colors.green700};
    }
  }
`;

export const TabContent = styled(Tab.Content)`
  background-color: ${({ theme }) => theme.colors.gray50};
  flex: 1;
  overflow-y: scroll;
`;
