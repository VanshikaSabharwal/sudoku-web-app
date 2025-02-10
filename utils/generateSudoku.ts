import { solveSudoku } from "./sudokuSolver";

interface SudokuGrid extends Array<Array<number>> {}
export const generateSudoku = (): SudokuGrid => {
  const grid: SudokuGrid = Array.from({ length: 9 }, () => Array(9).fill(0));

  // Fill diagonal 3x3 boxes with random numbers
  const fillBox = (row: number, col: number) => {
    let numSet = new Set<number>();
    while (numSet.size < 9) {
      let num = Math.floor(Math.random() * 9) + 1;
      numSet.add(num);
    }
    let numArray = Array.from(numSet);
    let k = 0;
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        grid[row + i][col + j] = numArray[k++];
      }
    }
  };

  fillBox(0, 0);
  fillBox(3, 3);
  fillBox(6, 6);

  solveSudoku(grid); // Solve it first

  // Remove some elements randomly to create a puzzle
  let removeCount = 40; // Adjustable difficulty
  while (removeCount > 0) {
    let i = Math.floor(Math.random() * 9);
    let j = Math.floor(Math.random() * 9);
    if (grid[i][j] !== 0) {
      grid[i][j] = 0;
      removeCount--;
    }
  }

  return grid;
};
