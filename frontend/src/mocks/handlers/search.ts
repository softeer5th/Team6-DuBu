// src/mocks/handlers/search.ts

import { http, HttpResponse } from 'msw';

import ADDRESS_DATA from '../data/address.json';

import { MOCK_API_URL } from '@/constants/url';

const getSearchAddressHandler = ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const query = url.searchParams.get('query') || '';

  return HttpResponse.json(ADDRESS_DATA);
};

export const handlers = [http.get(MOCK_API_URL.searchAddress, getSearchAddressHandler)];
