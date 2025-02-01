import fetchClient from './fetchClient';

import { API_URL } from '@/constants/url';
import { Category } from '@/types/category';

export interface Todo {
  todo_id: number;
  category: Category;
  difficulty: '쉬움' | '보통' | '어려움';
  name: string;
}

export interface TodoResponse {
  data: Todo[];
}

export const getTodayTodoList = async () => {
  const result = await fetchClient.get<TodoResponse>(API_URL.todayTodo);

  return result.data;
};

export const getTomorrowTodoList = async () => {
  const result = await fetchClient.get<TodoResponse>(API_URL.tomorrowTodo);

  return result.data;
};
