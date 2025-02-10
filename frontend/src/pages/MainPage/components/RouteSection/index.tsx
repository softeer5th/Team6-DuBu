import { useReducer } from 'react';

import RouteItem from './RouteItem';
import * as S from './RouteSection.styled';
import useMemberAddressQuery from '../../hooks/useMemberAddressQuery';

import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';

const RouteSection = () => {
  const { data: memberAddress } = useMemberAddressQuery();
  const [isSwitchAddress, toggle] = useReducer((prev) => !prev, false);

  if (!memberAddress) return null;

  return (
    <S.RouteSectionLayout $isSwitch={isSwitchAddress}>
      <RouteItem icon="AddressHome" location="집" value={memberAddress.homeAddressName} />
      <S.IconWrapper>
        <IconButton
          icon={<Icon icon="Switch" width={36} height={36} cursor="pointer" />}
          onClick={toggle}
        />
      </S.IconWrapper>
      <RouteItem icon="AddressUniv" location="학교" value={memberAddress.schoolAddressName} />
    </S.RouteSectionLayout>
  );
};

export default RouteSection;
