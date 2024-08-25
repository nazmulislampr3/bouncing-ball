import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import getRandomNum from "../utils/lib/getRandomNum";

type Move = (direction: "left" | "right") => void;
type Func1 = () => void;
const GameContext = createContext<{
  move: Move;
  bouncer: number;
  ball: number[];
  gridUnit: number[];
  bouncerUnit: number;
  gameOver: boolean;
  result: boolean;
  restart: Func1;
  score: number;
  paused: boolean;
  pauseToggle: Func1;
  played: boolean;
} | null>(null);

const GameContextProvider = ({ children }: { children: ReactNode }) => {
  const gridUnit = [20, 24];
  const bouncerUnit = 5;
  const [bouncer, setBouncer] = useState<number>(
    gridUnit[0] / 2 - bouncerUnit / 2
  );
  const [ball, setBall] = useState([gridUnit[0] / 2 - 0.5, gridUnit[1] - 2]);
  const [result, setResult] = useState<boolean>(false);
  const [paused, setPaused] = useState<boolean>(true);
  const [played, setPlayed] = useState<boolean>(false);
  const passGridPerS = useRef<number>(3);
  const getRandom = (): number => {
    return [-passGridPerS.current, passGridPerS.current][getRandomNum(0, 1)];
  };

  const ballDirection = useRef<number[] | null>([
    getRandom() / 60,
    -passGridPerS / 60,
  ]);
  const gameOver = !ballDirection.current;

  const bouncingCount = useRef<number>(-1);

  const move: Move = (direction) => {
    if (!paused && !gameOver) {
      let x = direction === "left" ? -0.8 : 0.8;
      setBouncer((prev) =>
        Math.min(gridUnit[0] - bouncerUnit, Math.max(prev + x, 0))
      );
    }
  };

  const pauseToggle: Func1 = () => {
    setPlayed(true);
    setPaused((prev) => !prev);
  };

  const restart: Func1 = () => {
    setBouncer(gridUnit[0] / 2 - bouncerUnit / 2);
    setBall([gridUnit[0] / 2 - 0.5, gridUnit[1] - 2]);
    setPaused(false);
    setResult(false);
    passGridPerS.current = 3;
    ballDirection.current = [getRandom() / 60, -passGridPerS / 60];
    bouncingCount.current = -1;
  };

  const touched = (): boolean => {
    const matchedX =
      ball[0] >= bouncer - 0.5 && ball[0] <= bouncer + bouncerUnit + 0.5;
    const matchedY = ball[1] === gridUnit[1] - 2;

    return matchedX && matchedY;
  };

  const moveBall = () => {
    const bd = ballDirection;
    const maxY = gridUnit[1] - 1;

    setBall((prev) => {
      const x = prev[0]!;
      const y = prev[1]!;
      return [x + bd.current?.[0]!, Math.min(y + bd.current?.[1]!, maxY)];
    });

    ballAnimation.current = requestAnimationFrame(moveBall);
  };

  const ballAnimation = useRef<any>(moveBall);

  useEffect(() => {
    const bd = ballDirection;
    if (!!bd.current && !paused) {
      ballAnimation.current = requestAnimationFrame(moveBall);
      return () => cancelAnimationFrame(ballAnimation.current);
    }
  }, [paused, ballDirection]);

  useEffect(() => {
    const bd = ballDirection;
    const x = ball[0];
    const y = ball[1];
    if (x <= 0) {
      bd.current = [passGridPerS.current / 60, bd.current?.[1]!];
    } else if (x >= gridUnit[0] - 1) {
      bd.current = [-passGridPerS.current / 60, bd.current?.[1]!];
    }

    if (y <= 0) {
      bd.current = [bd.current?.[0]!, passGridPerS.current / 60];
    } else if (y === gridUnit[1] - 2) {
      const touchedWithBouncer = touched();
      if (touchedWithBouncer) {
        bouncingCount.current++;
        passGridPerS.current = passGridPerS.current + 0.1;
        bd.current = [bd.current?.[0]!, -passGridPerS.current / 60];
      }
    } else if (y >= gridUnit[1] - 1) {
      ballDirection.current = null;
    }
  }, [ball, bouncer, ballDirection]);

  return (
    <GameContext.Provider
      value={{
        move,
        bouncer: bouncer,
        ball,
        gridUnit,
        bouncerUnit,
        gameOver,
        result,
        restart,
        score: Math.max(bouncingCount.current, 0) * 10,
        paused,
        pauseToggle,
        played,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export default GameContextProvider;

export const useGameContext = () => useContext(GameContext);
