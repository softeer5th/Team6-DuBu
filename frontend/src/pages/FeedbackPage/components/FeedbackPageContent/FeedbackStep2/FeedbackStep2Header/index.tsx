import { useNavigate } from 'react-router';

import * as S from './FeedbackStep2Header.styled';

import Header from '@/components/Header';
import { useFeedback } from '@/pages/FeedbackPage/hooks/useFeedback';

const FeedbackStep2Header = () => {
  const navigate = useNavigate();
  const { feedbackStep, setFeedbackStep } = useFeedback();

  const goToPrevStep = () => {
    const prevStep = feedbackStep - 1;
    setFeedbackStep(prevStep);
    navigate(`/feedback?step=${prevStep}`);
  };

  return (
    <S.FeedbackStep2HeaderWrapper>
      <Header>
        <Header.Left>
          <Header.BackButton onClick={goToPrevStep} />
        </Header.Left>
      </Header>
    </S.FeedbackStep2HeaderWrapper>
  );
};

export default FeedbackStep2Header;
