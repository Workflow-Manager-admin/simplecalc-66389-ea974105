import React, { useState, useEffect, useRef } from "react";
import "./App.css";

/**
 * SnakeGame Component
 *
 * A minimalist, responsive Snake game using keyboard (arrow) controls.
 * - Classic gameplay: Snake moves, eats food to grow, self-collision ends the game.
 * - Score is tracked as food eaten.
 * - Palette and style are consistent with the rest of the app.
 * - The board resizes based on device (mobile/desktop) but uses a fixed grid size for logic.
 *
 * No external dependencies except React.
 *
 * Props: none
 */

// Helper functions
const DIRS = {
  ArrowUp: [0, -1],
  ArrowDown: [0, 1],
  ArrowLeft: [-1, 0],
  ArrowRight: [1, 0],
};

// Board size, fixed grid for logic, but UI is responsive.
const BOARD_SIZE = 15;

const INIT_SNAKE = [
  [7, 7],
  [7, 8],
  [7, 9],
];

function getRandomFood(snake) {
  while (true) {
    const x = Math.floor(Math.random() * BOARD_SIZE);
    const y = Math.floor(Math.random() * BOARD_SIZE);
    const onSnake = snake.some(([sx, sy]) => sx === x && sy === y);
    if (!onSnake) return [x, y];
  }
}

