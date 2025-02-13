import styled from 'styled-components';

import { CategoryType } from '@/types/filter';

export const RankWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const CategoryRankItemLayout = styled.div`
  ${({ theme }) => theme.fonts.body16};
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;

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

export const CategoryBadge = styled.span<{ $category: CategoryType }>`
  ${({ theme }) => theme.fonts.caption12Reg};
  display: flex;
  align-items: center;
  justify-content: center;

  border-radius: 0.8rem;
  padding: 0.4rem 0.8rem;

  color: ${({ theme, $category }) => theme.colors[$category]};
  background-color: ${({ theme, $category }) => theme.colors.background[$category]};
`;
