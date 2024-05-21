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
  const [xTurns, setXTurns] = useState(0);
  const [oTurns, setOTurns] = useState(0);

  const handleClick = (i) => {
    const newSquares = squares.slice();
    if (calculateWinner(newSquares) || newSquares[i]) {
      return;
    }
    newSquares[i] = xIsNext ? 'X' : 'O';
    setSquares(newSquares);
    setXIsNext(!xIsNext);
    xIsNext ? setXTurns(xTurns + 1) : setOTurns(oTurns + 1);
  };

  const handleReset = () => {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
    setXTurns(0);
    setOTurns(0);
  };

  const winner = calculateWinner(squares);
  const status = winner ? `Winner: ${winner}` : `Next player: ${xIsNext ? 'X' : 'O'}`;

  return (
    <div className="game container mt-5 d-flex flex-column align-items-center">
        <header className="text-center mb-4 ">
            <h1>Tic-Tac-Toe Game</h1>
            <p className="lead">Enjoy a classic game of Tic-Tac-Toe!</p>
        </header>
      <div className="game-board d-flex justify-content-center">
        <Board squares={squares} onClick={handleClick} />
      </div>
      <div className="game-info mt-5 col-6">
        <div className="alert alert-info">{status}</div>
        <div className="alert alert-secondary">X's Turns: {xTurns}</div>
        <div className="alert alert-secondary">O's Turns: {oTurns}</div>
        <button className="btn btn-primary mt-2" onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};


