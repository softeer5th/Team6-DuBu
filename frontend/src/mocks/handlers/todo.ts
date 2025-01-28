import { http, HttpResponse } from 'msw';

import TODAY_TODO from '../data/todayTodo.json';
import TOMORROW_TODO from '../data/tomorrowTodo.json';

import { MOCK_API_URL } from '@/constants/url';

const getTodayTodoHandler = () => {
  return HttpResponse.json(TODAY_TODO);
};

const getTomorrowTodoHandler = () => {
  return HttpResponse.json(TOMORROW_TODO);
};

export const handlers = [
  http.get(MOCK_API_URL.todayTodo, getTodayTodoHandler),
  http.get(MOCK_API_URL.tomorrowTodo, getTomorrowTodoHandler),
];
