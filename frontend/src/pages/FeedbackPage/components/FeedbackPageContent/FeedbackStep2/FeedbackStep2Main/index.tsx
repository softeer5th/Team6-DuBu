import AchievementDetail from './AchievementDetail';
import AchievementSummary from './AchievementSummary';
import FeedbackMemo from './FeedbackMemo';
import * as S from './FeedbackStep2Main.styled';

import { IconType } from '@/components/Icon';

const data = {
  planId: 0,
  totalSectionTime: 45,
  totalTodoCount: 3,
  todos: [
    {
      category: 'READING',
      title: '오디오북 듣기',
    },
    {
      category: 'OTHERS',
      title: 'AI와 대화 연습하기',
    },
    {
      category: 'HOBBY',
      title: '나만의 음악 플레이리스트 만들기',
    },
  ],
};

interface Achievement {
  category: IconType;
  title: string;
}

const FeedbackStep2Main = () => {
  return (
    <S.FeedbackStep2MainWrapper>
      <AchievementSummary time={data.totalSectionTime} count={data.totalTodoCount} />
      <AchievementDetail achievements={data.todos as Achievement[]} />
      <FeedbackMemo />
    </S.FeedbackStep2MainWrapper>
  );
};

export default FeedbackStep2Main;
