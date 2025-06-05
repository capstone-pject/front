import React, { useState } from 'react';
import SearchBar from '\src\pages\HospitalMap./SearchBar';
import FacilityList from '\src\pages\HospitalMap./FacilityList';

function Sidebar({ isOpen, toggleSidebar, searchQuery, setSearchQuery, tab, setTab, facilities, nearbyFacilities, onSearchLocation }) {
  const [activeTab, setActiveTab] = useState('홈');
  const [homeSearchQuery, setHomeSearchQuery] = useState('');
  const [findSearchQuery, setFindSearchQuery] = useState('');

  const handleSearchClick = () => {
    onSearchLocation();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          console.log('Current location:', latitude, longitude);
        },
        error => console.warn('Geolocation error:', error.message)
      );
    }
  };

  const handleTabClick = (e, tabName) => {
    e.stopPropagation();
    setActiveTab(tabName);
    handleSearchClick();
  };

  const filteredNearbyFacilities = nearbyFacilities.filter(facility =>
    facility.name.toLowerCase().includes(homeSearchQuery.toLowerCase())
  );

  const filteredFacilities = facilities.filter(facility =>
    facility.name.toLowerCase().includes(findSearchQuery.toLowerCase())
  );

  return (
    <div className={`sidebar ${isOpen ? 'sidebar-open' : 'sidebar-closed'}`}>
      <div className="sidebar-content">
        <div className="sidebar-header">
          <h1 className="sidebar-title">내주변 병원 약국</h1>
        </div>
        <div className="sidebar-tabs">
          <button
            onClick={(e) => handleTabClick(e, '홈')}
            className={`sidebar-tab ${activeTab === '홈' ? 'active' : ''}`}
          >
            건강지도 홈 <span className="search-icon">🔍</span>
          </button>
          <button
            onClick={(e) => handleTabClick(e, '찾기')}
            className={`sidebar-tab ${activeTab === '찾기' ? 'active' : ''}`}
          >
            병원 약국 종류별 찾기 <span className="search-icon">🔍</span>
          </button>
        </div>
        {activeTab === '홈' && (
          <div className="sidebar-section">
            <SearchBar
              searchQuery={homeSearchQuery}
              setSearchQuery={setHomeSearchQuery}
              tab={tab}
              setTab={setTab}
              showFilters={false}
            />
            <h2 className="list-title">주변 병원/약국</h2>
            {filteredNearbyFacilities.length > 0 ? (
              <ul className="facility-items">
                {filteredNearbyFacilities.map(facility => (
                  <li key={facility.id} className="facility-item">
                    <h3 className="facility-name">{facility.name}</h3>
                    <p className="facility-detail">유형: {facility.type}</p>
                    <p className="facility-detail">주소: {facility.address}</p>
                    <p className="facility-detail">거리: {facility.distance.toFixed(2)} km</p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="sidebar-text">주변 병원/약국을 찾을 수 없습니다.</p>
            )}
          </div>
        )}
        {activeTab === '찾기' && (
          <div className="sidebar-section">
            <SearchBar
              searchQuery={findSearchQuery}
              setSearchQuery={setFindSearchQuery}
              tab={tab}
              setTab={setTab}
              showFilters={true}
            />
            <FacilityList facilities={filteredFacilities} />
          </div>
        )}
      </div>
    </div>
  );
}

export default Sidebar;