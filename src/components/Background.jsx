import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function MusicControl() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const location = useLocation();
  const audioRef = React.useRef(null);
  const timeoutRef = React.useRef(null);

  // On mount, setup audio
  useEffect(() => {
    audioRef.current = new Audio('/Arthur-s-Birthday/01.Unshaken.mp3'); 
    audioRef.current.loop = true;
    return () => {
      audioRef.current.pause();
      clearTimeout(timeoutRef.current);
    };
  }, []);

  // Play/pause music
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  };

  // Hide play button on navigation
  useEffect(() => {
    setIsVisible(false); // Hide when user navigates
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true); // Reappear after delay if needed (optional)
    }, 5000);
  }, [location.pathname]);

  return (
    <div
      className="music-control"
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-in-out',
        pointerEvents: isVisible ? 'all' : 'none',
        zIndex: 999
      }}
    >
      <button
        className="play-button"
        onClick={togglePlay}
        style={{
          background: 'transparent',
          border: 'none',
          cursor: 'pointer',
          fontSize: '3rem',
          color: 'var(--vivid-yellow)',
          filter: 'drop-shadow(0 0 10px rgba(0,0,0,0.5))'
        }}
      >
        {isPlaying ? '⏸️' : '▶️'}
      </button>
    </div>
  );
}
