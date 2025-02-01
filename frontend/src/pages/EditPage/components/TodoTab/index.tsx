import * as S from './TodoTab.styled';

import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';

const TodoTab = () => {
  return (
    <S.TodoTabLayout>
      <S.SloganWrapper>
        <span>오늘 할 일, 작은 목표로 시작해봐요</span>
        <span>최대 3개까지 고를 수 있어요</span>
      </S.SloganWrapper>

      <S.TodoEditList>
        <S.TodoEditItem>
          <IconButton icon={<Icon icon="MinusCircle" />} />
          <S.TodoTextWrapper>
            <S.TodoTitle>오디오북 듣기</S.TodoTitle>
            <S.TodoBadgeWrapper>
              <S.TodoBadge icon="Reading">#독서</S.TodoBadge>
              <S.TodoBadge>#쉬움</S.TodoBadge>
            </S.TodoBadgeWrapper>
          </S.TodoTextWrapper>
          <IconButton icon={<Icon icon="Edit" />} />
        </S.TodoEditItem>

        <S.TodoEditItem>
          <IconButton icon={<Icon icon="MinusCircle" />} />
          <S.TodoTextWrapper>
            <S.TodoTitle>AI와 대화 연습하기</S.TodoTitle>
            <S.TodoBadgeWrapper>
              <S.TodoBadge icon="Language">#제2외국어</S.TodoBadge>
              <S.TodoBadge>#보통</S.TodoBadge>
            </S.TodoBadgeWrapper>
          </S.TodoTextWrapper>
          <IconButton icon={<Icon icon="Edit" />} />
        </S.TodoEditItem>

        <S.TodoEditItem>
          <IconButton icon={<Icon icon="MinusCircle" />} />
          <S.TodoTextWrapper>
            <S.TodoTitle>나만의 음악 플레이리스트 만들기</S.TodoTitle>
            <S.TodoBadgeWrapper>
              <S.TodoBadge icon="Hobby">#취미</S.TodoBadge>
              <S.TodoBadge>#어려움</S.TodoBadge>
            </S.TodoBadgeWrapper>
          </S.TodoTextWrapper>
          <IconButton icon={<Icon icon="Edit" />} />
        </S.TodoEditItem>
        <IconButton icon={<Icon icon="PlusCircle" />} text="직접 추가하기" isFull={true} />
      </S.TodoEditList>
    </S.TodoTabLayout>
  );
};

export default TodoTab;
