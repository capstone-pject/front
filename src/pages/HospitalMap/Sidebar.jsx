import React from 'react';
import SearchBar from './SearchBar';

function Sidebar({
  isOpen,
  toggleSidebar,
  searchQuery,
  setSearchQuery,
  tab,
  setTab,
  facilities,
  nearbyFacilities,
  onSearchLocation,
  searchResults,
  onKeywordSearch,
}) {
  const tabs = [
    { id: 'nearby', label: '내 주변 병원 위치 찾기' },
    { id: 'keyword', label: '증상을 통한 병원 찾기' },
  ];

  return (
    <div className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <h2 className="sidebar-title">병원 지도</h2>
        <button className="btn-close" onClick={toggleSidebar}>
          {isOpen ? '◀' : '▶'}
        </button>
      </div>
      <div className="sidebar-tabs">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`sidebar-tab ${tab === t.id ? 'active' : ''}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <SearchBar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        tab={tab}
        setTab={setTab}
        showFilters={tab === 'keyword'}
        onKeywordSearch={onKeywordSearch}
      />
      <div className="facility-list">
        <h3 className="list-title"></h3>
        <ul className="facility-items">
          {nearbyFacilities.map(facility => (
            <li key={facility.id} className="facility-item">
              <span className="facility-name">{facility.name}</span>
              <span className="facility-detail">({facility.distance.toFixed(2)}km)</span>
            </li>
          ))}
        </ul>
        <h3 className="list-title"></h3>
        <ul className="facility-items">
          {facilities.map(facility => (
            <li key={facility.id} className="facility-item">
              <span className="facility-name">{facility.name}</span>
            </li>
          ))}
        </ul>
        <h3 className="list-title">주변 병원</h3>
        <ul className="facility-items hospitals">
          {searchResults.map(hospital => (
            <li key={hospital.id} className="facility-item">
              <span className="facility-name">{hospital.name}</span>
              <span className="facility-detail">{hospital.address}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;