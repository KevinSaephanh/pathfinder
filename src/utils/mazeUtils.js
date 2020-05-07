import Node from "./node";

export const initGrid = () => {
    const newGrid = [];
    for (let row = 0; row < 25; row++) {
        newGrid[row] = []; // Current row
        for (let col = 0; col < 25; col++) {
            const node = new Node(row, col);
            newGrid[row].push(node);
        }
    }
    return newGrid;
};

// This method uses randomized prim's algorithm
// to generate a completely random maze
export const primsMaze = (grid) => {
    const row = Math.floor(Math.random() * 20);
    const col = Math.floor(Math.random() * 20);
    const rootNode = grid[row][col];
    const toVisit = [];
    const visited = [];

    toVisit.push(rootNode);
    while (toVisit.length > 0) {
        const currNode = toVisit.pop();
        visited.push(currNode);

        const frontiers = currNode.getFrontiers(grid);
        if (frontiers.length > 0) {
            // Randomize frontiers then traverse them
            const shuffledFrontiers = shuffle(frontiers);
            shuffledFrontiers.forEach((frontier) => {
                frontier = grid[frontier[0]][frontier[1]];

                // Check if frontier is in neither sets
                if (
                    !visited.includes(frontier) &&
                    !toVisit.includes(frontier)
                ) {
                    breakWall(currNode, frontier);
                    toVisit.push(frontier);
                }
            });
        }
    }

    return visited;
};

// This method takes two nodes and determines which wall to break
// depending on the results of subtracting the first node's row/col
// by the neighboring node's row/col
export const breakWall = (currNode, frontier) => {
    const row1 = currNode.row;
    const col1 = currNode.col;
    const row2 = frontier.row;
    const col2 = frontier.col;
    const x = col1 - col2;
    const y = row1 - row2;

    // Break top wall
    if (x === 0 && y === 1) {
        currNode.walls[0] = false;
        frontier.walls[1] = false;
    }
    // Break bottom wall
    else if (x === 0 && y === -1) {
        currNode.walls[1] = false;
        frontier.walls[0] = false;
    }
    // Break left wall
    if (x === 1 && y === 0) {
        currNode.walls[3] = false;
        frontier.walls[2] = false;
    }
    // Break right wall
    else if (x === -1 && y === 0) {
        currNode.walls[2] = false;
        frontier.walls[3] = false;
    }
};

// Fisher-Yates shuffle algorithm
// Used to randomize order of frontiers
export const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

// This method returns a random number from 0 to 24
// Used to retrieve a random node
export const getRandomIndex = () => {
    return Math.floor(Math.random() * 24);
};

export const getDirection = (currNode, frontier) => {
    const x = currNode.row - frontier.row;
    const y = currNode.col - frontier.col;

    if (x === 0 && y === 1) {
        return "UP";
    } else if (x === 0 && y === -1) {
        return "DOWN";
    } else if (x === 1 && y === 0) {
        return "LEFT";
    } else if (x === -1 && y === 0) {
        return "RIGHT";
    }
};

// This method generates the optimal path to traverse the maze
// by backtracking (starting from the end node) using the parent
export const generatePath = (endNode) => {
    let current = endNode;
    current.isPathNode = true;

    while (current.parent) {
        current.parent.isPathNode = true;
        current = current.parent;
    }
};

// This method checks if there is a wall between the current node
// and the adjacent node to determine if the path is traversable
export const isValidPath = (currNode, adjNode) => {
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

export const calcCost = (currNode, adjNode) => {
    const x = Math.abs(currNode.row - adjNode.row);
    const y = Math.abs(currNode.col - adjNode.col);

    return x + y;
};
