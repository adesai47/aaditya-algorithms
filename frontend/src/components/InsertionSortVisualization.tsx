import React, { useState, useEffect, useCallback } from 'react';
import { insertionSort } from '../algorithms/insertionsort';

interface InsertionSortStep {
  array: number[];
  currentIndex: number;
  shiftedIndex: number | null;
}

const useInsertionSortVisualization = (initialArray: number[]) => {
  const [steps, setSteps] = useState<InsertionSortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500); // milliseconds

  useEffect(() => {
    setSteps(insertionSort(initialArray));
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
      intervalId = setInterval(nextStep, 1100 - speed);
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
  isCurrent: boolean;
  isShifted: boolean;
}> = ({ num, isCurrent, isShifted }) => {
  return (
    <div
      style={{
        width: '30px',
        height: `${num * 3}px`,
        backgroundColor: isCurrent ? 'orange' : isShifted ? 'lightblue' : 'gray',
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
  currentIndex: number;
  shiftedIndex: number | null;
}> = ({ numbers, currentIndex, shiftedIndex }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {numbers.map((num, index) => (
        <ArrayElement
          key={index}
          num={num}
          isCurrent={index === currentIndex}
          isShifted={index === shiftedIndex}
        />
      ))}
    </div>
  );
};

const InsertionSortVisualization: React.FC = () => {
  const initialArray = [23, 1, 10, 5, 2];
  const { currentStep, steps, nextStep, prevStep, isPlaying, togglePlay, speed, changeSpeed, reset } =
    useInsertionSortVisualization(initialArray);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Insertion Sort Visualization</h1>
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
          currentIndex={steps[currentStep].currentIndex}
          shiftedIndex={steps[currentStep].shiftedIndex}
        />
      )}
    </div>
  );
};

export default InsertionSortVisualization;
