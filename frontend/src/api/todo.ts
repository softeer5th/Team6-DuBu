import fetchClient from './fetchClient';

import { API_URL } from '@/constants/url';
import { Todo } from '@/types/todo';

export type TodoAddParams = Omit<Todo, 'todoId'>;

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

export const addTodo = async (dateType: string, todo: TodoAddParams) => {
  const result = await fetchClient.post<TodoCreateResponse>(API_URL.addTodo(dateType), {
    body: { ...todo },
  });

  return result.data;
};

export const deleteTodo = async (todoId: number) => {
  return await fetchClient.delete(API_URL.deleteTodo(todoId));
};

export const addTodoFromArchived = async (dateType: string, todoId: number) => {
  const result = await fetchClient.post<TodoCreateResponse>(API_URL.addTodoFromArchived(dateType), {
    body: { todoId },
  });

  return result.data;
};
