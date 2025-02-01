import { http, HttpResponse } from 'msw';

import FAVORITE_TODO from '../data/favoriteTodo.json';
import RECOMMEND_TODO from '../data/recommendTodo.json';
import TODAY_TODO from '../data/todayTodo.json';
import TOMORROW_TODO from '../data/tomorrowTodo.json';

import { MOCK_API_URL } from '@/constants/url';

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

export const handlers = [
  http.get(MOCK_API_URL.todayTodo, getTodayTodoHandler),
  http.get(MOCK_API_URL.tomorrowTodo, getTomorrowTodoHandler),
  http.get(MOCK_API_URL.favoriteTodo, getFavoriteTodoHandler),
  http.get(MOCK_API_URL.recommendTodo, getRecommendTodoHandler),
];
