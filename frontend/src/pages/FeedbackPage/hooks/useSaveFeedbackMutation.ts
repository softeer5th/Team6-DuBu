import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router';

import { saveFeedback } from '@/api/feedback';

const useSaveFeedbackMutation = () => {
  const navigate = useNavigate();

  const { mutate: saveFeedbackMutate } = useMutation({
    mutationFn: ({ planId, body }: { planId: number; body: saveFeedback }) =>
      saveFeedback(planId, body),
    onSuccess: () => {
      navigate('/');
    },
  });

  return { saveFeedbackMutate };
};

export default useSaveFeedbackMutation;
