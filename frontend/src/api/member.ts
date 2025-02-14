import fetchClient from './fetchClient';

import { USER_STATUS } from '@/constants/config';
import { API_URL } from '@/constants/url';
import { CategoryType } from '@/types/filter';

export interface MemberAddress {
  homeTitle: string;
  homeXCoordinate: number;
  homeYCoordinate: number;
  schoolTitle: string;
  schoolXCoordinate: number;
  schoolYCoordinate: number;
}
interface MemberAddressResponse {
  data: MemberAddress;
}

interface MemberInfoResponse {
  data: {
    email: string;
    nickname: string;
    categories: CategoryType[];
    homeTitle: string;
    schoolTitle: string;
  };
}

interface MemberStatusResponse {
  data: {
    status: 'ONBOARDING' | 'STOP' | 'MOVE' | 'FEEDBACK';
  };
}

type MemberStatusParams = (typeof USER_STATUS)[keyof typeof USER_STATUS];

export const getMemberAddress = async () => {
  const result = await fetchClient.get<MemberAddressResponse>(API_URL.memberAddress);

  return result.data;
};

export const updateMemberStatus = async (status: MemberStatusParams) => {
  return await fetchClient.patch(API_URL.memberStatus, {
    body: {
      status,
    },
  });
};

export const getMemberInfo = async () => {
  const result = await fetchClient.get<MemberInfoResponse>(API_URL.memberInfo);

  return result.data;
};

export const getMemberStatus = async () => {
  const result = await fetchClient.get<MemberStatusResponse>(API_URL.memberStatus);

  return result.data;
};
