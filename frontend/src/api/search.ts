import fetchClient from './fetchClient';

import { API_URL } from '@/constants/url';

export interface SearchAddress {
  title: string;
  roadAddress: string;
  x_coordinate: number;
  y_coordinate: number;
}

export interface SearchAddressResponse {
  data: SearchAddress[];
}

export const getSearchAddress = async (params: { query: string }) => {
  const result = await fetchClient.get<SearchAddressResponse>(
    `${API_URL.searchAddress}?query=${params.query}`,
  );

  return result.data;
};

export const getRoutes = async (params: {
  startX: string;
  startY: string;
  endX: string;
  endY: string;
}) => {
  const urlQueryParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    urlQueryParams.append(key, String(value));
  });

  const queryString = urlQueryParams.toString();
  const queryParams = queryString ? `?${queryString}` : '';

  const result = await fetchClient.get<SearchAddressResponse>(
    `${API_URL.searchRoutes}${queryParams}`,
  );

  return result.data;
};
