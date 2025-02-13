import { CATEGORY_OPTIONS } from '../EditPage/EditPage.constants';
import CategoryRank from './components/CategoryRank';
import useCategoryFilters from './hooks/useCategoryFilters';
import useInitMap from './hooks/useInitMap';
import useMapBottomSheet from './hooks/useMapBottomSheet';
import useMarker from './hooks/useMarker';
import useMarkerBottomSheet from './hooks/useMarkerBottomSheet';
import * as S from './MapPage.styled';

import BottomSheet from '@/components/BottomSheet';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import { colors } from '@/styles/theme';

const MAP_ID = 'map';

// FIXME: API 명세 확정 시 API 호출 모킹으로 이동
const getTestMarkerList = (lat: number, lng: number, count: number) => {
  const markers = Array.from({ length: count }, (_, i) => ({
    lat: lat + (Math.random() - 0.5) * 0.01,
    lng: lng + (Math.random() - 0.5) * 0.01,
    memberId: Math.floor(Math.random() * 1000000),
  }));

  return markers;
};

const MapPage = () => {
  const { mapRef, center, isDragged, handleDragEnd } = useInitMap();
  const { putMarkerList } = useMarker();
  const { categoryFilters, handleCheckFilters } = useCategoryFilters();
  const { isOpen, close } = useMapBottomSheet();

  const {
    isOpen: isMarkerBottomSheetOpen,
    open: openMarkerBottomSheet,
    close: closeMarkerBottomSheet,
    content: markerBottomSheetContent,
  } = useMarkerBottomSheet();

  const markerCoordList = getTestMarkerList(center.lat, center.lng, 10); // FIXME: 테스트 완료 후 지울 예정
  putMarkerList(mapRef.current, markerCoordList, openMarkerBottomSheet);

  const handleBackCenter = () => {
    mapRef.current?.setCenter(new kakao.maps.LatLng(center.lat, center.lng));

    handleDragEnd();
  };

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

      <BottomSheet
        isOpen={isMarkerBottomSheetOpen}
        onClose={closeMarkerBottomSheet}
        content={markerBottomSheetContent}
      />

      {/* 현재 위치로 이동 버튼 */}
      <S.CurrentLocationButton
        icon={
          <Icon
            icon="Target"
            width={32}
            height={32}
            cursor="pointer"
            color={isDragged ? colors.iconBlue : colors.gray400}
          />
        }
        onClick={handleBackCenter}
      />
    </S.MapContainer>
  );
};

export default MapPage;
