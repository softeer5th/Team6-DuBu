const BASE_URL = import.meta.env.VITE_BASE_URL;

export const API_URL = {
  todayTodo: `${BASE_URL}/api/v1/todos/today`,
  tomorrowTodo: `${BASE_URL}/api/v1/todos/tomorrow`,
  favoriteTodo: (modifyType: string, size: number, planId?: number) =>
    `${BASE_URL}/api/v1/todos/save?modifyType=${modifyType}&size=${size}${planId ? `&pathId=${planId}` : ''}`,
  recommendLimitTodo: (modifyType: string, planId?: number) =>
    `${BASE_URL}/api/v1/todos/recommend/personalized?modifyType=${modifyType}${planId ? `&pathId=${planId}` : ''}`,
  recommendAllTodo: (queryParams: string) => `${BASE_URL}/api/v1/todos/recommend/all${queryParams}`,
  addTodo: (dateType: string, planId?: number) =>
    `${BASE_URL}/api/v1/todos/${dateType}/manual${planId ? `?pathId=${planId}` : ''}`,
  deleteTodo: (todoId: number, dateType: string) =>
    `${BASE_URL}/api/v1/todos/${todoId}?type=${dateType}`,
  editTodo: (todoId: number, dateType: string) =>
    `${BASE_URL}/api/v1/todos/${todoId}?type=${dateType}`,
  addTodoFromArchived: (dateType: string, planId?: number) =>
    `${BASE_URL}/api/v1/todos/${dateType}/from-archived${planId ? `?pathId=${planId}` : ''}`,
  routeTodo: (planId: number) => `${BASE_URL}/api/v1/todos/path?pathId=${planId}`,
  searchAddress: `${BASE_URL}/api/v1/places/search`,
  searchRoutes: `${BASE_URL}/api/v1/routes/search`,
  onboarding: `${BASE_URL}/api/v1/members/onboarding`,
  planInfo: `${BASE_URL}/api/v1/plans/recent`,
  memberAddress: `${BASE_URL}/api/v1/members/address`,
  loginKakao: `${BASE_URL}/api/v1/auth/KAKAO`,
  loginKakaoAuth: `${BASE_URL}/api/v1/auth/kakao-login`,
  memberStatus: `${BASE_URL}/api/v1/members/status`,
  plan: (planId: number) => `${BASE_URL}/api/v1/plans/planId=${planId} `,
  todoDetail: (memberId: number) => `${BASE_URL}/api/v1/share/members/${memberId}`,
  addFavoriteFromOther: `${BASE_URL}/api/v1/share/todos`,
  deleteFavoriteFromOther: (todoId: number) =>
    `${BASE_URL}/api/v1/share/todos${todoId ? `?todoId=${todoId}` : ''}`,
  getNearbyUsers: (queryParams: string) =>
    `${BASE_URL}/api/v1/share/realtime-user-category${queryParams}`,
  todayAchievement: `${BASE_URL}/api/v1/plans/feedbacks`,
  saveFeedback: (planId: number) => `${BASE_URL}/api/v1/plans/${planId}/feedbacks`,
  weekStatistics: `${BASE_URL}/api/v1/statistics/week`,
  createPlan: `${BASE_URL}/api/v1/plans`,
  memberInfo: `${BASE_URL}/api/v1/members`,
  checkTodo: (todoId: number) => `${BASE_URL}/api/v1/todos/check?todoId=${todoId}`,
  finishPlan: `${BASE_URL}/api/v1/plans/move-complete`,
};

export const MOCK_API_URL = {
  todayTodo: `${BASE_URL}/api/v1/todos/today`,
  tomorrowTodo: `${BASE_URL}/api/v1/todos/tomorrow`,
  recommendLimitTodo: `${BASE_URL}/api/v1/todos/recommend/personalized`,
  favoriteTodo: `${BASE_URL}/api/v1/todos/save`,
  recommendAllTodo: `${BASE_URL}/api/v1/todos/recommend/all`,
  addTodo: `${BASE_URL}/api/v1/todos/:dateType/manual/:planId?`,
  deleteTodo: `${BASE_URL}/api/v1/todos/:todoId?type=:dateType`,
  editTodo: `${BASE_URL}/api/v1/todos/:todoId?type=:dateType`,
  addTodoFromArchived: `${BASE_URL}/api/v1/todos/:dateType/from-archived/:planId?`,
  routeTodo: `${BASE_URL}/api/v1/routes/:planId/todos`,
  searchAddress: `${BASE_URL}/api/v1/places/search`,
  searchRoutes: `${BASE_URL}/api/v1/routes/search`,
  onboarding: `${BASE_URL}/api/v1/members/onboarding`,
  planInfo: `${BASE_URL}/api/v1/plans/recent`,
  memberAddress: `${BASE_URL}/api/v1/members/address`,
  loginKakao: `${BASE_URL}/api/v1/auth/KAKAO`,
  loginKakaoAuth: `${BASE_URL}/api/v1/auth/kakao-login`,
  memberStatus: `${BASE_URL}/api/v1/members/status`,
  plan: `${BASE_URL}/api/v1/plans/:planId`,
  todoDetail: `${BASE_URL}/api/v1/share/members/:memberId`,
  addFavoriteFromOther: `${BASE_URL}/api/v1/share/todos`,
  deleteFavoriteFromOther: `${BASE_URL}/api/v1/share/todos`,
  getNearbyUsers: `${BASE_URL}/api/v1/share/realtime-user-category`,
  todayAchievement: `${BASE_URL}/api/v1/plans/feedbacks`,
  saveFeedback: (planId: number) => `${BASE_URL}/api/v1/plans/planId=${planId}/feedbacks`,
  weekStatistics: `${BASE_URL}/api/v1/statistics/week`,
  createPlan: `${BASE_URL}/api/v1/plans`,
};
