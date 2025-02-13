import fetchClient from './fetchClient';

import { API_URL } from '@/constants/url';

interface Todo {
  category: string;
  title: string;
}

export interface TodayAchievement {
  data: {
    planId: number;
    totalSectionTime: number;
    totalTodoCount: number;
    todos: Todo[];
  };
}

export const getTodayAchievement = async (): Promise<TodayAchievement> => {
  const result = await fetchClient.get<TodayAchievement>(API_URL.todayAchievement);

  return result;
};
