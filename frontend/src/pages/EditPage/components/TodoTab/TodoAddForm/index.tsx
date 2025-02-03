import { useState } from 'react';

import * as S from './TodoAddForm.styled';

import { AddTodoParams } from '@/api/todo';
import RadioGroup from '@/components/RadioGroup';
import { categoryFilter, difficultyFilter } from '@/pages/EditPage/EditPage.constants';

interface TodoAddFormProps {
  handleAddTodo: (todo: AddTodoParams) => void;
}

const TodoAddForm = ({ handleAddTodo }: TodoAddFormProps) => {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [memo, setMemo] = useState('');

  const isValidInput = title.trim().length > 0 && category && difficulty;

  const handleConfirm = () => {
    const todo = {
      name: title.trim(),
      category,
      difficulty,
      memo: memo.trim(),
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
          filters={categoryFilter}
          handleChange={(e) => setCategory(e.target.value)}
          selectedValue={category}
        />
      </S.TodoInputWrapper>

      <S.TodoInputWrapper>
        <S.TodoInputLabel>난이도</S.TodoInputLabel>
        <RadioGroup
          name="difficulty"
          filters={difficultyFilter}
          handleChange={(e) => setDifficulty(e.target.value)}
          selectedValue={difficulty}
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
