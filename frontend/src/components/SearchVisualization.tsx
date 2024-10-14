import React, { useState } from 'react';

interface Props {
  algorithm: string;
}

const SearchVisualization: React.FC<Props> = ({ algorithm }) => {
  const [array] = useState([10, 23, 45, 67, 89, 34, 22, 91]);
  const [target, setTarget] = useState<number>(45);
  const [result, setResult] = useState<string>('');

  const linearSearch = () => {
    for (let i = 0; i < array.length; i++) {
      if (array[i] === target) {
        setResult(`Found ${target} at index ${i}`);
        return;
      }
    }
    setResult(`${target} not found`);
  };

  const binarySearch = () => {
    let left = 0;
    let right = array.length - 1;
    const sortedArray = [...array].sort((a, b) => a - b);

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (sortedArray[mid] === target) {
        setResult(`Found ${target} at index ${mid}`);
        return;
      }
      if (sortedArray[mid] < target) left = mid + 1;
      else right = mid - 1;
    }
    setResult(`${target} not found`);
  };

  const handleSearch = () => {
    switch (algorithm) {
      case 'Linear Search':
        linearSearch();
        break;
      case 'Binary Search':
        binarySearch();
        break;
      default:
        setResult('Select a valid algorithm');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h2>{algorithm} Visualization</h2>
      <input
        type="number"
        value={target}
        onChange={(e) => setTarget(Number(e.target.value))}
        placeholder="Enter target value"
        style={{ padding: '10px', margin: '10px' }}
      />
      <button
        onClick={handleSearch}
        style={{
          padding: '10px',
          backgroundColor: '#2ecc71',
          color: 'white',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          margin: '10px'
        }}
      >
        Search
      </button>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
        {array.map((value, index) => (
          <div
            key={index}
            style={{
              width: '30px',
              height: '30px',
              backgroundColor: '#3498db',
              margin: '5px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              fontWeight: 'bold'
            }}
          >
            {value}
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', fontSize: '18px', fontWeight: 'bold' }}>{result}</div>
    </div>
  );
};

export default SearchVisualization;
