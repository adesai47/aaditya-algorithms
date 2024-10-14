import { useState } from 'react';
import SortVisualization from '../components/SortVisualization';

const sortAlgorithms = ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort'];

export default function SortPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState<string>('Bubble Sort');

  return (
    <div>
      <h1>Sort Algorithms</h1>
      <select onChange={(e) => setSelectedAlgorithm(e.target.value)}>
        {sortAlgorithms.map((algorithm) => (
          <option key={algorithm} value={algorithm}>
            {algorithm}
          </option>
        ))}
      </select>
      <SortVisualization algorithm={selectedAlgorithm} />
    </div>
  );
}
