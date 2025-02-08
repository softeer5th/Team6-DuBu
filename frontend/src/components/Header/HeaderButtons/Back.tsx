import { BUTTONS } from '@/components/Header/Header.constants';
import * as S from '@/components/Header/Header.styled';
import { useNavigation } from '@/components/Header/hooks/useNavigation';
import Icon, { IconType } from '@/components/Icon';
import { colors } from '@/styles/theme';

interface BackProps {
  onClick?: () => void;
  color?: keyof typeof colors;
}

export const Back = ({ onClick, color }: BackProps) => {
  const { goToBack } = useNavigation();

  return (
    <S.Button aria-label={BUTTONS.BACK.text} onClick={onClick || goToBack}>
      <Icon icon={BUTTONS.BACK.icon as IconType} color={color} />
    </S.Button>
  );
};
