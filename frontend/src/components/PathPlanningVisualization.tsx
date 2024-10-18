import React, { useState, useEffect, useCallback } from 'react';

// Dijkstra's algorithm function
const dijkstra = (graph: { [key: number]: { node: number; weight: number }[] }, start: number) => {
  const distances: { [key: number]: number } = {};
  const steps: { currentNode: number; distances: { [key: number]: number }; visited: Set<number> }[] = [];
  const visited = new Set<number>();
  const pq: { node: number; distance: number }[] = [];

  // Initialize distances
  for (let node in graph) {
    distances[node] = Infinity;
  }
  distances[start] = 0;

  pq.push({ node: start, distance: 0 });

  while (pq.length > 0) {
    pq.sort((a, b) => a.distance - b.distance); // Sort to simulate priority queue
    const { node: currentNode } = pq.shift()!;

    if (visited.has(currentNode)) continue;
    visited.add(currentNode);

    // Record the step for visualization
    steps.push({
      currentNode,
      distances: { ...distances },
      visited: new Set(visited),
    });

    // Explore neighbors
    for (const neighbor of graph[currentNode]) {
      const distance = distances[currentNode] + neighbor.weight;

      if (distance < distances[neighbor.node]) {
        distances[neighbor.node] = distance;
        pq.push({ node: neighbor.node, distance });
      }
    }
  }

  return steps;
};

// Graph from the image
const graph = {
  0: [{ node: 1, weight: 4 }, { node: 7, weight: 8 }],
  1: [{ node: 0, weight: 4 }, { node: 2, weight: 8 }, { node: 7, weight: 11 }],
  2: [{ node: 1, weight: 8 }, { node: 8, weight: 2 }, { node: 5, weight: 4 }, { node: 3, weight: 7 }],
  3: [{ node: 2, weight: 7 }, { node: 4, weight: 9 }, { node: 5, weight: 14 }],
  4: [{ node: 3, weight: 9 }, { node: 5, weight: 10 }],
  5: [{ node: 2, weight: 4 }, { node: 3, weight: 14 }, { node: 4, weight: 10 }, { node: 6, weight: 2 }],
  6: [{ node: 5, weight: 2 }, { node: 7, weight: 1 }, { node: 8, weight: 6 }],
  7: [{ node: 0, weight: 8 }, { node: 1, weight: 11 }, { node: 6, weight: 1 }, { node: 8, weight: 7 }],
  8: [{ node: 2, weight: 2 }, { node: 6, weight: 6 }, { node: 7, weight: 7 }],
};

// Visualization component for Dijkstra's Algorithm
const PathPlanningVisualization: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<{ currentNode: number; distances: { [key: number]: number }; visited: Set<number> }[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [speed, setSpeed] = useState(500);

  useEffect(() => {
    const stepsResult = dijkstra(graph, 0); // Start from node 0
    setSteps(stepsResult);
  }, []);

  const nextStep = useCallback(() => {
    setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
  }, [steps.length]);

  const prevStep = useCallback(() => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  }, []);

  useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isPlaying && currentStep < steps.length - 1) {
      intervalId = setInterval(nextStep, 1100 - speed); // Speed control
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [isPlaying, currentStep, steps.length, speed, nextStep]);

  const togglePlay = () => setIsPlaying((prev) => !prev);

  const changeSpeed = (newSpeed: number) => setSpeed(newSpeed);

  const reset = () => {
    setCurrentStep(0);
    setIsPlaying(false);
  };

  const { distances, visited } = steps[currentStep] || { distances: {}, visited: new Set() };

  return (
    <div style={{ textAlign: 'center', marginTop: '20px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh' }}>
      <h1 style={{ fontSize: '32px', color: '#2c3e50' }}>Dijkstra's Algorithm Visualization</h1>
      <div style={{ marginBottom: '20px' }}>
        <button onClick={prevStep} disabled={isPlaying} style={{ margin: '0 10px', padding: '10px', fontSize: '16px', borderRadius: '5px', background: '#3498db', color: '#fff', cursor: 'pointer' }}>
          Previous Step
        </button>
        <button onClick={nextStep} disabled={isPlaying} style={{ margin: '0 10px', padding: '10px', fontSize: '16px', borderRadius: '5px', background: '#3498db', color: '#fff', cursor: 'pointer' }}>
          Next Step
        </button>
        <button onClick={togglePlay} style={{ margin: '0 10px', padding: '10px', fontSize: '16px', borderRadius: '5px', background: isPlaying ? '#e74c3c' : '#27ae60', color: '#fff', cursor: 'pointer' }}>
          {isPlaying ? 'Pause' : 'Play'}
        </button>
        <button onClick={reset} style={{ margin: '0 10px', padding: '10px', fontSize: '16px', borderRadius: '5px', background: '#f39c12', color: '#fff', cursor: 'pointer' }}>
          Reset
        </button>
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label style={{ fontSize: '16px', marginRight: '10px' }}>Speed:</label>
        <input type="range" min="100" max="1000" step="100" value={speed} onChange={(e) => changeSpeed(Number(e.target.value))} style={{ cursor: 'pointer' }} />
        <span style={{ fontSize: '16px', marginLeft: '10px' }}>{speed}ms</span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
        <h2>Distances from Node 0:</h2>
        <ul>
          {Object.entries(distances).map(([node, distance]) => (
            <li key={node} style={{ listStyle: 'none' }}>
              Node {node}: {distance === Infinity ? '∞' : distance}
            </li>
          ))}
        </ul>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h2>Visited Nodes:</h2>
        <p>{Array.from(visited).join(', ')}</p>
      </div>
    </div>
  );
};

export default PathPlanningVisualization;
