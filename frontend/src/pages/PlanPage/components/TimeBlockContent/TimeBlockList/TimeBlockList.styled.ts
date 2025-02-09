import styled from 'styled-components';

export const TimeBlockList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.4rem;
  overflow: hidden;
`;

export const TimeBlockItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 1.2rem;

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

export const TimeBlockContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 23.1rem;
`;

export const TodoTitle = styled.span`
  ${({ theme }) => theme.fonts.body15};
  color: ${({ theme }) => theme.colors.gray950};
`;

export const TodoMemo = styled.span`
  ${({ theme }) => theme.fonts.caption12Reg};
  color: ${({ theme }) => theme.colors.gray300};

  /* 말줄임표 처리 */
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;
