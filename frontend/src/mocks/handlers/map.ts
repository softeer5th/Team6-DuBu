import { http, HttpResponse } from 'msw';

import TODO_DETAIL_DATA from '../data/todoDetail.json';

import { MOCK_API_URL } from '@/constants/url';

interface TodoDetailParams {
  memberId: string;
}

const getTodoDetailHandler = async ({ params }: { params: TodoDetailParams }) => {
  const { memberId } = params;

  return HttpResponse.json(TODO_DETAIL_DATA);
};

export const handlers = [http.get(MOCK_API_URL.todoDetail, getTodoDetailHandler)];
