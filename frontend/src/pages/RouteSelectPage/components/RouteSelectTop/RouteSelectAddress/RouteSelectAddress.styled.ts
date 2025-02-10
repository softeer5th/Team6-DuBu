import styled from 'styled-components';

export const AddressList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 0 3.6rem;
  gap: 0.4rem;
`;

export const AddressItem = styled.div`
  display: flex;
  width: 100%;
  gap: 0.8rem;
  padding: 1.2rem;
`;

export const AddressLabel = styled.div`
  display: flex;
  align-items: center;
  width: 5.4rem;
  gap: 0.4rem;
`;

export const AddressLabelText = styled.div`
  color: ${({ theme }) => theme.colors.gray500};
  ${({ theme }) => theme.fonts.body15};
`;

export const AddressValue = styled.div`
  color: ${({ theme }) => theme.colors.gray400};
  ${({ theme }) => theme.fonts.body15Med};
`;

export const Divider = styled.div`
  height: 0.15rem;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.gray200};
`;
