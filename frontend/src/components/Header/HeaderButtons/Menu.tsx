import { useDrawer } from '@/components/Drawer/hooks/useDrawer';
import { BUTTONS } from '@/components/Header/Header.constants';
import * as S from '@/components/Header/Header.styled';
import Icon, { IconType } from '@/components/Icon';

export const Menu = () => {
  const { openDrawer } = useDrawer();

  return (
    <S.Button aria-label={BUTTONS.MENU.text} onClick={openDrawer}>
      <Icon icon={BUTTONS.MENU.icon as IconType} />
    </S.Button>
  );
};
