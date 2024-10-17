export function binarySearch(arr: number[], target: number): { array: number[]; low: number; mid: number; high: number; found: boolean }[] {
    const steps = [];
    const array = [...arr];
  
    let low = 0;
    let high = array.length - 1;
    let found = false;
  
    while (low <= high && !found) {
      const mid = Math.floor((low + high) / 2);
  
      // Capture the current step
      steps.push({ array: [...array], low, mid, high, found: array[mid] === target });
  
      if (array[mid] === target) {
        found = true;
        break;
      } else if (array[mid] < target) {
        low = mid + 1;
      } else {
        high = mid - 1;
      }
    }
  
    return steps;
  }
  