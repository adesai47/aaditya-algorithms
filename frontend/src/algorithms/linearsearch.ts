export function linearSearch(arr: number[], target: number): { array: number[]; currentIndex: number; found: boolean }[] {
    const steps = [];
    const array = [...arr];
  
    for (let i = 0; i < array.length; i++) {
      // Capture the current step
      steps.push({ array: [...array], currentIndex: i, found: array[i] === target });
  
      if (array[i] === target) {
        break; // Stop once the target is found
      }
    }
  
    return steps;
  }
  