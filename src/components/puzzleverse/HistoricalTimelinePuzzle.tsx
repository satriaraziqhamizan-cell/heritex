import React, { useState } from 'react';
import { HistoricalEventCard } from '../../types/puzzleverse';
import { ArrowUp, ArrowDown, CheckCircle2, RotateCcw, AlertCircle, Clock } from 'lucide-react';
import confetti from 'canvas-confetti';

interface HistoricalTimelinePuzzleProps {
  events: HistoricalEventCard[];
  title: string;
  onSolved: (score: number) => void;
  onHintRequested?: () => void;
}

export const HistoricalTimelinePuzzle: React.FC<HistoricalTimelinePuzzleProps> = ({
  events,
  title,
  onSolved,
  onHintRequested
}) => {
  // Scramble the events initially
  const [currentEvents, setCurrentEvents] = useState<HistoricalEventCard[]>(() => {
    return [...events].sort(() => Math.random() - 0.5);
  });

  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [hasAttempted, setHasAttempted] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Move item up in order
  const moveUp = (index: number) => {
    if (index === 0 || isSolved) return;
    setErrorMessage(null);
    const updated = [...currentEvents];
    const temp = updated[index - 1];
    updated[index - 1] = updated[index];
    updated[index] = temp;
    setCurrentEvents(updated);
  };

  // Move item down in order
  const moveDown = (index: number) => {
    if (index === currentEvents.length - 1 || isSolved) return;
    setErrorMessage(null);
    const updated = [...currentEvents];
    const temp = updated[index + 1];
    updated[index + 1] = updated[index];
    updated[index] = temp;
    setCurrentEvents(updated);
  };

  // Check if events are in correct order (rank 1, 2, 3, 4)
  const verifyOrder = () => {
    setHasAttempted(true);
    const isCorrect = currentEvents.every((item, idx) => item.correctRank === idx + 1);

    if (isCorrect) {
      setIsSolved(true);
      setErrorMessage(null);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
      onSolved(95);
    } else {
      setErrorMessage('Urutan kronologi belum sesuai catatan sejarah. Perhatikan angka abad dan peristiwa pendahulu.');
    }
  };

  const resetOrder = () => {
    setCurrentEvents([...events].sort(() => Math.random() - 0.5));
    setIsSolved(false);
    setHasAttempted(false);
    setErrorMessage(null);
  };

  const autoSort = () => {
    const sorted = [...events].sort((a, b) => a.correctRank - b.correctRank);
    setCurrentEvents(sorted);
    setIsSolved(true);
    setErrorMessage(null);
    confetti({ particleCount: 50, spread: 60 });
    onSolved(85);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Top action header */}
      <div className="flex items-center justify-between w-full mb-3 text-xs">
        <span className="font-bold text-[#132726] bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg flex items-center gap-1.5">
          <Clock className="w-3.5 h-3.5 text-[#C85A32]" />
          Urutkan dari Era Paling Kuno (Atas) ke Masa Kini (Bawah)
        </span>
        <button
          type="button"
          onClick={resetOrder}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E5DFD2] text-[#4A5E5D] hover:text-[#C85A32] shadow-2xs font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Acak Ulang</span>
        </button>
      </div>

      {/* Reorderable Event List */}
      <div className="w-full flex flex-col gap-3">
        {currentEvents.map((item, idx) => {
          const isCurrentSlotCorrect = isSolved || (hasAttempted && item.correctRank === idx + 1);

          return (
            <div
              key={item.id}
              className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-3 ${
                isSolved
                  ? 'bg-emerald-50/90 border-emerald-300 text-emerald-950'
                  : 'bg-white border-[#E8E2D5] hover:border-[#C85A32]/60 shadow-xs'
              }`}
            >
              {/* Slot Number & Content */}
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-extrabold text-xs shadow-xs flex-shrink-0 ${
                  isSolved
                    ? 'bg-emerald-600 text-white'
                    : 'bg-[#F4EFE6] text-[#8B4513] border border-[#E5DFD2]'
                }`}>
                  #{idx + 1}
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                    <h4 className="text-xs sm:text-sm font-bold text-[#132726]">
                      {item.title}
                    </h4>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-orange-100 text-[#9C3817]">
                      {item.periodText}
                    </span>
                  </div>
                  <p className="text-[11px] text-[#526665] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>

              {/* Move Controls */}
              {!isSolved && (
                <div className="flex flex-col gap-1 flex-shrink-0">
                  <button
                    type="button"
                    onClick={() => moveUp(idx)}
                    disabled={idx === 0}
                    className="p-1.5 rounded-lg border border-[#E5DFD2] bg-[#FAF8F5] hover:bg-[#C85A32] hover:text-white disabled:opacity-30 disabled:hover:bg-[#FAF8F5] disabled:hover:text-inherit transition-all shadow-2xs"
                    title="Geser ke era lebih awal"
                  >
                    <ArrowUp className="w-3.5 h-3.5" />
                  </button>
                  <button
                    type="button"
                    onClick={() => moveDown(idx)}
                    disabled={idx === currentEvents.length - 1}
                    className="p-1.5 rounded-lg border border-[#E5DFD2] bg-[#FAF8F5] hover:bg-[#C85A32] hover:text-white disabled:opacity-30 disabled:hover:bg-[#FAF8F5] disabled:hover:text-inherit transition-all shadow-2xs"
                    title="Geser ke era lebih baru"
                  >
                    <ArrowDown className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Error Message */}
      {errorMessage && (
        <div className="w-full mt-3 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2 animate-shake">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* Solved celebration */}
      {isSolved && (
        <div className="w-full mt-4 p-4 rounded-2xl bg-emerald-900 text-white text-center shadow-lg border-2 border-emerald-400 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            <h4 className="font-extrabold text-sm sm:text-base">Kronologi Sejarah Tersusun Sempurna!</h4>
          </div>
          <p className="text-xs text-emerald-100 max-w-md mx-auto">
            Kamu telah membuktikan pemahaman runtutan peradaban <strong>{title}</strong> yang membanggakan.
          </p>
        </div>
      )}

      {/* Verify / Action Footer */}
      <div className="flex items-center justify-between w-full mt-4 pt-3 border-t border-[#E8E2D5]">
        {!isSolved ? (
          <>
            <button
              type="button"
              onClick={autoSort}
              className="text-[11px] text-[#526665] hover:text-[#C85A32] underline"
            >
              Bantu Urutkan Kronologi
            </button>
            <button
              type="button"
              onClick={verifyOrder}
              className="px-5 py-2.5 rounded-xl bg-[#1E7773] hover:bg-[#165A57] text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>Verifikasi Urutan Kronologi</span>
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
};
