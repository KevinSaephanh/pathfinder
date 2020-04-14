const HEIGHT = 20;
const WIDTH = 20;
let grid = [];

export const initGrid = () => {
    grid = [];
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
    const row = Math.floor(Math.random() * 21);
    const col = Math.floor(Math.random() * 21);
    const rootCell = grid[row][col];
    const toVisit = [];

    toVisit.push(rootCell);
    while (toVisit.length > 0) {
        let currCell = toVisit.pop();
        currCell.visited = true;
        console.log(currCell);

        const shuffledArray = shuffle(currCell.getFrontiers());
        shuffledArray.forEach((frontier) => {
            frontier = grid[frontier[0]][frontier[1]];
            if (!frontier.visited) {
                breakWall(currCell, frontier);
                toVisit.push(frontier);
            }
        });
    }

    return grid;
};

const breakWall = (currCell, frontier) => {
    const x = currCell.row - frontier.row;
    const y = currCell.col - frontier.col;

    // Break right wall
    if (x === 1) {
        currCell.walls[3] = false;
        frontier.walls[1] = false;
    }

    // Break left wall
    else if (x === -1) {
        currCell.walls[1] = false;
        frontier.walls[3] = false;
    }

    // Break top wall
    if (y === 1) {
        currCell.walls[0] = false;
        frontier.walls[2] = false;
    }

    // Break bottom wall
    else if (y === -1) {
        currCell.walls[2] = false;
        frontier.walls[0] = false;
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

    getFrontiers() {
        const top = [this.row - 1, this.col];
        const right = [this.row, this.col + 1];
        const bottom = [this.row + 1, this.col];
        const left = [this.row, this.col - 1];
        const frontiers = [top, right, bottom, left];

        for (let i = frontiers.length - 1; i >= 0; i--) {
            if (!this.isValidFrontier(frontiers[i])) {
                frontiers.splice(i, 1);
            } else if (grid[frontiers[i][0]][frontiers[i][1]].visited) {
                frontiers.splice(i, 1);
            }
        }

        console.log(frontiers);
        return frontiers;
    }

    isValidFrontier(frontier) {
        return (
            frontier[0] < HEIGHT &&
            frontier[0] >= 0 &&
            frontier[1] < WIDTH &&
            frontier[1] >= 0
        );
    }
}
