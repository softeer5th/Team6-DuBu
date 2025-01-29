import * as S from './StartButton.styled';

import Icon from '@/components/Icon';
import theme from '@/styles/theme';

const StartButton = () => {
  return (
    <S.StartButtonLayout>
      <Icon icon="Fire" width={20} height={20} color={theme.colors.white} />
      <span>출발하기</span>
    </S.StartButtonLayout>
  );
};

export default StartButton;
