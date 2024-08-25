import { useGameContext } from "../context/GameContext";

const Result = () => {
  const { score } = useGameContext()!;

  return (
    <div
      className="fixed w-screen h-screen flex items-center justify-center flex-col"
      style={{
        background: `rgba(0, 0, 0, 0.80)`,
      }}
    >
      <h2 className="text-red-600 font-extrabold text-2xl lg:text-4xl border-b-2 pb-1">
        Game over!
      </h2>
      <span className="text-slate-300 font-bold text-xl mt-3">
        Score: {score}
      </span>
    </div>
  );
};

export default Result;
