import { useQuery } from '@tanstack/react-query';

import { getSearchAddress } from '@/api/search';
import { QUERY_KEY } from '@/constants/queryKey';

const useSearchAddressQuery = (query: string) => {
  return useQuery({
    queryKey: [QUERY_KEY.searchAddress, query],
    queryFn: () => getSearchAddress({ query }),
    enabled: !!query,
  });
};

export default useSearchAddressQuery;
