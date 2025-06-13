import React, { useEffect, useRef } from 'react';

function Map({ facilities = [], mapLevel, onZoom, searchResults = [], userLocation }) {
  const mapRef = useRef(null);
  const infowindowRef = useRef(null);
  const markerInfowindowMap = useRef(new WeakMap());

  useEffect(() => {
    if (!window.kakao || !window.kakao.maps) {
      console.error('Kakao Maps API가 로드되지 않았습니다.');
      return;
    }

    const container = document.getElementById('map');
    const center = userLocation 
      ? new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng)
      : new window.kakao.maps.LatLng(37.5665, 126.9780);
    const options = {
      center: center,
      level: mapLevel,
    };
    const map = new window.kakao.maps.Map(container, options);
    mapRef.current = map;

    infowindowRef.current = new window.kakao.maps.InfoWindow({ zIndex: 1 });

    if (userLocation) {
      const userPosition = new window.kakao.maps.LatLng(userLocation.lat, userLocation.lng);
      const markerImage = new window.kakao.maps.MarkerImage(
        'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
        new window.kakao.maps.Size(32, 32),
        { offset: new window.kakao.maps.Point(16, 16) }
      );
      new window.kakao.maps.Marker({
        position: userPosition,
        map: map,
        image: markerImage,
        title: '내 위치',
      });
    }

    const markers = [];
    if (facilities && Array.isArray(facilities)) {
      facilities.forEach(facility => {
        const markerPosition = new window.kakao.maps.LatLng(facility.lat, facility.lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: map,
          title: facility.name,
        });
        markers.push(marker);

        window.kakao.maps.event.addListener(marker, 'click', () => {
          const infowindow = infowindowRef.current;
          const isOpen = markerInfowindowMap.current.get(marker);

          if (isOpen) {
            infowindow.close();
            markerInfowindowMap.current.delete(marker);
          } else {
            infowindow.setContent(`
              <div style="padding:5px; text-align:center;">
                <strong>${facility.name}</strong><br>${facility.address || '주소 없음'}
              </div>
            `);
            infowindow.open(map, marker);
            markerInfowindowMap.current.set(marker, true);
          }
        });
      });
    }

    if (searchResults && Array.isArray(searchResults) && searchResults !== facilities) {
      searchResults.forEach(result => {
        const markerPosition = new window.kakao.maps.LatLng(result.lat, result.lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition,
          map: map,
          title: result.name,
        });
        markers.push(marker);

        window.kakao.maps.event.addListener(marker, 'click', () => {
          const infowindow = infowindowRef.current;
          const isOpen = markerInfowindowMap.current.get(marker);

          if (isOpen) {
            infowindow.close();
            markerInfowindowMap.current.delete(marker);
          } else {
            infowindow.setContent(`
              <div style="padding:5px; text-align:center;">
                <strong>${result.name}</strong><br>${result.address || '주소 없음'}
              </div>
            `);
            infowindow.open(map, marker);
            markerInfowindowMap.current.set(marker, true);
          }
        });
      });
    }

    const zoomControl = new window.kakao.maps.ZoomControl();
    map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);

    window.kakao.maps.event.addListener(map, 'zoom_changed', () => {
      onZoom(map.getLevel() < mapLevel);
    });

    return () => {
      markers.forEach(marker => marker.setMap(null));
      if (infowindowRef.current) infowindowRef.current.close();
    };
  }, [facilities, mapLevel, searchResults, onZoom, userLocation]);

  return <div id="map" className="map"></div>;
}

export default Map;