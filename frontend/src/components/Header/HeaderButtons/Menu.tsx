import { BUTTONS } from '../Header.constants';

import * as S from '@/components/Header/Header.styled';
import Icon, { IconType } from '@/components/Icon';

export const Menu = () => {
  return (
    <S.MenuButton aria-label={BUTTONS.MENU.text}>
      <Icon icon={BUTTONS.MENU.icon as IconType} />
    </S.MenuButton>
  );
};
