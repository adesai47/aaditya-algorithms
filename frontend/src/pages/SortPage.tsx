import { useState } from 'react';

const sortAlgorithms = ['Bubble Sort', 'Selection Sort', 'Insertion Sort', 'Merge Sort', 'Quick Sort'];

export default function SortPage() {
  const [selectedAlgorithm, setSelectedAlgorithm] = useState('Bubble Sort');

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Sort Algorithms</h1>
      <select
        onChange={(e) => setSelectedAlgorithm(e.target.value)}
        style={{ padding: '10px', margin: '20px' }}
      >
        {sortAlgorithms.map((algorithm) => (
          <option key={algorithm} value={algorithm}>
            {algorithm}
          </option>
        ))}
      </select>
      <p>{selectedAlgorithm} visualization coming soon!</p>
    </div>
  );
}
