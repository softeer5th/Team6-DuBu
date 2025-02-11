import styled from 'styled-components';

export const RouteSelectPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.green50};
  gap: 2rem;
`;
