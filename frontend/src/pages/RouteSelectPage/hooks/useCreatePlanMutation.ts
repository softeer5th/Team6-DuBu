import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { createPlan } from '@/api/plan';

const useCreatePlanMutation = () => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: createPlan,
    onSuccess: () => {
      navigate('/plan');
    },
  });
};

export default useCreatePlanMutation;
