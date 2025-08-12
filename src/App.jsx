import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HonorSystem from './components/HonorSystem';
import LetterPage from './Pages/LetterPage';
import HomePage from './Pages/HomePage';
import MemoriesPage from './pages/MemoriesPage';
import LookingForwardPage from './pages/LookingForwardPage';
import LoveListPage from './pages/LoveList';
import SnakePage from './pages/SnakePage';
import MapNavigation from './components/MapNavigation';
import BackgroundMusic from './components/Background';

import './App.css';

export default function App() {
  return (
    <>
      {/* Fixed UI Components */}
      <HonorSystem />
      <MapNavigation />
    <BackgroundMusic />
      {/* Main Content */}
      <main className="page-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/memories" element={<MemoriesPage />} />
          <Route path="/looking-forward" element={<LookingForwardPage />} />
          <Route path="/snake" element={<SnakePage />} />
          <Route path="/letter" element={<LetterPage />} />
          
          {/* Catch-all route for 404 */}
          
        </Routes>
      </main>
    </>
  );
}
