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
