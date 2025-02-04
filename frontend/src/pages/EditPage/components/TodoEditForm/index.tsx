import { ChangeEvent, useState } from 'react';

import * as S from './TodoEditForm.styled';
import { categoryFilter, difficultyFilter } from '../../EditPage.constants';

import RadioGroup from '@/components/RadioGroup';
import { CategoryType, DifficultyType } from '@/types/filter';
import { Todo } from '@/types/todo';

interface TodoEditFormProps {
  todo: Todo;
  handleEditTodo: (todo: Todo) => void;
}

const TodoEditForm = ({ todo, handleEditTodo }: TodoEditFormProps) => {
  const [title, setTitle] = useState(todo.title || '');
  const [category, setCategory] = useState<CategoryType>(todo.category);
  const [difficulty, setDifficulty] = useState<DifficultyType>(todo.difficulty);
  const [memo, setMemo] = useState(todo.memo || '');

  const isValidInput = title.trim().length > 0 && category && difficulty;

  const handleConfirm = () => {
    const editedTodo = {
      todoId: todo.todoId,
      title: title.trim(),
      category,
      difficulty,
      memo: memo.trim() || null,
    };

    handleEditTodo(editedTodo);
  };

  return (
    <>
      <S.TodoInputWrapper>
        <S.TodoInputLabel>제목</S.TodoInputLabel>
        <S.TodoInput
          value={title}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setTitle(e.target.value)}
          placeholder="할 일을 입력하세요"
          maxLength={30}
        />
      </S.TodoInputWrapper>

      <S.TodoInputWrapper>
        <S.TodoInputLabel>목표</S.TodoInputLabel>
        <RadioGroup
          name="category"
          filters={categoryFilter}
          handleChange={(e) => setCategory(e.target.value as CategoryType)}
          selectedValue={category ?? ''}
        />
      </S.TodoInputWrapper>

      <S.TodoInputWrapper>
        <S.TodoInputLabel>난이도</S.TodoInputLabel>
        <RadioGroup
          name="difficulty"
          filters={difficultyFilter}
          handleChange={(e) => setDifficulty(e.target.value as DifficultyType)}
          selectedValue={difficulty ?? ''}
        />
      </S.TodoInputWrapper>

      <S.TodoInputWrapper>
        <S.TodoInputLabel>메모</S.TodoInputLabel>
        <S.MemoTextarea
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          placeholder="도움이 되는 메모나 링크를 입력해보세요"
          rows={5}
          maxLength={100}
        />
      </S.TodoInputWrapper>

      <S.ConfirmButton onClick={handleConfirm} disabled={!isValidInput}>
        수정하기
      </S.ConfirmButton>
    </>
  );
};

export default TodoEditForm;
