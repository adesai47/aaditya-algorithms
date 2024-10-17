import { useState } from 'react';
import BubbleSortVisualization from '../components/BubbleSortVisualization';
import SelectionSortVisualization from '../components/SelectionSortVisualization';
import InsertionSortVisualization from '../components/InsertionSortVisualization';
import MergeSortVisualization from '../components/MergeSortVisualization';
import QuickSortVisualization from '../components/QuickSortVisualization';

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
      {selectedAlgorithm === 'Bubble Sort' && <BubbleSortVisualization />}
      {selectedAlgorithm === 'Selection Sort' && <SelectionSortVisualization />}
      {selectedAlgorithm === 'Insertion Sort' && <InsertionSortVisualization />}
      {selectedAlgorithm === 'Merge Sort' && <MergeSortVisualization />}
      {selectedAlgorithm === 'Quick Sort' && <QuickSortVisualization />}
      <p>{selectedAlgorithm !== 'Bubble Sort' && selectedAlgorithm !== 'Selection Sort' && selectedAlgorithm !== 'Insertion Sort' && selectedAlgorithm !== 'Merge Sort' && selectedAlgorithm !== 'Quick Sort' ? `${selectedAlgorithm} visualization coming soon!` : ''}</p>
    </div>
  );
}
