import { useQuery } from '@tanstack/react-query';

import { getMemberStatus } from '@/api/member';
import { QUERY_KEY } from '@/constants/queryKey';

const useMemberStatusQuery = () => {
  return useQuery({
    queryKey: [QUERY_KEY.memberStatus],
    queryFn: getMemberStatus,
    retry: 0,
  });
};

export default useMemberStatusQuery;
