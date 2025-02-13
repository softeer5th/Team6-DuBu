import styled from 'styled-components';

import IconButton from '@/components/Button/IconButton';
import { CategoryType } from '@/types/filter';

export const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`;

export const HeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightWhite30};
  backdrop-filter: blur(2px);

  z-index: 2;
`;

export const FilterBadgeWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  width: 100vw;
  overflow-x: scroll;
  padding: 1rem;
`;

export const FilterBadge = styled.button<{ $isSelected: boolean; $category: CategoryType }>`
  ${({ theme }) => theme.fonts.caption11};
  display: flex;
  align-items: center;
  justify-content: center;

  height: 2.2rem;
  white-space: nowrap;

  padding: 0.5rem 1.2rem;
  border-radius: 0.8rem;

  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.white : theme.colors.gray50};

  color: ${({ theme, $isSelected, $category }) =>
    $isSelected ? theme.colors[$category] : theme.colors.gray700};

  outline: ${({ theme, $isSelected, $category }) =>
    $isSelected ? `0.15rem solid ${theme.colors[$category]}` : 'none'};

  cursor: pointer;

  transition:
    background-color 0.2s,
    color 0.2s;
`;

export const CurrentLocationButton = styled(IconButton)`
  position: absolute;
  bottom: 1rem;
  right: 1rem;
  z-index: 2;

  background-color: ${({ theme }) => theme.colors.white};
  padding: 1.2rem;
  border-radius: 50%;
  box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.2);
`;
