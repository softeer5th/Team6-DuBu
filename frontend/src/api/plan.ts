import fetchClient from './fetchClient';

import { API_URL } from '@/constants/url';

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
  todos: pathTodo[];
}

export interface pathTodo {
  isDone: boolean;
  title: string;
  memo: string | null;
}

export const getPlanInfo = async () => {
  const result = await fetchClient.get<PlanInfoResponse>(API_URL.planInfo);

  return result.data;
};
