const openSet = [];
const closedSet = [];

const aStar = (grid) => {
    const startNode = grid[0][0];
    const endNode = grid[24][24];

    startNode.traversed = true;
    openSet.push(startNode);
    while (openSet.length > 0) {
        const currNode = openSet.pop();

        // Current node has reached the end of the maze
        if (currNode === endNode) {
            return;
        }

        const optimalFrontier = currNode.getOptimalFrontier(grid);
        console.log(optimalFrontier);
    }
};
