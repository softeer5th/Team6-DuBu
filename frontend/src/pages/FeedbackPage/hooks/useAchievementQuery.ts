import { useQuery } from '@tanstack/react-query';

import { getTodayAchievement, TodayAchievement } from '@/api/feedback';
import { QUERY_KEY } from '@/constants/queryKey';

const useAchievementQuery = () => {
  return useQuery<TodayAchievement>({
    queryKey: [QUERY_KEY.todayAchievement],
    queryFn: getTodayAchievement,
  });
};

export default useAchievementQuery;
