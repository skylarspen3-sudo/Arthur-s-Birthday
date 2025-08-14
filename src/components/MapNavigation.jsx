import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import './MapNavigation.css';

const LOCATIONS = [
  { name: 'Valentine', path: '/Arthur-s-Birthday/', description: 'Home & Birthday Wishes', emoji: '🏠' },
  { name: 'Strawberry', path: '/memories', description: 'Favorite Memories', emoji: '📸' },
  { name: 'Rhodes', path: '/letter', description: 'Future Adventures', emoji: '🌟' },
  { name: 'Armadillo', path: '/snake', description: 'Snake Challenge', emoji: '🐍' },
];

export default function MapNavigation() {
  const location = useLocation();
  const [isMinimized, setIsMinimized] = useState(false);
  return (
    <header className="map-nav-header">
      <div className={`mini-map${isMinimized ? ' minimized' : ''}`}>
        <div className="map-header">
          <div className="map-title">Locations</div>
          <button className="minimize-btn" onClick={() => setIsMinimized(!isMinimized)}>
            {isMinimized ? '+' : '−'}
          </button>
        </div>
        <nav className="mini-locations">
          {LOCATIONS.map(loc => (
            <Link
              key={loc.path}
              to={loc.path}
              className={`mini-location${location.pathname === loc.path ? ' active' : ''}`}
            >
              <span className="location-emoji">{loc.emoji}</span>
              {!isMinimized && (
                <span className="location-name">{loc.name}</span>
              )}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
