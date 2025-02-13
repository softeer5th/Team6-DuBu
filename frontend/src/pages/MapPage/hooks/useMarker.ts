import { useRef } from 'react';

const useMarker = () => {
  const markerListRef = useRef<kakao.maps.Marker[]>([]);

  const addMarker = (marker: kakao.maps.Marker) => {
    markerListRef.current.push(marker);
  };

  const clearMarkerList = () => {
    markerListRef.current.forEach((marker) => {
      marker.setMap(null);
    });

    markerListRef.current = [];
  };

  const putMarker = (
    map: kakao.maps.Map | null,
    coord: { lat: number; lng: number; memberId: number },
    onClick: () => void,
  ) => {
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(coord.lat, coord.lng),
    });

    addMarker(marker);

    // 마커 클릭 이벤트 등록
    kakao.maps.event.addListener(marker, 'click', onClick);

    marker.setMap(map);
  };

  const putMarkerList = (
    map: kakao.maps.Map | null,
    coordList: { lat: number; lng: number; memberId: number }[],
    onClick: (memberId: number) => void,
  ) => {
    coordList.forEach((coord) => {
      putMarker(map, coord, () => onClick(coord.memberId));
    });
  };

  return { clearMarkerList, putMarker, putMarkerList };
};

export default useMarker;
