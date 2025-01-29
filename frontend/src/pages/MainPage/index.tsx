import { useState } from 'react';

import DateHeader from './components/DateHeader';
import RouteSection from './components/RouteSection';
import StartButton from './components/StartButton';
import TodoListContainer from './components/TodoListContainer';
import * as S from './MainPage.styled';
import { addDay, getKoreanTime } from './MainPage.utils';

const MainPage = () => {
  const [currentTime, setCurrentTime] = useState(getKoreanTime());

  const handlePrevDate = () => {
    const yesterday = addDay(currentTime, -1);
    setCurrentTime(yesterday);
  };

  const handleNextDate = () => {
    const tomorrow = addDay(currentTime, 1);
    setCurrentTime(tomorrow);
  };

  return (
    <S.MainPageLayout>
      <S.HeaderContainer>
        <DateHeader
          currentTime={currentTime}
          handlePrevDate={handlePrevDate}
          handleNextDate={handleNextDate}
        />
        <RouteSection />
      </S.HeaderContainer>

      <TodoListContainer currentTime={currentTime} />

      <S.StartButtonWrapper>
        <StartButton />
      </S.StartButtonWrapper>
    </S.MainPageLayout>
  );
};

export default MainPage;
