import { CATEGORY_OPTIONS } from '../EditPage/EditPage.constants';
import CategoryRank from './components/CategoryRank';
import useCategoryFilters from './hooks/useCategoryFilters';
import useInitMap from './hooks/useInitMap';
import useMapBottomSheet from './hooks/useMapBottomSheet';
import useMarker from './hooks/useMarker';
import useMarkerBottomSheet from './hooks/useMarkerBottomSheet';
import useNearbyUsersQuery from './hooks/useNearByUsersQuery';
import * as S from './MapPage.styled';

import BottomSheet from '@/components/BottomSheet';
import Header from '@/components/Header';
import Icon from '@/components/Icon';
import { colors } from '@/styles/theme';

const MAP_ID = 'map';

const MapPage = () => {
  const { mapRef, center, isDragged, handleDragEnd } = useInitMap();
  const { putMarkerList } = useMarker();
  const { categoryFilters, handleCheckFilters } = useCategoryFilters();
  const { isOpen, close } = useMapBottomSheet();
  const { data: nearbyUsersData } = useNearbyUsersQuery({ lng: center.lng, lat: center.lat });

  const {
    isOpen: isMarkerBottomSheetOpen,
    open: openMarkerBottomSheet,
    close: closeMarkerBottomSheet,
    content: markerBottomSheetContent,
  } = useMarkerBottomSheet();

  putMarkerList(mapRef.current, openMarkerBottomSheet, nearbyUsersData?.nearMember);

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
        content={<CategoryRank lng={center.lng} lat={center.lat} />}
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
