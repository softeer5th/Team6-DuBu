import { http, HttpResponse } from 'msw';

import TODO_DATA from '../data/todoData.json';

import { MOCK_API_URL } from '@/constants/url';

interface TodoAddParams {
  dateType: string;
}

interface TodoDeleteParams {
  todoId: string;
}

interface TodoEditParams {
  todoId: string;
}

const getTodayTodoHandler = () => {
  const todayTodo = { ...TODO_DATA, data: TODO_DATA.data.filter((todo) => todo.type === 'today') };

  return HttpResponse.json(todayTodo);
};

const getTomorrowTodoHandler = () => {
  const tomorrowTodo = {
    ...TODO_DATA,
    data: TODO_DATA.data.filter((todo) => todo.type === 'tomorrow'),
  };

  return HttpResponse.json(tomorrowTodo);
};

const getFavoriteTodoHandler = () => {
  const favoriteTodo = {
    ...TODO_DATA,
    data: TODO_DATA.data.filter((todo) => todo.type === 'favorite'),
  };

  return HttpResponse.json(favoriteTodo);
};

const getRecommendTodoHandler = () => {
  const recommendTodo = {
    ...TODO_DATA,
    data: TODO_DATA.data.filter((todo) => todo.type === 'recommend'),
  };

  return HttpResponse.json(recommendTodo);
};

const addTodoHandler = async ({ params, request }: { params: TodoAddParams; request: Request }) => {
  const { dateType } = params;
  const newTodo = await request.json();

  if (dateType === 'today') {
    TODO_DATA.data.push({ ...newTodo, type: 'today', todo_id: TODO_DATA.data.length + 1 });
  } else if (dateType === 'tomorrow') {
    TODO_DATA.data.push({ ...newTodo, type: 'tomorrow', todo_id: TODO_DATA.data.length + 1 });
  }

  return HttpResponse.json(newTodo);
};

const deleteTodoHandler = ({ params }: { params: TodoDeleteParams }) => {
  const { todoId } = params;

  TODO_DATA.data = TODO_DATA.data.filter((todo) => todo.todo_id !== Number(todoId));

  return new HttpResponse(null, { status: 204 });
};

const editTodoHandler = async ({
  params,
  request,
}: {
  params: TodoEditParams;
  request: Request;
}) => {
  const { todoId } = params;
  const newTodo = await request.json();

  TODO_DATA.data = TODO_DATA.data.map((todo) => (todo.todo_id === Number(todoId) ? newTodo : todo));

  return new HttpResponse(null, { status: 204 });
};

const addTodoFromArchivedHandler = async ({
  params,
  request,
}: {
  params: TodoAddParams;
  request: Request;
}) => {
  const { dateType } = params;
  const { todoId } = await request.json();

  const newTodo = TODO_DATA.data.find((todo) => todo.todo_id === todoId);

  if (newTodo === undefined) {
    throw new Error('즐겨찾기 또는 추천에 해당하는 todo가 없습니다.');
  }

  if (dateType === 'today') {
    TODO_DATA.data.push({ ...newTodo, type: 'today', todo_id: TODO_DATA.data.length + 1 });
  } else if (dateType === 'tomorrow') {
    TODO_DATA.data.push({ ...newTodo, type: 'tomorrow', todo_id: TODO_DATA.data.length + 1 });
  }

  return HttpResponse.json(newTodo);
};

export const handlers = [
  http.get(MOCK_API_URL.todayTodo, getTodayTodoHandler),
  http.get(MOCK_API_URL.tomorrowTodo, getTomorrowTodoHandler),
  http.get(MOCK_API_URL.favoriteTodo, getFavoriteTodoHandler),
  http.get(MOCK_API_URL.recommendTodo, getRecommendTodoHandler),
  http.post<TodoAddParams>(MOCK_API_URL.addTodo, addTodoHandler),
  http.delete(MOCK_API_URL.deleteTodo, deleteTodoHandler),
  http.patch<TodoEditParams>(MOCK_API_URL.editTodo, editTodoHandler),
  http.post<TodoAddParams>(MOCK_API_URL.addTodoFromArchived, addTodoFromArchivedHandler),
];
