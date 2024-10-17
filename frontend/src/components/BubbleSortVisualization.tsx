import React, { useState, useEffect, useCallback } from 'react';
import { bubbleSort } from '../algorithms/bubblesort';

interface BubbleSortStep {
  array: number[];
  swapped: boolean;
  comparedIndices: [number, number];
}

const useBubbleSortVisualization = (initialArray: number[]) => {
  const [steps, setSteps] = useState<BubbleSortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500); // milliseconds

  useEffect(() => {
    setSteps(bubbleSort(initialArray));
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
  isCompared: boolean;
  isSwapped: boolean;
}> = ({ num, isCompared, isSwapped }) => {
  return (
    <div
      style={{
        width: '30px',
        height: `${num * 3}px`,
        backgroundColor: isCompared ? (isSwapped ? 'green' : 'red') : 'blue',
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
  comparedIndices: [number, number];
  swapped: boolean;
}> = ({ numbers, comparedIndices, swapped }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {numbers.map((num, index) => (
        <ArrayElement
          key={index}
          num={num}
          isCompared={comparedIndices.includes(index)}
          isSwapped={swapped && comparedIndices.includes(index)}
        />
      ))}
    </div>
  );
};

const BubbleSortVisualization: React.FC = () => {
  const initialArray = [64, 34, 25, 12, 22, 11, 90];
  const { currentStep, steps, nextStep, prevStep, isPlaying, togglePlay, speed, changeSpeed, reset } =
    useBubbleSortVisualization(initialArray);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Bubble Sort Visualization</h1>
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
          comparedIndices={steps[currentStep].comparedIndices}
          numbers={steps[currentStep].array}
          swapped={steps[currentStep].swapped}
        />
      )}
    </div>
  );
};

export default BubbleSortVisualization;
