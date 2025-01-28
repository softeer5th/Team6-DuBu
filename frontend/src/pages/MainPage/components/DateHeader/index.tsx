import { useState } from 'react';

import * as S from './DateHeader.styled';

import Icon from '@/components/Icon';

const getKoreanTime = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  return new Date(utc + koreaTimeDiff);
};

const getDateHeaderFormat = (targetDate: Date) => {
  const month = targetDate.getMonth() + 1;
  const date = targetDate.getDate();
  const dayList = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const day = dayList[targetDate.getDay()];

  return `${month}월 ${date}일 ${day}`;
};

const addDay = (date: Date, days: number) => {
  const clone = new Date(date);
  clone.setDate(date.getDate() + days);
  return clone;
};

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
