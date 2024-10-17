import React, { useState, useEffect, useCallback } from 'react';
import { binarySearch } from '../algorithms/binarysearch';

interface BinarySearchStep {
  array: number[];
  low: number;
  mid: number;
  high: number;
  found: boolean;
}

const useBinarySearchVisualization = (initialArray: number[], target: number) => {
  const [steps, setSteps] = useState<BinarySearchStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500); // milliseconds

  useEffect(() => {
    setSteps(binarySearch(initialArray, target));
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

const ArrayElement: React.FC<{ num: number; isLow: boolean; isMid: boolean; isHigh: boolean; isFound: boolean }> = ({
  num,
  isLow,
  isMid,
  isHigh,
  isFound,
}) => {
  return (
    <div
      style={{
        width: '30px',
        height: '30px',
        backgroundColor: isFound ? 'green' : isMid ? 'orange' : isLow || isHigh ? 'lightblue' : 'gray',
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

const ArrayVisualization: React.FC<{ numbers: number[]; low: number; mid: number; high: number; found: boolean }> = ({
  numbers,
  low,
  mid,
  high,
  found,
}) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
      {numbers.map((num, index) => (
        <ArrayElement key={index} num={num} isLow={index === low} isMid={index === mid} isHigh={index === high} isFound={found && index === mid} />
      ))}
    </div>
  );
};

const BinarySearchVisualization: React.FC = () => {
  const initialArray = [-5, -2, 0, 1, 2, 4, 5, 6, 7, 10];
  const target = 7;
  const { currentStep, steps, nextStep, prevStep, isPlaying, togglePlay, speed, changeSpeed, reset } =
    useBinarySearchVisualization(initialArray, target);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1 style={{ fontSize: '32px', color: '#2c3e50' }}>Binary Search Visualization</h1>
      <div style={{ marginBottom: '20px' }}>
        <button
          onClick={prevStep}
          disabled={isPlaying}
          style={{ margin: '0 10px', padding: '10px', fontSize: '16px', borderRadius: '5px', background: '#3498db', color: '#fff', cursor: 'pointer' }}
        >
          Previous Step
        </button>
        <button
          onClick={nextStep}
          disabled={isPlaying}
          style={{ margin: '0 10px', padding: '10px', fontSize: '16px', borderRadius: '5px', background: '#3498db', color: '#fff', cursor: 'pointer' }}
        >
          Next Step
        </button>
        <button
          onClick={togglePlay}
          style={{
            margin: '0 10px',
            padding: '10px',
            fontSize: '16px',
            borderRadius: '5px',
            background: isPlaying ? '#e74c3c' : '#27ae60',
            color: '#fff',
            cursor: 'pointer',
          }}
        >
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button
          onClick={reset}
          style={{ margin: '0 10px', padding: '10px', fontSize: '16px', borderRadius: '5px', background: '#f39c12', color: '#fff', cursor: 'pointer' }}
        >
          Reset
        </button>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '16px', marginRight: '10px' }}>Speed:</label>
        <input
          type="range"
          min="100"
          max="1000"
          step="100"
          value={speed}
          onChange={(e) => changeSpeed(Number(e.target.value))}
          style={{ cursor: 'pointer' }}
        />
        <span style={{ fontSize: '16px', marginLeft: '10px' }}>{speed}ms</span>
      </div>
      {steps[currentStep] && (
        <ArrayVisualization
          numbers={steps[currentStep].array}
          low={steps[currentStep].low}
          mid={steps[currentStep].mid}
          high={steps[currentStep].high}
          found={steps[currentStep].found}
        />
      )}
    </div>
  );
};

export default BinarySearchVisualization;
