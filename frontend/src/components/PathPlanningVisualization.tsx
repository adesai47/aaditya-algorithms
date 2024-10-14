import React, { useState, useEffect } from 'react';
import './PathPlanningVisualization.css'; // Optional CSS for grid styles

const PathPlanningVisualization: React.FC = () => {
  const [graph, setGraph] = useState<number[][]>([]);
  const [distances, setDistances] = useState<{ [key: string]: number }>({});
  const [visited, setVisited] = useState<{ [key: string]: boolean }>({});
  const [path, setPath] = useState<string[]>([]);

  const nodes = ['A', 'B', 'C', 'D', 'E', 'F'];
  const edges = [
    ['A', 'B', 2],
    ['A', 'C', 5],
    ['B', 'C', 1],
    ['B', 'D', 4],
    ['C', 'D', 8],
    ['C', 'E', 3],
    ['D', 'F', 2],
    ['E', 'F', 6],
  ];

  // Dijkstra's Algorithm Implementation
  const dijkstra = (start: string) => {
    const distances: { [key: string]: number } = {};
    const visited: { [key: string]: boolean } = {};
    const prev: { [key: string]: string | null } = {};

    nodes.forEach((node) => {
      distances[node] = Infinity;
      visited[node] = false;
      prev[node] = null;
    });

    distances[start] = 0;

    const unvisitedNodes = [...nodes];

    while (unvisitedNodes.length > 0) {
      unvisitedNodes.sort((a, b) => distances[a] - distances[b]);
      const currentNode = unvisitedNodes.shift()!;

      if (distances[currentNode] === Infinity) break;
      visited[currentNode] = true;

      edges
        .filter(([from]) => from === currentNode)
        .forEach(([_, neighbor, weight]) => {
          const newDist = distances[currentNode] + weight;
          if (newDist < distances[neighbor]) {
            distances[neighbor] = newDist;
            prev[neighbor] = currentNode;
          }
        });
    }

    setDistances(distances);
    setVisited(visited);
    setPath(reconstructPath(prev, 'F'));
  };

  const reconstructPath = (prev: { [key: string]: string | null }, target: string) => {
    const path = [];
    let current: string | null = target;
    while (current) {
      path.unshift(current);
      current = prev[current];
    }
    return path;
  };

  useEffect(() => {
    dijkstra('A');
  }, []);

  return (
    <div className="path-container">
      <h2>Dijkstra's Algorithm Visualization</h2>
      <p>
        Dijkstra's algorithm is an algorithm for finding the shortest paths between nodes in a graph, which may
        represent, for example, road networks.
      </p>
      <p>
        The algorithm exists in many variants; Dijkstra's original variant found the shortest path between two nodes, but
        a more common variant fixes a single node as the "source" node and finds shortest paths from the source to all
        other nodes in the graph, producing a shortest-path tree.
      </p>
      <p>
        Dijkstra's algorithm picks the unvisited vertex with the lowest distance, calculates the distance through it to
        each unvisited neighbor, and updates the neighbor's distance if smaller. It marks a vertex as visited when done
        processing its neighbors.
      </p>

      <div className="graph">
        {nodes.map((node) => (
          <div
            key={node}
            className={`node ${visited[node] ? 'visited' : ''} ${path.includes(node) ? 'path' : ''}`}
          >
            {node}: {distances[node] === Infinity ? '∞' : distances[node]}
          </div>
        ))}
      </div>
    </div>
  );
};

export default PathPlanningVisualization;
