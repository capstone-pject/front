import React, { useState } from 'react';

function SearchBar({ searchQuery, setSearchQuery, tab, setTab, showFilters, onKeywordSearch }) {
  const specialties = [
    'all', '가정의학과', '결핵과', '내과', '마취통증의학과', '방사선종양학과', '병리과', '비뇨의학과', 
    '산부인과', '성형외과', '소아청소년과', '신경과', '신경외과', '안과', '영상의학과', '예방의학과', 
    '외과응급의학과', '이비인후과', '재활의학과', '정신건강의학과', '정형외과', '직업환경의학과', 
    '진단검사의학과', '피부과', '핵의학과', '흉부외과'
  ];

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && onKeywordSearch) {
      onKeywordSearch(searchQuery);
    }
  };

  const handleSearchClick = () => {
    if (onKeywordSearch) {
      onKeywordSearch(searchQuery);
    }
  };

  return (
    <div className="search-bar">
      <div className="search-bar-inputs">
        <input
          type="text"
          placeholder="병원명 또는 키워드 입력"
          value={searchQuery}
          onChange={handleSearch}
          onKeyPress={handleKeyPress}
          className="search-input"
        />
        <button 
          onClick={handleSearchClick} 
          className="search-button"
        >
          🔍
        </button>
      </div>
      {showFilters && (
        <div className="search-bar-tabs">
          {specialties.map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`search-tab ${tab === t ? 'active' : ''}`}
            >
              {t === 'all' ? '전체선택' : t}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;