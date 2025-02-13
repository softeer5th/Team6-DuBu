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

const addFavoriteFromOtherHandler = async ({ request }: { request: Request }) => {
  const { todoId } = await request.json();
  const todo = TODO_DETAIL_DATA.data.todo.find((todo) => todo.todoId === todoId);

  if (!todo) {
    return HttpResponse.json({ error: 'Todo not found' }, { status: 404 });
  }

  todo.isSaved = true;

  TODO_DETAIL_DATA.data.todo.forEach((todo) => {
    if (todo.todoId === todoId) {
      todo.isSaved = true;
    }
  });

  return HttpResponse.json(todo);
};

const deleteFavoriteFromOtherHandler = async ({ request }: { request: Request }) => {
  const url = new URL(request.url);

  const todoId = url.searchParams.get('todoId');

  const filteredTodo = TODO_DETAIL_DATA.data.todo.map((todo) =>
    todo.todoId === Number(todoId) ? { ...todo, isSaved: false } : todo,
  );

  TODO_DETAIL_DATA.data.todo = filteredTodo;

  return new HttpResponse(null, { status: 204 });
};

export const handlers = [
  http.get(MOCK_API_URL.todoDetail, getTodoDetailHandler),
  http.post(MOCK_API_URL.addFavoriteFromOther, addFavoriteFromOtherHandler),
  http.delete(MOCK_API_URL.deleteFavoriteFromOther, deleteFavoriteFromOtherHandler),
];
