import { useState } from 'react';

import * as S from './TodoAddForm.styled';

const categoryFilter = [
  {
    label: '독서',
    value: 'Reading',
  },
  {
    label: '영어',
    value: 'English',
  },
  {
    label: '제2외국어',
    value: 'Language',
  },
  {
    label: '뉴스/시사',
    value: 'News',
  },
  {
    label: '취미',
    value: 'Hobby',
  },
  {
    label: '기타',
    value: 'Others',
  },
];

const difficultyFilter = [
  {
    label: '쉬움',
    value: 'easy',
  },
  {
    label: '보통',
    value: 'medium',
  },
  {
    label: '어려움',
    value: 'difficulty',
  },
];

const TodoAddForm = () => {
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedDifficulty, setSelectedDifficulty] = useState('');

  return (
    <>
      <S.TodoInputWrapper>
        <S.TodoInputLabel>제목</S.TodoInputLabel>
        <S.TodoInput placeholder="할 일을 입력하세요" maxLength={30} />
      </S.TodoInputWrapper>

      <S.TodoInputWrapper>
        <S.TodoInputLabel>목표</S.TodoInputLabel>
        <S.RadioGroupWrapper>
          {categoryFilter.map((category) => (
            <label key={category.value}>
              <S.HiddenInput
                type="radio"
                name="category"
                value={category.value}
                onChange={(e) => setSelectedCategory(e.target.value)}
              />
              <S.RadioBadge $isSelected={selectedCategory === category.value}>
                {category.label}
              </S.RadioBadge>
            </label>
          ))}
        </S.RadioGroupWrapper>
      </S.TodoInputWrapper>

      <S.TodoInputWrapper>
        <S.TodoInputLabel>난이도</S.TodoInputLabel>
        <S.RadioGroupWrapper>
          {difficultyFilter.map((category) => (
            <label key={category.value}>
              <S.HiddenInput
                type="radio"
                name="difficulty"
                value={category.value}
                onChange={(e) => setSelectedDifficulty(e.target.value)}
              />
              <S.RadioBadge $isSelected={selectedDifficulty === category.value}>
                {category.label}
              </S.RadioBadge>
            </label>
          ))}
        </S.RadioGroupWrapper>
      </S.TodoInputWrapper>

      <S.TodoInputWrapper>
        <S.TodoInputLabel>메모</S.TodoInputLabel>
        <S.MemoTextarea placeholder="도움이 되는 메모나 링크를 입력해보세요" rows={5} />
      </S.TodoInputWrapper>
    </>
  );
};

export default TodoAddForm;
