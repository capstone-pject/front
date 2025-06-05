import React, { useState, useEffect } from 'react';
import './App.css';
import Sidebar from '/src/pages/HospitalMap/Sidebar';
import Map from '/src/pages/HospitalMap/Map';

function App() {
  const [facilities, setFacilities] = useState(sampleData);
  const [searchQuery, setSearchQuery] = useState('');
  const [tab, setTab] = useState('all');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [mapLevel, setMapLevel] = useState(5);
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    setFacilities(sampleData);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          const { latitude, longitude } = position.coords;
          setUserLocation({ lat: latitude, lng: longitude });
        },
        error => console.warn('Geolocation error:', error.message)
      );
    }
  }, []);

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
      />
      <button 
        className="sidebar-toggle" 
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        style={{ left: isSidebarOpen ? '320px' : '0' }}
      >
        {isSidebarOpen ? '◀' : '▶'}
      </button>
      <div className="map-container">
        <Map facilities={filteredFacilities} mapLevel={mapLevel} onZoom={handleZoom} />
      </div>
    </div>
  );
}

export default App;