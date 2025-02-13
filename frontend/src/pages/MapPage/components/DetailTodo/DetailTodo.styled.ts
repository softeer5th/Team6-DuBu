import styled from 'styled-components';

export const Nickname = styled.span`
  ${({ theme }) => theme.fonts.headline18};
  color: ${({ theme }) => theme.colors.gray950};
`;

export const DetailTodoList = styled.div`
  display: flex;
  flex-direction: column;
  max-height: 14.4rem;
  overflow-y: scroll;
`;

export const DetailTodoItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.2rem 0;
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
