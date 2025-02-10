import { useQuery } from '@tanstack/react-query';

import RouteItem from './RouteItem';
import * as S from './RouteSection.styled';

import { getMemberAddress } from '@/api/member';
import Icon from '@/components/Icon';

const useMemberAddressQuery = () => {
  return useQuery({
    queryKey: ['memberAddress'],
    queryFn: getMemberAddress,
  });
};

const RouteSection = () => {
  const { data: memberAddress } = useMemberAddressQuery();

  if (!memberAddress) return null;

  return (
    <S.RouteSectionLayout>
      <RouteItem icon="AddressHome" location="집" value={memberAddress.homeAddressName} />
      <S.IconWrapper>
        <button>
          <Icon icon="Switch" width={36} height={36} />
        </button>
      </S.IconWrapper>
      <RouteItem icon="AddressUniv" location="학교" value={memberAddress.schoolAddressName} />
    </S.RouteSectionLayout>
  );
};

export default RouteSection;
