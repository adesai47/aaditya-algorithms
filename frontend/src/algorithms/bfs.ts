export function breadthFirstSearch(tree: any, startNode: number): { node: number; visited: number[] }[] {
    const steps = [];
    const visited = new Set<number>();
    const queue = [tree[startNode]];
  
    while (queue.length > 0) {
      const currentNode = queue.shift();
      
      if (!currentNode || visited.has(currentNode.value)) {
        continue;
      }
  
      // Mark the node as visited
      visited.add(currentNode.value);
      steps.push({ node: currentNode.value, visited: [...visited] });
  
      // Add left and right children to the queue
      if (currentNode.left) {
        queue.push(currentNode.left);
      }
      if (currentNode.right) {
        queue.push(currentNode.right);
      }
    }
  
    return steps;
  }
  