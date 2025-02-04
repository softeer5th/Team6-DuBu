import { useTheme } from 'styled-components';

import * as S from './OnboardingProgress.styled';

import Icon from '@/components/Icon';
import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';

const TOTAL_ONBOARDING_STEP = 3;

const OnboardingProgress = () => {
  const { onboardingStep } = useOnboarding();
  const progressPercent = Math.ceil((onboardingStep / TOTAL_ONBOARDING_STEP) * 100);
  const theme = useTheme();

  return (
    <S.ProgressContainer>
      <S.ProgressBackground>
        <S.ProgressBar $progressPercent={progressPercent} />
        <S.ProgressMarker $progressPercent={progressPercent}>
          <Icon icon="Fire" width={32} height={32} color={theme.colors.green600} />
          <S.ProgressStepText>
            {onboardingStep}/{TOTAL_ONBOARDING_STEP}
          </S.ProgressStepText>
        </S.ProgressMarker>
      </S.ProgressBackground>
    </S.ProgressContainer>
  );
};

export default OnboardingProgress;
