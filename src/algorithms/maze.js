/* This method uses randomized prim's algorithm
 * to generate a completely random maze
 */
export const primsMaze = (grid) => {
    const row = Math.floor(Math.random() * 20);
    const col = Math.floor(Math.random() * 20);
    const rootCell = grid[row][col];
    const toVisit = [];

    rootCell.visited = true;
    toVisit.push(rootCell);
    while (toVisit.length > 0) {
        const currCell = toVisit.pop();

        const frontiers = getFrontiers(grid, currCell.row, currCell.col);
        if (frontiers.length > 0) {
            // Randomize frontiers then traverse them
            const shuffledFrontiers = shuffle(frontiers);
            shuffledFrontiers.forEach((frontier) => {
                frontier = grid[frontier[0]][frontier[1]];
                if (!frontier.visited) {
                    frontier.visited = true;
                    breakWall(currCell, frontier);
                    toVisit.push(frontier);
                }
            });
        }
    }

    return grid;
};

// This method takes two cells and determines which wall to break
// depending on the results of subtracting the first cell's row/col
// by the neighboring cell's row/col
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
    // Break left wall
    else if (x === 1) {
        currCell.walls[3] = false;
        frontier.walls[2] = false;
    }
    // Break right wall
    else if (x === -1) {
        currCell.walls[2] = false;
        frontier.walls[3] = false;
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

// This method returns all neighboring cells of the current cell
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
