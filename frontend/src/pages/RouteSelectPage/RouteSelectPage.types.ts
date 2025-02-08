export interface PathType {
  trafficType: string;
  sectionTime: number;
  subwayCode: number | null;
  busNumber: string | null;
  busId: string | null;
  startName: string | null;
  endName: string | null;
}

export interface RouteType {
  isRecentlyUsed: boolean;
  totalTime: number;
  totalSectionTime: number;
  paths: PathType[];
}
