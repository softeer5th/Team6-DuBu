import DateHeader from './components/DateHeader';
import RouteSection from './components/RouteSection';
import StartButton from './components/StartButton';
import TodoListContainer from './components/TodoListContainer';
import * as S from './MainPage.styled';

import Header from '@/components/Header';

const MainPage = () => {
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

        <S.StartButtonWrapper>
          <StartButton />
        </S.StartButtonWrapper>
      </S.MainContentContainer>
    </S.MainPageLayout>
  );
};

export default MainPage;
