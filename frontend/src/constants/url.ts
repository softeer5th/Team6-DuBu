const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_URL = {
  todayTodo: `${BASE_URL}/api/v1/todos/today`,
  tomorrowTodo: `${BASE_URL}/api/v1/todos/tomorrow`,
  favoriteTodo: `${BASE_URL}/api/v1/todos/favorites`,
  recommendLimitTodo: `${BASE_URL}/api/v1/todos/recommend/limit`,
  recommendAllTodo: (queryParams: string) => `${BASE_URL}/api/v1/todos/recommend/all${queryParams}`,
  addTodo: (dateType: string, planId?: number) =>
    `${BASE_URL}/api/v1/todos/${dateType}/manual${planId ? `/${planId}` : ''}`,
  deleteTodo: (todoId: number, planId?: number) =>
    `${BASE_URL}/api/v1/todos/${todoId}${planId ? `/${planId}` : ''}`,
  editTodo: (todoId: number, planId?: number) =>
    `${BASE_URL}/api/v1/todos/${todoId}${planId ? `/${planId}` : ''}`,
  addTodoFromArchived: (dateType: string, planId?: number) =>
    `${BASE_URL}/api/v1/todos/${dateType}/from-archived${planId ? `/${planId}` : ''}`,
  routeTodo: (planId: number) => `${BASE_URL}/api/v1/routes/${planId}/todos`,
  searchAddress: `${BASE_URL}/api/v1/address/search`,
  searchRoutes: `${BASE_URL}/api/v1/routes/search`,
  onboarding: `${BASE_URL}/api/v1/members/onboarding`,
  planInfo: `${BASE_URL}/api/v1/plans/recent`,
  memberAddress: `${BASE_URL}/api/v1/members/address`,
};

export const MOCK_API_URL = {
  todayTodo: `${BASE_URL}/api/v1/todos/today`,
  tomorrowTodo: `${BASE_URL}/api/v1/todos/tomorrow`,
  favoriteTodo: `${BASE_URL}/api/v1/todos/favorites`,
  recommendLimitTodo: `${BASE_URL}/api/v1/todos/recommend/limit`,
  recommendAllTodo: `${BASE_URL}/api/v1/todos/recommend/all`,
  addTodo: `${BASE_URL}/api/v1/todos/:dateType/manual/:planId?`,
  deleteTodo: `${BASE_URL}/api/v1/todos/:todoId/:planId?`,
  editTodo: `${BASE_URL}/api/v1/todos/:todoId/:planId?`,
  addTodoFromArchived: `${BASE_URL}/api/v1/todos/:dateType/from-archived/:planId?`,
  routeTodo: `${BASE_URL}/api/v1/routes/:planId/todos`,
  searchAddress: `${BASE_URL}/api/v1/address/search`,
  searchRoutes: `${BASE_URL}/api/v1/routes/search`,
  onboarding: `${BASE_URL}/api/v1/members/onboarding`,
  planInfo: `${BASE_URL}/api/v1/plans/recent`,
  memberAddress: `${BASE_URL}/api/v1/members/address`,
};
