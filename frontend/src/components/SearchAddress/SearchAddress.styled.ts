import styled from 'styled-components';

import IconButton from '../Button/IconButton';

export const SearchAddressLayout = styled.div`
  background-color: ${({ theme }) => theme.colors.green50};
  position: fixed;
  top: 0;
  width: 37.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 2rem;
  padding: 2rem 0 4rem 0;
`;

export const ShortcutButtonContainer = styled.div`
  display: flex;
  gap: 2.4rem;
  align-self: flex-start;
  padding-left: 3.6rem;
`;

export const IconButtonWrapper = styled(IconButton)`
  display: flex;
  gap: 0.4rem;
  color: ${({ theme }) => theme.colors.green500};
`;
