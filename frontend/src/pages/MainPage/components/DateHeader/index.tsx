import * as S from './DateHeader.styled';
import { getDateHeaderFormat, getKoreanTime } from '../../MainPage.utils';

import Icon from '@/components/Icon';

interface DateHeaderProps {
  currentTime: Date;
  handlePrevDate: () => void;
  handleNextDate: () => void;
}
const DateHeader = ({ currentTime, handlePrevDate, handleNextDate }: DateHeaderProps) => {
  const koreanTime = getDateHeaderFormat(currentTime);
  const today = getKoreanTime();

  const isToday = today.toDateString() === currentTime.toDateString();

  return (
    <S.DateHeaderLayout>
      {isToday ? (
        <>
          <S.EmptyDateHeader />
          <span>{koreanTime}</span>
          <button onClick={handleNextDate}>
            <Icon icon="FilledArrow" rotate={-90} />
          </button>
        </>
      ) : (
        <>
          <button onClick={handlePrevDate}>
            <Icon icon="FilledArrow" rotate={90} />
          </button>
          <span>{koreanTime}</span>
          <S.EmptyDateHeader />
        </>
      )}
    </S.DateHeaderLayout>
  );
};

export default DateHeader;
