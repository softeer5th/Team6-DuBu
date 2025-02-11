import { useSearchParams } from 'react-router';

import * as S from './RouteSelectAddress.styled';

import Icon from '@/components/Icon';
import useMemberAddressQuery from '@/pages/MainPage/hooks/useMemberAddressQuery';
import { getAddress } from '@/pages/RouteSelectPage/RouteSelectPage.utils';
import theme from '@/styles/theme';

const RouteSelectAddress = () => {
  const { data: memberAddress } = useMemberAddressQuery();
  const { startX, startY, endX, endY, startName, endName } = Object.fromEntries(
    useSearchParams()[0],
  );

  const address = getAddress(
    { x: Number(startX), y: Number(startY), name: startName },
    { x: Number(endX), y: Number(endY), name: endName },
    { x: memberAddress?.homeXCoordinate, y: memberAddress?.homeYCoordinate },
    { x: memberAddress?.schoolXCoordinate, y: memberAddress?.schoolYCoordinate },
  );

  return (
    <S.AddressList>
      <S.AddressItem>
        <S.AddressLabel>
          {address.start.icon && (
            <Icon icon={address.start.icon} color={theme.colors.gray400} width={20} height={20} />
          )}
          <S.AddressLabelText>{address.start.location}</S.AddressLabelText>
        </S.AddressLabel>
        <S.AddressValue>{address.start.name}</S.AddressValue>
      </S.AddressItem>
      <S.Divider />
      <S.AddressItem>
        <S.AddressLabel>
          {address.end.icon && (
            <Icon icon={address.end.icon} color={theme.colors.gray400} width={20} height={20} />
          )}
          <S.AddressLabelText>{address.end.location}</S.AddressLabelText>
        </S.AddressLabel>
        <S.AddressValue>{address.end.name}</S.AddressValue>
      </S.AddressItem>
    </S.AddressList>
  );
};

export default RouteSelectAddress;
