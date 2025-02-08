import { Outlet } from 'react-router';
import styled from 'styled-components';

const FlexPageLayout = () => {
  return (
    <FlexLayout>
      <Outlet />
    </FlexLayout>
  );
};

export default FlexPageLayout;

const FlexLayout = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;
