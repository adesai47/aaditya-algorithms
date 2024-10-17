import React, { useState, useEffect, useCallback } from 'react';
import { depthFirstSearch } from '../algorithms/dfs';
import { tree } from '../data/tree';

interface DFSStep {
  node: number;
  visited: number[];
}

const useDFSVisualization = (startNode: number) => {
  const [steps, setSteps] = useState<DFSStep[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500); // milliseconds

  useEffect(() => {
    setSteps(depthFirstSearch(tree, startNode));
  }, [startNode]);

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

const TreeNode: React.FC<{ num: number; visited: boolean }> = ({ num, visited }) => {
  return (
    <div
      style={{
        width: '40px',
        height: '40px',
        backgroundColor: visited ? 'orange' : 'gray',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        margin: '5px',
        color: 'white',
        borderRadius: '50%',
        fontWeight: 'bold',
      }}
    >
      {num}
    </div>
  );
};

const TreeVisualization: React.FC<{ visited: number[] }> = ({ visited }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TreeNode num={0} visited={visited.includes(0)} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TreeNode num={1} visited={visited.includes(1)} />
        <TreeNode num={2} visited={visited.includes(2)} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <TreeNode num={4} visited={visited.includes(4)} />
        <TreeNode num={5} visited={visited.includes(5)} />
        <TreeNode num={6} visited={visited.includes(6)} />
        <TreeNode num={7} visited={visited.includes(7)} />
      </div>
    </div>
  );
};

const DFSVisualization: React.FC = () => {
  const startNode = 0;
  const { currentStep, steps, nextStep, prevStep, isPlaying, togglePlay, speed, changeSpeed, reset } =
    useDFSVisualization(startNode);

  return (
    <div style={{ textAlign: 'center', marginTop: '20px' }}>
      <h1>DFS Visualization</h1>
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
      {steps[currentStep] && <TreeVisualization visited={steps[currentStep].visited} />}
    </div>
  );
};

export default DFSVisualization;
