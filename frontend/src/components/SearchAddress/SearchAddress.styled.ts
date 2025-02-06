import styled from 'styled-components';

export const SearchAddressLayout = styled.div`
  background-color: ${({ theme }) => theme.colors.green50};
  position: fixed;
  top: 0;
  width: 37.5rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4rem;
`;

export const TopContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 0.6rem;
`;
