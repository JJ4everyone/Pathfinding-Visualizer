export function dfs(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  const unvisitedNodes = [];
  startNode.distance = 0;

  startNode.isVisited = true;
  visitedNodesInOrder.push(startNode);
  unvisitedNodes.unshift(startNode);
  while (!!unvisitedNodes.length) {
    //sortNodesByDistance(unvisitedNodes);
    const {row, col} = unvisitedNodes.shift();
    // If we encounter a wall, we skip it.

    //   updateUnvisitedNeighbors(grid[row][col], grid);
    const unvisitedNeighbors = getUnvisitedNeighbors(grid[row][col], grid);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = grid[row][col].distance + 1;
      neighbor.previousNode = grid[row][col];
      neighbor.isVisited = true;
      if (neighbor.isWall) continue;
      // If the closest node is at a distance of infinity,
      // we must be trapped and should therefore stop.
      if (neighbor.distance === Infinity) return visitedNodesInOrder;

      if (neighbor === finishNode) return visitedNodesInOrder;
      console.log(neighbor);
      visitedNodesInOrder.push(neighbor);
      unvisitedNodes.unshift(neighbor);
      console.log(unvisitedNodes);
    }
  }
}

//   function sortNodesByDistance(unvisitedNodes) {
//     unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
//   }

//   function updateUnvisitedNeighbors(node, grid) {
//     const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
//     for (const neighbor of unvisitedNeighbors) {
//       neighbor.distance = node.distance + 1;
//       neighbor.previousNode = node;
//     }
//   }

function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const {col, row} = node;
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

//   function getAllNodes(grid) {
//     const nodes = [];
//     for (const row of grid) {
//       for (const node of row) {
//         nodes.push(node);
//       }
//     }
//     return nodes;
//   }

// Backtracks from the finishNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrderdfs(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;
  while (currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
