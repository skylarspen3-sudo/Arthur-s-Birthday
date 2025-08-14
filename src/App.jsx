import { Routes, Route } from 'react-router-dom';
import HonorSystem from './components/HonorSystem';
import LetterPage from './Pages/LetterPage';
import HomePage from './Pages/HomePage';
import MemoriesPage from './Pages/MemoriesPage';
import SnakePage from './Pages/SnakePage';
import MapNavigation from './components/MapNavigation';
import './App.css';


export default function App() {
  return (
    <>
      <HonorSystem />
      <MapNavigation />
      <Routes>
        <Route path="/Arthur-s-Birthday/" element={<HomePage />} />
        <Route path="/memories" element={<MemoriesPage />} />
        <Route path="/snake" element={<SnakePage />} />
        <Route path="/letter" element={<LetterPage />} />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </>
  );
}
