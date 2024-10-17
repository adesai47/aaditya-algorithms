export function insertionSort(arr: number[]): { array: number[]; currentIndex: number; shiftedIndex: number | null }[] {
    const steps = [];
    const array = [...arr];
  
    for (let i = 1; i < array.length; i++) {
      let currentValue = array[i];
      let j = i - 1;
  
      // Capture the array before we start shifting
      steps.push({ array: [...array], currentIndex: i, shiftedIndex: null });
  
      while (j >= 0 && array[j] > currentValue) {
        array[j + 1] = array[j];
        steps.push({ array: [...array], currentIndex: i, shiftedIndex: j });
        j--;
      }
      array[j + 1] = currentValue;
      
      // Capture the array after insertion
      steps.push({ array: [...array], currentIndex: i, shiftedIndex: null });
    }
  
    return steps;
  }
  