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
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}) => {
  const urlQueryParams = new URLSearchParams();

  // params 객체의 각 값을 쿼리 파라미터로 추가
  Object.entries(params).forEach(([key, value]) => {
    urlQueryParams.append(key, String(value)); // 값이 숫자여도 문자열로 변환해서 추가
  });

  const queryString = urlQueryParams.toString();
  const queryParams = queryString ? `?${queryString}` : '';

  const result = await fetchClient.get<SearchAddressResponse>(
    `${API_URL.searchRoutes}${queryParams}`,
  );

  return result.data;
};
