export const formatDateHeader = (targetDate: Date) => {
  const month = targetDate.getMonth() + 1;
  const date = targetDate.getDate();
  const dayList = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  const day = dayList[targetDate.getDay()];

  return `${month}월 ${date}일 ${day}`;
};
