import React, { useState } from 'react';

function SearchBar({ searchQuery, setSearchQuery, tab, setTab, showFilters, onKeywordSearch }) {
  // const specialties = [
  //   'all', '가정의학과', '결핵과', '내과', '마취통증의학과', '방사선종양학과', '병리과', '비뇨의학과', 
  //   '산부인과', '성형외과', '소아청소년과', '신경과', '신경외과', '안과', '영상의학과', '예방의학과', 
  //   '외과응급의학과', '이비인후과', '재활의학과', '정신건강의학과', '정형외과', '직업환경의학과', 
  //   '진단검사의학과', '피부과', '핵의학과', '흉부외과'
  // ];
  const specialties = [
    {symptom:"🤧기침이 나요",dept:"내과"},
    {symptom:"🦵관절이 아파요",dept:"정형외과"},
    {symptom:"🤕머리가 아파요",dept:"신경과"},
    {symptom:"👁눈이 침침해요",dept:"안과"},
    {symptom:"🚽소변이 불편해요",dept:"비뇨기과"},
    {symptom:"🤒열이 나요",dept:"내과"},
    {symptom:"🤰배가 아파요",dept:"내과"},
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

  const handleSpecialtyClick = (tab) => {
    // console.log("tab",tab);
    if (onKeywordSearch) {
      console.log("tab",tab)
      setTab(tab?.symptom);
      onKeywordSearch(tab?.dept);
    }
  }

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
              key={t?.symptom}
              // onClick={() => setTab(t)}
              onClick={()=>handleSpecialtyClick(t)}
              className={`search-tab ${tab === t.symptom ? 'active' : ''}`}
            >
              {t.symptom === 'all' ? '전체선택' : t.symptom}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchBar;