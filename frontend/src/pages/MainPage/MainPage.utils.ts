import { MemberAddress } from '@/api/member';

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

export const getRouteInfoWithSwitched = (
  isSwitched: boolean,
  startAddress: { startX: number; startY: number; startName: string },
  endAddress: { endX: number; endY: number; endName: string },
  memberAddress?: MemberAddress,
) => {
  const isStartAddressUpdated = startAddress.startName !== '';
  const isEndAddressUpdated = endAddress.endName !== '';

  const { startX, startY, startName } = startAddress;
  const { endX, endY, endName } = endAddress;

  const routeMapping = {
    bothUpdated: () => ({
      startX: isSwitched ? endX : startX,
      startY: isSwitched ? endY : startY,
      endX: isSwitched ? startX : endX,
      endY: isSwitched ? startY : endY,
      startName: isSwitched ? endName : startName,
      endName: isSwitched ? startName : endName,
    }),
    startOnlyUpdated: () => ({
      startX: isSwitched ? memberAddress?.schoolXCoordinate : startX,
      startY: isSwitched ? memberAddress?.schoolYCoordinate : startY,
      endX: isSwitched ? startX : memberAddress?.schoolXCoordinate,
      endY: isSwitched ? startY : memberAddress?.schoolYCoordinate,
      startName: isSwitched ? memberAddress?.schoolTitle : startName,
      endName: isSwitched ? startName : memberAddress?.schoolTitle,
    }),
    endOnlyUpdated: () => ({
      startX: isSwitched ? endX : memberAddress?.homeXCoordinate,
      startY: isSwitched ? endY : memberAddress?.homeYCoordinate,
      endX: isSwitched ? memberAddress?.homeXCoordinate : endX,
      endY: isSwitched ? memberAddress?.homeYCoordinate : endY,
      startName: isSwitched ? endName : memberAddress?.homeTitle,
      endName: isSwitched ? memberAddress?.homeTitle : endName,
    }),
    noneUpdated: () => ({
      startX: isSwitched ? memberAddress?.schoolXCoordinate : memberAddress?.homeXCoordinate,
      startY: isSwitched ? memberAddress?.schoolYCoordinate : memberAddress?.homeYCoordinate,
      endX: isSwitched ? memberAddress?.homeXCoordinate : memberAddress?.schoolXCoordinate,
      endY: isSwitched ? memberAddress?.homeYCoordinate : memberAddress?.schoolYCoordinate,
      startName: isSwitched ? memberAddress?.schoolTitle : memberAddress?.homeTitle,
      endName: isSwitched ? memberAddress?.homeTitle : memberAddress?.schoolTitle,
    }),
  };

  if (isStartAddressUpdated && isEndAddressUpdated) {
    return routeMapping.bothUpdated();
  } else if (isStartAddressUpdated) {
    return routeMapping.startOnlyUpdated();
  } else if (isEndAddressUpdated) {
    return routeMapping.endOnlyUpdated();
  }

  return routeMapping.noneUpdated();
};
