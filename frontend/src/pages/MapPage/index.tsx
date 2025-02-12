import { useEffect, useRef, useState } from 'react';

import CenterMarker from '@/assets/images/centerMarker.svg';

const MAP_ID = 'map';

const MapPage = () => {
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });

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
        level: 3,
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

  return <div id={MAP_ID} style={{ width: '100%', height: '100%' }} />;
};

export default MapPage;
