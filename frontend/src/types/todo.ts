import { CategoryType, DifficultyType } from './filter';

export interface Todo {
  todoId: number;
  category: CategoryType;
  difficulty: DifficultyType;
  title: string;
  memo: string | null;
}
