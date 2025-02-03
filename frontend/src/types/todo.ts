import { CategoryType, DifficultyType } from './filter';

export interface Todo {
  todo_id: number;
  category: CategoryType;
  difficulty: DifficultyType;
  name: string;
}
