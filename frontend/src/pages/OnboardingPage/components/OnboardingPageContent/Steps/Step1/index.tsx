import { useEffect } from 'react';

import * as S from './Step1.styled';

import backgroundEnglish from '@/assets/images/backgroundEnglish.png';
import backgroundHobby from '@/assets/images/backgroundHobby.png';
import backgroundLanguage from '@/assets/images/backgroundLanguage.png';
import backgroundNews from '@/assets/images/backgroundNews.png';
import backgroundReading from '@/assets/images/backgroundReading.png';
import { useOnboarding } from '@/pages/OnboardingPage/hooks/useOnboarding';

const CATEGORIES = [
  { key: 'Reading', label: '독서', bg: backgroundReading },
  { key: 'English', label: '영어', bg: backgroundEnglish },
  { key: 'Hobby', label: '취미', bg: backgroundHobby },
  { key: 'Language', label: '제2외국어', bg: backgroundLanguage },
  { key: 'News', label: '뉴스/시사', bg: backgroundNews },
];

const MIN_SELECTED_CATEGORIES = 1;
const MAX_SELECTED_CATEGORIES = 3;

const Step1 = () => {
  const { setStepValidity, userInfo, setUserInfo } = useOnboarding();
  const { categories } = userInfo;

  const toggleCategory = (category: string) => {
    setUserInfo((prev) => {
      const isSelected = prev.categories.includes(category);
      const updatedCategories = isSelected
        ? prev.categories.filter((item) => item !== category)
        : [...prev.categories, category];

      if (updatedCategories.length <= MAX_SELECTED_CATEGORIES) {
        return { ...prev, categories: updatedCategories };
      }
      return prev;
    });
  };

  useEffect(() => {
    setStepValidity((prev) => ({
      ...prev,
      1:
        categories.length >= MIN_SELECTED_CATEGORIES &&
        categories.length <= MAX_SELECTED_CATEGORIES,
    }));
  }, [categories, setStepValidity]);

  const renderCategoryItems = (startIndex: number, endIndex: number) =>
    CATEGORIES.slice(startIndex, endIndex).map((category) => (
      <S.CategoryItem
        key={category.key}
        $isSelected={categories.includes(category.key)}
        $bgImage={category.bg}
        onClick={() => toggleCategory(category.key)}
      >
        {category.label}
      </S.CategoryItem>
    ));

  return (
    <S.CategoryWrapper>
      <S.IconColumn>{renderCategoryItems(0, 3)}</S.IconColumn>
      <S.IconColumn>{renderCategoryItems(3, 5)}</S.IconColumn>
    </S.CategoryWrapper>
  );
};

export default Step1;
