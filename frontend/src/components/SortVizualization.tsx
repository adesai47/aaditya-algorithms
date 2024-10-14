import React, { useEffect, useState } from 'react';

interface Props {
  algorithm: string;
}

const SortVisualization: React.FC<Props> = ({ algorithm }) => {
  const [array, setArray] = useState<number[]>([64, 34, 25, 12, 22, 11, 90]);

  // Reset the array to a new shuffled state
  const resetArray = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100));
    setArray(newArray);
  };

  useEffect(() => {
    resetArray();
  }, [algorithm]);

  const bubbleSort = () => {
    let arr = [...array];
    for (let i = 0; i < arr.length - 1; i++) {
      for (let j = 0; j < arr.length - i - 1; j++) {
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        }
      }
    }
    setArray(arr);
  };

  const selectionSort = () => {
    let arr = [...array];
    for (let i = 0; i < arr.length; i++) {
      let minIdx = i;
      for (let j = i + 1; j < arr.length; j++) {
        if (arr[j] < arr[minIdx]) minIdx = j;
      }
      [arr[i], arr[minIdx]] = [arr[minIdx], arr[i]];
    }
    setArray(arr);
  };

  const insertionSort = () => {
    let arr = [...array];
    for (let i = 1; i < arr.length; i++) {
      let key = arr[i];
      let j = i - 1;
      while (j >= 0 && arr[j] > key) {
        arr[j + 1] = arr[j];
        j--;
      }
      arr[j + 1] = key;
    }
    setArray(arr);
  };

  const mergeSort = (arr = [...array]): number[] => {
    if (arr.length <= 1) return arr;
    const mid = Math.floor(arr.length / 2);
    const left = mergeSort(arr.slice(0, mid));
    const right = mergeSort(arr.slice(mid));
    return merge(left, right);
  };

  const merge = (left: number[], right: number[]) => {
    const result: number[] = [];
    while (left.length && right.length) {
      if (left[0] < right[0]) result.push(left.shift()!);
      else result.push(right.shift()!);
    }
    return [...result, ...left, ...right];
  };

  const quickSort = (arr = [...array]): number[] => {
    if (arr.length <= 1) return arr;
    const pivot = arr[arr.length - 1];
    const left = arr.filter((el) => el < pivot);
    const right = arr.filter((el) => el > pivot);
    return [...quickSort(left), pivot, ...quickSort(right)];
  };

  const sortAlgorithms = {
    'Bubble Sort': bubbleSort,
    'Selection Sort': selectionSort,
    'Insertion Sort': insertionSort,
    'Merge Sort': () => setArray(mergeSort()),
    'Quick Sort': () => setArray(quickSort()),
  };

  return (
    <div className="sort-container">
      <h2>{algorithm} Visualization</h2>
      <button onClick={() => sortAlgorithms[algorithm]()}>Sort</button>
      <button onClick={resetArray}>Reset Array</button>
      <div className="array-container">
        {array.map((value, index) => (
          <div key={index} className="array-bar" style={{ height: `${value * 3}px` }}>
            {value}
          </div>
        ))}
      </div>
      <div className="description">{getDescription(algorithm)}</div>
    </div>
  );
};

// Descriptions for each algorithm
const getDescription = (algorithm: string) => {
  switch (algorithm) {
    case 'Bubble Sort':
      return (
        <>
          <p>
            Bubble sort, sometimes referred to as sinking sort, is a simple sorting algorithm that repeatedly steps
            through the list, compares each pair of adjacent items, and swaps them if they are in the wrong order.
          </p>
          <p><strong>Complexity:</strong> Best: O(n), Average: O(n²), Worst: O(n²)</p>
        </>
      );
    case 'Selection Sort':
      return (
        <>
          <p>
            Selection sort is an in-place comparison sort with O(n²) time complexity. It performs worse than insertion
            sort but has advantages where auxiliary memory is limited.
          </p>
          <p><strong>Complexity:</strong> Best: O(n²), Average: O(n²), Worst: O(n²)</p>
        </>
      );
    case 'Insertion Sort':
      return (
        <>
          <p>
            Insertion sort builds the final sorted array one item at a time and performs better than more complex
            algorithms on small lists.
          </p>
          <p><strong>Complexity:</strong> Best: O(n), Average: O(n²), Worst: O(n²)</p>
        </>
      );
    case 'Merge Sort':
      return (
        <>
          <p>
            Merge sort is a divide-and-conquer algorithm that splits the list into smaller sub-lists and merges them back
            together in sorted order.
          </p>
          <p><strong>Complexity:</strong> O(n log n) for all cases.</p>
        </>
      );
    case 'Quick Sort':
      return (
        <>
          <p>
            Quick sort uses a pivot element to partition the list into smaller sub-lists and recursively sorts them.
          </p>
          <p><strong>Complexity:</strong> Best: O(n log n), Worst: O(n²)</p>
        </>
      );
    default:
      return null;
  }
};

export default SortVisualization;
