import styled from 'styled-components';

export const InputMessageContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export const NicknameInput = styled.input`
  border: 0.15rem solid ${({ theme }) => theme.colors.gray200};
  border-radius: 1.2rem;
  padding: 1.2rem;
  width: 30.3rem;
  height: 5rem;

  &:focus {
    border-color: ${({ theme }) => theme.colors.green700};
    outline: none;
  }
`;

export const WarningText = styled.span<{ $status: string }>`
  ${({ theme }) => theme.fonts.caption12Reg};
  padding: 0 1.4rem;
  color: ${({ $status, theme }) =>
    $status === 'ERROR'
      ? theme.colors.textRed
      : $status === 'VALID'
        ? theme.colors.green700
        : theme.colors.gray700};
`;
