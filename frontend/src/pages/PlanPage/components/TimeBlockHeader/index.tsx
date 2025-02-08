import * as S from './TimeBlockHeader.styled';

import Icon from '@/components/Icon';

const TRAFFIC_TYPE = {
  SUBWAY: '지하철',
  BUS: '버스',
};

const TRAFFIC_ICON = {
  SUBWAY: 'Subway',
  BUS: 'Bus',
} as const;

interface TimeBlockHeaderProps {
  trafficType: 'SUBWAY' | 'BUS';
  subwayCode?: number | null;
}

const TimeBlockHeader = ({ trafficType, subwayCode }: TimeBlockHeaderProps) => {
  return (
    <S.TransportHeader>
      <S.TransportIconWrapper $trafficType={TRAFFIC_ICON[trafficType]}>
        <Icon icon={TRAFFIC_ICON[trafficType]} width={16} height={16} />
        {subwayCode && <S.SubwayNumber>{subwayCode}</S.SubwayNumber>}
      </S.TransportIconWrapper>
      <S.TransportType $trafficType={TRAFFIC_ICON[trafficType]}>
        {TRAFFIC_TYPE[trafficType]}
      </S.TransportType>
    </S.TransportHeader>
  );
};

export default TimeBlockHeader;
