import { useState } from 'react';
import styled from 'styled-components';

const StartTime = () => {
  const [currentTime] = useState(() => {
    return new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  });

  return <StartTimeBox>오늘 {currentTime} 출발</StartTimeBox>;
};

const StartTimeBox = styled.div`
  ${({ theme }) => theme.fonts.label14Med};
  color: ${({ theme }) => theme.colors.gray500};
  padding: 1.2rem 2.4rem;
  border-bottom: 0.4rem solid ${({ theme }) => theme.colors.gray50};
`;

export default StartTime;
