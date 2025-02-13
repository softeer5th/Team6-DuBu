import { http, HttpResponse } from 'msw';

import MEMBER_ADDRESS from '../data/memberAddress.json';

import { MOCK_API_URL } from '@/constants/url';

const getMemberAddressHandler = () => {
  return HttpResponse.json(MEMBER_ADDRESS);
};

const updateMemberStatusHandler = () => {
  return new HttpResponse(null, { status: 204 });
};

export const handlers = [
  http.get(MOCK_API_URL.memberAddress, getMemberAddressHandler),
  http.patch(MOCK_API_URL.memberStatus, updateMemberStatusHandler),
];
