import styled from 'styled-components';

import Icon from '@/components/Icon';
import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';

const ONBOARDING_GUIDES: { [key: number]: string[] } = {
  1: ['최소 1개에서 최대 3개까지 선택할 수 있어요.'],
  2: ['한 번만 입력하면,', '주소를 기억해서 경로를 빠르게 보여드릴 수 있어요!'],
};

const StepGuide = () => {
  const { onboardingStep } = useOnboarding();

  return (
    <OnboardingGuideBox>
      <Icon icon="Alert" width={16} height={16} />
      {ONBOARDING_GUIDES[onboardingStep].map((guide, index) => (
        <span key={index}>{guide}</span>
      ))}
    </OnboardingGuideBox>
  );
};

const OnboardingGuideBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.gray50};
  border-radius: 1.2rem;
  padding: 1.4rem;
  gap: 0.4rem;
  ${({ theme }) => theme.fonts.caption12Reg}
  color: ${({ theme }) => theme.colors.gray500};
`;

export default StepGuide;
