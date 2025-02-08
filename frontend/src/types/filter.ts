// 카테고리(목표): 독서, 영어, 제2외국어, 뉴스/시사, 취미, 기타
export type CategoryType = 'READING' | 'HOBBY' | 'ENGLISH' | 'LANGUAGE' | 'NEWS' | 'OTHERS';

// 난이도: 쉬움, 보통, 어려움
export type DifficultyType = 'EASY' | 'NORMAL' | 'HARD';

export interface Filter {
  label: string;
  value: string;
}
