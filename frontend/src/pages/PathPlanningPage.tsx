import React from 'react';
import PathPlanningVisualization from '../components/PathPlanningVisualization';
import { Link } from 'react-router-dom';

const PathPlanningPage: React.FC = () => {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f4f4f9',
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {/* Reused Header */}
      <header
        style={{
          width: '100%',
          padding: '20px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          position: 'absolute',
          top: 0,
          left: 0,
          borderBottom: '2px solid #ccc',
        }}
      >
        <h2 style={{ color: '#2c3e50', marginLeft: '20px' }}>Fractal Algorithm's</h2>
        <nav style={{ marginRight: '50px' }}>
          <Link to="/" style={{ textDecoration: 'none', color: '#4a4a8c', marginRight: '15px' }}>
            Home
          </Link>
          <Link to="/search" style={{ textDecoration: 'none', color: '#4a4a8c', marginRight: '15px' }}>
            Search
          </Link>
          <Link to="/sort" style={{ textDecoration: 'none', color: '#4a4a8c', marginRight: '15px' }}>
            Sort
          </Link>
          <Link to="/path-planning" style={{ textDecoration: 'none', color: '#4a4a8c' }}>
            Planning Path
          </Link>
        </nav>
      </header>

      <div style={{ textAlign: 'center', marginTop: '120px' }}>
        <h1 style={{ fontSize: '32px', color: '#2c3e50' }}>Path Planning (Dijkstra's Algorithm)</h1>
        <PathPlanningVisualization />
      </div>
    </div>
  );
};

export default PathPlanningPage;