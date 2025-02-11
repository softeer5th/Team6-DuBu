import * as S from './DateHeader.styled';

import Icon from '@/components/Icon';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';
import { formatDateHeader } from '@/utils/time';

const DateHeader = () => {
  const { currentDay, isToday, handlePrevDate, handleNextDate } = useQueryParamsDate();

  const koreanTime = formatDateHeader(currentDay);

  return (
    <S.DateHeaderLayout>
      {isToday ? (
        <>
          <S.EmptyDateHeader />
          <span>{koreanTime}</span>
          <button onClick={handleNextDate}>
            <Icon icon="FilledArrow" rotate={-90} cursor="pointer" />
          </button>
        </>
      ) : (
        <>
          <button onClick={handlePrevDate}>
            <Icon icon="FilledArrow" rotate={90} cursor="pointer" />
          </button>
          <span>{koreanTime}</span>
          <S.EmptyDateHeader />
        </>
      )}
    </S.DateHeaderLayout>
  );
};

export default DateHeader;
