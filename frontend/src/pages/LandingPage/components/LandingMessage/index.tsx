import * as S from './LandingMessage.styled';

const LandingMessage = () => {
  return (
    <S.TitleWrapper>
      <S.Subtitle>이동시간에 할 일을 추천해드려요</S.Subtitle>
      <S.Title>
        <span>오늘의 시간을</span>
        <span>더 나은 내일로</span>
      </S.Title>
    </S.TitleWrapper>
  );
};

export default LandingMessage;
