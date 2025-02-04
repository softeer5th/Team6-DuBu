import styled from 'styled-components';

import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';

const ONBOARDING_DESCRIPTIONS: { [key: number]: React.ReactNode } = {
  1: (
    <>
      <span>이동시간을 활용하여</span>
      <span>이루고 싶은 목표를 선택해 주세요</span>
    </>
  ),
  2: (
    <>
      <span>집과 학교의 주소를</span>
      <span>입력해 주세요</span>
    </>
  ),
  3: (
    <>
      <span>마지막으로, 두리번에서</span>
      <span>사용할 닉네임을 알려주세요</span>
    </>
  ),
};

const StepDescription = () => {
  const { onboardingStep: step } = useOnboarding();

  return <DescriptionBox>{ONBOARDING_DESCRIPTIONS[step]}</DescriptionBox>;
};

const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.fonts.heading20}
  color: ${({ theme }) => theme.colors.gray950};
`;

export default StepDescription;
