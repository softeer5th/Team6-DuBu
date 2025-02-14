import RouteItem from './RouteItem';
import * as S from './RouteSection.styled';

import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';
import useMemberAddressQuery from '@/pages/MainPage/hooks/useMemberAddressQuery';

interface RouteSectionProps {
  isSwitchAddress: boolean;
  toggle: () => void;
  handleClickSearchAddress: (type: 'home' | 'school') => void;
  startAddress: {
    startName: string;
    startX: number;
    startY: number;
  };
  endAddress: {
    endName: string;
    endX: number;
    endY: number;
  };
}

const RouteSection = ({
  isSwitchAddress,
  toggle,
  handleClickSearchAddress,
  startAddress,
  endAddress,
}: RouteSectionProps) => {
  const { data: memberAddress } = useMemberAddressQuery();
  const { isToday } = useQueryParamsDate();

  if (!memberAddress) return null;

  return (
    <S.RouteSectionLayout $isSwitch={isSwitchAddress}>
      <RouteItem
        icon="AddressHome"
        location="집"
        value={startAddress.startName || memberAddress.homeTitle}
        handleClick={() => handleClickSearchAddress('home')}
      />
      {isToday ? (
        <S.IconWrapper>
          <IconButton
            icon={<Icon icon="Switch" width={36} height={36} cursor="pointer" />}
            onClick={toggle}
          />
        </S.IconWrapper>
      ) : (
        <S.RouteSectionDivider />
      )}
      <RouteItem
        icon="AddressUniv"
        location="학교"
        value={endAddress.endName || memberAddress.schoolTitle}
        handleClick={() => handleClickSearchAddress('school')}
      />
    </S.RouteSectionLayout>
  );
};

export default RouteSection;
