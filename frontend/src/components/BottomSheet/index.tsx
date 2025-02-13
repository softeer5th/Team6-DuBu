import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import * as S from './BottomSheet.styled';
import IconButton from '../Button/IconButton';
import Icon from '../Icon';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  content: React.ReactNode;
  onConfirm?: () => void;
  title?: string;
  cancelText?: string;
  confirmText?: string;
  confirmDisabled?: boolean;
  delay?: number;
  subTitle?: string;
}

const BottomSheet = ({
  isOpen,
  onClose,
  onConfirm,
  content,
  title,
  cancelText,
  confirmText,
  confirmDisabled,
  delay = 200,
  subTitle,
}: BottomSheetProps) => {
  const [isAnimating, setIsAnimating] = useState(isOpen);

  useEffect(() => {
    if (isOpen) {
      setIsAnimating(true);
      document.body.style.setProperty('overflow', 'hidden');
    }
  }, [isOpen]);

  const handleAnimationEnd = () => {
    if (!isOpen) {
      setIsAnimating(false);
      document.body.style.setProperty('overflow', '');
    }
  };

  if (!isAnimating) return null;

  return (
    <>
      {createPortal(
        <S.SheetContainer>
          <S.Backdrop onClick={onClose} $isOpen={isOpen} />
          <S.Sheet $isOpen={isOpen} $delay={delay} onAnimationEnd={handleAnimationEnd}>
            {(title || subTitle) && (
              <S.Header>
                {title && <S.Title>{title}</S.Title>}
                {subTitle && <S.SubTitle>{subTitle}</S.SubTitle>}
                <IconButton onClick={onClose} icon={<Icon icon="Close" cursor="pointer" />} />
              </S.Header>
            )}
            <S.Content>{content}</S.Content>
            {(cancelText || confirmText) && (
              <S.Footer>
                {cancelText && <S.CancelButton onClick={onClose}>{cancelText}</S.CancelButton>}
                {confirmText && (
                  <S.ConfirmButton onClick={onConfirm} disabled={confirmDisabled}>
                    {confirmText}
                  </S.ConfirmButton>
                )}
              </S.Footer>
            )}
          </S.Sheet>
        </S.SheetContainer>,
        document.body,
      )}
    </>
  );
};

export default BottomSheet;
