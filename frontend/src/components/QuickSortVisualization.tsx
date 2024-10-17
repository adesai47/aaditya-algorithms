import React, { useState, useEffect, useCallback } from 'react';
import { quickSort } from '../algorithms/quicksort';

interface QuickSortStep {
  array: number[];
  pivotIndex: number;
  left: number[];
  right: number[];
}

const useQuickSortVisualization = (initialArray: number[]) => {
  const [steps, setSteps] = useState<QuickSortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500); // milliseconds

  useEffect(() => {
    setSteps(quickSort(initialArray));
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

const ArrayElement: React.FC<{ num: number }> = ({ num }) => {
  return (
    <div
      style={{
        width: '30px',
        height: `${num * 3}px`,
        backgroundColor: 'gray',
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

const QuickSortStepVisualization: React.FC<{
  left: number[];
  right: number[];
  pivot: number;
}> = ({ left, right, pivot }) => {
  return (
    <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex' }}>
        <div style={{ marginRight: '20px' }}>
          <strong>Left:</strong>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {left.map((num, index) => (
              <ArrayElement key={index} num={num} />
            ))}
          </div>
        </div>
        <div>
          <strong>Right:</strong>
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            {right.map((num, index) => (
              <ArrayElement key={index} num={num} />
            ))}
          </div>
        </div>
      </div>
      <div style={{ marginTop: '20px' }}>
        <strong>Pivot:</strong>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <ArrayElement num={pivot} />
        </div>
      </div>
    </div>
  );
};

const QuickSortVisualization: React.FC = () => {
  const initialArray = [8, 4, 3, 1, 6, 7, 11, 9, 10, 5];
  const { currentStep, steps, nextStep, prevStep, isPlaying, togglePlay, speed, changeSpeed, reset } =
    useQuickSortVisualization(initialArray);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Quick Sort Visualization</h1>
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
        <QuickSortStepVisualization
          left={steps[currentStep].left}
          right={steps[currentStep].right}
          pivot={steps[currentStep].array[steps[currentStep].pivotIndex]}
        />
      )}
    </div>
  );
};

export default QuickSortVisualization;
