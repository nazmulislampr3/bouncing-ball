import Grids from "../components/Grids";
import { useGameContext } from "../context/GameContext";
import Board from "./Board";
import Controls from "./Controls";
import PlayControls from "./PlayControls";

const Game = () => {
  const { score } = useGameContext()!;
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full flex items-center justify-center gap-6 flex-col lg:flex-row">
        <h2 className="font-bold text-2xl text-slate-300">Score: {score}</h2>
        <Grids />
        <Board />
        <PlayControls />
        <Controls />
      </div>
    </div>
  );
};

export default Game;
