import CarouselList from './components/CarouselList';
import KakaoLoginButton from './components/KakaoLoginButton';
import LandingHeader from './components/LandingHeader';
import LandingMessage from './components/LandingMessage';
import * as S from './LandingPage.styled';

const LandingPage = () => {
  return (
    <S.LandingPageLayout>
      <LandingHeader />
      <S.MainContent>
        <LandingMessage />
        <CarouselList />
      </S.MainContent>
      <KakaoLoginButton />
    </S.LandingPageLayout>
  );
};

export default LandingPage;
