// 하나라도 집/학교가 안맞으면 출발지/도착지
// 둘다 집/학교면 집/학교
// 바뀌면 학교/집
export const getAddress = (
  start: { x: number; y: number; name: string },
  end: { x: number; y: number; name: string },
  home: { x?: number; y?: number },
  school: { x?: number; y?: number },
) => {
  const isMatchedAddress =
    start.x === home.x && start.y === home.y && end.x === school.x && end.y === school.y;

  const isMatchedSwitchedAddress =
    start.x === school.x && start.y === school.y && end.x === home.x && end.y === home.y;

  // 집/학교
  if (isMatchedAddress) {
    return {
      start: { icon: 'AddressHome', location: '집', name: start.name },
      end: { icon: 'AddressUniv', location: '학교', name: end.name },
    } as const;
  }

  // 학교/집
  if (isMatchedSwitchedAddress) {
    return {
      start: { icon: 'AddressUniv', location: '학교', name: end.name },
      end: { icon: 'AddressHome', location: '집', name: start.name },
    } as const;
  }

  return {
    start: { icon: '', location: '출발지', name: start.name },
    end: { icon: '', location: '도착지', name: end.name },
  } as const;
};
