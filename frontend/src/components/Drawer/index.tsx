import { Link } from 'react-router';

import { DRAWER_MENU } from './Drawer.constants';
import * as S from './Drawer.styled';
import { useDrawer } from './hooks/useDrawer';

import Icon from '@/components/Icon';

const Drawer = () => {
  const { isOpen, closeDrawer } = useDrawer();

  return (
    <S.DrawerLayout className="drawer" $isOpen={isOpen}>
      <S.Overlay onClick={closeDrawer} $isOpen={isOpen} />
      <S.Content $isOpen={isOpen}>
        <Icon icon="Doreburn" width={120} height={15} />
        <S.MenuList>
          {DRAWER_MENU.map((menu, idx) => (
            <S.MenuItem key={idx}>
              <Link to={menu.path}>{menu.text}</Link>
            </S.MenuItem>
          ))}
        </S.MenuList>
      </S.Content>
    </S.DrawerLayout>
  );
};

export default Drawer;
