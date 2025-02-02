import React, { ReactNode } from 'react';

import Drawer from '@/components/Drawer';
import { DrawerProvider } from '@/components/Drawer/contexts/DrawerProvider';
import * as S from '@/components/Header/Header.styled';
import * as Buttons from '@/components/Header/HeaderButtons';

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const hasMenuButton = React.Children.toArray(children).some(
    (child) => React.isValidElement(child) && child.type === Buttons.Menu,
  );

  const HeaderContent = (
    <S.HeaderContainer>
      <S.HeaderLayout>{children}</S.HeaderLayout>
      {hasMenuButton && <Drawer />}
    </S.HeaderContainer>
  );

  return hasMenuButton ? <DrawerProvider>{HeaderContent}</DrawerProvider> : HeaderContent;
};

Header.Title = ({ children }: { children: ReactNode }) => <S.HeaderTitle>{children}</S.HeaderTitle>;
Header.BackButton = Buttons.Back;
Header.HomeButton = Buttons.Home;
Header.NextButton = Buttons.Next;
Header.CompleteButton = Buttons.Complete;
Header.MenuButton = Buttons.Menu;

export default Header;
