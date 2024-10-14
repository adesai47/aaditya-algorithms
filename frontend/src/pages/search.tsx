import { useState } from 'react';
import SearchVisualization from '../components/SearchVisualization';

const searchAlgorithms = ['Linear Search', 'Binary Search', 'DFS', 'BFS'];

export default function SearchPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('Linear Search');

  return (
    <div>
      <h1>Search Algorithms</h1>
      <select onChange={(e) => setSelectedAlgorithm(e.target.value)}>
        {searchAlgorithms.map((algorithm) => (
          <option key={algorithm} value={algorithm}>
            {algorithm}
          </option>
        ))}
      </select>
      <SearchVisualization algorithm={selectedAlgorithm} />
    </div>
  );
}
