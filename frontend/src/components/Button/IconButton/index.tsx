import { HTMLAttributes } from 'react';

import * as S from './IconButton.styled';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  text?: string;
  isFull?: boolean;
  flex?: 'row' | 'row-reverse' | 'column' | 'column-reverse';
}

const IconButton = ({ icon, text, isFull, flex, ...buttonProps }: IconButtonProps) => {
  return (
    <S.IconButtonLayout $isFull={isFull} $flex={flex} {...buttonProps}>
      {icon}
      {text && <S.IconButtonText>{text}</S.IconButtonText>}
    </S.IconButtonLayout>
  );
};

export default IconButton;
