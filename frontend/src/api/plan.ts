import fetchClient from './fetchClient';

import { API_URL } from '@/constants/url';
import { Todo } from '@/types/todo';

interface PlanInfoResponse {
  data: {
    planId: number;
    totalSectionTime: number;
    createdAt: string;
    paths: Path[];
  };
}

interface Path {
  pathId: number;
  trafficType: 'SUBWAY' | 'BUS';
  sectionTime: number;
  subwayCode: number | null;
  busNumber: string | null;
  startName: string;
  endName: string;
  todos: PathTodo[];
}

export interface PathTodo extends Todo {
  isDone: boolean;
}

export const getPlanInfo = async () => {
  const result = await fetchClient.get<PlanInfoResponse>(API_URL.planInfo);

  return result.data;
};

export const cancelPlan = async (planId: number) => {
  return await fetchClient.delete(API_URL.plan(planId));
};

export const checkTodo = async (todoId: number, isCompleted: boolean) => {
  return await fetchClient.patch(API_URL.checkTodo(todoId), { body: { isCompleted } });
};

export const finishPlan = async () => {
  return await fetchClient.patch(API_URL.finishPlan);
};
