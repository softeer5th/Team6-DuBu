import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { CATEGORY_OPTIONS } from '../EditPage/EditPage.constants';

import CenterMarker from '@/assets/images/centerMarker.svg';
import Header from '@/components/Header';
import { CategoryType } from '@/types/filter';

const MAP_ID = 'map';

const MapPage = () => {
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });
  const [categoryFilters, setCategoryFilters] = useState({
    READING: false,
    ENGLISH: false,
    LANGUAGE: false,
    NEWS: false,
    HOBBY: false,
    OTHERS: false,
  });

  const handleCheckFilter = (category: CategoryType) => {
    setCategoryFilters((prev) => ({
      ...prev,
      [category]: !prev[category],
    }));
  };

  const mapRef = useRef<kakao.maps.Map | null>(null);
  const markerRef = useRef<kakao.maps.Marker | null>(null);

  useEffect(() => {
    const locPosition = new kakao.maps.LatLng(center.lat, center.lng);
    mapRef.current?.setCenter(locPosition);

    const myMarker = CenterMarker;
    const myMarkerSize = new window.kakao.maps.Size(28, 28);
    const myMarkerOption = { offset: new window.kakao.maps.Point(0, 0) };

    const myMarkerPosition = new window.kakao.maps.MarkerImage(
      myMarker,
      myMarkerSize,
      myMarkerOption,
    );

    if (mapRef.current) {
      if (markerRef.current) {
        // 기존 마커가 있으면 위치만 업데이트
        markerRef.current.setPosition(locPosition);
      } else {
        // 마커가 없으면 새로 생성
        markerRef.current = new window.kakao.maps.Marker({
          map: mapRef.current,
          image: myMarkerPosition,
          position: locPosition,
        });
      }
    }
  }, [center]);

  useEffect(() => {
    const initMap = () => {
      const container = document.getElementById(MAP_ID) as HTMLElement;
      const options = {
        center: new kakao.maps.LatLng(33.450701, 126.570667),
        level: 5,
      };

      mapRef.current = new kakao.maps.Map(container, options);

      if (navigator.geolocation) {
        navigator.geolocation.watchPosition(
          (pos) => {
            setCenter({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          },
          (error) => {
            if (error.code === error.PERMISSION_DENIED) {
              alert('위치 접근이 거부되었습니다. 설정에서 위치 서비스를 활성화해 주세요.');
            }
          },
          {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0,
          },
        );
      }
    };

    kakao.maps.load(() => initMap());
  }, []);

  return (
    <div id={MAP_ID} style={{ width: '100%', height: '100%' }}>
      <HeaderOverlay>
        <Header>
          <Header.Left>
            <Header.BackButton />
          </Header.Left>
          <Header.Right>
            <Header.MenuButton />
          </Header.Right>
        </Header>
        <RadioBadgeWrapper>
          {CATEGORY_OPTIONS.map((filter) => (
            <RadioBadge
              key={filter.value}
              value={filter.value}
              $isSelected={categoryFilters[filter.value]}
              onClick={() => handleCheckFilter(filter.value)}
              category={filter.value}
            >
              {filter.label}
            </RadioBadge>
          ))}
        </RadioBadgeWrapper>
      </HeaderOverlay>
    </div>
  );
};

export default MapPage;

const HeaderOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.lightWhite30};
  backdrop-filter: blur(4px);

  z-index: 2;
`;

export const RadioBadgeWrapper = styled.div`
  display: flex;
  gap: 0.8rem;
  width: 100vw;
  overflow-x: scroll;
  padding: 1rem;
`;

export const RadioBadge = styled.button<{ $isSelected: boolean; category: CategoryType }>`
  ${({ theme }) => theme.fonts.caption11};
  display: flex;
  align-items: center;
  justify-content: center;

  height: 2.2rem;
  white-space: nowrap;

  padding: 0.5rem 1.2rem;
  border-radius: 0.8rem;

  background-color: ${({ theme, $isSelected }) =>
    $isSelected ? theme.colors.white : theme.colors.gray50};

  color: ${({ theme, $isSelected, category }) =>
    $isSelected ? theme.colors[category] : theme.colors.gray700};

  outline: ${({ theme, $isSelected, category }) =>
    $isSelected ? `0.15rem solid ${theme.colors[category]}` : 'none'};

  cursor: pointer;

  transition:
    background-color 0.2s,
    color 0.2s;
`;
