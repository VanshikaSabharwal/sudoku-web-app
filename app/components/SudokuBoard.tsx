"use client";

import React, { useState } from "react";
import { SudokuGrid, solveSudoku } from "../../utils/sudokuSolver";
import { generateSudoku } from "@/utils/generateSudoku";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SudokuBoard: React.FC = () => {
  const [originalGrid, setOriginalGrid] = useState<SudokuGrid>(
    generateSudoku()
  );
  const [grid, setGrid] = useState<SudokuGrid>(
    JSON.parse(JSON.stringify(originalGrid))
  );
  const [solvedGrid, setSolvedGrid] = useState<SudokuGrid>(
    JSON.parse(JSON.stringify(originalGrid))
  );
  const [lives, setLives] = useState<number>(5);
  const [solved, setSolved] = useState<boolean>(false);
  const [hintCell, setHintCell] = useState<{ row: number; col: number } | null>(
    null
  );
  const [gameOver, setGameOver] = useState<boolean>(false);

  // Generate a new puzzle
  const handleNewGame = () => {
    const newPuzzle = generateSudoku();
    const solution = JSON.parse(JSON.stringify(newPuzzle));
    solveSudoku(solution);

    setOriginalGrid(newPuzzle);
    setGrid(JSON.parse(JSON.stringify(newPuzzle)));
    setSolvedGrid(solution);
    setLives(5);
    setSolved(false);
    setHintCell(null);
    setGameOver(false);

    toast.info("🆕 New Sudoku Puzzle Generated!", { autoClose: 2000 });
  };

  // Solve the Sudoku and reveal all answers
  const handleSolve = () => {
    setGrid(JSON.parse(JSON.stringify(solvedGrid)));
    setSolved(true);
    setHintCell(null);
    toast.success("✅ Answer Revealed!", { autoClose: 2000 });
  };

  // Handle user input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    row: number,
    col: number
  ) => {
    const value = e.target.value;
    const num = value === "" ? 0 : parseInt(value, 10);

    if (!isNaN(num) && num >= 1 && num <= 9) {
      const newGrid = grid.map((r, i) =>
        r.map((c, j) => (i === row && j === col ? num : c))
      );
      setGrid(newGrid);
      setHintCell(null);
    }
  };

  // Check if the user's grid is correct
  const handleSubmit = () => {
    if (JSON.stringify(grid) === JSON.stringify(solvedGrid)) {
      toast.success("🎉 Correct! You solved the puzzle!", { autoClose: 3000 });
    } else {
      toast.error("❌ Incorrect! Keep trying.", { autoClose: 3000 });
    }
  };

  // Provide a hint with a green border
  const handleHint = () => {
    if (lives > 0) {
      const emptyCells: { row: number; col: number }[] = [];

      grid.forEach((row, i) => {
        row.forEach((num, j) => {
          if (num === 0) emptyCells.push({ row: i, col: j });
        });
      });

      if (emptyCells.length > 0) {
        const { row, col } =
          emptyCells[Math.floor(Math.random() * emptyCells.length)];
        const newGrid = grid.map((r, i) =>
          r.map((c, j) => (i === row && j === col ? solvedGrid[row][col] : c))
        );

        setGrid(newGrid);
        setHintCell({ row, col }); // Store the hint cell for styling
        setLives(lives - 1);

        toast.warn("💔 1 Life Taken!", { autoClose: 2000 });

        if (lives - 1 === 0) {
          setTimeout(() => setGameOver(true), 500);
        }
      } else {
        toast.info("No empty cells left!", { autoClose: 2000 });
      }
    } else {
      toast.error("❌ No lives left!", { autoClose: 2000 });
    }
  };

  return (
    <div className="flex flex-col items-center p-2 sm:p-4">
      <h1 className="text-lg sm:text-2xl text-black font-bold mb-2 sm:mb-4">
        Sudoku Solver
      </h1>

      {/* Display Lives */}
      <div className="flex mb-3 sm:mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`text-lg sm:text-xl mx-0.5 sm:mx-1 ${
              i < lives ? "text-red-500" : "text-gray-300"
            }`}
          >
            {i < lives ? "❤️" : "💔"}
          </span>
        ))}
      </div>

      {/* Sudoku Grid */}
      <div className="w-full max-w-[90vw] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px] aspect-square grid grid-cols-9 gap-0.5 sm:gap-1 border-2 border-black p-1 sm:p-2">
        {grid.map((row, i) =>
          row.map((num, j) => (
            <input
              key={`${i}-${j}`}
              type="text"
              inputMode="numeric"
              pattern="[1-9]"
              maxLength={1}
              value={num === 0 ? "" : num}
              onChange={(e) => handleChange(e, i, j)}
              className="w-full aspect-square text-center border border-gray-500 text-xs sm:text-sm md:text-lg font-bold"
              style={{
                backgroundColor:
                  originalGrid[i][j] !== 0 ? "lightgray" : "white",
                color: solved && originalGrid[i][j] === 0 ? "red" : "black",
                border:
                  hintCell && hintCell.row === i && hintCell.col === j
                    ? "2px solid green"
                    : "1px solid gray",
              }}
              disabled={originalGrid[i][j] !== 0}
            />
          ))
        )}
      </div>

      {/* Buttons */}
      <div className="mt-3 sm:mt-4 flex flex-wrap gap-1 sm:gap-2 justify-center">
        <button
          onClick={handleHint}
          className="px-3 py-1 sm:px-4 sm:py-2 bg-orange-500 text-white text-xs sm:text-sm rounded-md"
        >
          Hint (-1 ❤️)
        </button>
        <button
          onClick={handleSubmit}
          className="px-3 py-1 sm:px-4 sm:py-2 bg-purple-500 text-white text-xs sm:text-sm rounded-md"
        >
          Submit
        </button>
        <button
          onClick={handleSolve}
          className="px-3 py-1 sm:px-4 sm:py-2 bg-blue-500 text-white text-xs sm:text-sm rounded-md"
        >
          Solve
        </button>
        <button
          onClick={handleNewGame}
          className="px-3 py-1 sm:px-4 sm:py-2 bg-green-500 text-white text-xs sm:text-sm rounded-md"
        >
          New Game
        </button>
      </div>

      {/* Game Over Modal */}
      {gameOver && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-xl font-bold text-red-600">Game Over!</h2>
            <p className="text-gray-700">You lost all your lives.</p>
            <button
              onClick={handleNewGame}
              className="mt-3 px-4 py-2 bg-blue-500 text-white rounded-md"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

      <ToastContainer position="top-right" />
    </div>
  );
};

export default SudokuBoard;
