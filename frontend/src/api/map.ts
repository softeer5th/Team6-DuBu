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

export const getTodoDetail = async (memberId: number) => {
  const result = await fetchClient.get<TodoDetailResponse>(API_URL.todoDetail(memberId));

  return result.data;
};
