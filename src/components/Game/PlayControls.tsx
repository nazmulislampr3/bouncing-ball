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
  }, [intervalRef]);

  return (
    <div className="flex gap-8 items-center justify-center">
      <button
        className="moveBtn"
        onTouchStart={() => handleMouseDown(() => move("left"))}
        onTouchEnd={handleMouseUp}
      >
        <div className="img">
          <img src="/images/left-arrow.png" />
          <div className="click-blocker"></div>
        </div>
      </button>
      <button
        className="moveBtn"
        onTouchStart={() => handleMouseDown(() => move("right"))}
        onTouchEnd={handleMouseUp}
      >
        <div className="img">
          <img src="/images/left-arrow.png" className="rotate-180" />
          <div className="click-blocker"></div>
        </div>
      </button>
    </div>
  );
};

export default PlayControls;
