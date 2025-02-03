import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

import * as S from './BottomSheet.styled';
import IconButton from '../Button/IconButton';
import Icon from '../Icon';

interface BottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  content: React.ReactNode;
  title?: string;
  cancelText?: string;
  confirmText?: string;
  confirmDisabled?: boolean;
  delay?: number;
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
      document.body.style.setProperty('overflow', 'visible');
    }
  };

  if (!isAnimating) return null;

  return (
    <>
      {createPortal(
        <S.SheetContainer>
          <S.Backdrop onClick={onClose} />
          <S.Sheet $isOpen={isOpen} $delay={delay} onAnimationEnd={handleAnimationEnd}>
            {title && (
              <S.Header>
                <S.Title>{title}</S.Title>
                <IconButton onClick={onClose} icon={<Icon icon="Close" cursor="pointer" />} />
              </S.Header>
            )}
            <S.Content>{content}</S.Content>
            {cancelText ||
              (confirmText && (
                <S.Footer>
                  {cancelText && <S.CancelButton onClick={onClose}>{cancelText}</S.CancelButton>}
                  {confirmText && (
                    <S.ConfirmButton onClick={onConfirm} disabled={confirmDisabled}>
                      {confirmText}
                    </S.ConfirmButton>
                  )}
                </S.Footer>
              ))}
          </S.Sheet>
        </S.SheetContainer>,
        document.body,
      )}
    </>
  );
};

export default BottomSheet;
