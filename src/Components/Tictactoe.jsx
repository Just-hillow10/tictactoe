import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function Square({ value, onClick }) {
  return (
    <button className="btn btn-light btn-outline-primary square" onClick={onClick}>
      {value}
    </button>
  );
}

function Board({ squares, onClick }) {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onClick={() => onClick(i)} />;
  };

  return (
    <div>
      <div className="board-row d-flex">
        {renderSquare(0)}
        {renderSquare(1)}
        {renderSquare(2)}
      </div>
      <div className="board-row d-flex">
        {renderSquare(3)}
        {renderSquare(4)}
        {renderSquare(5)}
      </div>
      <div className="board-row d-flex">
        {renderSquare(6)}
        {renderSquare(7)}
        {renderSquare(8)}
      </div>
    </div>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export const TicTacToe = () => {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [xMoves, setXMoves] = useState([]);
  const [oMoves, setOMoves] = useState([]);
  const [isClassicMode, setIsClassicMode] = useState(true);

    const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }

    if (xIsNext) {
      if (!isClassicMode && xMoves.length >= 3) {
        const oldestMove = xMoves.shift();
        newSquares[oldestMove] = null;
      }
      newSquares[i] = 'X';
      setXMoves([...xMoves, i]);
    } else {
      if (!isClassicMode && oMoves.length >= 3) {
        const oldestMove = oMoves.shift();
        newSquares[oldestMove] = null;
      }
      newSquares[i] = 'O';
      setOMoves([...oMoves, i]);
    }

    setSquares(newSquares);
    setXIsNext(!xIsNext);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setXMoves([]);
    setOMoves([]);
  };

  const toggleMode = () => {
    setIsClassicMode(!isClassicMode);
    handleReset(); // Reset the game when switching modes
  };

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game container mt-5 d-flex flex-column align-items-center">
      <header className="text-center mb-4">
        <h1>Tic-Tac-Toe Game</h1>
        <p className="lead">Enjoy a classic game of Tic-Tac-Toe!</p>
      </header>
      <div className="game-board d-md-flex justify-content-center">
        <div className="d-flex justify-content-center m-3 ">
            <Board squares={squares} onClick={handleClick} />
        </div>
        <div className="d-flex flex-md-column justify-content-center gap-2 ">
            <div className="alert alert-secondary">X's Moves: {xMoves.length}</div>
            <div className="alert alert-secondary">O's Moves: {oMoves.length}</div>
        </div>

      </div>
      <div className="game-info mt-3">
        <div className="alert alert-info">{status}</div>

        <button className="btn btn-danger mt-2" onClick={handleReset}>Reset</button>
        <button className="btn btn-secondary mt-2 mx-2" onClick={toggleMode}>
          {isClassicMode ? 'Limited Moves' : 'Classic'} Mode
        </button>
      </div>
    </div>
  );
};
