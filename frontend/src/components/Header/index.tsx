import React, { ReactNode } from 'react';

import Drawer from '@/components/Drawer';
import { DrawerProvider } from '@/components/Drawer/contexts/DrawerProvider';
import * as S from '@/components/Header/Header.styled';
import * as Buttons from '@/components/Header/HeaderButtons';

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  const hasMenuButton = React.Children.toArray(children).some((child) => {
    if (!React.isValidElement(child)) return false;

    if (child.type === Header.Right) {
      return React.Children.toArray(child.props.children).some(
        (rightChild) => React.isValidElement(rightChild) && rightChild.type === Buttons.Menu,
      );
    }

    return child.type === Buttons.Menu;
  });

  return (
    <DrawerProvider>
      <S.HeaderContainer>
        <S.HeaderLayout>{children}</S.HeaderLayout>
        {hasMenuButton && <Drawer />}
      </S.HeaderContainer>
    </DrawerProvider>
  );
};

Header.Left = ({ children }: { children: ReactNode }) => <S.HeaderLeft>{children}</S.HeaderLeft>;
Header.Center = ({ children }: { children: ReactNode }) => (
  <S.HeaderCenter>{children}</S.HeaderCenter>
);
Header.Right = ({ children }: { children: ReactNode }) => <S.HeaderRight>{children}</S.HeaderRight>;
Header.Title = ({ children }: { children: ReactNode }) => <S.HeaderTitle>{children}</S.HeaderTitle>;
Header.BackButton = Buttons.Back;
Header.HomeButton = Buttons.Home;
Header.NextButton = Buttons.Next;
Header.CompleteButton = Buttons.Complete;
Header.MenuButton = Buttons.Menu;

export default Header;
