import styled from 'styled-components';

import { CarouselItemStatusType } from '@/pages/LandingPage/LandingPage.types';

export const ItemLayout = styled.div<{ $status: CarouselItemStatusType }>`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: start;

  width: 16.3rem;
  gap: 1.2rem;
  padding: 1.2rem 2rem;

  border: ${({ $status, theme }) =>
    $status === 'focus' ? `0.15rem solid ${theme.colors.gray100}` : 'none'};
  border-left: none;
  border-right: none;

  transition: all 0.3s ease;
  filter: ${({ $status }) => ($status === 'blur' ? 'blur(0.2rem)' : 'none')};
  opacity: ${({ $status }) => ($status === 'blur' ? 0.3 : 1)};
  ${({ theme }) => theme.fonts.body15};
`;

export const Icon = styled.img`
  width: 24px;
  height: 24px;
`;

export const Text = styled.span`
  ${({ theme }) => theme.fonts.body15Med};
  color: ${({ theme }) => theme.colors.gray950};
`;
