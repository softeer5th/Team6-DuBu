import * as S from './AchievementDetail.styled';

import Icon, { IconType } from '@/components/Icon';

const ICON_MAPPER: Record<string, IconType> = {
  ENGLISH: 'English',
  LANGUAGE: 'Language',
  READING: 'Reading',
  HOBBY: 'Hobby',
  OTHERS: 'Others',
} as const;

interface Achievement {
  category: IconType;
  title: string;
}

interface AchievementDetailProps {
  achievements: Achievement[];
}

const AchievementDetail = ({ achievements }: AchievementDetailProps) => {
  return (
    <S.AchievementDetailLayout>
      <S.Title>오늘 한 일을 보여드려요</S.Title>
      <S.AchievementList>
        {achievements.map((achievement, index) => {
          return (
            <S.AchievementItem key={index}>
              <Icon icon={ICON_MAPPER[achievement.category]} />
              <div>{achievement.title}</div>
            </S.AchievementItem>
          );
        })}
      </S.AchievementList>
    </S.AchievementDetailLayout>
  );
};

export default AchievementDetail;
