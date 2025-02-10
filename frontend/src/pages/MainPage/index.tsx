import DateHeader from './components/DateHeader';
import RouteSection from './components/RouteSection';
import StartButton from './components/StartButton';
import TodoListContainer from './components/TodoListContainer';
import * as S from './MainPage.styled';

import Header from '@/components/Header';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';

const MainPage = () => {
  const { isToday } = useQueryParamsDate();

  return (
    <S.MainPageLayout>
      <Header>
        <Header.Right>
          <Header.MenuButton />
        </Header.Right>
      </Header>
      <S.MainContentContainer>
        <S.HeaderContainer>
          <DateHeader />
          <RouteSection />
        </S.HeaderContainer>

        <TodoListContainer />

        {isToday && (
          <S.StartButtonWrapper>
            <StartButton />
          </S.StartButtonWrapper>
        )}
      </S.MainContentContainer>
    </S.MainPageLayout>
  );
};

export default MainPage;
