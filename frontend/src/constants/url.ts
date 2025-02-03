const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_URL = {
  todayTodo: `${BASE_URL}/todos/today`,
  tomorrowTodo: `${BASE_URL}/todos/tomorrow`,
  favoriteTodo: `${BASE_URL}/todos/favorites`,
  recommendTodo: `${BASE_URL}/todos/recommend/limit`,
  addTodo: (dateType: string) => `${BASE_URL}/todos/${dateType}/manual`,
};

export const MOCK_API_URL = {
  todayTodo: `${BASE_URL}/todos/today`,
  tomorrowTodo: `${BASE_URL}/todos/tomorrow`,
  favoriteTodo: `${BASE_URL}/todos/favorites`,
  recommendTodo: `${BASE_URL}/todos/recommend/limit`,
  addTodo: `${BASE_URL}/todos/:dateType/manual`,
};
