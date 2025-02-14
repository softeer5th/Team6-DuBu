import { useState } from 'react';

import { CategoryType } from '@/types/filter';

const useCategoryFilters = () => {
  const [categoryFilters, setCategoryFilters] = useState({
    READING: false,
    ENGLISH: false,
    LANGUAGE: false,
    NEWS: false,
    HOBBY: false,
    OTHERS: false,
  });

  const handleCheckFilters = (category: CategoryType) => {
    setCategoryFilters((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  return { categoryFilters, handleCheckFilters };
};

export default useCategoryFilters;
