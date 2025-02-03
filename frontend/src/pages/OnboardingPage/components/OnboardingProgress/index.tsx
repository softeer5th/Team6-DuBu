import { useTheme } from 'styled-components';

import * as S from './OnboardingProgress.styled';

import Icon from '@/components/Icon';
import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';

const OnboardingProgress = () => {
  const { step } = useOnboarding();
  const totalStep = 3;
  const progressPercent = Math.ceil((step / totalStep) * 100);
  const theme = useTheme();

  return (
    <S.ProgressContainer>
      <S.ProgressBackground>
        <S.ProgressBar $progressPercent={progressPercent} />
        <S.ProgressMarker $progressPercent={progressPercent}>
          <Icon icon="Fire" width={32} height={32} color={theme.colors.green600} />
          <S.ProgressStepText>
            {step}/{totalStep}
          </S.ProgressStepText>
        </S.ProgressMarker>
      </S.ProgressBackground>
    </S.ProgressContainer>
  );
};

export default OnboardingProgress;
