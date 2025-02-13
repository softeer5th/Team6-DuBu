import styled from 'styled-components';

export const CategoryRankLayout = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const CategoryRankHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;

export const HeaderTitle = styled.div`
  display: flex;
  flex-direction: column;

  ${({ theme }) => theme.fonts.headline18};
  color: ${({ theme }) => theme.colors.gray950};
`;

export const SloganWrapper = styled.p`
  ${({ theme }) => theme.fonts.label14Med};
  color: ${({ theme }) => theme.colors.gray900};

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem 0;
  background-color: ${({ theme }) => theme.colors.gray50};
  border-radius: 0.8rem;
  text-align: center;
`;

export const CategoryRankList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 3.2rem;

  padding: 0 2.4rem;
`;
