import styled from 'styled-components';

export const CategoryWrapper = styled.div`
  display: flex;
  gap: 1.6rem;
  width: 29.8rem;
  height: 23.7rem;
`;

export const CategoryColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
  flex-grow: 1;
  width: 50%;
`;

export const CategoryItem = styled.div<{ $isSelected: boolean; $bgImage: string }>`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  background-image: url(${(props) => props.$bgImage});
  background-size: cover;
  background-position: center;
  border-radius: 1.2rem;
  border: 0.15rem solid
    ${({ $isSelected, theme }) => ($isSelected ? theme.colors.gray600 : theme.colors.gray100)};
  opacity: ${({ $isSelected }) => ($isSelected ? 1 : 0.4)};
  ${({ theme }) => theme.fonts.label14Med};
  color: ${({ theme }) => theme.colors.gray950};
`;
