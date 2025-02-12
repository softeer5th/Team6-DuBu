import { BUTTONS } from '@/components/Header/Header.constants';
import * as S from '@/components/Header/Header.styled';
import { useNavigation } from '@/components/Header/hooks/useNavigation';
import Icon, { IconType } from '@/components/Icon';

interface HomeProps {
  onClick?: () => void;
}

export const Home = ({ onClick }: HomeProps) => {
  const { goToHome } = useNavigation();

  return (
    <S.HomeButton onClick={onClick || goToHome} aria-label={BUTTONS.HOME.text}>
      <Icon icon={BUTTONS.HOME.icon as IconType} />
      <span>{BUTTONS.HOME.text}</span>
    </S.HomeButton>
  );
};
