import fetchClient from './fetchClient';

import { API_URL } from '@/constants/url';
import { CategoryType, DifficultyType } from '@/types/filter';
import { Todo } from '@/types/todo';

export type TodoCreateParams = Omit<Todo, 'todoId'>;

export interface TodoAddParams {
  dateType: string;
  todo: TodoCreateParams;
  planId?: number;
}

export interface RecommendTodo {
  todoId: number;
  hasChild: boolean;
  category: CategoryType;
  difficulty: DifficultyType;
  title: string;
  memo: string | null;
}

interface RecommendTodoResponse {
  data: RecommendTodo[];
}

export interface TodoResponse {
  data: Todo[];
}

export interface TodoCreateResponse {
  data: Todo;
}

interface RecommendAllTodoResponse {
  hasNext: boolean;
  nextCursor: {
    cursorCategoryId: number;
    cursorDifficulty: DifficultyType;
    cursorTodoId: number;
  };
  data: RecommendTodo[];
}

interface RecommendAllTodoParams {
  modifyType: string;
  category: CategoryType[];
  difficulty: DifficultyType[];
  size: number;
  cursorCategoryId?: number;
  cursorDifficulty?: DifficultyType;
  cursorTodoId?: number;
}

export const getTodayTodoList = async () => {
  const result = await fetchClient.get<TodoResponse>(API_URL.todayTodo);

  return result.data;
};

export const getTomorrowTodoList = async () => {
  const result = await fetchClient.get<TodoResponse>(API_URL.tomorrowTodo);

  return result.data;
};

export const getFavoriteTodoList = async (dateType: string, size: number = 5) => {
  const result = await fetchClient.get<RecommendTodoResponse>(API_URL.favoriteTodo(dateType, size));

  return result.data;
};

export const getRecommendLimitTodoList = async (dateType: string) => {
  const result = await fetchClient.get<RecommendTodoResponse>(API_URL.recommendLimitTodo(dateType));

  return result.data;
};

export const getRecommendAllTodoList = async (params: RecommendAllTodoParams) => {
  const urlQueryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (Array.isArray(value) && value.length > 0) {
      urlQueryParams.append(key, value.join(','));
    } else if (value !== undefined) {
      urlQueryParams.append(key, value.toString());
    }
  });

  const queryString = urlQueryParams.toString();
  const queryParams = queryString ? `?${queryString}` : queryString;

  const result = await fetchClient.get<RecommendAllTodoResponse>(
    API_URL.recommendAllTodo(queryParams),
  );

  return result.data;
};

export const addTodo = async ({ dateType, todo, planId }: TodoAddParams) => {
  const result = await fetchClient.post<TodoCreateResponse>(API_URL.addTodo(dateType, planId), {
    body: { ...todo },
  });

  return result.data;
};

export const deleteTodo = async (todoId: number, dateType: string) => {
  return await fetchClient.delete(API_URL.deleteTodo(todoId, dateType));
};

export const editTodo = async (todo: Todo, dateType: string) => {
  return await fetchClient.patch(API_URL.editTodo(todo.todoId, dateType), {
    body: {
      title: todo.title,
      category: todo.category,
      difficulty: todo.difficulty,
      memo: todo.memo,
    },
  });
};

export const addTodoFromArchived = async (dateType: string, todoId: number, planId?: number) => {
  const result = await fetchClient.post<TodoCreateResponse>(
    API_URL.addTodoFromArchived(dateType, planId),
    {
      body: { todoId },
    },
  );

  return result.data;
};

export const getRouteTodoList = async (planId: number) => {
  const result = await fetchClient.get<TodoResponse>(API_URL.routeTodo(planId));

  return result.data;
};
