import { useEffect, useState } from 'react';

import * as S from './RecommendTodoContainer.styled';
import useFilterBottomSheet from '../../hooks/useFilterBottomSheet';
import useRecommendTodoFilterQuery from '../../hooks/useRecommendTodoFilterQuery';
import FilterForm from '../FilterForm';

import BottomSheet from '@/components/BottomSheet';
import IconButton from '@/components/Button/IconButton';
import Icon from '@/components/Icon';
import useQueryParamsDate from '@/hooks/useQueryParamsDate';
import TodoEditItem from '@/pages/EditPage/components/TodoEditItem';
import useAddTodoFromArchivedMutation from '@/pages/EditPage/hooks/useAddTodoFromArchivedMutation';
import { CategoryType, DifficultyType } from '@/types/filter';

const RecommendTodoContainer = () => {
  const { dateType } = useQueryParamsDate();
  const { isOpen, open, close } = useFilterBottomSheet();
  const [categoryList, setCategoryList] = useState<CategoryType[]>([]);
  const [difficultyList, setDifficultyList] = useState<DifficultyType[]>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  const { data, isLoading } = useRecommendTodoFilterQuery(categoryList, difficultyList);
  const { mutate: addTodoFromArchived } = useAddTodoFromArchivedMutation();

  const isCategory = categoryList.length > 0;
  const isDifficulty = difficultyList.length > 0;

  const handleFilter = (categoryList: CategoryType[], difficultyList: DifficultyType[]) => {
    setCategoryList(categoryList);
    setDifficultyList(difficultyList);
    close();
  };

  const handleAddTodoFromRecommendAll = (todoId: number) => {
    addTodoFromArchived({ dateType, todoId });
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