// PUBLIC_INTERFACE
function SnakeGame() {
  /**
   * This is a minimalist, palette-styled implementation of the classic snake game.
   * - Controls: Arrow keys
   * - Responsive board, fixed logical size (15x15)
   * - Snake moves every "tick"
   * - Eats food (apple) to grow, score +1 per food
   * - Self-collision/game over & restart button
   */

  const [snake, setSnake] = useState([...INIT_SNAKE]); // Array of [x, y]
  const [dir, setDir] = useState([0, -1]); // [dx, dy]
  const [food, setFood] = useState(getRandomFood(INIT_SNAKE));
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [speed, setSpeed] = useState(120); // ms per "step"
  const moveRef = useRef(dir);
  const timerRef = useRef();
  const boardRef = useRef();

  // For preventing double reverse in a tick
  const lastMoveDir = useRef(dir);

  // PUBLIC_INTERFACE
  function resetGame() {
    setSnake([...INIT_SNAKE]);
    setDir([0, -1]);
    moveRef.current = [0, -1];
    setFood(getRandomFood(INIT_SNAKE));
    setScore(0);
    setGameOver(false);
    setSpeed(120);
    lastMoveDir.current = [0, -1];
    // Focus for keyboard on restart:
    setTimeout(() => boardRef.current && boardRef.current.focus(), 60);
  }

  // Handle moving the snake on interval
  useEffect(() => {
    if (gameOver) return;
    timerRef.current = setInterval(() => {
      setSnake((prevSnake) => {
        const nextHead = [
          (prevSnake[0][0] + moveRef.current[0] + BOARD_SIZE) % BOARD_SIZE,
          (prevSnake[0][1] + moveRef.current[1] + BOARD_SIZE) % BOARD_SIZE,
        ];
        // Collision: with self
        if (
          prevSnake.some(([sx, sy]) => sx === nextHead[0] && sy === nextHead[1])
        ) {
          setGameOver(true);
          clearInterval(timerRef.current);
          return prevSnake;
        }
        // Eat food
        let eat = nextHead[0] === food[0] && nextHead[1] === food[1];
        let nextSnake;
        if (eat) {
          setScore((s) => s + 1);
          setFood(getRandomFood([nextHead, ...prevSnake]));
          nextSnake = [nextHead, ...prevSnake];
          // speed up at score milestones
          if ((score + 1) % 6 === 0 && speed > 50) setSpeed((sp) => sp - 10);
        } else {
          nextSnake = [nextHead, ...prevSnake.slice(0, -1)];
        }
        lastMoveDir.current = moveRef.current;
        return nextSnake;
      });
    }, speed);

    return () => clearInterval(timerRef.current);
    // eslint-disable-next-line
  }, [food, gameOver, speed]);

  // Keyboard controls
  useEffect(() => {
    function onKeyDown(e) {
      if (gameOver) return;
      if (!DIRS[e.key]) return;
      const [dx, dy] = DIRS[e.key];
      // Prevent direct reverse
      if (
        lastMoveDir.current &&
        dx === -lastMoveDir.current[0] &&
        dy === -lastMoveDir.current[1]
      ) {
        return;
      }
      setDir([dx, dy]);
      moveRef.current = [dx, dy];
    }

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
    // eslint-disable-next-line
  }, [gameOver]);

  // Focus handling for board (optional, improves keyboard on mobile)
  useEffect(() => {
    boardRef.current && boardRef.current.focus();
  }, []);

  // Draw grid: .cell { width:..., background } - use palette colors.
  const colors = {
    bg: "#fff",
    grid: "#f8fafc",
    border: "#e9ecef",
    snake: "#1976d2",
    snakeHead: "#fbc02d",
    food: "#43a047",
    text: "#1976d2",
    over: "#d32f2f",
  };

  // Responsive: cell size in px based on container/viewport
  const cellSize =
    typeof window !== "undefined"
      ? Math.floor(Math.min(window.innerWidth, 400) / BOARD_SIZE)
      : 22;
  const gridPx = BOARD_SIZE * cellSize;

  // Keyboard on-screen controls (for accessibility, not required to play)
  function handleBtn(dirKey) {
    if (gameOver) return;
    const [dx, dy] = DIRS[dirKey];
    // Prevent direct reverse
    if (
      lastMoveDir.current &&
      dx === -lastMoveDir.current[0] &&
      dy === -lastMoveDir.current[1]
    )
      return;
    setDir([dx, dy]);
    moveRef.current = [dx, dy];
  }

  return (
    <div
      style={{
        background: colors.bg,
        borderRadius: "18px",
        boxShadow: "0 4px 16px rgba(25, 118, 210, .08)",
        padding: "2rem 1.2rem 1.6rem 1.2rem",
        margin: "1.7rem auto",
        maxWidth: gridPx + 20,
        width: "98vw",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        minHeight: gridPx + 120,
      }}
    >
      <div
        style={{
          color: colors.text,
          fontWeight: 800,
          fontSize: "1.23rem",
          letterSpacing: ".5px",
          marginBottom: ".75rem",
        }}
      >
        Snake Game
      </div>
      {/* Score */}
      <div
        style={{
          fontSize: "1.13rem",
          color: colors.text,
          fontWeight: 600,
          marginBottom: ".7em",
        }}
      >
        Score: {score}
      </div>
      <div
        tabIndex={0}
        ref={boardRef}
        style={{
          outline: gameOver ? `2.5px solid ${colors.over}` : "none",
          border: `2px solid ${colors.border}`,
          borderRadius: "11px",
          background: colors.grid,
          width: gridPx,
          height: gridPx,
          display: "grid",
          gridTemplateRows: `repeat(${BOARD_SIZE}, 1fr)`,
          gridTemplateColumns: `repeat(${BOARD_SIZE}, 1fr)`,
          boxSizing: "content-box",
          marginBottom: "1.1rem",
          userSelect: "none",
          touchAction: "none",
          position: "relative",
        }}
        aria-label="Snake game board"
      >
        {Array.from({ length: BOARD_SIZE * BOARD_SIZE }).map((_, idx) => {
          const x = idx % BOARD_SIZE;
          const y = Math.floor(idx / BOARD_SIZE);
          const isFood = food[0] === x && food[1] === y;
          const snakeIdx = snake.findIndex(([sx, sy]) => sx === x && sy === y);
          let bg = "transparent";
          let border = undefined;
          if (snakeIdx === 0) {
            bg = colors.snakeHead;
            border = `1.6px solid ${colors.snake}`;
          } else if (snakeIdx > 0) {
            bg = colors.snake;
          } else if (isFood) {
            bg = colors.food;
          }
          return (
            <div
              key={idx}
              style={{
                width: cellSize,
                height: cellSize,
                background: bg,
                border:
                  border ||
                  `1px solid ${
                    (x + y) % 2 === 0 ? "#e9ecef" : "#e5e7eb"
                  }`, // subgrid
                boxSizing: "border-box",
                borderRadius:
                  snakeIdx === 0
                    ? "4.5px"
                    : isFood
                    ? "100%"
                    : "2.5px",
                transition: "background 0.12s",
                zIndex: isFood ? 1 : 0,
              }}
            />
          );
        })}
        {gameOver && (
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              width: "100%",
              height: "100%",
              background: "#fff9",
              zIndex: 99,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1.45em",
              fontWeight: 700,
              color: colors.over,
              textShadow: "0 2px 10px #fff,0 1px 16px #fff, 0 1px 1px #d32f2f55",
              borderRadius: "11px",
              animation: "fadein .25s"
            }}
            aria-label="Game over"
          >
            <span>Game Over</span>
            <span style={{ fontSize: ".85em", color: "#222", marginTop: "0.35em" }}>
              Final Score: {score}
            </span>
            <button
              className="calc-btn calc-clear"
              style={{
                background: "#ececec",
                color: "#1976d2",
                border: "1.2px solid #e5e7eb",
                borderRadius: "10px",
                fontWeight: 700,
                fontSize: "1.02em",
                padding: ".6rem 1.3rem",
                marginTop: "1.1em"
              }}
              onClick={resetGame}
              aria-label="Restart Snake"
            >
              Restart
            </button>
          </div>
        )}
      </div>
      {/* Optional: Keyboard-like controls for accessibility (not used by most, since keyboard is primary) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "0.55rem",
          marginTop: "0.4em",
          marginBottom: "0.1em",
        }}
        aria-label="On-screen controls"
      >
        <button
          style={{ background: "#ececec", color: "#1976d2", borderRadius: 8, border: "1.1px solid #e5e7eb", minWidth: 38, minHeight: 32, fontWeight: 600, fontSize: "1.1em" }}
          onClick={() => handleBtn("ArrowUp")}
          tabIndex={-1}
          aria-label="Up"
        >
          ↑
        </button>
        <button
          style={{ background: "#ececec", color: "#1976d2", borderRadius: 8, border: "1.1px solid #e5e7eb", minWidth: 38, minHeight: 32, fontWeight: 600, fontSize: "1.1em" }}
          onClick={() => handleBtn("ArrowLeft")}
          tabIndex={-1}
          aria-label="Left"
        >
          ←
        </button>
        <button
          style={{ background: "#ececec", color: "#1976d2", borderRadius: 8, border: "1.1px solid #e5e7eb", minWidth: 38, minHeight: 32, fontWeight: 600, fontSize: "1.1em" }}
          onClick={() => handleBtn("ArrowDown")}
          tabIndex={-1}
          aria-label="Down"
        >
          ↓
        </button>
        <button
          style={{ background: "#ececec", color: "#1976d2", borderRadius: 8, border: "1.1px solid #e5e7eb", minWidth: 38, minHeight: 32, fontWeight: 600, fontSize: "1.1em" }}
          onClick={() => handleBtn("ArrowRight")}
          tabIndex={-1}
          aria-label="Right"
        >
          →
        </button>
      </div>
      {/* Instructions */}
      <div
        style={{
          color: "#888",
          fontSize: ".98em",
          marginTop: "0.2em",
          marginBottom: "-.35em",
          textAlign: "center"
        }}
      >
        <span>Use arrow keys or tap buttons to move. Eat green food. Don&apos;t bite yourself!</span>
      </div>
    </div>
  );
}

export default SnakeGame;
