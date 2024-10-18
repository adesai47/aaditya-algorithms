export function mergeSort(
  arr: number[]
): { array: number[]; left: number[]; right: number[] }[] {
  // Explicitly define the type of 'steps'
  const steps: { array: number[]; left: number[]; right: number[] }[] = [];

  const merge = (left: number[], right: number[]) => {
    let result: number[] = [];
    let i = 0;
    let j = 0;

    while (i < left.length && j < right.length) {
      if (left[i] < right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
      }
    }

    // Add remaining elements
    result = result.concat(left.slice(i)).concat(right.slice(j));

    return result;
  };

  const divide = (array: number[]): number[] => {
    if (array.length <= 1) return array;

    const mid = Math.floor(array.length / 2);
    const left = array.slice(0, mid);
    const right = array.slice(mid);

    const sortedLeft = divide(left);
    const sortedRight = divide(right);

    const mergedArray = merge(sortedLeft, sortedRight);

    // Capture the merge step for visualization
    steps.push({ array: mergedArray, left: sortedLeft, right: sortedRight });
    return mergedArray;
  };

  divide(arr);

  return steps;
}
