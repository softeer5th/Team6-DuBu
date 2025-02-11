import * as S from './FeedbackStep2.styled';
import FeedbackStep2Content from './FeedbackStep2Content';
import FeedbackStep2Header from './FeedbackStep2Header';

const FeedbackStep2 = () => {
  return (
    <S.FeedbackStep2Layout>
      <FeedbackStep2Header />
      <FeedbackStep2Content />
    </S.FeedbackStep2Layout>
  );
};

export default FeedbackStep2;
