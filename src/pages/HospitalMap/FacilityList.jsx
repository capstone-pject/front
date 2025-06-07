import React from 'react';

function FacilityList({ facilities }) {
  return (
    <div className="facility-list">
      <h2 className="list-title">검색 결과</h2>
      <ul className="facility-items">
        {facilities.map(facility => (
          <li key={facility.id} className="facility-item">
            <h3 className="facility-name">{facility.name}</h3>
            <p className="facility-detail">유형: {facility.type}</p>
            <p className="facility-detail">주소: {facility.address}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FacilityList;