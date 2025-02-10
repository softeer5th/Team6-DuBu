import fetchClient from './fetchClient';

import { API_URL } from '@/constants/url';

export interface MemberAddress {
  homeAddressName: string;
  homeXCoordinate: number;
  homeYCoordinate: number;
  schoolAddressName: string;
  schoolXCoordinate: number;
  schoolYCoordinate: number;
}
interface MemberAddressResponse {
  data: MemberAddress;
}

export const getMemberAddress = async () => {
  const result = await fetchClient.get<MemberAddressResponse>(API_URL.memberAddress);

  return result.data;
};
