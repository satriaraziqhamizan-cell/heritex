import React, { useState } from 'react';
import { MeaningPair } from '../../types/puzzleverse';
import { Check, Sparkles, CheckCircle2, RotateCcw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface MeaningMatchPuzzleProps {
  pairs: MeaningPair[];
  title: string;
  onSolved: (score: number) => void;
  onHintRequested?: () => void;
}

export const MeaningMatchPuzzle: React.FC<MeaningMatchPuzzleProps> = ({
  pairs,
  title,
  onSolved,
  onHintRequested
}) => {
  // Scramble the meaning side independently
  const [symbols] = useState<MeaningPair[]>(() => [...pairs]);
  const [shuffledMeanings, setShuffledMeanings] = useState<MeaningPair[]>(() => {
    return [...pairs].sort(() => Math.random() - 0.5);
  });

  const [selectedSymbolId, setSelectedSymbolId] = useState<string | null>(null);
  const [selectedMeaningId, setSelectedMeaningId] = useState<string | null>(null);

  // Map of matched symbol IDs to their paired meaning IDs
  const [matchedPairs, setMatchedPairs] = useState<Record<string, string>>({});
  const [wrongPairAnimation, setWrongPairAnimation] = useState<{ symbolId: string; meaningId: string } | null>(null);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [attempts, setAttempts] = useState<number>(0);

  const handleSelectSymbol = (id: string) => {
    if (matchedPairs[id] || isSolved) return;
    setSelectedSymbolId(id);

    if (selectedMeaningId) {
      checkMatch(id, selectedMeaningId);
    }
  };

  const handleSelectMeaning = (id: string) => {
    // Check if this meaning is already matched
    const isAlreadyMatched = Object.values(matchedPairs).includes(id);
    if (isAlreadyMatched || isSolved) return;
    setSelectedMeaningId(id);

    if (selectedSymbolId) {
      checkMatch(selectedSymbolId, id);
    }
  };

  const checkMatch = (symbolId: string, meaningId: string) => {
    setAttempts(prev => prev + 1);

    if (symbolId === meaningId) {
      // Success match!
      const nextMatched = { ...matchedPairs, [symbolId]: meaningId };
      setMatchedPairs(nextMatched);
      setSelectedSymbolId(null);
      setSelectedMeaningId(null);

      // Check if all pairs are solved
      if (Object.keys(nextMatched).length === pairs.length) {
        setIsSolved(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        const score = Math.max(75, 100 - Math.max(0, attempts - pairs.length) * 5);
        onSolved(score);
      }
    } else {
      // Wrong match
      setWrongPairAnimation({ symbolId, meaningId });
      setTimeout(() => {
        setWrongPairAnimation(null);
        setSelectedSymbolId(null);
        setSelectedMeaningId(null);
      }, 700);
    }
  };

  const resetPuzzle = () => {
    setMatchedPairs({});
    setSelectedSymbolId(null);
    setSelectedMeaningId(null);
    setWrongPairAnimation(null);
    setIsSolved(false);
    setAttempts(0);
    setShuffledMeanings([...pairs].sort(() => Math.random() - 0.5));
  };

  const autoMatchAll = () => {
    const all: Record<string, string> = {};
    pairs.forEach(p => {
      all[p.id] = p.id;
    });
    setMatchedPairs(all);
    setIsSolved(true);
    confetti({ particleCount: 50, spread: 60 });
    onSolved(85);
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col items-center">
      {/* Instructions header */}
      <div className="flex items-center justify-between w-full mb-3 text-xs">
        <span className="font-bold text-[#132726] bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg">
          Cocokkan: {Object.keys(matchedPairs).length} / {pairs.length} Simbol & Makna
        </span>
        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={resetPuzzle}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E5DFD2] text-[#4A5E5D] hover:text-[#C85A32] transition-colors shadow-2xs font-medium"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Ulangi</span>
          </button>
        </div>
      </div>

      <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Left Column: Symbols / Motifs */}
        <div className="flex flex-col gap-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-[#8B4513] flex items-center gap-1.5 px-1">
            <span className="w-2 h-2 rounded-full bg-[#C85A32]" />
            Simbol, Ornamen atau Unsur Budaya
          </div>
          {symbols.map((item, idx) => {
            const isMatched = !!matchedPairs[item.id];
            const isSelected = selectedSymbolId === item.id;
            const isWrong = wrongPairAnimation?.symbolId === item.id;

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleSelectSymbol(item.id)}
                disabled={isMatched || isSolved}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  isMatched
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 opacity-90'
                    : isWrong
                      ? 'bg-red-50 border-red-400 text-red-900 animate-shake'
                      : isSelected
                        ? 'bg-amber-50 border-[#C85A32] ring-2 ring-[#C85A32]/50 shadow-md scale-101'
                        : 'bg-white border-[#E8E2D5] hover:border-[#C85A32]/60 hover:bg-[#FAF8F5] shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-[#132726] mb-0.5">
                      {idx + 1}. {item.symbolName}
                    </h4>
                    <p className="text-[11px] text-[#526665] leading-relaxed">
                      {item.symbolSnippet}
                    </p>
                  </div>
                  {isMatched && (
                    <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Column: Philosophical Meanings */}
        <div className="flex flex-col gap-2.5">
          <div className="text-xs font-bold uppercase tracking-wider text-[#1E7773] flex items-center gap-1.5 px-1">
            <span className="w-2 h-2 rounded-full bg-[#1E7773]" />
            Makna Filosofis & Falsafah Luhur
          </div>
          {shuffledMeanings.map((meaning, idx) => {
            const isMatched = Object.values(matchedPairs).includes(meaning.id);
            const isSelected = selectedMeaningId === meaning.id;
            const isWrong = wrongPairAnimation?.meaningId === meaning.id;

            return (
              <button
                key={meaning.id}
                type="button"
                onClick={() => handleSelectMeaning(meaning.id)}
                disabled={isMatched || isSolved}
                className={`p-3.5 rounded-xl border text-left transition-all relative ${
                  isMatched
                    ? 'bg-emerald-50/80 border-emerald-300 text-emerald-900 opacity-90'
                    : isWrong
                      ? 'bg-red-50 border-red-400 text-red-900 animate-shake'
                      : isSelected
                        ? 'bg-emerald-50 border-[#1E7773] ring-2 ring-[#1E7773]/50 shadow-md scale-101'
                        : 'bg-white border-[#E8E2D5] hover:border-[#1E7773]/60 hover:bg-[#FAF8F5] shadow-xs'
                }`}
              >
                <div className="flex items-start justify-between gap-2">
                  <p className="text-xs sm:text-[13px] text-[#2C3E3D] leading-relaxed font-medium">
                    "{meaning.meaningText}"
                  </p>
                  {isMatched && (
                    <span className="flex-shrink-0 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white shadow-xs">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Solved celebration banner */}
      {isSolved && (
        <div className="w-full mt-4 p-4 rounded-2xl bg-emerald-900 text-white text-center shadow-lg border-2 border-emerald-400 animate-fade-in">
          <div className="flex items-center justify-center gap-2 mb-1">
            <CheckCircle2 className="w-5 h-5 text-emerald-300" />
            <h4 className="font-extrabold text-sm sm:text-base">Semua Simbol Berhasil Dipadankan!</h4>
          </div>
          <p className="text-xs text-emerald-100 max-w-md mx-auto">
            Kamu telah memahami rahasia filosofi luhur yang tertuang dalam setiap goresan dan ornamen <strong>{title}</strong>.
          </p>
        </div>
      )}

      {/* Auto solve help */}
      {!isSolved && (
        <div className="w-full flex justify-end mt-3">
          <button
            type="button"
            onClick={autoMatchAll}
            className="text-[11px] text-[#C85A32] hover:text-[#9C3817] font-semibold underline"
          >
            Bantu Hubungkan Otomatis
          </button>
        </div>
      )}
    </div>
  );
};
