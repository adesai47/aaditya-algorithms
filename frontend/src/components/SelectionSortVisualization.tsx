import React, { useState, useEffect, useCallback } from 'react';
import { selectionSort } from '../algorithms/selectionsort';

interface SelectionSortStep {
  array: number[];
  minIndex: number;
  comparedIndex: number;
}

const useSelectionSortVisualization = (initialArray: number[]) => {
  const [steps, setSteps] = useState<SelectionSortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500); // milliseconds

  useEffect(() => {
    setSteps(selectionSort(initialArray));
  }, [initialArray]);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isPlaying && currentStep < steps.length - 1) {
      intervalId = setInterval(nextStep, speed);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, currentStep, steps.length, speed, nextStep]);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  const changeSpeed = (newSpeed: number) => setSpeed(newSpeed);

  const reset = useCallback(() => {
    setCurrentStep(0);
    setIsPlaying(false);
  }, []);

  return { currentStep, steps, nextStep, prevStep, isPlaying, togglePlay, speed, changeSpeed, reset };
};

const ArrayElement: React.FC<{
  num: number;
  isMin: boolean;
  isCompared: boolean;
}> = ({ num, isMin, isCompared }) => {
  return (
    <div
      style={{
        width: '30px',
        height: `${num * 3}px`,
        backgroundColor: isMin ? 'green' : isCompared ? 'red' : 'blue',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '5px',
        color: 'white',
        fontWeight: 'bold',
      }}
    >
      {num}
    </div>
  );
};

const ArrayVisualization: React.FC<{
  numbers: number[];
  minIndex: number;
  comparedIndex: number;
}> = ({ numbers, minIndex, comparedIndex }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {numbers.map((num, index) => (
        <ArrayElement
          key={index}
          num={num}
          isMin={index === minIndex}
          isCompared={index === comparedIndex}
        />
      ))}
    </div>
  );
};

const SelectionSortVisualization: React.FC = () => {
  const initialArray = [7, 5, 4, 2];
  const { currentStep, steps, nextStep, prevStep, isPlaying, togglePlay, speed, changeSpeed, reset } =
    useSelectionSortVisualization(initialArray);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Selection Sort Visualization</h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={prevStep} disabled={isPlaying} style={{ margin: '0 10px' }}>
          Previous Step
        </button>
        <button onClick={nextStep} disabled={isPlaying} style={{ margin: '0 10px' }}>
          Next Step
        </button>
        <button onClick={togglePlay} style={{ margin: '0 10px' }}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={reset} style={{ margin: '0 10px' }}>
          Reset
        </button>
      </div>
      <div>
        <label>Speed:</label>
        <input
          type="range"
          min="100"
          max="1000"
          step="100"
          value={speed}
          onChange={(e) => changeSpeed(Number(e.target.value))}
        />
        <span>{speed}ms</span>
      </div>
      {steps[currentStep] && (
        <ArrayVisualization
          numbers={steps[currentStep].array}
          minIndex={steps[currentStep].minIndex}
          comparedIndex={steps[currentStep].comparedIndex}
        />
      )}
    </div>
  );
};

export default SelectionSortVisualization;
