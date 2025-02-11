import * as S from './AchievementSummary.styled';

interface AchievementSummaryProps {
  time: number;
  count: number;
}

const AchievementSummary = ({ time, count }: AchievementSummaryProps) => {
  return (
    <S.SummaryBox>
      <S.SummaryText>김두부 님은 오늘</S.SummaryText>
      <S.SummaryText>
        <S.SummaryKeyword>{time}</S.SummaryKeyword>분 동안
        <S.SummaryKeyword>{count}</S.SummaryKeyword>개를 달성했어요
      </S.SummaryText>
    </S.SummaryBox>
  );
};

export default AchievementSummary;
