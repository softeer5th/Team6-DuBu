import * as S from './DateHeader.styled';

import Icon from '@/components/Icon';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';
import { getDateHeaderFormat } from '@/pages/MainPage/MainPage.utils';

const DateHeader = () => {
  const { currentDay, isToday, handlePrevDate, handleNextDate } = useQueryParamsDate();

  const koreanTime = getDateHeaderFormat(currentDay);

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
