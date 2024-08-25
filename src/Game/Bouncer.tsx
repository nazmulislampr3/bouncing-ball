import { useEffect } from "react";
import { useGameContext } from "../context/GameContext";

const Bouncer = () => {
  const { bouncer, gridUnit, bouncerUnit, move, gameOver, paused } =
    useGameContext()!;

  const width = `${bouncerUnit * (100 / gridUnit[0])}%`;
  const height = `${100 / gridUnit[1]}%`;
  const left = `${(100 / gridUnit[0]) * bouncer}%`;

  const handleKeypress = (e: any) => {
    switch (e.key) {
      case "ArrowLeft":
        move("left");
        break;
      case "ArrowRight":
        move("right");
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (!gameOver && !paused) {
      window.addEventListener("keydown", handleKeypress);
      return () => window.removeEventListener("keydown", handleKeypress);
    }
  }, [gameOver, paused]);

  return (
    <div
      className="absolute bg-sky-500 bottom-0 transition-all ease-linear duration-75  rounded-full"
      style={{
        width,
        height,
        left,
        background: `radial-gradient(#C8A1E0, #674188)`,
      }}
    ></div>
  );
};

export default Bouncer;
