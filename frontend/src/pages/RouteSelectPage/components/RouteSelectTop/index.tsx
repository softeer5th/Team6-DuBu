import styled from 'styled-components';

import RouteSelectAddress from './RouteSelectAddress';
import RouteSelectHeader from './RouteSelectHeader';

const RouteSelectTop = () => {
  return (
    <RouteSelectTopLayout>
      <RouteSelectHeader />
      <RouteSelectAddress />
    </RouteSelectTopLayout>
  );
};

const RouteSelectTopLayout = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;
  width: 100%;
`;

export default RouteSelectTop;
