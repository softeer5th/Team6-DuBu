import { useEffect, useRef, useState } from 'react';

const MAP_ID = 'map';

const MapPage = () => {
  const [center, setCenter] = useState({
    lat: 33.450701,
    lng: 126.570667,
  });

  const mapRef = useRef<kakao.maps.Map | null>(null);

  useEffect(() => {
    kakao.maps.load(() => initMap());

    function initMap() {
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
    }
  }, []);

  return <div id={MAP_ID} style={{ width: '100%', height: '100%' }} />;
};

export default MapPage;
