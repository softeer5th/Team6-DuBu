export const getPathDifficulty = (sectionTime?: number) => {
  if (!sectionTime) return [];
  if (sectionTime < 10) return ['쉬움'];
  if (sectionTime < 20) return ['쉬움', '보통'];

  return ['보통', '어려움'];
};
