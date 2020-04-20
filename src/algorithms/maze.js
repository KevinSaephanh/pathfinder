export const primsMaze = (grid) => {
    const row = Math.floor(Math.random() * 20);
    const col = Math.floor(Math.random() * 20);
    const rootCell = grid[row][col];
    const toVisit = [];
    const maze = [];

    toVisit.push(rootCell);
    while (toVisit.length > 0) {
        const currCell = toVisit.pop();
        currCell.visited = true;
        console.log(currCell);
        if (!maze.includes(currCell)) maze.push(currCell);

        const frontiers = getFrontiers(grid, row, col);
        if (frontiers.length > 0) {
            // Randomize frontiers then traverse them
            const shuffledFrontiers = shuffle(frontiers);
            shuffledFrontiers.forEach((frontier) => {
                frontier = grid[frontier[0]][frontier[1]];
                if (!frontier.visited) {
                    breakWall(currCell, frontier);
                    toVisit.push(frontier);
                }
            });
        }
        toVisit.forEach((n) => {
            console.log(n);
        });
    }

    return grid;
};

const breakWall = (currCell, frontier) => {
    const row1 = currCell.row;
    const col1 = currCell.col;
    const row2 = frontier.row;
    const col2 = frontier.col;
    const x = col1 - col2;
    const y = row1 - row2;

    // Break top wall
    if (y === 1) {
        currCell.walls[0] = false;
        frontier.walls[1] = false;
    }
    // Break bottom wall
    else if (y === -1) {
        currCell.walls[1] = false;
        frontier.walls[0] = false;
    }
    // Break right wall
    if (x === 1) {
        currCell.walls[2] = false;
        frontier.walls[3] = false;
    }
    // Break left wall
    else if (x === -1) {
        currCell.walls[3] = false;
        frontier.walls[2] = false;
    }
};

// Fisher-Yates shuffle algorithm
// Used to randomize order of frontiers
const shuffle = (arr) => {
    for (let i = arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
};

const getFrontiers = (grid, row, col) => {
    let top = [row - 1, col];
    let bottom = [row + 1, col];
    let right = [row, col + 1];
    let left = [row, col - 1];
    const frontiers = [];

    if (isValidFrontier(top, grid)) {
        frontiers.push(top);
    }

    if (isValidFrontier(bottom, grid)) {
        frontiers.push(bottom);
    }

    if (isValidFrontier(right, grid)) {
        frontiers.push(right);
    }

    if (isValidFrontier(left, grid)) {
        frontiers.push(left);
    }
    console.log(frontiers);

    return frontiers;
};

// This method checks a frontier to see if it lies within the bounds of the grid
const isValidFrontier = (frontier, grid) => {
    return (
        frontier[0] < grid.length &&
        frontier[0] >= 0 &&
        frontier[1] < grid.length &&
        frontier[1] >= 0
    );
};
