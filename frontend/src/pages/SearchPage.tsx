import { useState } from 'react';
import LinearSearchVisualization from '../components/LinearSearchVisualization';
import BinarySearchVisualization from '../components/BinarySearchVisualization';
import DFSVisualization from '../components/DFSVisualization';
import BFSVisualization from '../components/BFSVisualization';

const searchAlgorithms = ['Linear Search', 'Binary Search', 'DFS', 'BFS'];

export default function SearchPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Linear Search');

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Search Algorithms</h1>
      <select
        onChange={(e) => setSelectedAlgorithm(e.target.value)}
        style={{ padding: '10px', margin: '20px' }}
      >
        {searchAlgorithms.map((algorithm) => (
          <option key={algorithm} value={algorithm}>
            {algorithm}
          </option>
        ))}
      </select>
      {selectedAlgorithm === 'Linear Search' && <LinearSearchVisualization />}
      {selectedAlgorithm === 'Binary Search' && <BinarySearchVisualization />}
      {selectedAlgorithm === 'DFS' && <DFSVisualization />}
      {selectedAlgorithm === 'BFS' && <BFSVisualization />}
    </div>
  );
}
