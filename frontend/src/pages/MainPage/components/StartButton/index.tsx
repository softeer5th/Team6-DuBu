import * as S from './StartButton.styled';

import Icon from '@/components/Icon';
import theme from '@/styles/theme';

const StartButton = () => {
  return (
    <S.StartButtonLayout
      icon={<Icon icon="Fire" width={20} height={20} color={theme.colors.white} />}
      color={theme.colors.white}
      text="출발하기"
    />
  );
};

export default StartButton;
