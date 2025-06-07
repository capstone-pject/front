import React, { useEffect, useRef } from 'react';

function Map({ facilities, mapLevel, onZoom }) {
  const mapRef = useRef(null);

  useEffect(() => {
    const container = mapRef.current;
    const options = {
      center: new window.kakao.maps.LatLng(37.5665, 126.9780),
      level: mapLevel,
    };
    const map = new window.kakao.maps.Map(container, options);

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          const userPosition = new window.kakao.maps.LatLng(latitude, longitude);
          map.setCenter(userPosition);

          const markerImage = new window.kakao.maps.MarkerImage(
            'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16"%3E%3Ccircle cx="8" cy="8" r="6" fill="%23FF0000" /%3E%3C/svg%3E',
            new window.kakao.maps.Size(10, 10)
          );
          const userMarker = new window.kakao.maps.Marker({
            position: userPosition,
            image: markerImage,
          });
          userMarker.setMap(map);
        },
        error => console.warn('Geolocation error:', error.message)
      );
    }

    facilities.forEach(facility => {
      const markerPosition = new window.kakao.maps.LatLng(facility.lat, facility.lng);
      const marker = new window.kakao.maps.Marker({ position: markerPosition });
      marker.setMap(map);

      const infowindow = new window.kakao.maps.InfoWindow({
        content: `
          <div style="padding:10px; font-size:18px; max-width:200px;">
            <h3 style="font-size:20px; font-weight:bold;">${facility.name}</h3>
            <p>유형: ${facility.type}</p>
            <p>주소: ${facility.address}</p>
          </div>`,
      });
      window.kakao.maps.event.addListener(marker, 'click', () => {
        infowindow.open(map, marker);
      });
    });
  }, [facilities, mapLevel]);

  return (
    <div className="map">
      <div className="map-controls">
        <button onClick={() => onZoom(true)} className="zoom-in">+</button>
        <button onClick={() => onZoom(false)} className="zoom-out">-</button>
        <button className="layer-toggle">레이어</button>
      </div>
      <div ref={mapRef} className="map-canvas"></div>
    </div>
  );
}

export default Map;