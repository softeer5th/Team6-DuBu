import { CATEGORY_OPTIONS } from '../EditPage/EditPage.constants';
import CategoryRank from './components/CategoryRank';
import useCategoryFilters from './hooks/useCategoryFilters';
import useInitMap from './hooks/useInitMap';
import useMapBottomSheet from './hooks/useMapBottomSheet';
import useMarker from './hooks/useMarker';
import * as S from './MapPage.styled';

import BottomSheet from '@/components/BottomSheet';
import Header from '@/components/Header';

const MAP_ID = 'map';

// FIXME: API 명세 확정 시 API 호출 모킹으로 이동
const getTestMarkerList = (lat: number, lng: number, count: number) => {
  const markers = Array.from({ length: count }, () => ({
    lat: lat + (Math.random() - 0.5) * 0.01,
    lng: lng + (Math.random() - 0.5) * 0.01,
  }));

  return markers;
};

const MapPage = () => {
  const { mapRef, center } = useInitMap();
  const { putMarkerList } = useMarker();
  const { categoryFilters, handleCheckFilters } = useCategoryFilters();
  const { isOpen, close } = useMapBottomSheet();

  const markers = getTestMarkerList(center.lat, center.lng, 10); // FIXME: 테스트 완료 후 지울 예정
  putMarkerList(mapRef.current, markers);

  return (
    <S.MapContainer id={MAP_ID}>
      <S.HeaderOverlay>
        <Header>
          <Header.Left>
            <Header.BackButton />
          </Header.Left>
          <Header.Right>
            <Header.MenuButton />
          </Header.Right>
        </Header>
        <S.FilterBadgeWrapper>
          {CATEGORY_OPTIONS.map((filter) => (
            <S.FilterBadge
              key={filter.value}
              value={filter.value}
              $isSelected={categoryFilters[filter.value]}
              onClick={() => handleCheckFilters(filter.value)}
              $category={filter.value}
            >
              {filter.label}
            </S.FilterBadge>
          ))}
        </S.FilterBadgeWrapper>
      </S.HeaderOverlay>

      <BottomSheet
        isOpen={isOpen}
        onClose={close}
        content={<CategoryRank />}
        subTitle="반경 3km 이내"
      />
    </S.MapContainer>
  );
};

export default MapPage;
