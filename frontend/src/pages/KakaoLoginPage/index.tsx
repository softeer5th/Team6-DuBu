import { useEffect } from 'react';
import { useSearchParams } from 'react-router';

import useKakaoLoginMutation from './hooks/useKakaoLoginMutation';

const KakaoLoginPage = () => {
  const [searchParams] = useSearchParams();
  const code = searchParams.get('code');
  const { mutate } = useKakaoLoginMutation();

  useEffect(() => {
    if (code) {
      mutate(code);
    }
  }, []);

  return <div>Loading...</div>;
};

export default KakaoLoginPage;
