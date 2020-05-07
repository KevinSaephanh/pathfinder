// Choose a random cell and add it to the visited list
// 2. Choose another random cell (Don’t add to visited list). This is the current cell
// 3. Choose a random cell that is adjacent to the current cell (Don’t add to visited list). This is your new current cell.
// Save the direction that you traveled on the previous cell
// If the current cell is not in the visited cells list
// Go to 3
// Else
// Starting at the cell selected in step 2, follow the arrows and remove the edges that are crossed.
// Add all cells that are passed into the visited list
// If all cells have not been visited
// Go to 2

import * as MazeUtils from "../mazeUtils";

const wilsonsAlgorithm = (grid) => {
    const randCell =
        grid[MazeUtils.getRandomIndex()][MazeUtils.getRandomIndex()];
    const visited = [];

    visited.push(randCell);

    let currCell = grid[MazeUtils.getRandomIndex()][MazeUtils.getRandomIndex()];
    while (currCell) {
        // Get random frontier
        const randFrontiers = MazeUtils.shuffle(currCell.getFrontiers());
        let newCurrCell = currCell;
        randFrontiers.forEach((frontier) => {
            // Mark direction traveled for the current cell to that frontier
            newCurrCell.direction = getDirection(newCurrCell, frontier);

            if (visited.includes(frontier)) {
                MazeUtils.breakWall(newCurrCell, frontier);
                newCurrCell = frontier;
            }
        });
    }
};

const getDirection = (currCell, frontier) => {
    const x = currCell.row - frontier.row;
    const y = currCell.col - frontier.col;

    if (x === 0 && y === 1) {
        return "UP";
    } else if (x === 0 && y === -1) {
        return "DOWN";
    }
    if (x === 1 && y === 0) {
        return "LEFT";
    } else if (x === -1 && y === 0) {
        return "RIGHT";
    }
};
