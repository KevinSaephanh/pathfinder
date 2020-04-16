const MAX_ROWS = 20;
const MAX_COLS = 20;

export const initGrid = () => {
    const grid = [];
    for (let row = 0; row < 20; row++) {
        grid[row] = []; // Current row
        for (let col = 0; col < 20; col++) {
            const cell = new Cell(row, col);
            grid[row].push(cell);
        }
    }
    return grid;
};

export const primsMaze = (grid) => {
    const row = Math.floor(Math.random() * 20);
    const col = Math.floor(Math.random() * 20);
    const rootCell = grid[row][col];
    rootCell.visited = true;
    const toVisit = [];

    toVisit.push(rootCell);
    while (toVisit.length > 0) {
        const currCell = toVisit.pop();
        console.log(currCell);

        const frontiers = currCell.getFrontiers(grid);
        if (frontiers.length > 0) {
            // Randomize frontiers then traverse them
            const shuffledFrontiers = shuffle(frontiers);
            shuffledFrontiers.forEach((frontier) => {
                frontier.visited = true;
                breakWall(currCell, frontier);
                toVisit.push(frontier);
            });
        }
    }

    return grid;
};

const breakWall = (currCell, frontier) => {
    const row1 = currCell.row;
    const col1 = currCell.col;
    const row2 = frontier.row;
    const col2 = frontier.col;

    // Break top wall
    if (row1 - 1 === row2 && col1 === col2) {
        currCell.walls[0] = false;
        frontier.walls[2] = false;
    }
    // Break bottom wall
    else if (row1 + 1 === row2 && col1 === col2) {
        currCell.walls[2] = false;
        frontier.walls[0] = false;
    }
    // Break right wall
    else if (row1 === row2 && col1 + 1 === col2) {
        currCell.walls[3] = false;
        frontier.walls[1] = false;
    }
    // Break left wall
    else {
        currCell.walls[1] = false;
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

class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.visited = false;
        this.walls = [true, true, true, true];
    }

    getFrontiers(grid) {
        let top = [this.row - 1, this.col];
        let bottom = [this.row + 1, this.col];
        let right = [this.row, this.col + 1];
        let left = [this.row, this.col - 1];
        const frontiers = [];

        if (this.isEligibleFrontier(top, grid)) {
            top = grid[top[0]][top[1]];
            frontiers.push(top);
        }

        if (this.isEligibleFrontier(bottom, grid)) {
            bottom = grid[bottom[0]][bottom[1]];
            frontiers.push(bottom);
        }

        if (this.isEligibleFrontier(right, grid)) {
            right = grid[right[0]][right[1]];
            frontiers.push(right);
        }

        if (this.isEligibleFrontier(left, grid)) {
            left = grid[left[0]][left[1]];
            frontiers.push(left);
        }

        return frontiers;
    }

    isEligibleFrontier(frontier, grid) {
        if (this.isValidFrontier(frontier)) {
            const x = frontier[0];
            const y = frontier[1];
            frontier = grid[x][y];
            return !frontier.visited;
        }
    }

    // This method checks a frontier to see if it lies within the bounds of the grid
    isValidFrontier(frontier) {
        return (
            frontier[0] < MAX_ROWS &&
            frontier[0] >= 0 &&
            frontier[1] < MAX_COLS &&
            frontier[1] >= 0
        );
    }
}
