import styled from 'styled-components';

export const DateHeaderLayout = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.8rem;
  color: ${({ theme }) => theme.colors.gray800};
  ${({ theme }) => theme.fonts.body15};
  word-spacing: 0.8rem;
`;

export const EmptyDateHeader = styled.header`
  width: 2.4rem;
  height: 2.4rem;
`;
