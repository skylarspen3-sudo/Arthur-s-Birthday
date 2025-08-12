import { useState, useEffect } from 'react';
import './DayNightCycle.css';

export default function DayNightCycle() {
  const [timeOfDay, setTimeOfDay] = useState('dawn');

  useEffect(() => {
    const times = ['dawn', 'day', 'sunset', 'night'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % times.length;
      setTimeOfDay(times[currentIndex]);
      document.body.className = `theme-${times[currentIndex]}`;
    }, 15000); // Changes every 15 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`time-indicator ${timeOfDay}`}>
      <span>{timeOfDay.charAt(0).toUpperCase() + timeOfDay.slice(1)}</span>
    </div>
  );
}
