import { CATEGORY_OPTIONS, DIFFICULTY_OPTIONS } from '../EditPage/EditPage.constants';

import { CategoryType, DifficultyType } from '@/types/filter';

export const getFilterCategories = (selectedCategoryList: CategoryType[]) => {
  return CATEGORY_OPTIONS.reduce(
    (acc, { value }) => {
      acc[value] = selectedCategoryList.includes(value);
      return acc;
    },
    {} as Record<CategoryType, boolean>,
  );
};

export const getFilterDifficulties = (selectedDifficultyList: DifficultyType[]) => {
  return DIFFICULTY_OPTIONS.reduce(
    (acc, { value }) => {
      acc[value] = selectedDifficultyList.includes(value);
      return acc;
    },
    {} as Record<DifficultyType, boolean>,
  );
};
