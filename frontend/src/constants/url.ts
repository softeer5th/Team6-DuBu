const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_URL = {
  todayTodo: `${BASE_URL}/todos/today`,
  tomorrowTodo: `${BASE_URL}/todos/tomorrow`,
  favoriteTodo: `${BASE_URL}/todos/favorites`,
  recommendLimitTodo: `${BASE_URL}/todos/recommend/limit`,
  recommendAllTodo: (queryParams: string) => `${BASE_URL}/todos/recommend/all${queryParams}`,
  addTodo: (dateType: string, planId?: number) =>
    `${BASE_URL}/todos/${dateType}/manual${planId ? `/${planId}` : ''}`,
  deleteTodo: (todoId: number, planId?: number) =>
    `${BASE_URL}/todos/${todoId}${planId ? `/${planId}` : ''}`,
  editTodo: (todoId: number, planId?: number) =>
    `${BASE_URL}/todos/${todoId}${planId ? `/${planId}` : ''}`,
  addTodoFromArchived: (dateType: string, planId?: number) =>
    `${BASE_URL}/todos/${dateType}/from-archived${planId ? `/${planId}` : ''}`,
  routeTodo: (planId: number) => `${BASE_URL}/routes/${planId}/todos`,
  searchAddress: `${BASE_URL}/address/search`,
  onboarding: `${BASE_URL}/members/onboarding`,
  planInfo: `${BASE_URL}/plans/recent`,
};

export const MOCK_API_URL = {
  todayTodo: `${BASE_URL}/todos/today`,
  tomorrowTodo: `${BASE_URL}/todos/tomorrow`,
  favoriteTodo: `${BASE_URL}/todos/favorites`,
  recommendLimitTodo: `${BASE_URL}/todos/recommend/limit`,
  recommendAllTodo: `${BASE_URL}/todos/recommend/all`,
  addTodo: `${BASE_URL}/todos/:dateType/manual/:planId?`,
  deleteTodo: `${BASE_URL}/todos/:todoId/:planId?`,
  editTodo: `${BASE_URL}/todos/:todoId/:planId?`,
  addTodoFromArchived: `${BASE_URL}/todos/:dateType/from-archived/:planId?`,
  routeTodo: `${BASE_URL}/routes/:planId/todos`,
  searchAddress: `${BASE_URL}/address/search`,
  onboarding: `${BASE_URL}/members/onboarding`,
  planInfo: `${BASE_URL}/plans/recent`,
};
