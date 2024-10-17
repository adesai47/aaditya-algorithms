export function depthFirstSearch(tree: any, startNode: number): { node: number; visited: number[] }[] {
    const steps = [];
    const visited = new Set<number>();
  
    const dfsRecursive = (node: any) => {
      if (!node || visited.has(node.value)) {
        return;
      }
  
      // Mark the current node as visited
      visited.add(node.value);
      steps.push({ node: node.value, visited: [...visited] });
  
      // Traverse left subtree
      dfsRecursive(node.left);
  
      // Traverse right subtree
      dfsRecursive(node.right);
    };
  
    dfsRecursive(tree[startNode]);
  
    return steps;
  }
  