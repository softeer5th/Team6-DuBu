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
