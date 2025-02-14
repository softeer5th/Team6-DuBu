import { useEffect } from 'react';
import { useNavigate } from 'react-router';

import useMemberStatusQuery from './useMemberStatusQuery';

const useRedirectByMemberStatus = () => {
  const { data: memberStatus, isError } = useMemberStatusQuery();
  const navigate = useNavigate();

  if (isError) {
    navigate('/landing');
  }

  useEffect(() => {
    if (!memberStatus) return;

    switch (memberStatus?.status) {
      case 'ONBOARDING':
        navigate('/onboarding');
        break;
      case 'STOP':
        navigate('/');
        break;
      case 'MOVE':
        navigate('/plan');
        break;
      case 'FEEDBACK':
        navigate('/feedback');
        break;
      default:
        navigate('/landing');
        break;
    }
  }, [memberStatus, navigate]);
};

export default useRedirectByMemberStatus;
