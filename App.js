import React, { useState } from 'react';
import './App.css'; // Importing CSS file for styling

const BOARD_SIZE = 3;

const App = () => {
  const [board, setBoard] = useState(Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)));
  const [xIsNext, setXIsNext] = useState(true);
  const [winner, setWinner] = useState(null);

  const handleClick = (row, col) => {
    if (winner || board[row][col]) return; // if there's already a winner or the square is filled

    const newBoard = board.map(row => [...row]); // create a copy of the board state
    newBoard[row][col] = xIsNext ? 'X' : 'O'; // set the current player's mark

    setBoard(newBoard);
    setXIsNext(!xIsNext);

    // Check for winner
    const newWinner = calculateWinner(newBoard);
    if (newWinner) {
      setWinner(newWinner);
    }
  };

  const handleReset = () => {
    setBoard(Array(BOARD_SIZE).fill(Array(BOARD_SIZE).fill(null)));
    setWinner(null);
    setXIsNext(true);
  };

  const renderSquare = (row, col) => {
    return (
      <button className="square" onClick={() => handleClick(row, col)} disabled={winner || board[row][col]}>
        {board[row][col]}
      </button>
    );
  };

  const renderBoard = () => {
    return board.map((row, rowIndex) => (
      <div key={rowIndex} className="board-row">
        {row.map((square, colIndex) => (
          <span key={colIndex}>{renderSquare(rowIndex, colIndex)}</span>
        ))}
      </div>
    ));
  };

  const renderStatus = () => {
    if (winner) {
      return `Winner: ${winner}`;
    } else {
      return `Next Player: ${xIsNext ? 'X' : 'O'}`;
    }
  };

  return (
    <div className="game">
      <div className="header">
        <h1>Tic Tac Toe</h1>
      </div>
      <div className="game-board">
        {renderBoard()}
      </div>
      <div className="game-info">
        <div>{renderStatus()}</div>
        <button className="reset-button" onClick={handleReset}>Reset</button>
      </div>
      <div className="user-inputs">
        <div className="input-circle x">X</div>
        <div className="input-circle o">O</div>
      </div>
    </div>
  );
};

// Function to calculate the winner
const calculateWinner = (board) => {
  const lines = [
    [[0, 0], [0, 1], [0, 2]],
    [[1, 0], [1, 1], [1, 2]],
    [[2, 0], [2, 1], [2, 2]],
    [[0, 0], [1, 0], [2, 0]],
    [[0, 1], [1, 1], [2, 1]],
    [[0, 2], [1, 2], [2, 2]],
    [[0, 0], [1, 1], [2, 2]],
    [[0, 2], [1, 1], [2, 0]]
  ];

  for (let i = 0; i < lines.length; i++) {
    const [[a, b], [c, d], [e, f]] = lines[i];
    if (board[a][b] && board[a][b] === board[c][d] && board[a][b] === board[e][f]) {
      return board[a][b];
    }
  }

  return null;
};

export default App;
