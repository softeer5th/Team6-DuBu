import { HTMLAttributes } from 'react';
import styled from 'styled-components';

import Icon from '@/components/Icon';

interface IconButtonProps extends HTMLAttributes<HTMLButtonElement> {
  icon: React.ReactNode;
  text?: string;
}

const IconButton = ({ icon, text, ...buttonProps }: IconButtonProps) => {
  return (
    <IconButtonLayout {...buttonProps}>
      {icon}
      {text && <IconButtonText>{text}</IconButtonText>}
    </IconButtonLayout>
  );
};

const IconButtonLayout = styled.button`
  display: flex;
  gap: 1.2rem;
  align-items: center;
`;

const IconButtonText = styled.span`
  ${({ theme }) => theme.fonts.body16};
`;

const TodoTab = () => {
  return (
    <TodoTabLayout>
      <SloganWrapper>
        <span>오늘 할 일, 작은 목표로 시작해봐요</span>
        <span>최대 3개까지 고를 수 있어요</span>
      </SloganWrapper>

      <TodoEditList>
        <TodoEditItem>
          <IconButton icon={<Icon icon="MinusCircle" />} />
          <TodoTextWrapper>
            <TodoTitle>오디오북 듣기</TodoTitle>
            <TodoBadgeWrapper>
              <TodoBadge icon="Reading">#독서</TodoBadge>
              <TodoBadge>#쉬움</TodoBadge>
            </TodoBadgeWrapper>
          </TodoTextWrapper>
          <IconButton icon={<Icon icon="Edit" />} />
        </TodoEditItem>

        <TodoEditItem>
          <IconButton icon={<Icon icon="MinusCircle" />} />
          <TodoTextWrapper>
            <TodoTitle>AI와 대화 연습하기</TodoTitle>
            <TodoBadgeWrapper>
              <TodoBadge icon="Language">#제2외국어</TodoBadge>
              <TodoBadge>#보통</TodoBadge>
            </TodoBadgeWrapper>
          </TodoTextWrapper>
          <IconButton icon={<Icon icon="Edit" />} />
        </TodoEditItem>

        <TodoEditItem>
          <IconButton icon={<Icon icon="MinusCircle" />} />
          <TodoTextWrapper>
            <TodoTitle>나만의 음악 플레이리스트 만들기</TodoTitle>
            <TodoBadgeWrapper>
              <TodoBadge icon="Hobby">#취미</TodoBadge>
              <TodoBadge>#어려움</TodoBadge>
            </TodoBadgeWrapper>
          </TodoTextWrapper>
          <IconButton icon={<Icon icon="Edit" />} />
        </TodoEditItem>

        <IconButton
          icon={<Icon icon="PlusCircle" />}
          text="직접 추가하기"
          style={{ width: '100%', padding: '1.2rem 2.4rem 1.6rem 2.4rem' }}
        />
      </TodoEditList>
    </TodoTabLayout>
  );
};

export default TodoTab;

const TodoTabLayout = styled.div``;

const SloganWrapper = styled.div`
  margin: 1.6rem 2.4rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.2rem 0;
  background-color: ${({ theme }) => theme.colors.gray50};
  border-radius: 0.8rem;

  span {
    ${({ theme }) => theme.fonts.label14Med};
    color: ${({ theme }) => theme.colors.gray900};
  }
`;

const TodoEditList = styled.ul`
  display: flex;
  flex-direction: column;

  border-top: 0.15rem solid ${({ theme }) => theme.colors.gray50};
  border-bottom: 0.15rem solid ${({ theme }) => theme.colors.gray50};
`;

const TodoEditItem = styled.li`
  display: flex;
  align-items: center;
  gap: 1.2rem;
  padding: 1.2rem 2.4rem;

  border-bottom: 0.15rem solid ${({ theme }) => theme.colors.gray50};
`;

const TodoTextWrapper = styled.div`
  display: flex;
  flex-grow: 1;
  flex-direction: column;
  gap: 0.8rem;
`;

const TodoTitle = styled.h3`
  ${({ theme }) => theme.fonts.body16};
  color: ${({ theme }) => theme.colors.gray950};
`;

const TodoBadgeWrapper = styled.div`
  display: flex;
  gap: 0.4rem;
`;

const TodoBadge = styled.span<{
  icon?: 'Reading' | 'Hobby' | 'English' | 'Language' | 'News' | 'Others';
}>`
  ${({ theme }) => theme.fonts.caption12Reg};
  color: ${({ theme, icon }) => (icon ? theme.colors[icon] : theme.colors.Others)};
  background-color: ${({ theme, icon }) =>
    icon ? theme.colors.background[icon] : theme.colors.gray100};

  padding: 0.4rem 0.8rem;
  border-radius: 0.8rem;
`;
