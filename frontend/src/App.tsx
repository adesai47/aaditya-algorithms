import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import SearchPage from './pages/SearchPage';
import SortPage from './pages/SortPage';
import PathPlanningPage from './pages/PathPlanningPage';


export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/sort" element={<SortPage />} />
        <Route path="/path-planning" element={<PathPlanningPage />} />
      </Routes>
    </div>
  );
}
