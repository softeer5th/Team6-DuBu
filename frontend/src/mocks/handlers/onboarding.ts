import { http, HttpResponse } from 'msw';

import { MOCK_API_URL } from '@/constants/url';

const postOnboardingHandler = ({ request }: { request: Request }) => {
  const url = new URL(request.url);
  const body = url.searchParams.get('body') || '';

  return HttpResponse.json({ message: 'Onboarding successful' });
};

export const handlers = [http.post(MOCK_API_URL.onboarding, postOnboardingHandler)];
