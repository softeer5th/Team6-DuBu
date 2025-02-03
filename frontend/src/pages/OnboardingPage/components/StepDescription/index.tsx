import styled from 'styled-components';

import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';

const StepDescription = () => {
  const { step } = useOnboarding();

  const stepDescriptions: { [key: number]: string[] } = {
    1: ['이동시간을 활용하여', '이루고 싶은 목표를 선택해 주세요'],
    2: ['집과 학교의 주소를', '입력해 주세요'],
    3: ['마지막으로, 두리번에서', '사용할 닉네임을 알려주세요'],
  };

  return (
    <DescriptionBox>
      {stepDescriptions[step].map((description, index) => (
        <span key={index}>{description}</span>
      ))}
    </DescriptionBox>
  );
};

const DescriptionBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  ${({ theme }) => theme.fonts.heading20}
  color: ${({ theme }) => theme.colors.gray950};
`;

export default StepDescription;
