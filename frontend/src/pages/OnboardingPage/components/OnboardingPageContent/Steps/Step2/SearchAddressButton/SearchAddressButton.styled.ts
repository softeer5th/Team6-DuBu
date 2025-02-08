import styled from 'styled-components';

export const AddressButton = styled.button`
  display: flex;
  align-items: center;
  padding: 1.2rem;
  border: 0.15rem solid ${({ theme }) => theme.colors.gray200};
  border-radius: 1.2rem;
  width: 30.3rem;

  ${({ theme }) => theme.fonts.label14Reg};
  color: ${({ theme }) => theme.colors.gray400};
  gap: 0.6rem;
`;

export const ButtonLabel = styled.div`
  width: 5.4rem;
  display: flex;
  align-items: center;
  gap: 0.4rem;
  flex-shrink: 0;

  ${({ theme }) => theme.fonts.label13Med};
`;

export const LabelText = styled.span`
  color: ${({ theme }) => theme.colors.green700};
`;

export const AddressText = styled.span`
  color: ${({ theme }) => theme.colors.gray400};
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  flex-shrink: 1;
`;
