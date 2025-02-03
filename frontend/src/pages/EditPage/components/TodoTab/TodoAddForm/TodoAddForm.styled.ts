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
`;

export const HiddenInput = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 1px;
`;

export const RadioBadge = styled.span<{ $isSelected: boolean }>`
  ${({ theme }) => theme.fonts.label14Reg};

  padding: 0.5rem 1.2rem;
  border-radius: 0.8rem;

  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.white : theme.colors.gray50};

  color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.green700 : theme.colors.gray700};

  outline: ${({ theme, $isSelected }) =>
    $isSelected ? `0.1rem solid ${theme.colors.green600}` : 'none'};

  cursor: pointer;

  transition:
    background-color 0.2s,
    color 0.2s;
`;

export const RadioGroupWrapper = styled.div`
  display: flex;
  gap: 1.3rem 0.8rem;
  width: 20rem;
  flex-wrap: wrap;
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
`;
