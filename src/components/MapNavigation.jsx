import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './MapNavigation.css';

const LOCATIONS = [
  { name: 'Valentine', path: '/', description: 'Home & Birthday Wishes', emoji: '🏠' },
  { name: 'Strawberry', path: '/memories', description: 'Favorite Memories', emoji: '📸' },
  { name: 'Rhodes', path: '/letter', description: 'Future Adventures', emoji: '🌟' },
  { name: 'Armadillo', path: '/snake', description: 'Snake Challenge', emoji: '🐍' }

];

export default function MapNavigation() {
  const location = useLocation();
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div className={`mini-map ${isMinimized ? 'minimized' : ''}`}>
      <div className="map-header">
        <span className="map-title">🗺️ Territory</span>
        <button 
          className="minimize-btn"
          onClick={() => setIsMinimized(!isMinimized)}
        >
          {isMinimized ? '📋' : '📥'}
        </button>
      </div>
      
      {!isMinimized && (
        <div className="mini-locations">
          {LOCATIONS.map(loc => (
            <Link
              key={loc.path}
              to={loc.path}
              className={`mini-location ${location.pathname === loc.path ? 'active' : ''}`}
              title={`${loc.name} - ${loc.description}`}
            >
              <span className="location-emoji">{loc.emoji}</span>
              <span className="location-name">{loc.name}</span>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
