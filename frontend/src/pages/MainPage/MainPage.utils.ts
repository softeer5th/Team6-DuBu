export const getKoreanTime = () => {
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60 * 1000;
  const koreaTimeDiff = 9 * 60 * 60 * 1000;
  return new Date(utc + koreaTimeDiff);
};

export const getDateHeaderFormat = (targetDate: Date) => {
  const month = targetDate.getMonth() + 1;
  const date = targetDate.getDate();
  const dayList = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const day = dayList[targetDate.getDay()];

  return `${month}월 ${date}일 ${day}`;
};

export const addDay = (date: Date, days: number) => {
  const clone = new Date(date);
  clone.setDate(date.getDate() + days);
  return clone;
};
