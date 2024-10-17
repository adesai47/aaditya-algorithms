import { useState, useEffect } from 'react';
import LinearSearchVisualization from '../components/LinearSearchVisualization';
import BinarySearchVisualization from '../components/BinarySearchVisualization';
import DFSVisualization from '../components/DFSVisualization';
import BFSVisualization from '../components/BFSVisualization';
import { Link } from 'react-router-dom';

const searchAlgorithms = ['Linear Search', 'Binary Search', 'DFS', 'BFS'];

export default function SearchPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Linear Search');
  const [randomArray, setRandomArray] = useState<number[]>([]);
  const target = Math.floor(Math.random() * 100); // Random target for search algorithms

  // Function to generate a random array
  const generateRandomArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100)); // Generate an array of 10 random numbers between 0 and 99
    setRandomArray(newArray);
  };

  // Call this function whenever a new algorithm is selected or when the page loads
  useEffect(() => {
    generateRandomArray();
  }, [selectedAlgorithm]);

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
        <h1 style={{ fontSize: '32px', color: '#2c3e50' }}>Search Algorithms</h1>
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
          {searchAlgorithms.map((algorithm) => (
            <option key={algorithm} value={algorithm}>
              {algorithm}
            </option>
          ))}
        </select>
        <div style={{ marginTop: '30px' }}>
          {selectedAlgorithm === 'Linear Search' && (
            <LinearSearchVisualization initialArray={randomArray} target={target} />
          )}
          {selectedAlgorithm === 'Binary Search' && (
            <BinarySearchVisualization initialArray={randomArray} target={target} />
          )}
          {selectedAlgorithm === 'DFS' && <DFSVisualization initialArray={randomArray} />}
          {selectedAlgorithm === 'BFS' && <BFSVisualization initialArray={randomArray} />}
        </div>
      </div>
    </div>
  );
}
