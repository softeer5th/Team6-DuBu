import fetchClient from './fetchClient';

import { API_URL } from '@/constants/url';
import { CategoryType, DifficultyType } from '@/types/filter';
import { Todo } from '@/types/todo';

export interface AddTodoParams {
  name: string;
  category: CategoryType;
  difficulty: DifficultyType;
  memo?: string;
}

export interface TodoResponse {
  data: Todo[];
}

export interface TodoCreateResponse {
  data: Todo;
}

export const getTodayTodoList = async () => {
  const result = await fetchClient.get<TodoResponse>(API_URL.todayTodo);

  return result.data;
};

export const getTomorrowTodoList = async () => {
  const result = await fetchClient.get<TodoResponse>(API_URL.tomorrowTodo);

  return result.data;
};

export const getFavoriteTodoList = async () => {
  const result = await fetchClient.get<TodoResponse>(API_URL.favoriteTodo);

  return result.data;
};

export const getRecommendTodoList = async () => {
  const result = await fetchClient.get<TodoResponse>(API_URL.recommendTodo);

  return result.data;
};

export const addTodo = async (dateType: string, todo: AddTodoParams) => {
  const result = await fetchClient.post<TodoCreateResponse>(API_URL.addTodo(dateType), {
    body: { ...todo },
  });

  return result.data;
};

export const deleteTodo = async (todoId: number) => {
  return await fetchClient.delete(API_URL.deleteTodo(todoId));
};
