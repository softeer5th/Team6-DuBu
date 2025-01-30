import { BUTTONS } from '@/components/Header/Header.constants';
import * as S from '@/components/Header/Header.styled';

interface NextProps {
  disabled?: boolean;
  onClick?: () => void;
}

export const Next = ({ disabled = false, onClick }: NextProps) => {
  return (
    <S.Button disabled={disabled} aria-label={BUTTONS.NEXT.text} onClick={onClick}>
      {BUTTONS.NEXT.text}
    </S.Button>
  );
};
