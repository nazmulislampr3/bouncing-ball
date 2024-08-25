import { useGameContext } from "../../context/GameContext";
import Grids from "../Grids";
import Result from "../Result";
import Board from "./Board";
import Controls from "./Controls";
import PlayControls from "./PlayControls";

const Game = () => {
  const { score, result } = useGameContext()!;
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full flex items-center justify-center gap-6 flex-col lg:flex-row">
        <h2 className="font-bold text-2xl text-slate-300 lg:hidden">
          Score: {score}
        </h2>
        <Grids />
        <Board />
        <div className="flex flex-col gap-3 lg:hidden">
          <PlayControls />
          <Controls />
        </div>
        {result ? <Result /> : null}
      </div>
    </div>
  );
};

export default Game;
