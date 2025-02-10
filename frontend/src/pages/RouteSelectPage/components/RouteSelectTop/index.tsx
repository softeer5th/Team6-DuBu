import RouteSelectAddress from './RouteSelectAddress';
import RouteSelectHeader from './RouteSelectHeader';
import * as S from './RouteSelectTop.styled';

const RouteSelectTop = () => {
  return (
    <S.RouteSelectTopLayout>
      <RouteSelectHeader />
      <RouteSelectAddress />
    </S.RouteSelectTopLayout>
  );
};

export default RouteSelectTop;
