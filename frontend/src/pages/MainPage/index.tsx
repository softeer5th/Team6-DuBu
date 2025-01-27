import { useQuery } from '@tanstack/react-query';

import * as S from './MainPage.styled';

import { getTodayTodoList } from '@/api/todo';
import Icon, { IconType } from '@/components/Icon';

interface RouteItemProps {
  icon: IconType;
  location: string;
  value: string;
}

const RouteItem = ({ icon, location, value }: RouteItemProps) => {
  return (
    <S.RouteItem>
      <S.RouteTitleWrapper>
        <Icon icon={icon} />
        <S.Location>{location}</S.Location>
      </S.RouteTitleWrapper>
      <span>{value || '주소 입력'}</span>
    </S.RouteItem>
  );
};

const MainPage = () => {
  const { data: todoList } = useQuery({
    queryKey: ['todoList'],
    queryFn: getTodayTodoList,
  });

  return (
    <S.MainPageLayout>
      <S.HeaderContainer>
        <S.DateHeader>
          <S.EmptyDateHeader />
          <span>1월 11일 월요일</span>
          <button>
            <Icon icon="FilledArrow" rotate={-90} />
          </button>
        </S.DateHeader>
        <S.RouteSection>
          <RouteItem icon="AddressHome" location="집" value="주소 입력" />
          <S.IconWrapper>
            <Icon icon="Switch" width={36} height={36} />
          </S.IconWrapper>
          <RouteItem icon="AddressUniv" location="학교" value="주소 입력" />
        </S.RouteSection>
      </S.HeaderContainer>

      <S.ContentContainer>
        <S.ContentHeader>
          <S.ContentTitle>오늘 할 일을 보여드려요</S.ContentTitle>
          <S.EditButton>
            <Icon icon="Edit" width={16} height={16} />
            <S.EditLabel>수정하기</S.EditLabel>
          </S.EditButton>
        </S.ContentHeader>

        <S.TodoList>
          {todoList?.map((todo) => (
            <S.TodoItem key={todo.todo_id}>
              <Icon icon="Reading" />
              <span>{todo.name}</span>
            </S.TodoItem>
          ))}
        </S.TodoList>
      </S.ContentContainer>

      <S.StartButtonWrapper>
        <S.StartButton>
          <Icon icon="Fire" width={20} height={20} color={'white'} />
          <span>출발하기</span>
        </S.StartButton>
      </S.StartButtonWrapper>
    </S.MainPageLayout>
  );
};

export default MainPage;
