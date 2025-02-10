import { formatDateHeader } from '@/utils/time';

export const formatStartTime = (dateString: string) => {
  const date = new Date(dateString);

  const formattedDate = formatDateHeader(date);

  const time = date.toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return { date: formattedDate, time };
};
