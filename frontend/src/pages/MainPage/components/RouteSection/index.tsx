import RouteItem from './RouteItem';
import * as S from './RouteSection.styled';

import Icon from '@/components/Icon';

const RouteSection = () => {
  return (
    <S.RouteSectionLayout>
      <RouteItem icon="AddressHome" location="집" value="주소 입력" />
      <S.IconWrapper>
        <Icon icon="Switch" width={36} height={36} />
      </S.IconWrapper>
      <RouteItem icon="AddressUniv" location="학교" value="주소 입력" />
    </S.RouteSectionLayout>
  );
};

export default RouteSection;
