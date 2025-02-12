import styled from 'styled-components';

export const TodoInputWrapper = styled.div`
  display: flex;
  align-items: center;

  gap: 0.8rem;
  padding: 0 0.1rem;
`;

export const TodoInputLabel = styled.span`
  width: 4.8rem;
  display: flex;
  ${({ theme }) => theme.fonts.body15Med};
  color: ${({ theme }) => theme.colors.gray950};
`;

export const TodoInput = styled.input`
  flex-grow: 1;

  background-color: ${({ theme }) => theme.colors.gray50};
  border-radius: 0.8rem;
  padding: 1.2rem;

  &:focus {
    outline: 0.1rem solid ${({ theme }) => theme.colors.green600};
    background-color: ${({ theme }) => theme.colors.white};
  }

  &:disabled {
    opacity: 0.9;
    cursor: not-allowed;
  }
`;

export const MemoTextarea = styled.textarea`
  flex-grow: 1;

  background-color: ${({ theme }) => theme.colors.gray50};
  border-radius: 0.8rem;
  padding: 1.2rem;

  &:focus {
    outline: 0.1rem solid ${({ theme }) => theme.colors.green600};
    background-color: ${({ theme }) => theme.colors.white};
  }

  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;
