export type SudokuGrid = number[][];

// Function to check if it's safe to place a number
const isSafe = (
  grid: SudokuGrid,
  row: number,
  col: number,
  num: number
): boolean => {
  for (let x = 0; x < 9; x++) {
    if (grid[row][x] === num || grid[x][col] === num) return false;
  }

  const startRow = row - (row % 3);
  const startCol = col - (col % 3);

  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i + startRow][j + startCol] === num) return false;
    }
  }
  return true;
};

// Function to solve Sudoku using backtracking
export const solveSudoku = (grid: SudokuGrid): boolean => {
  for (let row = 0; row < 9; row++) {
    for (let col = 0; col < 9; col++) {
      if (grid[row][col] === 0) {
        // Empty cell found
        for (let num = 1; num <= 9; num++) {
          if (isSafe(grid, row, col, num)) {
            grid[row][col] = num;
            if (solveSudoku(grid)) return true; // Recursively solve
            grid[row][col] = 0; // Backtrack
          }
        }
        return false; // No solution found
      }
    }
  }
  return true; // Sudoku is solved
};
