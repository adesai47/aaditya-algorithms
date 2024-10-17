export function bubbleSort(arr: number[]): { array: number[]; swapped: boolean; comparedIndices: [number, number] }[] {
    const steps = [];
    const array = [...arr];
    let swapped = true;
    let n = array.length;
  
    for (let i = 0; i < n - 1 && swapped; i++) {
      swapped = false;
      for (let j = 0; j < n - i - 1; j++) {
        const comparedIndices: [number, number] = [j, j + 1];
        if (array[j] > array[j + 1]) {
          [array[j], array[j + 1]] = [array[j + 1], array[j]];
          swapped = true;
        }
        steps.push({ array: [...array], swapped, comparedIndices });
      }
    }
    return steps;
  }
  