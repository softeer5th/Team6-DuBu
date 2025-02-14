import styled from 'styled-components';

import { CategoryType } from '@/types/filter';

export const TodoEditItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem 2.4rem;

  border-bottom: 0.15rem solid ${({ theme }) => theme.colors.gray50};
`;

export const TodoTextWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 0.8rem;
`;

export const TodoTitle = styled.h3<{ $disabled?: boolean }>`
  ${({ theme }) => theme.fonts.body16};
  color: ${({ theme, $disabled }) => ($disabled ? theme.colors.gray400 : theme.colors.gray950)};
`;

export const TodoBadgeWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
`;

export const TodoBadge = styled.span<{ $category?: CategoryType }>`
  ${({ theme }) => theme.fonts.caption12Reg};
  color: ${({ theme, $category }) => ($category ? theme.colors[$category] : theme.colors.OTHERS)};
  background-color: ${({ theme, $category }) =>
    $category ? theme.colors.background[$category] : theme.colors.gray100};

  padding: 0.4rem 0.8rem;
  border-radius: 0.8rem;
`;
