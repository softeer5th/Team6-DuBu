export const getKoreanTime = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  return new Date(utc + koreaTimeDiff);
};

export const addDay = (date: Date, days: number) => {
  const clone = new Date(date);
  clone.setDate(date.getDate() + days);
  return clone;
};
