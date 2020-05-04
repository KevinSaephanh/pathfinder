import Cell from "./cell";

export const initGrid = () => {
    const newGrid = [];
    for (let row = 0; row < 25; row++) {
        newGrid[row] = []; // Current row
        for (let col = 0; col < 25; col++) {
            const cell = new Cell(row, col);
            newGrid[row].push(cell);
        }
    }
    return newGrid;
};

// This method uses randomized prim's algorithm
// to generate a completely random maze
export const primsMaze = (grid) => {
    const row = Math.floor(Math.random() * 20);
    const col = Math.floor(Math.random() * 20);
    const rootCell = grid[row][col];
    const toVisit = [];
    const visited = [];

    toVisit.push(rootCell);
    while (toVisit.length > 0) {
        const currCell = toVisit.pop();
        visited.push(currCell);

        const frontiers = currCell.getFrontiers(grid);
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
                    breakWall(currCell, frontier);
                    toVisit.push(frontier);
                }
            });
        }
    }

    return visited;
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
    if (x === 0 && y === 1) {
        currCell.walls[0] = false;
        frontier.walls[1] = false;
    }
    // Break bottom wall
    else if (x === 0 && y === -1) {
        currCell.walls[1] = false;
        frontier.walls[0] = false;
    }
    // Break left wall
    if (x === 1 && y === 0) {
        currCell.walls[3] = false;
        frontier.walls[2] = false;
    }
    // Break right wall
    else if (x === -1 && y === 0) {
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
