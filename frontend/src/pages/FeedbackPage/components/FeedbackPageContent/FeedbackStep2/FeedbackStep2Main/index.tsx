import AchievementDetail from './AchievementDetail';
import AchievementSummary from './AchievementSummary';
import FeedbackMemo from './FeedbackMemo';
import * as S from './FeedbackStep2Main.styled';

import { IconType } from '@/components/Icon';
import useAchievementQuery from '@/pages/FeedbackPage/hooks/useAchievementQuery';

interface Achievement {
  category: IconType;
  title: string;
}

const FeedbackStep2Main = () => {
  const { data: achievementData } = useAchievementQuery();

  if (!achievementData) return null;

  const { totalSectionTime, totalTodoCount, todos } = achievementData.data || {};

  return (
    <S.FeedbackStep2MainWrapper>
      <AchievementSummary time={totalSectionTime} count={totalTodoCount} />
      <AchievementDetail achievements={todos as Achievement[]} />
      <FeedbackMemo />
    </S.FeedbackStep2MainWrapper>
  );
};

export default FeedbackStep2Main;
