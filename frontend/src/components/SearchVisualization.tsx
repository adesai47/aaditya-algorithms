import React, { useState, useEffect } from 'react';
import './SearchVisualization.css'; // Optional CSS for styling

interface Props {
  algorithm: string;
}

const SearchVisualization: React.FC<Props> = ({ algorithm }) => {
  const [array, setArray] = useState<number[]>([10, 23, 45, 67, 89, 34, 22, 91]);
  const [target, setTarget] = useState<number>(45);
  const [result, setResult] = useState<string>('');

  useEffect(() => {
    setResult('');
  }, [algorithm]);

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

  const dfs = (graph: { [key: string]: string[] }, start: string) => {
    const visited: Set<string> = new Set();
    const result: string[] = [];

    function traverse(node: string) {
      if (visited.has(node)) return;
      visited.add(node);
      result.push(node);
      graph[node].forEach(traverse);
    }

    traverse(start);
    setResult(`DFS Order: ${result.join(' -> ')}`);
  };

  const bfs = (graph: { [key: string]: string[] }, start: string) => {
    const visited: Set<string> = new Set();
    const queue: string[] = [start];
    const result: string[] = [];

    while (queue.length > 0) {
      const node = queue.shift()!;
      if (visited.has(node)) continue;
      visited.add(node);
      result.push(node);
      queue.push(...graph[node]);
    }

    setResult(`BFS Order: ${result.join(' -> ')}`);
  };

  const graph = {
    A: ['B', 'C'],
    B: ['D', 'E'],
    C: ['F'],
    D: [],
    E: ['F'],
    F: []
  };

  const handleSearch = () => {
    switch (algorithm) {
      case 'Linear Search':
        linearSearch();
        break;
      case 'Binary Search':
        binarySearch();
        break;
      case 'DFS (Depth-First Search)':
        dfs(graph, 'A');
        break;
      case 'BFS (Breadth-First Search)':
        bfs(graph, 'A');
        break;
      default:
        setResult('Select a valid algorithm');
    }
  };

  return (
    <div className="search-container">
      <h2>{algorithm} Visualization</h2>
      <input
        type="number"
        value={target}
        onChange={(e) => setTarget(Number(e.target.value))}
        placeholder="Enter target value"
      />
      <button onClick={handleSearch}>Search</button>
      <div className="array-container">
        {array.map((value, index) => (
          <div key={index} className="array-bar">
            {value}
          </div>
        ))}
      </div>
      <div className="result">{result}</div>
      <div className="description">{getDescription(algorithm)}</div>
    </div>
  );
};

const getDescription = (algorithm: string) => {
  switch (algorithm) {
    case 'Linear Search':
      return (
        <>
          <p>
            Linear search sequentially checks each element in the list for the target value. It runs in linear time, making at most <strong>n</strong> comparisons.
          </p>
          <p><strong>Time Complexity:</strong> O(n)</p>
        </>
      );
    case 'Binary Search':
      return (
        <>
          <p>
            Binary search finds the target value by repeatedly dividing the search interval in half. The array must be sorted.
          </p>
          <p><strong>Time Complexity:</strong> O(log(n))</p>
        </>
      );
    case 'DFS (Depth-First Search)':
      return (
        <>
          <p>
            Depth-first search (DFS) explores as far as possible along each branch before backtracking.
          </p>
        </>
      );
    case 'BFS (Breadth-First Search)':
      return (
        <>
          <p>
            Breadth-first search (BFS) explores all neighbors of a node before moving to the next level.
          </p>
        </>
      );
    default:
      return null;
  }
};

export default SearchVisualization;
