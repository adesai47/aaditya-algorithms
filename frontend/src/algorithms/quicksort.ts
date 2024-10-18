export function quickSort(
  arr: number[]
): { array: number[]; pivotIndex: number; left: number[]; right: number[] }[] {
  // Explicitly define the type of 'steps'
  const steps: { array: number[]; pivotIndex: number; left: number[]; right: number[] }[] = [];

  const quickSortRecursive = (array: number[]): number[] => {
    if (array.length <= 1) {
      return array;
    }

    const pivot = array[array.length - 1];
    const left: number[] = [];
    const right: number[] = [];

    for (let i = 0; i < array.length - 1; i++) {
      if (array[i] < pivot) {
        left.push(array[i]);
      } else {
        right.push(array[i]);
      }
    }

    const sortedLeft = quickSortRecursive(left);
    const sortedRight = quickSortRecursive(right);

    const mergedArray = [...sortedLeft, pivot, ...sortedRight];

    // Capture the current state of the sorting
    steps.push({
      array: mergedArray,
      pivotIndex: sortedLeft.length,
      left: sortedLeft,
      right: sortedRight,
    });

    return mergedArray;
  };

  quickSortRecursive(arr);

  return steps;
}
