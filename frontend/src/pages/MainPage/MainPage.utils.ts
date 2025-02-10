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

export const getRouteCoordWithSwitched = (
  isSwitched: boolean,
  isStartAddress: boolean,
  isEndAddress: boolean,
  startAddress: { startX: number; startY: number; startName: string },
  endAddress: { endX: number; endY: number; endName: string },
  memberAddress?: MemberAddress,
) => {
  const { startX, startY, startName } = startAddress;
  const { endX, endY, endName } = endAddress;

  const routeMapping = {
    both: () => ({
      startX: isSwitched ? endX : startX,
      startY: isSwitched ? endY : startY,
      endX: isSwitched ? startX : endX,
      endY: isSwitched ? startY : endY,
      startName: isSwitched ? endName : startName,
      endName: isSwitched ? startName : endName,
    }),
    startOnly: () => ({
      startX: isSwitched ? memberAddress?.schoolXCoordinate : startX,
      startY: isSwitched ? memberAddress?.schoolYCoordinate : startY,
      endX: isSwitched ? startX : memberAddress?.schoolXCoordinate,
      endY: isSwitched ? startY : memberAddress?.schoolYCoordinate,
      startName: isSwitched ? memberAddress?.schoolAddressName : startName,
      endName: isSwitched ? startName : memberAddress?.schoolAddressName,
    }),
    endOnly: () => ({
      startX: isSwitched ? endX : memberAddress?.homeXCoordinate,
      startY: isSwitched ? endY : memberAddress?.homeYCoordinate,
      endX: isSwitched ? memberAddress?.homeXCoordinate : endX,
      endY: isSwitched ? memberAddress?.homeYCoordinate : endY,
      startName: isSwitched ? endName : memberAddress?.homeAddressName,
      endName: isSwitched ? memberAddress?.homeAddressName : endName,
    }),
    none: () => ({
      startX: isSwitched ? memberAddress?.schoolXCoordinate : memberAddress?.homeXCoordinate,
      startY: isSwitched ? memberAddress?.schoolYCoordinate : memberAddress?.homeYCoordinate,
      endX: isSwitched ? memberAddress?.homeXCoordinate : memberAddress?.schoolXCoordinate,
      endY: isSwitched ? memberAddress?.homeYCoordinate : memberAddress?.schoolYCoordinate,
      startName: isSwitched ? memberAddress?.schoolAddressName : memberAddress?.homeAddressName,
      endName: isSwitched ? memberAddress?.homeAddressName : memberAddress?.schoolAddressName,
    }),
  };

  if (isStartAddress && isEndAddress) {
    return routeMapping.both();
  } else if (isStartAddress) {
    return routeMapping.startOnly();
  } else if (isEndAddress) {
    return routeMapping.endOnly();
  } else {
    return routeMapping.none();
  }
};
