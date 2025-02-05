import React, { useState } from 'react';

import * as S from './FilterForm.styled';

import Icon from '@/components/Icon';
import { CATEGORY_OPTIONS, DIFFICULTY_OPTIONS } from '@/pages/EditPage/EditPage.constants';
import { CategoryType, DifficultyType } from '@/types/filter';

const getFilterCategories = (selectedCategoryList: CategoryType[]) => {
  return CATEGORY_OPTIONS.reduce(
    (acc, { value }) => {
      acc[value] = selectedCategoryList.includes(value);
      return acc;
    },
    {} as Record<CategoryType, boolean>,
  );
};

const getFilterDifficulties = (selectedDifficultyList: DifficultyType[]) => {
  return DIFFICULTY_OPTIONS.reduce(
    (acc, { value }) => {
      acc[value] = selectedDifficultyList.includes(value);
      return acc;
    },
    {} as Record<DifficultyType, boolean>,
  );
};

const FilterForm = ({
  selectedCategoryList,
  selectedDifficultyList,
  onClose,
  onConfirm,
}: {
  selectedCategoryList: CategoryType[];
  selectedDifficultyList: DifficultyType[];
  onClose: () => void;
  onConfirm: (selectedCategories: CategoryType[], selectedDifficulties: DifficultyType[]) => void;
}) => {
  const [categories, setCategories] = useState(() => getFilterCategories(selectedCategoryList));
  const [difficulties, setDifficulties] = useState(() =>
    getFilterDifficulties(selectedDifficultyList),
  );

  const handleClickCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value as CategoryType;

    setCategories((prev) => ({ ...prev, [value]: !prev[value] }));
  };

  const handleClickDifficulty = (e: React.MouseEvent<HTMLButtonElement>) => {
    const value = e.currentTarget.value as DifficultyType;

    setDifficulties((prev) => ({ ...prev, [value]: !prev[value] }));
  };

  const handleConfirmClick = () => {
    const selectedCategories = Object.entries(categories)
      .filter(([, isSelected]) => isSelected)
      .map(([key]) => key as CategoryType);

    const selectedDifficulties = Object.entries(difficulties)
      .filter(([, isSelected]) => isSelected)
      .map(([key]) => key as DifficultyType);

    onConfirm(selectedCategories, selectedDifficulties);
  };

  return (
    <S.FilterContentLayout>
      <S.FilterContainer>
        <S.FilterTitle>목표</S.FilterTitle>
        <S.FilterWrapper>
          {CATEGORY_OPTIONS.map((filter) => (
            <S.CheckedBadge
              key={filter.value}
              value={filter.value}
              $isSelected={categories[filter.value]}
              onClick={handleClickCategory}
            >
              {categories[filter.value] && <Icon icon="Check" width={16} height={16} />}
              {filter.label}
            </S.CheckedBadge>
          ))}
        </S.FilterWrapper>
      </S.FilterContainer>

      <S.FilterContainer>
        <S.FilterTitle>난이도</S.FilterTitle>
        <S.FilterWrapper>
          {DIFFICULTY_OPTIONS.map((filter) => (
            <S.CheckedBadge
              key={filter.value}
              value={filter.value}
              $isSelected={difficulties[filter.value]}
              onClick={handleClickDifficulty}
            >
              {difficulties[filter.value] && <Icon icon="Check" width={16} height={16} />}
              {filter.label}
            </S.CheckedBadge>
          ))}
        </S.FilterWrapper>
      </S.FilterContainer>

      <S.Footer>
        <S.CancelButton onClick={onClose}>취소하기</S.CancelButton>
        <S.ConfirmButton onClick={handleConfirmClick}>필터 적용</S.ConfirmButton>
      </S.Footer>
    </S.FilterContentLayout>
  );
};

export default FilterForm;
