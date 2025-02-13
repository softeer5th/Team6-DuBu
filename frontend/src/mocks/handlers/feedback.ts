import { http, HttpResponse } from 'msw';

import { MOCK_API_URL } from '@/constants/url';
import TODAY_ACHIEVEMENT_DATA from '@/mocks/data/todayAchievementData.json';

const getTodayAchievementHandler = () => {
  return HttpResponse.json(TODAY_ACHIEVEMENT_DATA);
};

export const handlers = [http.get(MOCK_API_URL.todayAchievement, getTodayAchievementHandler)];
