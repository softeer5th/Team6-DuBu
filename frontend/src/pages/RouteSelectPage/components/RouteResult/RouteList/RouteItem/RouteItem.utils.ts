import { SUBWAY_LINES } from '@/constants/subwayLines';
import { PathType } from '@/pages/RouteSelectPage/RouteSelectPage.types';
import theme from '@/styles/theme';

export const getPathBarWidth = (path: PathType, totalTime: number) => {
  if (path.sectionTime === 0) return 0;
  return (path.sectionTime / totalTime) * 100;
};

export const getPathColor = (path: PathType) => {
  if (path.trafficType === 'BUS') {
    return theme.colors.Bus;
  }
  if (path.trafficType === 'SUBWAY') {
    const subwayLine = SUBWAY_LINES[path.subwayCode as keyof typeof SUBWAY_LINES];
    return subwayLine.color;
  }

  return 'transparent';
};
