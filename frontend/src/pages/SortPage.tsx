import { useState } from 'react';
import BubbleSortVisualization from '../components/BubbleSortVisualization';
import SelectionSortVisualization from '../components/SelectionSortVisualization';
import InsertionSortVisualization from '../components/InsertionSortVisualization';
import MergeSortVisualization from '../components/MergeSortVisualization';
import QuickSortVisualization from '../components/QuickSortVisualization';
import { Link } from 'react-router-dom';

const sortAlgorithms = ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort'];

export default function SortPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Bubble Sort');

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
        <h1 style={{ fontSize: '32px', color: '#2c3e50' }}>Sort Algorithms</h1>
        <select
          onChange={(e) => setSelectedAlgorithm(e.target.value)}
          style={{
            padding: '10px 15px',
            margin: '20px',
            fontSize: '18px',
            borderRadius: '5px',
            border: '1px solid #ccc',
          }}
        >
          {sortAlgorithms.map((algorithm) => (
            <option key={algorithm} value={algorithm}>
              {algorithm}
            </option>
          ))}
        </select>
        <div style={{ marginTop: '30px' }}>
          {selectedAlgorithm === 'Bubble Sort' && <BubbleSortVisualization />}
          {selectedAlgorithm === 'Selection Sort' && <SelectionSortVisualization />}
          {selectedAlgorithm === 'Insertion Sort' && <InsertionSortVisualization />}
          {selectedAlgorithm === 'Merge Sort' && <MergeSortVisualization />}
          {selectedAlgorithm === 'Quick Sort' && <QuickSortVisualization />}
        </div>
      </div>
    </div>
  );
}
