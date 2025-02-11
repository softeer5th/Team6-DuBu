import { useMutation } from '@tanstack/react-query';

import { cancelPlan } from '@/api/plan';

const useCancelPlanMutation = () => {
  return useMutation({
    mutationFn: cancelPlan,
  });
};

export default useCancelPlanMutation;
