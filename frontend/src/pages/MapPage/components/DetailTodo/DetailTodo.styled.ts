import styled from 'styled-components';

export const Nickname = styled.span`
  ${({ theme }) => theme.fonts.headline18};
  color: ${({ theme }) => theme.colors.gray950};
`;

export const DetailTitleItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem;
`;

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const DetailTitle = styled.span`
  ${({ theme }) => theme.fonts.body15};
  color: ${({ theme }) => theme.colors.gray950};
`;
