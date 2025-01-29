const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_URL = {
  todayTodo: `${BASE_URL}/todos/today`,
  tomorrowTodo: `${BASE_URL}/todos/tomorrow`,
};

export const MOCK_API_URL = {
  todayTodo: `${BASE_URL}/todos/today`,
  tomorrowTodo: `${BASE_URL}/todos/tomorrow`,
};
