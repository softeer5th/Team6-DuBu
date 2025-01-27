import { http, HttpResponse } from 'msw';

import TODAY_TODO from '../data/todayTodo.json';
import TOMORROW_TODO from '../data/tomorrowTodo.json';

const getTodayTodoHandler = () => {
  return HttpResponse.json(TODAY_TODO);
};

const getTomorrowTodoHandler = () => {
  return HttpResponse.json(TOMORROW_TODO);
};

export const handlers = [
  http.get('/todos/today', getTodayTodoHandler),
  http.get('/todos/tomorrow', getTomorrowTodoHandler),
];
