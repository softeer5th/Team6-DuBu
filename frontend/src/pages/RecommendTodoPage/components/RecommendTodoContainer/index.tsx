import { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import * as S from './RecommendTodoContainer.styled';
import useFilterBottomSheet from '../../hooks/useFilterBottomSheet';
import useRecommendTodoFilterQuery from '../../hooks/useRecommendTodoFilterQuery';
import FilterForm from '../FilterForm';

import BottomSheet from '@/components/BottomSheet';
import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';
import { TODO_TOAST_MESSAGE } from '@/constants/message';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';
import useToast from '@/hooks/useToast';
import useTodoListQuery from '@/hooks/useTodoListQuery';
import TodoEditItem from '@/pages/EditPage/components/TodoEditItem';
import useAddTodoFromArchivedMutation from '@/pages/EditPage/hooks/useAddTodoFromArchivedMutation';
import { CategoryType, DifficultyType } from '@/types/filter';

const RecommendTodoContainer = () => {
  const { planId } = useParams();
  const { dateType } = useQueryParamsDate();
  const { isOpen, open, close } = useFilterBottomSheet();
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [difficultyList, setDifficultyList] = useState<DifficultyType[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const { data: todoList } = useTodoListQuery(dateType, Number(planId));
  const { data, isLoading } = useRecommendTodoFilterQuery(categoryList, difficultyList);
  const { mutate: addTodoFromArchived } = useAddTodoFromArchivedMutation();
  const { toast } = useToast();

  const isCategory = categoryList.length > 0;
  const isDifficulty = difficultyList.length > 0;

  const handleFilter = (categoryList: CategoryType[], difficultyList: DifficultyType[]) => {
    setCategoryList(categoryList);
    setDifficultyList(difficultyList);
    close();
  };

  const handleAddTodoFromRecommendAll = (todoId: number) => {
    if (todoList && todoList.length >= 3) {
      toast({ message: TODO_TOAST_MESSAGE.limit });
      return;
    }

    addTodoFromArchived(
      { dateType, todoId, planId: Number(planId) },
      { onSuccess: () => toast({ message: TODO_TOAST_MESSAGE.add }) },
    );
  };

  // 초기 로딩 시에만 응답값 설정
  useEffect(() => {
    if (!isInitialized && data?.categoryList) {
      setCategoryList(data.categoryList);
      setIsInitialized(true);
    }
  }, [isInitialized, data]);

  // 로딩중
  if (isLoading) return <div>로딩중...</div>;

  // 데이터가 없을 경우
  if (!data) return <div>추천 할 일 데이터가 없습니다.</div>;

  return (
    <>
      <S.FilterWrapper onClick={open}>
        <S.IconButtonWrapper
          $isSelected={isCategory}
          flex="row-reverse"
          icon={isCategory && <Icon icon="FilledArrow" cursor="pointer" width={16} height={16} />}
          text={isCategory ? `목표 ${categoryList.length}` : '목표'}
        />

        <S.IconButtonWrapper
          $isSelected={isDifficulty}
          flex="row-reverse"
          icon={isDifficulty && <Icon icon="FilledArrow" cursor="pointer" width={16} height={16} />}
          text={isDifficulty ? `난이도 ${difficultyList.length}` : '난이도'}
        />
      </S.FilterWrapper>
      <S.RecommendTabList>
        {data?.todoList.map((todo) => (
          <TodoEditItem
            key={todo.todoId}
            todo={todo}
            left={
              <IconButton
                icon={<Icon icon="PlusCircle" cursor="pointer" />}
                onClick={() => handleAddTodoFromRecommendAll(todo.todoId)}
              />
            }
          />
        ))}
      </S.RecommendTabList>
      <BottomSheet
        isOpen={isOpen}
        onClose={close}
        content={
          <FilterForm
            selectedCategoryList={categoryList}
            selectedDifficultyList={difficultyList}
            onClose={close}
            onConfirm={handleFilter}
          />
        }
      />
    </>
  );
};

export default RecommendTodoContainer;
