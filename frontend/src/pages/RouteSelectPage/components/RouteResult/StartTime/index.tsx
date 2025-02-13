import { useState } from 'react';

import * as S from './StartTime.styled';

const StartTime = () => {
  const [currentTime] = useState(() => {
    return new Date().toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
    });
  });

  return <S.StartTimeBox>오늘 {currentTime} 출발</S.StartTimeBox>;
};

export default StartTime;
