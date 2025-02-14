import { useQuery } from '@tanstack/react-query';

import { getMemberInfo } from '@/api/member';
import { QUERY_KEY } from '@/constants/queryKey';

const useMemberInfoQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.memberInfo],
    queryFn: getMemberInfo,
    staleTime: Infinity,
  });
};

export default useMemberInfoQuery;
