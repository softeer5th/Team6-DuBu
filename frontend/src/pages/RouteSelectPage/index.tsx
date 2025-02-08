import styled from 'styled-components';

import RouteResult from './components/RouteResult';
import RouteSelectTop from './components/RouteSelectTop';

const RouteSelectPage = () => {
  return (
    <RouteSelectPageContainer>
      <RouteSelectTop />
      <RouteResult />
    </RouteSelectPageContainer>
  );
};

const RouteSelectPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.colors.green50};
  gap: 2rem;
`;

export default RouteSelectPage;
