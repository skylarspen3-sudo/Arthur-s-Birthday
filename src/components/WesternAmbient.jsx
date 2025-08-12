import { useState, useRef, useEffect } from 'react';
import './WesternAmbient.css';

const SOUND_EFFECTS = [
  { 
    name: 'Campfire', 
    emoji: '🔥', 
    audioUrl: '/sounds/campfire.mp3', // Add your audio files to /public/sounds/
    loop: true
  },
  { 
    name: 'Wind', 
    emoji: '💨', 
    audioUrl: '/sounds/wind.mp3',
    loop: true
  },
  { 
    name: 'Crickets', 
    emoji: '🦗', 
    audioUrl: '/sounds/crickets.mp3',
    loop: true
  },
  { 
    name: 'Horse Steps', 
    emoji: '🐎', 
    audioUrl: '/sounds/horse-steps.mp3',
    loop: false
  }
];

export default function WesternAmbient() {
  const [playing, setPlaying] = useState(new Set());
  const [volume, setVolume] = useState(0.3);
  const [isMinimized, setIsMinimized] = useState(false);
  const audioRefs = useRef({});

  // Initialize audio elements
  useEffect(() => {
    SOUND_EFFECTS.forEach(sound => {
      if (!audioRefs.current[sound.name]) {
        const audio = new Audio(sound.audioUrl);
        audio.loop = sound.loop;
        audio.volume = volume;
        audioRefs.current[sound.name] = audio;
      }
    });
  }, []);

  // Update volume for all audio
  useEffect(() => {
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) audio.volume = volume;
    });
  }, [volume]);

  const toggleSound = async (soundName) => {
    const audio = audioRefs.current[soundName];
    if (!audio) return;

    const newPlaying = new Set(playing);

    try {
      if (playing.has(soundName)) {
        audio.pause();
        audio.currentTime = 0;
        newPlaying.delete(soundName);
      } else {
        await audio.play();
        newPlaying.add(soundName);
      }
      setPlaying(newPlaying);
    } catch (error) {
      console.error(`Failed to play ${soundName}:`, error);
      playTone(soundName);
    }
  };

  // Fallback: Generate simple audio tones if files don't load
  const playTone = (soundName) => {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const frequencies = {
      'Campfire': 200,
      'Wind': 150,
      'Crickets': 400,
      'Horse Steps': 300
    };

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(frequencies[soundName] || 200, audioContext.currentTime);
    oscillator.type = 'sine';
    
    gainNode.gain.setValueAtTime(volume * 0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 1);

    oscillator.start();
    oscillator.stop(audioContext.currentTime + 1);
  };

  const stopAllSounds = () => {
    Object.values(audioRefs.current).forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });
    setPlaying(new Set());
  };

  return (
    <div className={`ambient-controls ${isMinimized ? 'minimized' : ''}`}>
      <div className="ambient-header">
        <span>🎵 Western Ambience</span>
        <div className="header-controls">
          <button onClick={() => setIsMinimized(!isMinimized)} className="minimize-btn">
            {isMinimized ? '📤' : '📥'}
          </button>
          <button onClick={stopAllSounds} className="stop-all-btn">
            ⏹️
          </button>
        </div>
      </div>
      
      {!isMinimized && (
        <>
          <div className="volume-control">
            <span>🔊</span>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="volume-slider"
            />
            <span>{Math.round(volume * 100)}%</span>
          </div>

          <div className="sound-buttons">
            {SOUND_EFFECTS.map(sound => (
              <button
                key={sound.name}
                onClick={() => toggleSound(sound.name)}
                className={`sound-btn ${playing.has(sound.name) ? 'active' : ''}`}
              >
                <span className="sound-emoji">{sound.emoji}</span>
                <span className="sound-name">{sound.name}</span>
                {playing.has(sound.name) && <span className="playing-indicator">♪</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
