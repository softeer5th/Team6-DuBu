import RouteResult from './components/RouteResult';
import RouteSelectTop from './components/RouteSelectTop';
import * as S from './RouteSelectPage.styled';

const RouteSelectPage = () => {
  return (
    <S.RouteSelectPageContainer>
      <RouteSelectTop />
      <RouteResult />
    </S.RouteSelectPageContainer>
  );
};

export default RouteSelectPage;
