import React, { useState, useEffect, useCallback } from 'react';
import { linearSearch } from '../algorithms/linearsearch';

interface LinearSearchStep {
  array: number[];
  currentIndex: number;
  found: boolean;
}

const useLinearSearchVisualization = (initialArray: number[], target: number) => {
  const [steps, setSteps] = useState<LinearSearchStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500); // milliseconds

  useEffect(() => {
    setSteps(linearSearch(initialArray, target));
  }, [initialArray, target]);

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

const ArrayElement: React.FC<{ num: number; isCurrent: boolean; isFound: boolean }> = ({ num, isCurrent, isFound }) => {
  return (
    <div
      style={{
        width: '30px',
        height: '30px',
        backgroundColor: isFound ? 'green' : isCurrent ? 'orange' : 'gray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '5px',
        color: 'white',
        fontWeight: 'bold',
        borderRadius: '4px',
      }}
    >
      {num}
    </div>
  );
};

const ArrayVisualization: React.FC<{ numbers: number[]; currentIndex: number; found: boolean }> = ({
  numbers,
  currentIndex,
  found,
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {numbers.map((num, index) => (
        <ArrayElement key={index} num={num} isCurrent={index === currentIndex} isFound={found && index === currentIndex} />
      ))}
    </div>
  );
};

const LinearSearchVisualization: React.FC = () => {
  const initialArray = [10, 15, 30, 70, 80, 60, 20, 90, 40];
  const target = 20;
  const { currentStep, steps, nextStep, prevStep, isPlaying, togglePlay, speed, changeSpeed, reset } =
    useLinearSearchVisualization(initialArray, target);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Linear Search Visualization</h1>
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
        <ArrayVisualization numbers={steps[currentStep].array} currentIndex={steps[currentStep].currentIndex} found={steps[currentStep].found} />
      )}
    </div>
  );
};

export default LinearSearchVisualization;
