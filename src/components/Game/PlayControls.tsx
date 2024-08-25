import { useEffect, useRef } from "react";
import { useGameContext } from "../../context/GameContext";

const PlayControls = () => {
  const { move } = useGameContext()!;
  const intervalRef = useRef<any>(null);

  const handleMouseDown = (cb: any) => {
    intervalRef.current = setInterval(cb, 75);
    cb();
  };

  const handleMouseUp = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    if (intervalRef.current) {
      return () => clearInterval(intervalRef.current);
    }
  }, []);

  return (
    <div className="flex gap-8 items-center justify-center">
      <button
        className="moveBtn"
        onMouseDown={() => handleMouseDown(() => move("left"))}
        onMouseUp={handleMouseUp}
      >
        <img src="/images/left-arrow.png" />
      </button>
      <button
        className="moveBtn"
        onMouseDown={() => handleMouseDown(() => move("right"))}
        onMouseUp={handleMouseUp}
      >
        <img src="/images/left-arrow.png" className="rotate-180" />
      </button>
    </div>
  );
};

export default PlayControls;
