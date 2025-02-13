import * as S from './TodoShowForm.styled';

import RadioGroup from '@/components/RadioGroup';
import { CATEGORY_OPTIONS, DIFFICULTY_OPTIONS } from '@/pages/EditPage/EditPage.constants';
import { Todo } from '@/types/todo';

interface TodoShowFormProps {
  todo: Todo;
}

const TodoShowForm = ({ todo }: TodoShowFormProps) => {
  return (
    <>
      <S.TodoInputWrapper>
        <S.TodoInputLabel>제목</S.TodoInputLabel>
        <S.TodoInput value={todo.title} disabled />
      </S.TodoInputWrapper>

      <S.TodoInputWrapper>
        <S.TodoInputLabel>목표</S.TodoInputLabel>
        <RadioGroup
          name="category"
          filters={CATEGORY_OPTIONS}
          selectedValue={todo.category}
          disabled
        />
      </S.TodoInputWrapper>

      <S.TodoInputWrapper>
        <S.TodoInputLabel>난이도</S.TodoInputLabel>
        <RadioGroup
          name="difficulty"
          filters={DIFFICULTY_OPTIONS}
          selectedValue={todo.difficulty}
          disabled
        />
      </S.TodoInputWrapper>

      <S.TodoInputWrapper>
        <S.TodoInputLabel>메모</S.TodoInputLabel>
        <S.MemoTextarea value={todo.memo || ''} rows={5} maxLength={100} disabled />
      </S.TodoInputWrapper>
    </>
  );
};

export default TodoShowForm;
