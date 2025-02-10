import { http, HttpResponse } from 'msw';

import PLAN_DATA from '../data/planInfo.json';

import { MOCK_API_URL } from '@/constants/url';

const getPlanInfoHandler = () => {
  return HttpResponse.json(PLAN_DATA);
};

export const handlers = [http.get(MOCK_API_URL.planInfo, getPlanInfoHandler)];
