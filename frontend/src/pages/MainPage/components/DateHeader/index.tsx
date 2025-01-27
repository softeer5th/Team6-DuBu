import * as S from './DateHeader.styled';

import Icon from '@/components/Icon';

// TODO: 날짜 상태 관리
const DateHeader = () => {
  return (
    <S.DateHeaderLayout>
      <S.EmptyDateHeader />
      <span>1월 11일 월요일</span>
      <button>
        <Icon icon="FilledArrow" rotate={-90} />
      </button>
    </S.DateHeaderLayout>
  );
};

export default DateHeader;
