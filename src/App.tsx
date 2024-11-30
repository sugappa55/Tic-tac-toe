import { useMemo, useState } from "react";
import "./App.css";

const initState = new Array(9).fill(null);
const Players = {
  X: "X",
  O: "O",
};

const patterns = [
  // Horizontal
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  // Vertical
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  // Diagonal
  [0, 4, 8],
  [2, 4, 6],
];

function App() {
  const [board, setBoard] = useState(initState);
  const [currentPlayer, setCurrentPlayer] = useState(Players.X);

  const updateBoard = (i: number) => {
    setBoard((p) => {
      const copy = [...p];
      copy[i] = currentPlayer;
      setCurrentPlayer(currentPlayer === Players.X ? Players.O : Players.X);
      return copy;
    });
  };

  const winner = useMemo(() => {
    return patterns.some(([a, b, c]) => {
      return (
        board[a] &&
        board[b] &&
        board[c] &&
        board[a] == board[b] &&
        board[b] == board[c]
      );
    });
  }, [board]);

  const isDrawn = !winner && !board.includes(null);

  return (
    <div>
      <div className="container">
        {board.map((el, i) => (
          <button
            key={i}
            onClick={() => updateBoard(i)}
            disabled={winner || isDrawn}
            className="board-item"
          >
            {el}
          </button>
        ))}
      </div>
      {winner && <h1>Winner - {currentPlayer === Players.O ? "X" : "O"}</h1>}
      {isDrawn && <h1>Match drawn</h1>}
    </div>
  );
}

export default App;
