import * as S from './RouteItem.styled';

import Icon, { IconType } from '@/components/Icon';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';
import { colors } from '@/styles/theme';

const EMPTY_ADDRESS = '-';
interface RouteItemProps {
  icon: IconType;
  location: string;
  value: string;
}

const RouteItem = ({ icon, location, value = '주소 입력' }: RouteItemProps) => {
  const { isToday } = useQueryParamsDate();

  return (
    <S.RouteItemLayout $isToday={isToday}>
      <S.RouteTitleWrapper>
        <Icon icon={icon} color={isToday ? colors.green600 : colors.gray400} />
        <S.Location $isToday={isToday}>{location}</S.Location>
      </S.RouteTitleWrapper>
      <S.AddressTextWrapper>
        <S.AddressText>{isToday ? value : EMPTY_ADDRESS}</S.AddressText>
      </S.AddressTextWrapper>
    </S.RouteItemLayout>
  );
};

export default RouteItem;
