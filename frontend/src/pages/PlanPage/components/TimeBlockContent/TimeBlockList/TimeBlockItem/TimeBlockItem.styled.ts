import styled from 'styled-components';

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

export const CheckIconWrapper = styled.div<{ $isDone: boolean; $isAnimating: boolean }>`
  position: relative;
  width: 2.4rem;
  height: 2.4rem;

  & > div {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transition:
      opacity 0.5s ease,
      transform 0.5s ease;
  }

  /* EmptyCheck */
  & > div:nth-child(1) {
    opacity: ${({ $isDone, $isAnimating }) => (!$isDone && !$isAnimating ? 1 : 0)};
    transform: scale(${({ $isDone, $isAnimating }) => (!$isDone && !$isAnimating ? 1 : 0.7)});
  }

  /* FilledCheck (0.4초 동안 표시됨) */
  & > div:nth-child(2) {
    opacity: ${({ $isAnimating }) => ($isAnimating ? 1 : 0)};
    transform: scale(${({ $isAnimating }) => ($isAnimating ? 1.1 : 1)});
  }

  /* Category Icon */
  & > div:nth-child(3) {
    opacity: ${({ $isDone }) => ($isDone ? 1 : 0)};
    transform: scale(${({ $isDone }) => ($isDone ? 1 : 1.1)});
  }
`;

export const TimeBlockContent = styled.div`
  display: flex;
  flex-direction: column;
  width: 23.1rem;
  cursor: pointer;
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
