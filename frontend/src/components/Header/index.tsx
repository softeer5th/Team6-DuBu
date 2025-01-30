import { ReactNode } from 'react';

import * as S from './Header.styled';
import * as Buttons from './HeaderButtons';

interface HeaderProps {
  children: ReactNode;
}

const Header = ({ children }: HeaderProps) => {
  return <S.HeaderLayout>{children}</S.HeaderLayout>;
};

Header.Title = ({ children }: { children: ReactNode }) => <S.HeaderTitle>{children}</S.HeaderTitle>;
Header.BackButton = Buttons.Back;
Header.HomeButton = Buttons.Home;
Header.NextButton = Buttons.Next;
Header.CompleteButton = Buttons.Complete;
Header.MenuButton = Buttons.Menu;

export default Header;
