import { useEffect, useRef, useState } from "react";

export default function Practice() {
  const [playableBoard, setPlayableBoard] = useState<number[][] | null>(null);
  const [solvedBoard, setSolvedBoard] = useState<number[][] | null>(null);
  const [grid, setGrid] = useState<number[][]>([]);
  const [startTime, setStartTime] = useState<Date | null>(null);
  const [elapsed, setElapsed] = useState<number>(0);
  const [solved, setSolved] = useState(false);

  const inputRefs = useRef<(HTMLInputElement | null)[][]>(
    Array.from({ length: 9 }, () => Array(9).fill(null))
  );

  // Fetch board
  useEffect(() => {
    async function fetchBoard() {
      try {
        const res = await fetch("/api/generateBoard");
        const data = await res.json();

        const playableCopy = data.playableBoard.map((row: number[]) => [...row]);
        const solvedCopy = data.solvedBoard.map((row: number[]) => [...row]);

        setPlayableBoard(playableCopy);
        setSolvedBoard(solvedCopy);
        setGrid(playableCopy.map((row: number[]) => [...row]));
        setSolved(false);
        setElapsed(0);
        setStartTime(new Date());
      } catch (err) {
        console.error("Failed to fetch board:", err);
      }
    }

    fetchBoard();
  }, []);

  // Timer
  useEffect(() => {
    if (!startTime || solved) return;

    const interval = setInterval(() => {
      setElapsed(
        Math.floor((Date.now() - startTime.getTime()) / 1000)
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime, solved]);

  // Check solution when grid is full
  useEffect(() => {
    if (!grid.length || !solvedBoard) return;

    const isFilled = grid.flat().every((v) => v !== 0);
    if (!isFilled) return;

    const isCorrect = grid.every((row, r) =>
      row.every((value, c) => value === solvedBoard[r][c])
    );

    if (isCorrect) {
      setSolved(true);
    }
  }, [grid, solvedBoard]);

  const handleChange = (
    rowIdx: number,
    colIdx: number,
    value: string
  ) => {
    if (!playableBoard || solved) return;

    // Only allow edits on non-given cells
    if (playableBoard[rowIdx][colIdx] !== 0) return;

    const num = parseInt(value);
    const newGrid = grid.map((row) => [...row]);

    if (value === "") {
      newGrid[rowIdx][colIdx] = 0;
    } else if (!isNaN(num) && num >= 1 && num <= 9) {
      newGrid[rowIdx][colIdx] = num;
    }

    setGrid(newGrid);
  };

  const handleKeyDown = (e: React.KeyboardEvent, rowIdx: number, colIdx: number) => {
    if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) return;
    
    e.preventDefault();
    
    let newRow = rowIdx;
    let newCol = colIdx;

    switch (e.key) {
      case "ArrowUp":
        newRow = Math.max(0, rowIdx - 1);
        break;
      case "ArrowDown":
        newRow = Math.min(8, rowIdx + 1);
        break;
      case "ArrowLeft":
        newCol = Math.max(0, colIdx - 1);
        break;
      case "ArrowRight":
        newCol = Math.min(8, colIdx + 1);
        break;
    }

    inputRefs.current[newRow][newCol]?.focus();
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (!playableBoard) {
    return (
      <section className="min-h-screen grid place-items-center bg-gray-100">
        <div className="text-lg font-semibold">Loading board…</div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen grid place-items-center bg-gray-100 overflow-hidden p-4">
      <div className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-lg px-4 py-6 flex flex-col gap-4 items-center">
        <h1 className="font-bold text-xl sm:text-2xl text-gray-900">
          Practice Sudoku
        </h1>

        <div className="text-lg sm:text-xl font-mono bg-gray-100 px-3 py-1 rounded-md w-fit">
          {formatTime(elapsed)} {solved && "(Solved!)"}
        </div>

        <div
          className="grid grid-cols-9 gap-[1px] w-full sm:w-4/5 md:w-full max-w-[400px]"
          style={{ aspectRatio: "1 / 1" }}
        >
          {grid.map((row, rowIdx) =>
            row.map((value, colIdx) => {
              const borderClasses = [
                rowIdx % 3 === 0 ? "border-t-2" : "border-t",
                colIdx % 3 === 0 ? "border-l-2" : "border-l",
                rowIdx === 8 ? "border-b-2" : "",
                colIdx === 8 ? "border-r-2" : "",
              ].join(" ");

              const isGiven = playableBoard[rowIdx][colIdx] !== 0;

              return (
                <input
                  key={`${rowIdx}-${colIdx}`}
                  ref={(el) => {
                    inputRefs.current[rowIdx][colIdx] = el;
                  }}
                  type="text"
                  maxLength={1}
                  value={value === 0 ? "" : value}
                  readOnly={isGiven}
                  onChange={(e) =>
                    handleChange(rowIdx, colIdx, e.target.value)
                  }
                  onKeyDown={(e) => handleKeyDown(e, rowIdx, colIdx)}
                  className={`w-full h-full text-center text-sm sm:text-base font-bold border ${borderClasses} rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                    isGiven ? "bg-gray-200" : "bg-white"
                  }`}
                  style={{ aspectRatio: "1 / 1" }}
                />
              );
            })
          )}
        </div>

        {solved && (
          <p className="text-green-600 font-semibold mt-2">
            Congrats! You solved the puzzle in {formatTime(elapsed)}
          </p>
        )}
      </div>
    </section>
  );
}