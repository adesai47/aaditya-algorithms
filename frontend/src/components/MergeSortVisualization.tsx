import React, { useState, useEffect, useCallback } from 'react';
import { mergeSort } from '../algorithms/mergesort';

interface MergeSortStep {
  array: number[];
  left: number[];
  right: number[];
}

const useMergeSortVisualization = (initialArray: number[]) => {
  const [steps, setSteps] = useState<MergeSortStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500); // milliseconds

  useEffect(() => {
    setSteps(mergeSort(initialArray));
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

const MergeSortStepVisualization: React.FC<{
  left: number[];
  right: number[];
  merged: number[];
}> = ({ left, right, merged }) => {
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
        <strong>Merged:</strong>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          {merged.map((num, index) => (
            <ArrayElement key={index} num={num} />
          ))}
        </div>
      </div>
    </div>
  );
};

const MergeSortVisualization: React.FC = () => {
  const initialArray = [38, 27, 43, 10];
  const { currentStep, steps, nextStep, prevStep, isPlaying, togglePlay, speed, changeSpeed, reset } =
    useMergeSortVisualization(initialArray);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>Merge Sort Visualization</h1>
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
        <MergeSortStepVisualization
          left={steps[currentStep].left}
          right={steps[currentStep].right}
          merged={steps[currentStep].array}
        />
      )}
    </div>
  );
};

export default MergeSortVisualization;
