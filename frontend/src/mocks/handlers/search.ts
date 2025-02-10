// src/mocks/handlers/search.ts

import { http, HttpResponse } from 'msw';

import ADDRESS_DATA from '../data/address.json';
import ROUTES_DATA from '../data/routes.json';

import { MOCK_API_URL } from '@/constants/url';

const getSearchAddressHandler = ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || '';

  return HttpResponse.json(ADDRESS_DATA);
};

const getRoutesHandler = ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const startX = url.searchParams.get('startX');
  const startY = url.searchParams.get('startY');
  const endX = url.searchParams.get('endX');
  const endY = url.searchParams.get('endY');

  if (!startX || !startY || !endX || !endY) {
    return new Response(JSON.stringify({ error: 'Missing parameters' }), { status: 400 });
  }

  return HttpResponse.json(ROUTES_DATA);
};

export const handlers = [
  http.get(MOCK_API_URL.searchRoutes, getRoutesHandler),
  http.get(MOCK_API_URL.searchAddress, getSearchAddressHandler),
];
