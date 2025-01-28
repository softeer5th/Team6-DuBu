import { useState } from 'react';

import * as S from './DateHeader.styled';
import { addDay, getDateHeaderFormat, getKoreanTime } from '../../MainPage.utils';

import Icon from '@/components/Icon';

const DateHeader = () => {
  const [currentTime, setCurrentTime] = useState(getKoreanTime());
  const koreanTime = getDateHeaderFormat(currentTime);
  const today = getKoreanTime();

  const handlePrevDate = () => {
    const yesterday = addDay(currentTime, -1);
    setCurrentTime(yesterday);
  };

  const handleNextDate = () => {
    const tomorrow = addDay(currentTime, 1);
    setCurrentTime(tomorrow);
  };

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
