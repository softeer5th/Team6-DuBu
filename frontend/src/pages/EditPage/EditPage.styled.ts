import styled from 'styled-components';

import { Tab } from '@/components/Tab';

export const EditLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const TabContent = styled(Tab.Content)`
  background-color: ${({ theme }) => theme.colors.gray50};
  flex: 1;
  overflow-y: scroll;
`;

export const TabList = styled(Tab.List)`
  display: flex;
  align-items: center;
  justify-content: space-around;
  height: 4.8rem;

  button {
    ${({ theme }) => theme.fonts.body15};

    color: ${({ theme }) => theme.colors.gray400};

    &[data-state='active'] {
      color: ${({ theme }) => theme.colors.green700};
    }
  }
`;
