import { useEffect } from 'react';

import {
  CAGETORY_BACKGROUNDS_IMG,
  ONBOARDING_CATEGORIES as CATEGORIES,
  ONBOARDING_CATEGORY_DIVISION_NUM as DIVISION_NUM,
  ONBOARDING_CATEGORY_MAX_NUM as MAX_NUM,
  ONBOARDING_CATEGORY_MIN_NUM as MIN_NUM,
} from './Step1.constants';
import * as S from './Step1.styled';

import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';

const Step1 = () => {
  const {
    setOnboardingStepValidity: setStepValidity,
    onboardingUserInfo: userInfo,
    setOnboardingUserInfo: setUserInfo,
  } = useOnboarding();
  const { categories } = userInfo;

  const toggleCategory = (category: string) => {
    setUserInfo((prev) => {
      const isSelected = prev.categories.includes(category);
      const updatedCategories = isSelected
        ? prev.categories.filter((item) => item !== category)
        : [...prev.categories, category];

      if (updatedCategories.length <= MAX_NUM) {
        return { ...prev, categories: updatedCategories };
      }
      return prev;
    });
  };

  useEffect(() => {
    setStepValidity((prev) => ({
      ...prev,
      1: categories.length >= MIN_NUM && categories.length <= MAX_NUM,
    }));
  }, [categories.length, setStepValidity]);

  const renderCategoryItems = (startIndex: number, endIndex: number) =>
    CATEGORIES.slice(startIndex, endIndex).map((category) => (
      <S.CategoryItem
        key={category.label}
        $isSelected={categories.includes(category.label)}
        $bgImage={CAGETORY_BACKGROUNDS_IMG[category.label as keyof typeof CAGETORY_BACKGROUNDS_IMG]}
        onClick={() => toggleCategory(category.label)}
      >
        {category.value}
      </S.CategoryItem>
    ));

  return (
    <S.CategoryWrapper>
      <S.CategoryColumn>{renderCategoryItems(0, DIVISION_NUM)}</S.CategoryColumn>
      <S.CategoryColumn>{renderCategoryItems(DIVISION_NUM, CATEGORIES.length)}</S.CategoryColumn>
    </S.CategoryWrapper>
  );
};

export default Step1;
