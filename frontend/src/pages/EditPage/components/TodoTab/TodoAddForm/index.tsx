import { useState } from 'react';

import * as S from './TodoAddForm.styled';

import { TodoCreateParams } from '@/api/todo';
import RadioGroup from '@/components/RadioGroup';
import { CATEGORY_OPTIONS, DIFFICULTY_OPTIONS } from '@/pages/EditPage/EditPage.constants';
import { CategoryType, DifficultyType } from '@/types/filter';

interface TodoAddFormProps {
  handleAddTodo: (todo: TodoCreateParams) => void;
}

const TodoAddForm = ({ handleAddTodo }: TodoAddFormProps) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState<CategoryType | null>(null);
  const [difficulty, setDifficulty] = useState<DifficultyType | null>(null);
  const [memo, setMemo] = useState('');

  const isValidInput = title.trim().length > 0 && category && difficulty;

  const handleConfirm = () => {
    if (category === null || difficulty === null) return;

    const todo = {
      title: title.trim(),
      category,
      difficulty,
      memo: memo.trim() || null,
    };

    handleAddTodo(todo);
  };

  return (
    <>
      <S.TodoInputWrapper>
        <S.TodoInputLabel>제목</S.TodoInputLabel>
        <S.TodoInput
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="할 일을 입력하세요"
          maxLength={30}
        />
      </S.TodoInputWrapper>

      <S.TodoInputWrapper>
        <S.TodoInputLabel>목표</S.TodoInputLabel>
        <RadioGroup
          name="category"
          filters={CATEGORY_OPTIONS}
          handleChange={(e) => setCategory(e.target.value as CategoryType)}
          selectedValue={category ?? ''}
        />
      </S.TodoInputWrapper>

      <S.TodoInputWrapper>
        <S.TodoInputLabel>난이도</S.TodoInputLabel>
        <RadioGroup
          name="difficulty"
          filters={DIFFICULTY_OPTIONS}
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
        추가하기
      </S.ConfirmButton>
    </>
  );
};

export default TodoAddForm;
