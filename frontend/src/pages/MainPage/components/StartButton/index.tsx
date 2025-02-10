import { useNavigate } from 'react-router';

import * as S from './StartButton.styled';
import useMemberAddressQuery from '../../hooks/useMemberAddressQuery';

import Icon from '@/components/Icon';
import theme from '@/styles/theme';

interface StartButtonProps {
  isSwitched: boolean;
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

//startAddress가 있고, endAddress가 있음
// -> isSwitched에 따라 두 값을 변경
// startAddress가 있고, endAddress가 없음.
// -> isSwitched에 따라 startAddress와 memberAddress.school과 변경
// startAddress가 없고, endAddress가 있음.
// -> isSwitched에 따라 endAddress와 memberAddress.home과 변경
// startAddress와 endAddress가 없음.
// -> memberAddress.school과 memberAddress.home과 변경
// TODO: startAddress, endAddress, isSwitched에 따라 시작 주소, 도착 주소 맵핑
const StartButton = ({ isSwitched, startAddress, endAddress }: StartButtonProps) => {
  const navigate = useNavigate();
  const { data: memberAddress } = useMemberAddressQuery();

  const goToRouteSelect = () => {
    const startX = isSwitched ? memberAddress?.schoolXCoordinate : memberAddress?.homeXCoordinate;
    const startY = isSwitched ? memberAddress?.schoolYCoordinate : memberAddress?.homeYCoordinate;
    const endX = isSwitched ? memberAddress?.homeXCoordinate : memberAddress?.schoolXCoordinate;
    const endY = isSwitched ? memberAddress?.homeYCoordinate : memberAddress?.schoolYCoordinate;

    const startName = isSwitched
      ? memberAddress?.schoolAddressName
      : memberAddress?.homeAddressName;
    const endName = isSwitched ? memberAddress?.homeAddressName : memberAddress?.schoolAddressName;

    navigate(
      `/route-select?startX=${startX}&startY=${startY}&endX=${endX}&endY=${endY}&startName=${startName}&endName=${endName}`,
    );
  };

  return (
    <S.StartButtonLayout
      icon={<Icon icon="Fire" width={20} height={20} color={theme.colors.white} />}
      color={theme.colors.white}
      text="출발하기"
      onClick={goToRouteSelect}
    />
  );
};

export default StartButton;
