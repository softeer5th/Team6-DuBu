import { BUTTONS } from '@/components/Header/Header.constants';
import * as S from '@/components/Header/Header.styled';
import { useNavigation } from '@/components/Header/hooks/useNavigation';
import Icon, { IconType } from '@/components/Icon';

export const Back = ({ onClick }: { onClick?: () => void }) => {
  const { goToBack } = useNavigation();

  return (
    <S.Button aria-label={BUTTONS.BACK.text} onClick={onClick || goToBack}>
      <Icon icon={BUTTONS.BACK.icon as IconType} />
    </S.Button>
  );
};
