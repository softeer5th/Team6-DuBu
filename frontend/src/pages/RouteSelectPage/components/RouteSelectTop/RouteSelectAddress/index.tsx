import * as S from './RouteSelectAddress.styled';

import Icon from '@/components/Icon';
import theme from '@/styles/theme';

const RouteSelectAddress = () => {
  return (
    <S.AddressList>
      <S.AddressItem>
        <S.AddressLabel>
          <Icon icon="AddressHome" color={theme.colors.gray400} />
          <S.AddressLabelText>집</S.AddressLabelText>
        </S.AddressLabel>
        <S.AddressValue>서울시 송파구 잠실동</S.AddressValue>
      </S.AddressItem>
      <S.Divider />
      <S.AddressItem>
        <S.AddressLabel>
          <Icon icon="AddressUniv" color={theme.colors.gray400} />
          <S.AddressLabelText>학교</S.AddressLabelText>
        </S.AddressLabel>
        <S.AddressValue>서울시 송파구 잠실동</S.AddressValue>
      </S.AddressItem>
    </S.AddressList>
  );
};

export default RouteSelectAddress;
