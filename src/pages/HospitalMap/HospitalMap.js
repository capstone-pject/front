import React, { useState, useEffect } from 'react';
import './HospitalMap.css';
import Sidebar from './Sidebar';
import Map from './Map';
import sampleData from './sampleData.json';

function HospitalMap() {
  const [facilities, setFacilities] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState('nearby'); // 기본 탭을 '내 주변 병원 위치 찾기'로 설정
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mapLevel, setMapLevel] = useState(5);
  const [userLocation, setUserLocation] = useState(null);
  const [nearbyHospitals, setNearbyHospitals] = useState([]);

  useEffect(() => {
    // 위치 정보를 받아 초기 지도 설정
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.warn('Geolocation error:', error.message);
          setUserLocation({ lat: 37.5665, lng: 126.9780 }); // 기본 서울 좌표
        }
      );
    } else {
      setUserLocation({ lat: 37.5665, lng: 126.9780 }); // Geolocation 지원 안 될 경우 기본 좌표 사용
    }
    setFacilities([]);
  }, []);

  // userLocation 또는 tab 변경 시 주변 병원 로드
  useEffect(() => {
    if (userLocation && tab === 'nearby') {
      fetchNearbyHospitals(userLocation.lat, userLocation.lng, '');
    }
  }, [userLocation, tab]);

  // 주변 병원 데이터 가져오기
  const fetchNearbyHospitals = (latitude, longitude, keyword = '') => {
    if (!window.kakao || !window.kakao.maps) {
      console.error('Kakao Maps API가 로드되지 않았습니다.');
      return;
    }

    const ps = new window.kakao.maps.services.Places();
    const location = new window.kakao.maps.LatLng(latitude, longitude);
    const options = {
      location: location,
      radius: 5000, // 5km 반경
      size: 15, // 최대 15개 결과
      category_group_code: 'HP8', // 병원 카테고리
    };

    ps.keywordSearch(keyword || '병원', (data, status) => {
      if (status === window.kakao.maps.services.Status.OK) {
        const hospitals = data.map(item => ({
          id: item.id,
          name: item.place_name,
          address: item.address_name,
          lat: item.y,
          lng: item.x,
          type: '병원',
        }));
        setNearbyHospitals(hospitals);
      } else {
        console.warn('병원 검색 실패:', status);
        setNearbyHospitals([]);
      }
    }, options);
  };

  const calculateDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371; // Earth's radius in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLng = (lng2 - lng1) * (Math.PI / 180);
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
              Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; // Distance in km
  };

  const nearbyFacilities = userLocation
    ? facilities
        .map(facility => ({
          ...facility,
          distance: calculateDistance(userLocation.lat, userLocation.lng, facility.lat, facility.lng),
        }))
        .filter(facility => facility.distance <= 5) // 5km 이내
        .sort((a, b) => a.distance - b.distance)
    : [];

  const filteredFacilities = facilities.filter(facility => {
    const matchesSearch = facility.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTab = tab === 'all' || facility.specialty === tab;
    return matchesSearch && matchesTab;
  });

  const handleZoom = (zoomIn) => {
    setMapLevel(prev => Math.max(2, Math.min(14, prev + (zoomIn ? -1 : 1))));
  };

  return (
    <div className="app-container">
      <Sidebar
        isOpen={isSidebarOpen}
        toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        tab={tab}
        setTab={setTab}
        facilities={filteredFacilities}
        nearbyFacilities={nearbyFacilities}
        onSearchLocation={() => setMapLevel(5)}
        searchResults={nearbyHospitals}
        onKeywordSearch={(query) => fetchNearbyHospitals(userLocation?.lat || 37.5665, userLocation?.lng || 126.9780, query)}
      />
      <button 
        className="sidebar-toggle" 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{ left: isSidebarOpen ? '325px' : '5px' }} /* 동적 left 조정 */
      >
        {isSidebarOpen ? '◀' : '▶'}
      </button>
      <div className="map-container">
        <Map 
          facilities={nearbyHospitals}
          mapLevel={mapLevel}
          onZoom={handleZoom}
          searchResults={nearbyHospitals}
          userLocation={userLocation}
        />
      </div>
    </div>
  );
}

export default HospitalMap;