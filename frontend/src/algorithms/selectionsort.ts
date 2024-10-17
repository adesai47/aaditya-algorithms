export function selectionSort(arr: number[]): { array: number[]; minIndex: number; comparedIndex: number }[] {
    const steps = [];
    const array = [...arr];
  
    for (let i = 0; i < array.length - 1; i++) {
      let minIndex = i;
      for (let j = i + 1; j < array.length; j++) {
        steps.push({ array: [...array], minIndex, comparedIndex: j });
  
        // Update the minIndex if the element at j is smaller
        if (array[j] < array[minIndex]) {
          minIndex = j;
        }
      }
  
      // Swap the found minimum element with the first unsorted element
      if (minIndex !== i) {
        [array[i], array[minIndex]] = [array[minIndex], array[i]];
      }
  
      steps.push({ array: [...array], minIndex: i, comparedIndex: i });
    }
  
    return steps;
  }
  