import { useState, useEffect, useRef } from 'react';
import './SnakeGame.css';

const GRID_SIZE = 20;
const BOARD_WIDTH = 400;
const BOARD_HEIGHT = 400;

// Add your obstacles here (as many as you like)
const OBSTACLES = [
  { x: 5, y: 5 },
  { x: 6, y: 5 },
  { x: 7, y: 5 },
  { x: 10, y: 15 },
  { x: 11, y: 15 },
  { x: 12, y: 15 }
];

export default function SnakeGame() {
  const canvasRef = useRef(null);
  const [snake, setSnake] = useState([{ x: 10, y: 10 }]);
  const [food, setFood] = useState({ x: 15, y: 15 });
  const [direction, setDirection] = useState({ x: 0, y: 1 });
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [paused, setPaused] = useState(false);
  const [speed, setSpeed] = useState(120); // ms per tick

  // Generate new food, avoiding snake and obstacles
  const generateFood = () => {
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * (BOARD_WIDTH / GRID_SIZE)),
        y: Math.floor(Math.random() * (BOARD_HEIGHT / GRID_SIZE))
      };
    } while (
      snake.some(seg => seg.x === newFood.x && seg.y === newFood.y) ||
      OBSTACLES.some(obs => obs.x === newFood.x && obs.y === newFood.y)
    );
    setFood(newFood);
  };

  // Handle key presses for direction and pause
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === ' ') {
        setPaused(prev => !prev);
        return;
      }
      if (paused) return;
      const { x, y } = direction;
      switch (e.key) {
        case 'ArrowUp':    if (y !== 1)  setDirection({ x: 0, y: -1 }); break;
        case 'ArrowDown':  if (y !== -1) setDirection({ x: 0, y: 1 });  break;
        case 'ArrowLeft':  if (x !== 1)  setDirection({ x: -1, y: 0 }); break;
        case 'ArrowRight': if (x !== -1) setDirection({ x: 1, y: 0 });  break;
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [direction, paused]);

  // Game loop
  useEffect(() => {
    if (gameOver || paused) return;

    const gameLoop = setInterval(() => {
      setSnake((prevSnake) => {
        const head = { ...prevSnake[0] };
        head.x += direction.x;
        head.y += direction.y;

        // Wall collision
        if (head.x < 0 || head.x >= BOARD_WIDTH / GRID_SIZE || head.y < 0 || head.y >= BOARD_HEIGHT / GRID_SIZE) {
          setGameOver(true);
          return prevSnake;
        }

        // Obstacle collision
        if (OBSTACLES.some(obs => obs.x === head.x && obs.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        // Self collision
        if (prevSnake.some(seg => seg.x === head.x && seg.y === head.y)) {
          setGameOver(true);
          return prevSnake;
        }

        const newSnake = [head, ...prevSnake];

        // Food collision
        if (head.x === food.x && head.y === food.y) {
          setScore(prev => prev + 10);
          // Speed up every 50 points
          if (score > 0 && score % 50 === 0) {
            setSpeed(prev => Math.max(prev - 10, 60));
          }
          generateFood();
        } else {
          newSnake.pop();
        }

        return newSnake;
      });
    }, speed);

    return () => clearInterval(gameLoop);
  }, [direction, food, gameOver, paused, score, speed]);

  // Draw the game
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    // Clear canvas
    ctx.clearRect(0, 0, BOARD_WIDTH, BOARD_HEIGHT);

    // Draw obstacles (fiery-red barriers)
    ctx.fillStyle = 'red';
    OBSTACLES.forEach(obs => {
      ctx.fillRect(obs.x * GRID_SIZE, obs.y * GRID_SIZE, GRID_SIZE, GRID_SIZE);
    });

    // Draw snake
    ctx.fillStyle = '#2F4F4F';
    snake.forEach((seg, i) => {
      const size = i === 0 ? GRID_SIZE : GRID_SIZE - 2;
      ctx.fillRect(seg.x * GRID_SIZE, seg.y * GRID_SIZE, size, size);
    });

    // Draw food
    ctx.fillStyle = '#FFD700';
    ctx.beginPath();
    ctx.arc(
      food.x * GRID_SIZE + GRID_SIZE / 2,
      food.y * GRID_SIZE + GRID_SIZE / 2,
      GRID_SIZE / 2 - 1,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }, [snake, food]);

  // Reset game
  const resetGame = () => {
    setSnake([{ x: 10, y: 10 }]);
    setDirection({ x: 0, y: 1 });
    setGameOver(false);
    setScore(0);
    setSpeed(120);
    generateFood();
    setPaused(false);
  };

  return (
    <div className="snake-game-container fade-in">
      <div className="game-header">
        <h2>Snake Game — Arthur's Challenge</h2>
        <div className="game-stats">
          <span>Score: {score}</span>
          <span>Speed: {Math.round(1000 / speed)} fps</span>
          <button onClick={() => setPaused(prev => !prev)}>
            {paused ? '▶️ Play' : '⏸️ Pause'}
          </button>
        </div>
      </div>

      <canvas
        ref={canvasRef}
        width={BOARD_WIDTH}
        height={BOARD_HEIGHT}
        className="game-canvas"
      />

      {(gameOver || paused) && (
        <div className="game-overlay">
          {gameOver && <h3>Game Over!</h3>}
          {paused && <h3>Paused</h3>}
          <button onClick={resetGame}>Restart</button>
        </div>
      )}

      <p>Use arrow keys to move. Space to pause.</p>
    </div>
  );
}
