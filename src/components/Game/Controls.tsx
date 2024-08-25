import { useGameContext } from "../../context/GameContext";

const Controls = () => {
  const { pauseToggle, paused, gameOver, restart, played } = useGameContext()!;

  const handleMouseUp = () => {
    pauseToggle();
  };

  return (
    <div className="flex items-center justify-center gap-8 mt-2 lg:mt-7">
      <button
        className="bg-teal-600 btn"
        disabled={gameOver}
        onMouseUp={handleMouseUp}
      >
        <img
          src={!paused ? "/images/pause.png" : "/images/play.png"}
          alt="icon"
        />
        {!paused ? (
          <span>Pause</span>
        ) : !played ? (
          <span>Play</span>
        ) : (
          <span>Resume</span>
        )}
      </button>
      <button className="bg-red-600 btn" onMouseUp={restart}>
        <img src="/images/restart.png" alt="restart" />
        <span>Restart</span>
      </button>
    </div>
  );
};

export default Controls;
