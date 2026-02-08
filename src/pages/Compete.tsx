import { useEffect, useRef, useState } from "react";

export default function Compete() {
  const [initialGrid, setInitialGrid] = useState<number[][] | null>(null);
  const [grid, setGrid] = useState<number[][]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [status, setStatus] =
    useState<"waiting" | "playing" | "finished">("waiting");
  const [winner, setWinner] = useState<string | null>(null);

  const socketRef = useRef<WebSocket | null>(null);
  const solvedSentRef = useRef(false);

  useEffect(() => {
    const socket =  new WebSocket("/ws/compete");
    socketRef.current = socket;

    socket.onmessage = (e) => {
      const msg = JSON.parse(e.data);

      switch (msg.type) {
        case "MATCH_START":
          setInitialGrid(msg.board);
          setGrid(msg.board.map((row: number[]) => [...row]));
          setElapsed(0);
          setStatus("playing");
          solvedSentRef.current = false;
          break;

        case "MOVE_RESULT":
          setGrid(msg.grid);
          break;

        case "GAME_OVER":
          setWinner(msg.winner);
          setStatus("finished");
          break;

        case "SOLVED_INVALID":
          solvedSentRef.current = false;
          break;
      }
    };

    socket.onerror = (err) => {
      console.error("WebSocket error:", err);
    };

    return () => socket.close();
  }, []);

  useEffect(() => {
    if (status !== "playing") return;

    const interval = setInterval(() => {
      setElapsed((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [status]);

  useEffect(() => {
    if (status !== "playing") return;
    if (!grid.length) return;
    if (solvedSentRef.current) return;

    const isFull = grid.every((row) =>
      row.every((cell) => cell !== 0)
    );

    if (isFull) {
      solvedSentRef.current = true;

      socketRef.current?.send(
        JSON.stringify({
          type: "SOLVED",
        })
      );
    }
  }, [grid, status]);

  const handleChange = (rowIdx: number, colIdx: number, value: string) => {
    if (!initialGrid) return;
    if (initialGrid[rowIdx][colIdx] !== 0) return;

    const num = parseInt(value);

    if (value === "") {
      socketRef.current?.send(
        JSON.stringify({
          type: "MOVE",
          row: rowIdx,
          col: colIdx,
          value: 0,
        })
      );
      return;
    }

    if (isNaN(num) || num < 1 || num > 9) return;

    socketRef.current?.send(
      JSON.stringify({
        type: "MOVE",
        row: rowIdx,
        col: colIdx,
        value: num,
      })
    );
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs
      .toString()
      .padStart(2, "0")}`;
  };

  if (status === "waiting") {
    return (
      <section className="min-h-screen grid place-items-center bg-gray-100">
        <div className="bg-white p-6 rounded-xl shadow text-center">
          <p className="text-gray-600">Waiting for an opponent…</p>
        </div>
      </section>
    );
  }

  if (!initialGrid) {
    return (
      <section className="min-h-screen grid place-items-center bg-gray-100">
        <div className="text-lg font-semibold">Loading match…</div>
      </section>
    );
  }

  return (
    <section className="relative min-h-screen grid place-items-center bg-gray-100 overflow-hidden p-4">
      <div className="relative z-10 w-full max-w-xl bg-white rounded-2xl shadow-lg px-4 py-6 flex flex-col gap-4 items-center">
        <h1 className="font-bold text-xl sm:text-2xl text-gray-900">
          Competitive Sudoku
        </h1>

        <div className="flex gap-4 text-sm sm:text-base font-mono">
          <div className="bg-gray-100 px-3 py-1 rounded-md">
            Time: {formatTime(elapsed)}
          </div>
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

              const isGiven = initialGrid[rowIdx][colIdx] !== 0;

              return (
                <input
                  key={`${rowIdx}-${colIdx}`}
                  type="text"
                  maxLength={1}
                  value={value === 0 ? "" : value}
                  readOnly={isGiven || status !== "playing"}
                  onChange={(e) =>
                    handleChange(rowIdx, colIdx, e.target.value)
                  }
                  className={`w-full h-full text-center text-sm sm:text-base font-bold border ${borderClasses} rounded-sm focus:outline-none focus:ring-2 focus:ring-gray-900 ${
                    isGiven ? "bg-gray-200" : "bg-white"
                  }`}
                  style={{ aspectRatio: "1 / 1" }}
                />
              );
            })
          )}
        </div>

        {status === "finished" && (
          <div className="mt-2 font-semibold text-lg">
            {winner === "you" ? (
              <span className="text-green-600">You win!</span>
            ) : (
              <span className="text-red-600">You lost!</span>
            )}
          </div>
        )}
      </div>
    </section>
  );
}