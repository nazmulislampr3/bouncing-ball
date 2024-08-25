import { useGameContext } from "../../context/GameContext";
import Ball from "../Game/Ball";
import Bouncer from "../Game/Bouncer";

const Grids = () => {
  const { gridUnit } = useGameContext()!;
  const grids = Array.from({ length: gridUnit[0] * gridUnit[1] });
  return (
    <div
      className="w-full max-w-2xl grid bg-slate-800 relative border-4 border-slate-300"
      style={{
        gridTemplateColumns: `repeat(${gridUnit[0]}, 1fr)`,
        gridTemplateRows: `repeat(${gridUnit[1]}, 1fr)`,
      }}
    >
      {grids.map((_, index) => (
        <div className="w-full aspect-square border-slate-500" key={index} />
      ))}
      <Bouncer />
      <Ball />
    </div>
  );
};

export default Grids;
