import RecommendTodoContainer from './components/RecommendTodoContainer';
import * as S from './RecommendTodoPage.styled';

import Header from '@/components/Header';

const RecommendTodoPage = () => {
  return (
    <S.RecommendTodoLayout>
      <Header>
        <Header.Left>
          <Header.BackButton />
        </Header.Left>
        <Header.Center>
          <Header.Title>모든 추천</Header.Title>
        </Header.Center>
      </Header>

      <RecommendTodoContainer />
    </S.RecommendTodoLayout>
  );
};

export default RecommendTodoPage;
