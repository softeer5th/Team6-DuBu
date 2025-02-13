import { useMutation } from '@tanstack/react-query';

import { updateMemberStatus } from '@/api/member';

const useUpdateMemberStatusMutation = () => {
  return useMutation({
    mutationFn: updateMemberStatus,
  });
};

export default useUpdateMemberStatusMutation;
