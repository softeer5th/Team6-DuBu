import { http, HttpResponse } from 'msw';

import FAVORITE_TODO from '../data/favoriteTodo.json';
import RECOMMEND_TODO from '../data/recommendTodo.json';
import TODAY_TODO from '../data/todayTodo.json';
import TOMORROW_TODO from '../data/tomorrowTodo.json';

import { MOCK_API_URL } from '@/constants/url';

interface TodoAddParams {
  dateType: string;
}

interface TodoDeleteParams {
  todoId: string;
}

const getTodayTodoHandler = () => {
  return HttpResponse.json(TODAY_TODO);
};

const getTomorrowTodoHandler = () => {
  return HttpResponse.json(TOMORROW_TODO);
};

const getFavoriteTodoHandler = () => {
  return HttpResponse.json(FAVORITE_TODO);
};

const getRecommendTodoHandler = () => {
  return HttpResponse.json(RECOMMEND_TODO);
};

const addTodoHandler = async ({ params, request }: { params: TodoAddParams; request: Request }) => {
  const { dateType } = params;

  const newTodo = await request.json();

  if (dateType === 'today') {
    TODAY_TODO.data.push({ ...newTodo, todo_id: TODAY_TODO.data.length + 1 });
  } else if (dateType === 'tomorrow') {
    TOMORROW_TODO.data.push({ ...newTodo, todo_id: TOMORROW_TODO.data.length + 1 });
  }

  return HttpResponse.json(newTodo);
};

const deleteTodoHandler = ({ params }: { params: TodoDeleteParams }) => {
  const { todoId } = params;

  TODAY_TODO.data = TODAY_TODO.data.filter((todo) => todo.todo_id !== Number(todoId));
  TOMORROW_TODO.data = TOMORROW_TODO.data.filter((todo) => todo.todo_id !== Number(todoId));

  return new HttpResponse(null, { status: 204 });
};

export const handlers = [
  http.get(MOCK_API_URL.todayTodo, getTodayTodoHandler),
  http.get(MOCK_API_URL.tomorrowTodo, getTomorrowTodoHandler),
  http.get(MOCK_API_URL.favoriteTodo, getFavoriteTodoHandler),
  http.get(MOCK_API_URL.recommendTodo, getRecommendTodoHandler),
  http.post<TodoAddParams>(MOCK_API_URL.addTodo, addTodoHandler),
  http.delete(MOCK_API_URL.deleteTodo, deleteTodoHandler),
];
