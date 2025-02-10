import * as S from './RouteItem.styled';

import Icon, { IconType } from '@/components/Icon';

interface RouteItemProps {
  icon: IconType;
  location: string;
  value: string;
}

const RouteItem = ({ icon, location, value }: RouteItemProps) => {
  return (
    <S.RouteItemLayout>
      <S.RouteTitleWrapper>
        <Icon icon={icon} />
        <S.Location>{location}</S.Location>
      </S.RouteTitleWrapper>
      <S.AddressTextWrapper>
        <S.AddressText>{value || '주소 입력'}</S.AddressText>
      </S.AddressTextWrapper>
    </S.RouteItemLayout>
  );
};

export default RouteItem;
