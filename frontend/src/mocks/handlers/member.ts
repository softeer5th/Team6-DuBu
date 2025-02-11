import { http, HttpResponse } from 'msw';

import MEMBER_ADDRESS from '../data/memberAddress.json';

import { MOCK_API_URL } from '@/constants/url';

const getMemberAddressHandler = () => {
  return HttpResponse.json(MEMBER_ADDRESS);
};

export const handlers = [http.get(MOCK_API_URL.memberAddress, getMemberAddressHandler)];
