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

const MARKERS = [
  { lat: 37.643552, lng: 126.914146 },
  { lat: 37.644552, lng: 126.914246 },
  { lat: 37.645552, lng: 126.914546 },
  { lat: 37.646552, lng: 126.914846 },
  { lat: 37.647552, lng: 126.914146 },
  { lat: 37.648552, lng: 126.914446 },
  { lat: 37.649552, lng: 126.914746 },
  { lat: 37.650552, lng: 126.914046 },
  { lat: 37.651552, lng: 126.914346 },
  { lat: 37.652552, lng: 126.914646 },
  { lat: 37.653552, lng: 126.914946 },
  { lat: 37.654552, lng: 126.914246 },
  { lat: 37.655552, lng: 126.914546 },
  { lat: 37.656552, lng: 126.914846 },
  { lat: 37.657552, lng: 126.912146 },
  { lat: 37.658552, lng: 126.912446 },
];

const MapPage = () => {
  const { mapRef } = useInitMap();
  const { putMarkerList } = useMarker();
  const { categoryFilters, handleCheckFilters } = useCategoryFilters();
  const { isOpen, close } = useMapBottomSheet();

  putMarkerList(mapRef.current, MARKERS);

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
              category={filter.value}
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
