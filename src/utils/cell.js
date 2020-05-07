export default class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;
        this.visited = false;
        this.walls = [true, true, true, true];
        this.parent = null;
        this.isPathNode = false;
        this.g = 0;
        this.h = 0;
        this.f = 0;
    }

    // This method returns all neighboring cells of the current cell
    getFrontiers = (grid) => {
        let top = [this.row - 1, this.col];
        let bottom = [this.row + 1, this.col];
        let right = [this.row, this.col + 1];
        let left = [this.row, this.col - 1];
        const frontiers = [];

        if (this.isValidFrontier(top, grid)) {
            frontiers.push(grid[top[0]][top[1]]);
        }

        if (this.isValidFrontier(bottom, grid)) {
            frontiers.push(grid[bottom[0]][bottom[1]]);
        }

        if (this.isValidFrontier(right, grid)) {
            frontiers.push(grid[right[0]][right[1]]);
        }

        if (this.isValidFrontier(left, grid)) {
            frontiers.push(grid[left[0]][left[1]]);
        }

        return frontiers;
    };

    // This method checks a frontier to see if it lies within the bounds of the grid
    isValidFrontier = (frontier, grid) => {
        return (
            frontier[0] < grid.length &&
            frontier[0] >= 0 &&
            frontier[1] < grid.length &&
            frontier[1] >= 0
        );
    };
}
