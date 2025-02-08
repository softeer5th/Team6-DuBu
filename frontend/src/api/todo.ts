import fetchClient from './fetchClient';

import { API_URL } from '@/constants/url';
import { CategoryType, DifficultyType } from '@/types/filter';
import { Todo } from '@/types/todo';

export type TodoAddParams = Omit<Todo, 'todoId'>;

export interface TodoResponse {
  data: Todo[];
}

export interface TodoCreateResponse {
  data: Todo;
}

interface RecommendAllTodoResponse {
  data: {
    todoList: Todo[];
    categoryList: CategoryType[];
  };
}

interface RecommendAllTodoParams {
  category: CategoryType[];
  difficulty: DifficultyType[];
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

export const getRecommendLimitTodoList = async () => {
  const result = await fetchClient.get<TodoResponse>(API_URL.recommendLimitTodo);

  return result.data;
};

export const getRecommendAllTodoList = async (params: RecommendAllTodoParams) => {
  const urlQueryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      urlQueryParams.append(key, value.join(','));
    }
  });

  const queryString = urlQueryParams.toString();
  const queryParams = queryString ? `?${queryString}` : queryString;

  const result = await fetchClient.get<RecommendAllTodoResponse>(
    API_URL.recommendAllTodo(queryParams),
  );

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

export const editTodo = async (todo: Todo) => {
  return await fetchClient.patch(API_URL.editTodo(todo.todoId), { body: { ...todo } });
};

export const addTodoFromArchived = async (dateType: string, todoId: number) => {
  const result = await fetchClient.post<TodoCreateResponse>(API_URL.addTodoFromArchived(dateType), {
    body: { todoId },
  });

  return result.data;
};
