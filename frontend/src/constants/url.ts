const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_URL = {
  todayTodo: `${BASE_URL}/todos/today`,
  tomorrowTodo: `${BASE_URL}/todos/tomorrow`,
  favoriteTodo: `${BASE_URL}/todos/favorites`,
  recommendLimitTodo: `${BASE_URL}/todos/recommend/limit`,
  recommendAllTodo: (queryParams: string) => `${BASE_URL}/todos/recommend/all${queryParams}`,
  addTodo: (dateType: string, routeId?: number) =>
    `${BASE_URL}/todos/${dateType}/manual${routeId ? `/${routeId}` : ''}`,
  deleteTodo: (todoId: number, routeId?: number) =>
    `${BASE_URL}/todos/${todoId}${routeId ? `/${routeId}` : ''}`,
  editTodo: (todoId: number, routeId?: number) =>
    `${BASE_URL}/todos/${todoId}${routeId ? `/${routeId}` : ''}`,
  addTodoFromArchived: (dateType: string, routeId?: number) =>
    `${BASE_URL}/todos/${dateType}/from-archived${routeId ? `/${routeId}` : ''}`,
  routeTodo: (routeId: number) => `${BASE_URL}/routes/${routeId}/todos`,
  searchAddress: `${BASE_URL}/address/search`,
  searchRoutes: `${BASE_URL}/routes/search`,
  onboarding: `${BASE_URL}/members/onboarding`,
  todayAchievement: `${BASE_URL}/plans/feedback`,
};

export const MOCK_API_URL = {
  todayTodo: `${BASE_URL}/todos/today`,
  tomorrowTodo: `${BASE_URL}/todos/tomorrow`,
  favoriteTodo: `${BASE_URL}/todos/favorites`,
  recommendLimitTodo: `${BASE_URL}/todos/recommend/limit`,
  recommendAllTodo: `${BASE_URL}/todos/recommend/all`,
  addTodo: `${BASE_URL}/todos/:dateType/manual/:routeId?`,
  deleteTodo: `${BASE_URL}/todos/:todoId/:routeId?`,
  editTodo: `${BASE_URL}/todos/:todoId/:routeId?`,
  addTodoFromArchived: `${BASE_URL}/todos/:dateType/from-archived/:routeId?`,
  routeTodo: `${BASE_URL}/routes/:routeId/todos`,
  searchAddress: `${BASE_URL}/address/search`,
  searchRoutes: `${BASE_URL}/routes/search`,
  onboarding: `${BASE_URL}/members/onboarding`,
  todayAchievement: `${BASE_URL}/plans/feedback`,
};
