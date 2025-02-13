import styled from 'styled-components';

export const FavoriteTabLayout = styled.ul`
  background-color: ${({ theme }) => theme.colors.white};
  display: flex;
  flex-direction: column;

  border-top: 0.15rem solid ${({ theme }) => theme.colors.gray50};
  border-bottom: 0.15rem solid ${({ theme }) => theme.colors.gray50};
`;
