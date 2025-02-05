import RecommendTodoContainer from './components/RecommendTodoContainer';

import Header from '@/components/Header';

const RecommendTodoPage = () => {
  return (
    <>
      <Header>
        <Header.Left>
          <Header.BackButton />
        </Header.Left>
        <Header.Center>
          <Header.Title>모든 추천</Header.Title>
        </Header.Center>
      </Header>

      <RecommendTodoContainer />
    </>
  );
};

export default RecommendTodoPage;
