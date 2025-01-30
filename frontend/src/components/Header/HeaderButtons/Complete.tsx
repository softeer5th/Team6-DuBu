import { BUTTONS } from '@/components/Header/Header.constants';
import * as S from '@/components/Header/Header.styled';

interface CompleteProps {
  disabled?: boolean;
  onClick?: () => void;
}

export const Complete = ({ disabled = false, onClick }: CompleteProps) => {
  return (
    <S.Button disabled={disabled} onClick={onClick} aria-label={BUTTONS.COMPLETE.text}>
      {BUTTONS.COMPLETE.text}
    </S.Button>
  );
};
