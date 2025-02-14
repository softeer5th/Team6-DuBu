import { CategoryType, DifficultyType } from './filter';

import { DATE_TYPE, TODO_TYPE } from '@/constants/config';

export interface Todo {
  todoId: number;
  category: CategoryType;
  difficulty: DifficultyType;
  title: string;
  memo: string | null;
}

export type TodoType = keyof typeof TODO_TYPE;
export type DateType = keyof typeof DATE_TYPE;
