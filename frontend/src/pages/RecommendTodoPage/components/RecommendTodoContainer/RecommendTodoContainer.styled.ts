import styled from 'styled-components';

import IconButton from '@/components/Button/IconButton';

export const RecommendTodoLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export const RecommendTabList = styled.ul`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: scroll;

  border-top: 0.15rem solid ${({ theme }) => theme.colors.gray50};
  border-bottom: 0.15rem solid ${({ theme }) => theme.colors.gray50};
`;

export const IconButtonWrapper = styled(IconButton)<{ $isSelected: boolean }>`
  gap: 0.4rem;
  padding: 0.4rem 0.8rem;
  border-radius: 0.8rem;
  border: 0.1rem solid
    ${({ theme, $isSelected }) => ($isSelected ? theme.colors.green600 : theme.colors.gray300)};
  background-color: ${({ theme }) => theme.colors.white};

  span {
    ${({ theme }) => theme.fonts.label14Semi};
    color: ${({ theme, $isSelected }) =>
      $isSelected ? theme.colors.green700 : theme.colors.gray600};
  }
`;

export const FilterWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  padding: 0.5rem 2.4rem;
`;
