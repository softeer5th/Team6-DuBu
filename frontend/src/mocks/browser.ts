import { setupWorker } from 'msw/browser';
import { http, HttpResponse } from 'msw';

const testHandler = () => {
  return HttpResponse.json({ test: 'test' });
};

export const worker = setupWorker(http.get('/test', testHandler));
