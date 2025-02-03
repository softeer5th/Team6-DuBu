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
  Reading: '독서',
  Hobby: '취미',
  English: '영어',
  Language: '제2외국어',
  News: '뉴스/시사',
  Others: '기타',
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
