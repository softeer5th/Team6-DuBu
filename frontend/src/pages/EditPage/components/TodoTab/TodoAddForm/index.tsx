import { useState } from 'react';

import * as S from './TodoAddForm.styled';

import RadioGroup from '@/components/RadioGroup';
import { categoryFilter, difficultyFilter } from '@/pages/EditPage/EditPage.constants';

const TodoAddForm = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  const handleChangeCategory = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategory(e.target.value);
  };

  const handleChangeDifficulty = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDifficulty(e.target.value);
  };

  return (
    <>
      <S.TodoInputWrapper>
        <S.TodoInputLabel>제목</S.TodoInputLabel>
        <S.TodoInput placeholder="할 일을 입력하세요" maxLength={30} />
      </S.TodoInputWrapper>

      <S.TodoInputWrapper>
        <S.TodoInputLabel>목표</S.TodoInputLabel>
        <RadioGroup
          name="category"
          filters={categoryFilter}
          handleChange={handleChangeCategory}
          selectedValue={selectedCategory}
        />
      </S.TodoInputWrapper>

      <S.TodoInputWrapper>
        <S.TodoInputLabel>난이도</S.TodoInputLabel>
        <RadioGroup
          name="difficulty"
          filters={difficultyFilter}
          handleChange={handleChangeDifficulty}
          selectedValue={selectedDifficulty}
        />
      </S.TodoInputWrapper>

      <S.TodoInputWrapper>
        <S.TodoInputLabel>메모</S.TodoInputLabel>
        <S.MemoTextarea placeholder="도움이 되는 메모나 링크를 입력해보세요" rows={5} />
      </S.TodoInputWrapper>
    </>
  );
};

export default TodoAddForm;
