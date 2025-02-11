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

export const CATEGORY_MAPPER = {
  READING: '독서',
  ENGLISH: '영어',
  LANGUAGE: '제2외국어',
  NEWS: '뉴스/시사',
  HOBBY: '취미',
  OTHERS: '기타',
} as const;

export const DIFFICULTY_MAPPER = {
  EASY: '쉬움',
  NORMAL: '보통',
  HARD: '어려움',
} as const;

export const CATEGORY_OPTIONS = [
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
] as const;

export const DIFFICULTY_OPTIONS = [
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
] as const;

export const TODO_TAB_TEXT = {
  today: '오늘 할 일, 작은 목표로 시작해봐요\n최대 3개까지 고를 수 있어요',
  tomorrow: '내일 할 일, 작은 목표로 시작해봐요\n최대 3개까지 고를 수 있어요',
  route: '이 구간에서 할 일을 골라보세요',
};
