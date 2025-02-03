import fetchClient from './fetchClient';

import { API_URL } from '@/constants/url';
import { Category } from '@/types/category';

export interface Todo {
  todo_id: number;
  category: Category;
  difficulty: '쉬움' | '보통' | '어려움';
  name: string;
}

export interface AddTodoParams {
  name: string;
  category: string; // TODO: 카테고리 대문자
  difficulty: string; // 'EASY' | 'NORMAL' | 'HARD';
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
