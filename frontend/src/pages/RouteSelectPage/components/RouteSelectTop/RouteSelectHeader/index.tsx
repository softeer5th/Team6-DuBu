import { useNavigate } from 'react-router';

import Header from '@/components/Header';

const RouteSelectHeader = () => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate('/');
  };

  return (
    <Header>
      <Header.Left>
        <Header.BackButton onClick={goToMain} />
      </Header.Left>
      <Header.Center>
        <Header.Title>경로 선택하기</Header.Title>
      </Header.Center>
    </Header>
  );
};

export default RouteSelectHeader;
