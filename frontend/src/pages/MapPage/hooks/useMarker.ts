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

  const putMarker = (map: kakao.maps.Map | null, coord: { lat: number; lng: number }) => {
    const marker = new kakao.maps.Marker({
      position: new kakao.maps.LatLng(coord.lat, coord.lng),
    });

    addMarker(marker);
    marker.setMap(map);
  };

  const putMarkerList = (map: kakao.maps.Map | null, coordList: { lat: number; lng: number }[]) => {
    coordList.forEach((coord) => {
      putMarker(map, coord);
    });
  };

  return { clearMarkerList, putMarker, putMarkerList };
};

export default useMarker;
