import { useTheme } from 'styled-components';

import * as S from './OnboardingProgress.styled';

import Icon from '@/components/Icon';
import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';
import { ONBOARDING_LAST_STEP } from '@/pages/OnboardingPage/OnboardingPage.constants';

const OnboardingProgress = () => {
  const { onboardingStep } = useOnboarding();
  const progressPercent = Math.ceil((onboardingStep / ONBOARDING_LAST_STEP) * 100);
  const theme = useTheme();

  return (
    <S.ProgressContainer>
      <S.ProgressBackground>
        <S.ProgressBar $progressPercent={progressPercent} />
        <S.ProgressMarker $progressPercent={progressPercent}>
          <Icon icon="Fire" width={32} height={32} color={theme.colors.green600} />
          <S.ProgressStepText>
            {onboardingStep}/{ONBOARDING_LAST_STEP}
          </S.ProgressStepText>
        </S.ProgressMarker>
      </S.ProgressBackground>
    </S.ProgressContainer>
  );
};

export default OnboardingProgress;
