import * as S from './TimeBlockHeader.styled';
import { TRAFFIC_ICON, TRAFFIC_TYPE } from '../../PlanPage.constants';

import Icon from '@/components/Icon';

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
