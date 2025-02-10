import { useNavigate } from 'react-router';

import * as S from './StartButton.styled';
import useMemberAddressQuery from '../../hooks/useMemberAddressQuery';
import { getRouteCoordWithSwitched } from '../../MainPage.utils';

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

const StartButton = ({ isSwitched, startAddress, endAddress }: StartButtonProps) => {
  const navigate = useNavigate();
  const { data: memberAddress } = useMemberAddressQuery();

  const isStartAddress = startAddress.startName !== '';
  const isEndAddress = endAddress.endName !== '';

  const goToRouteSelect = () => {
    const { startX, startY, endX, endY, startName, endName } = getRouteCoordWithSwitched(
      isSwitched,
      isStartAddress,
      isEndAddress,
      startAddress,
      endAddress,
      memberAddress,
    );

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
