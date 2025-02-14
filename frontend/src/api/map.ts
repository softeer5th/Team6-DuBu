import fetchClient from './fetchClient';

import { API_URL } from '@/constants/url';
import { CategoryType } from '@/types/filter';

interface TodoDetail {
  todoId: number;
  title: string;
  category: CategoryType;
  isSaved: boolean;
}

interface TodoDetailResponse {
  data: {
    nickname: string;
    todo: TodoDetail[];
  };
}

interface TodoFavoriteFromOtherResponse {
  data: {
    todoId: number;
    title: string;
    category: CategoryType;
  };
}

export interface NearbyMember {
  memberId: number;
  x_coordinate: number;
  y_coordinate: number;
  category: CategoryType;
}

export interface CategoryRanking {
  rank: number;
  category: CategoryType;
  num: number;
}

interface NearbyUserResponse {
  data: {
    nearMember: NearbyMember[];
    categoryRanking: CategoryRanking[];
  };
}

interface NearbyUserParams {
  radius: number;
  x_coordinate: number;
  y_coordinate: number;
  category?: CategoryType;
}

export const getTodoDetail = async (memberId: number) => {
  const result = await fetchClient.get<TodoDetailResponse>(API_URL.todoDetail(memberId));

  return result.data;
};

export const addFavoriteFromOther = async (todoId: number) => {
  const result = await fetchClient.post<TodoFavoriteFromOtherResponse>(
    API_URL.addFavoriteFromOther,
    { body: { todoId } },
  );

  return result.data;
};

export const deleteFavoriteFromOther = async (todoId: number) => {
  return await fetchClient.delete(API_URL.deleteFavoriteFromOther(todoId));
};

export const getNearbyUsers = async (params: NearbyUserParams) => {
  const urlQueryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined) {
      urlQueryParams.append(key, value.toString());
    }
  });

  const queryString = urlQueryParams.toString();
  const queryParams = queryString ? `?${queryString}` : queryString;

  const result = await fetchClient.get<NearbyUserResponse>(API_URL.getNearbyUsers(queryParams));

  return result.data;
};
