const HEIGHT = 20;
const WIDTH = 20;

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
    const start = new Cell(0, 0);
    const stack = [];

    for (let r of grid) {
        for (let c of r) {
            c.visited = true;
        }
    }

    stack.push(start);
    while (stack.length > 0) {
        const stackTop = stack.pop();
        const currCell = new Cell(stackTop.row, stackTop.col);
        currCell.visited = true;

        const shuffledArray = shuffle(currCell.getNeighbors());
        shuffledArray.forEach((neighbor) => {
            stack.push(neighbor);

            //breakWall(currCell, neighbor);
        });
    }

    return grid;
};

const breakWall = (neighbor, currCell, neighborCell) => {
    const styleWallBreak = "solid 1.6px #444444 !important";
    const { row, col } = currCell;

    // top wall?
    if (row - 1 === neighbor[0] && col === neighbor[1]) {
        currCell.style.borderTop = styleWallBreak;
        neighborCell.style.borderBottom = styleWallBreak;
    }

    // right wall?
    else if (row === neighbor[0] && col + 1 === neighbor[1]) {
        currCell.style.borderRight = styleWallBreak;
        neighborCell.style.borderLeft = styleWallBreak;
    }

    // bottom wall?
    else if (row + 1 === neighbor[0] && col === neighbor[1]) {
        currCell.style.borderBottom = styleWallBreak;
        neighborCell.style.borderTop = styleWallBreak;
    }

    // left wall?
    else {
        currCell.style.borderLeft = styleWallBreak;
        neighborCell.style.borderRight = styleWallBreak;
    }
};

// Fisher-Yates shuffle algorithm
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

    getNeighbors() {
        const top = [this.row - 1, this.col];
        const right = [this.row, this.col + 1];
        const bottom = [this.row + 1, this.col];
        const left = [this.row, this.col - 1];
        const neighbors = [];

        if (!top.visited && this.isValidNeighbor(top)) {
            neighbors.push(top);
        }

        if (!bottom.visited && this.isValidNeighbor(bottom)) {
            neighbors.push(bottom);
        }

        if (!right.visited && this.isValidNeighbor(right)) {
            neighbors.push(right);
        }

        if (!left.visited && this.isValidNeighbor(left)) {
            neighbors.push(left);
        }

        return neighbors;
    }

    isValidNeighbor(neighbor) {
        return (
            neighbor[0] < HEIGHT &&
            neighbor[0] >= 0 &&
            neighbor[1] < WIDTH &&
            neighbor[1] >= 0
        );
    }
}
