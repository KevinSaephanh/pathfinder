const openSet = [];
const closedSet = [];

export const aStar = (grid) => {
    const startNode = grid[0][0];
    const endNode = grid[24][24];

    openSet.push(startNode);
    while (openSet.length > 0) {
        const currNode = getLowestCostFNode();
        currNode.visited = true;
        closedSet.push(currNode);

        // Current node has reached the end of the maze
        if (currNode === endNode) {
            console.log("SOLVED!");
            break;
        }

        const frontiers = currNode.getFrontiers(grid);
        frontiers.forEach((frontier) => {
            frontier = grid[frontier[0]][frontier[1]];

            if (
                isValidPath(currNode, frontier) &&
                !closedSet.includes(frontier)
            ) {
                // Calculate g, h, and f for frontier
                frontier.g = currNode.g + calcCost(currNode, frontier);
                frontier.h = calcHeuristic(endNode, frontier);
                frontier.f = frontier.g + frontier.h;

                // If the frontier is already in the openSet and it's g value
                // is greater than the current node's value, then it will not be used
                if (openSet.includes(frontier) && frontier.g > currNode.g) {
                    return;
                }

                frontier.parent = currNode;
                openSet.push(frontier);
            }
        });
    }

    generatePath(grid, endNode);
    return closedSet;
};

const calcCost = (currNode, adjNode) => {
    const x = Math.abs(currNode.row - adjNode.row);
    const y = Math.abs(currNode.col - adjNode.col);

    return x + y;
};

// The estimated movement cost to move from the
// current node to the end node
// Manhattan distance used to calculate heuristic
const calcHeuristic = (endNode, adjNode) => {
    const x = Math.abs(endNode.row - adjNode.row);
    const y = Math.abs(endNode.col - adjNode.col);

    return x + y;
};

const getLowestCostFNode = () => {
    let index = 0;

    for (let i = 0; i < openSet.length; i++) {
        if (openSet[index].f > openSet[i].f) {
            index = i;
        }
    }

    return openSet.splice(index, 1)[0];
};

// This method checks if there is a wall between the current node
// and the adjacent node to determine if the path is traversable
const isValidPath = (currNode, adjNode) => {
    const row1 = currNode.row;
    const col1 = currNode.col;
    const row2 = adjNode.row;
    const col2 = adjNode.col;

    const x = col1 - col2;
    const y = row1 - row2;

    if (x === 0 && y === 1) {
        return currNode.walls[0] === false && adjNode.walls[1] === false;
    } else if (x === 0 && y === -1) {
        return currNode.walls[1] === false && adjNode.walls[0] === false;
    } else if (x === 1 && y === 0) {
        return currNode.walls[3] === false && adjNode.walls[2] === false;
    } else if (x === -1 && y === 0) {
        return currNode.walls[2] === false && adjNode.walls[3] === false;
    }
};

const generatePath = (grid, endNode) => {
    let current = endNode;
    current.isPathNode = true;

    while (current.parent !== null) {
        const { row, col } = current.parent;
        const parent = grid[row][col];

        // Set parent of current node as part of the optimal path
        parent.isPathNode = true;
        current = parent;
    }
};
