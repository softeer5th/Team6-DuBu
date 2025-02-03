export const TABS = [
  {
    label: '할 일',
    value: 'todo',
  },
  {
    label: '즐겨찾기',
    value: 'favorite',
  },
  {
    label: '추천',
    value: 'recommend',
  },
] as const;

export const categoryMapper = {
  READING: '독서',
  HOBBY: '취미',
  ENGLISH: '영어',
  LANGUAGE: '제2외국어',
  NEWS: '뉴스/시사',
  OTHERS: '기타',
} as const;

export const categoryFilter = [
  {
    label: '독서',
    value: 'READING',
  },
  {
    label: '영어',
    value: 'ENGLISH',
  },
  {
    label: '제2외국어',
    value: 'LANGUAGE',
  },
  {
    label: '뉴스/시사',
    value: 'NEWS',
  },
  {
    label: '취미',
    value: 'HOBBY',
  },
  {
    label: '기타',
    value: 'OTHERS',
  },
];

export const difficultyFilter = [
  {
    label: '쉬움',
    value: 'EASY',
  },
  {
    label: '보통',
    value: 'NORMAL',
  },
  {
    label: '어려움',
    value: 'HARD',
  },
];
