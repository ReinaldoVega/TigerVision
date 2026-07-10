"use client";

import { useRef, useState } from "react";

type Mode = "draw" | "erase";

export default function HandwriteNote({
  inkNote,
  inkText,
  onSaveInk,
  onSaveText,
}: {
  inkNote: string;
  inkText: string;
  onSaveInk: (value: string) => void;
  onSaveText: (value: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const [isDrawing, setIsDrawing] = useState(false);
  const [mode, setMode] = useState<Mode>("draw");
  const [lineWidth, setLineWidth] = useState(3);
  const [isConverting, setIsConverting] = useState(false);
  const [previewText, setPreviewText] = useState(inkText || "");

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const historyRef = useRef<ImageData[]>([]);

  function getPoint(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };

    const rect = canvas.getBoundingClientRect();

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }

  function saveHistory() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    historyRef.current.push(ctx.getImageData(0, 0, canvas.width, canvas.height));

    if (historyRef.current.length > 20) {
      historyRef.current.shift();
    }
  }

  function startDrawing(e: React.PointerEvent<HTMLCanvasElement>) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.setPointerCapture(e.pointerId);
    saveHistory();

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getPoint(e);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = mode === "erase" ? 18 : lineWidth;
    ctx.strokeStyle = mode === "erase" ? "#FFFFFF" : "#0C2340";

    setIsDrawing(true);
  }

  function draw(e: React.PointerEvent<HTMLCanvasElement>) {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const { x, y } = getPoint(e);

    ctx.lineTo(x, y);
    ctx.stroke();
  }

  function stopDrawing() {
    setIsDrawing(false);
  }

  function clearCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    saveHistory();

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    onSaveInk("");
    onSaveText("");
    setPreviewText("");
  }

  function undoCanvas() {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const previous = historyRef.current.pop();
    if (!previous) return;

    ctx.putImageData(previous, 0, 0);
  }

  function saveInk(closeAfter = true) {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");
    onSaveInk(dataUrl);

    if (previewText) {
      onSaveText(previewText);
    }

    if (closeAfter) {
      setOpen(false);
    }
  }

  async function convertToText(aiMode: "raw" | "coach") {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataUrl = canvas.toDataURL("image/png");

    onSaveInk(dataUrl);
    setIsConverting(true);

    try {
      const res = await fetch("/api/ink-to-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          image: dataUrl,
          mode: aiMode,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Could not convert handwriting.");
        return;
      }

      if (data.text) {
        setPreviewText(data.text);
        onSaveText(data.text);
      } else {
        alert("No text detected.");
      }
    } finally {
      setIsConverting(false);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-xs font-black uppercase text-[#0C2340]"
      >
        ✍ Handwrite
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-5">
          <div className="w-full max-w-235 rounded-3xl bg-white p-5 text-[#0C2340] shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-[3px] text-[#FA4616]">
                  Handwritten Comment
                </p>
                <h2 className="text-2xl font-black">
                  Write with Pencil / Stylus
                </h2>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-black uppercase"
              >
                Close
              </button>
            </div>

            <div className="mb-4 grid grid-cols-[1fr_210px] gap-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMode("draw")}
                      className={`h-9 rounded-xl px-4 text-xs font-black uppercase ${
                        mode === "draw"
                          ? "bg-[#FA4616] text-white"
                          : "bg-white text-[#0C2340]"
                      }`}
                    >
                      Pen
                    </button>

                    <button
                      onClick={() => setMode("erase")}
                      className={`h-9 rounded-xl px-4 text-xs font-black uppercase ${
                        mode === "erase"
                          ? "bg-[#FA4616] text-white"
                          : "bg-white text-[#0C2340]"
                      }`}
                    >
                      Eraser
                    </button>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-xs font-black uppercase text-slate-500">
                      Size
                    </span>

                    <select
                      value={lineWidth}
                      onChange={(e) => setLineWidth(Number(e.target.value))}
                      className="h-9 rounded-xl border border-slate-200 bg-white px-3 text-xs font-black"
                    >
                      <option value={2}>Thin</option>
                      <option value={3}>Normal</option>
                      <option value={5}>Thick</option>
                      <option value={7}>Heavy</option>
                    </select>
                  </div>
                </div>

                <canvas
                  ref={canvasRef}
                  width={820}
                  height={340}
                  onPointerDown={startDrawing}
                  onPointerMove={draw}
                  onPointerUp={stopDrawing}
                  onPointerCancel={stopDrawing}
                  className="h-85 w-full touch-none rounded-2xl border-2 border-slate-300 bg-white"
                />
              </div>

              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-xs font-black uppercase tracking-[2px] text-slate-500">
                  Converted Text
                </p>

                <textarea
                  value={previewText}
                  onChange={(e) => setPreviewText(e.target.value)}
                  placeholder="Converted handwriting will appear here..."
                  className="mt-3 h-62.5 w-full resize-none rounded-xl border border-slate-200 bg-white p-3 text-sm font-bold text-[#0C2340]"
                />

                {inkNote && (
                  <p className="mt-3 text-xs font-bold text-green-600">
                    Ink note saved.
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-7 gap-3">
              <button
                onClick={undoCanvas}
                className="h-12 rounded-xl border border-slate-300 text-sm font-black uppercase"
              >
                Undo
              </button>

              <button
                onClick={clearCanvas}
                className="h-12 rounded-xl border border-slate-300 text-sm font-black uppercase"
              >
                Clear
              </button>

              <button
                onClick={() => convertToText("raw")}
                disabled={isConverting}
                className="h-12 rounded-xl border border-[#FA4616] text-sm font-black uppercase text-[#FA4616] disabled:opacity-40"
              >
                Text
              </button>

              <button
                onClick={() => convertToText("coach")}
                disabled={isConverting}
                className="h-12 rounded-xl bg-[#0C2340] text-sm font-black uppercase text-white disabled:opacity-40"
              >
                Coach
              </button>

              <button
                onClick={() => saveInk(false)}
                className="h-12 rounded-xl bg-[#FA4616] text-sm font-black uppercase text-white"
              >
                Save
              </button>

              <button
                onClick={() => {
                  saveInk(true);
                }}
                className="h-12 rounded-xl bg-green-600 text-sm font-black uppercase text-white"
              >
                Done
              </button>

              <button
                onClick={() => setOpen(false)}
                className="h-12 rounded-xl border border-slate-300 text-sm font-black uppercase"
              >
                Cancel
              </button>
            </div>

            {isConverting && (
              <p className="mt-3 text-center text-xs font-black uppercase tracking-[2px] text-[#FA4616]">
                Converting handwriting...
              </p>
            )}
          </div>
        </div>
      )}
    </>
  );
}