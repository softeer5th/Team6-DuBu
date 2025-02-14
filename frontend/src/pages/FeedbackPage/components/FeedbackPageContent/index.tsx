import { useNavigate } from 'react-router';

import * as S from './FeedbackPageContent.styled';
import FeedbackStep1 from './FeedbackStep1';
import FeedbackStep2 from './FeedbackStep2';

import Icon from '@/components/Icon';
import useAchievementQuery from '@/pages/FeedbackPage/hooks/useAchievementQuery';
import { useFeedback } from '@/pages/FeedbackPage/hooks/useFeedback';
import useSaveFeedbackMutation from '@/pages/FeedbackPage/hooks/useSaveFeedbackMutation';
import theme from '@/styles/theme';

const FeedbackPageContent = () => {
  const navigate = useNavigate();
  const { feedbackStep, setFeedbackStep, feedbackData } = useFeedback();
  const { saveFeedbackMutate } = useSaveFeedbackMutation();
  const { data: achievementData } = useAchievementQuery();

  const goToNextStep = () => {
    const nextStep = feedbackStep + 1;
    setFeedbackStep(nextStep);
    navigate(`/feedback?step=${nextStep}`);
  };

  const handleCompleteButtonClick = () => {
    if (!achievementData) return;

    saveFeedbackMutate({
      planId: achievementData.data.planId,
      body: feedbackData,
    });
  };

  const isStep1 = feedbackStep === 1;
  const isStep2 = feedbackStep === 2;

  const currentStepComponent = isStep1 ? <FeedbackStep1 /> : isStep2 ? <FeedbackStep2 /> : null;
  const buttonText = isStep1 ? '다음으로' : '완료하기';

  return (
    <S.FeedbackPageLayout>
      {currentStepComponent}
      <S.ButtonBox
        className="button-box"
        onClick={feedbackStep === 1 ? goToNextStep : handleCompleteButtonClick}
      >
        <Icon icon="Fire" width={20} height={20} color={theme.colors.green50} />
        {buttonText}
      </S.ButtonBox>
    </S.FeedbackPageLayout>
  );
};

export default FeedbackPageContent;
