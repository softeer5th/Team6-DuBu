import DateHeader from './components/DateHeader';
import RouteSection from './components/RouteSection';
import StartButton from './components/StartButton';
import TodoListContainer from './components/TodoListContainer';
import * as S from './MainPage.styled';

const MainPage = () => {
  return (
    <S.MainPageLayout>
      <S.HeaderContainer>
        <DateHeader />
        <RouteSection />
      </S.HeaderContainer>

      <TodoListContainer />

      <S.StartButtonWrapper>
        <StartButton />
      </S.StartButtonWrapper>
    </S.MainPageLayout>
  );
};

export default MainPage;
