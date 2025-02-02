import { HTMLAttributes } from 'react';

import * as S from './IconButton.styled';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  text?: string;
  isFull?: boolean;
}

const IconButton = ({ icon, text, isFull, ...buttonProps }: IconButtonProps) => {
  return (
    <S.IconButtonLayout $isFull={isFull} {...buttonProps}>
      {icon}
      {text && <S.IconButtonText>{text}</S.IconButtonText>}
    </S.IconButtonLayout>
  );
};

export default IconButton;
