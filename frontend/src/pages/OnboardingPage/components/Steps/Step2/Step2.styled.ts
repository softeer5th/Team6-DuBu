import styled from 'styled-components';

export const AddressButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

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

  ${({ theme }) => theme.fonts.label13Med};
`;

export const LabelText = styled.span`
  color: ${({ theme }) => theme.colors.green700};
`;
