import React, { useState } from 'react';
import { RotateCcw, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface LanguageSelokoPuzzleProps {
  rawPhrase: string;
  words: string[];
  correctOrder: string[];
  culturalMeaningQuestion: string;
  culturalMeaningOptions: { id: string; text: string; isCorrect: boolean }[];
  title: string;
  onSolved: (score: number) => void;
  onHintRequested?: () => void;
}

export const LanguageSelokoPuzzle: React.FC<LanguageSelokoPuzzleProps> = ({
  rawPhrase,
  words,
  correctOrder,
  culturalMeaningQuestion,
  culturalMeaningOptions,
  title,
  onSolved,
  onHintRequested
}) => {
  // Available scrambled words bank
  const [bankWords, setBankWords] = useState<{ id: string; word: string }[]>(() => {
    return words.map((w, idx) => ({ id: `${w}-${idx}`, word: w })).sort(() => Math.random() - 0.5);
  });

  // Placed words in sequence
  const [placedWords, setPlacedWords] = useState<{ id: string; word: string }[]>([]);
  const [isPhraseComplete, setIsPhraseComplete] = useState<boolean>(false);
  const [selectedMeaningId, setSelectedMeaningId] = useState<string | null>(null);
  const [meaningConfirmed, setMeaningConfirmed] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Click a word in the bank to add to sentence
  const handleWordFromBank = (item: { id: string; word: string }) => {
    if (isPhraseComplete) return;
    setErrorMessage(null);
    setBankWords(prev => prev.filter(w => w.id !== item.id));
    setPlacedWords(prev => [...prev, item]);
  };

  // Click a word in placed to return to bank
  const handleWordFromPlaced = (item: { id: string; word: string }) => {
    if (isPhraseComplete) return;
    setErrorMessage(null);
    setPlacedWords(prev => prev.filter(w => w.id !== item.id));
    setBankWords(prev => [...prev, item]);
  };

  // Verify phrase arrangement
  const verifyPhrase = () => {
    const constructed = placedWords.map(p => p.word).join(' ');
    const target = correctOrder.join(' ');

    if (constructed.trim().toLowerCase() === target.trim().toLowerCase()) {
      setIsPhraseComplete(true);
      setErrorMessage(null);
      confetti({ particleCount: 40, spread: 50 });
    } else {
      setErrorMessage('Urutan keping kata belum tepat. Perhatikan kaidah tata bahasa dan keselarasan bunyi seloko Melayu Jambi.');
    }
  };

  // Confirm cultural meaning choice
  const handleConfirmMeaning = (option: { id: string; text: string; isCorrect: boolean }) => {
    setSelectedMeaningId(option.id);
    if (option.isCorrect) {
      setMeaningConfirmed(true);
      setErrorMessage(null);
      confetti({ particleCount: 70, spread: 60 });
      onSolved(100);
    } else {
      setErrorMessage('Pilihan tafsir makna belum tepat. Telaah kembali pesan luhur dalam seloko adat tersebut.');
    }
  };

  // Reset words
  const resetPuzzle = () => {
    setBankWords(words.map((w, idx) => ({ id: `${w}-${idx}`, word: w })).sort(() => Math.random() - 0.5));
    setPlacedWords([]);
    setIsPhraseComplete(false);
    setSelectedMeaningId(null);
    setMeaningConfirmed(false);
    setErrorMessage(null);
  };

  // Auto assemble phrase for quick demonstration
  const autoAssemblePhrase = () => {
    const arranged = correctOrder.map((w, idx) => ({ id: `${w}-${idx}`, word: w }));
    setPlacedWords(arranged);
    setBankWords([]);
    setIsPhraseComplete(true);
    setErrorMessage(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col items-center">
      {/* Top action bar */}
      <div className="flex items-center justify-between w-full mb-3 text-xs">
        <span className="font-bold text-[#132726] bg-amber-50 border border-amber-200 px-3 py-1 rounded-lg">
          {!isPhraseComplete ? 'Tahap 1: Susun Keping Kata Seloko' : 'Tahap 2: Resapi Tafsir Makna Luhur'}
        </span>
        <button
          type="button"
          onClick={resetPuzzle}
          className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E5DFD2] text-[#4A5E5D] hover:text-[#C85A32] shadow-2xs font-medium"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Ulangi Susunan</span>
        </button>
      </div>

      {/* STAGE 1: ASSEMBLE WORDS */}
      <div className="w-full bg-white rounded-2xl border border-[#E8E2D5] p-5 shadow-xs mb-4">
        <div className="text-xs text-[#526665] mb-2 font-medium">
          Susunan Kalimat Seloko Adat:
        </div>

        {/* Sentence Builder Dropzone */}
        <div className="min-h-[85px] w-full rounded-xl bg-[#FAF8F5] border-2 border-dashed border-[#C85A32]/40 p-3 flex flex-wrap items-center gap-2 mb-3">
          {placedWords.length === 0 ? (
            <span className="text-xs text-[#8A9B9A] italic">
              Klik kepingan kata di bawah untuk menyusun kalimat seloko adat secara runtut...
            </span>
          ) : (
            placedWords.map((item, idx) => (
              <button
                key={item.id}
                type="button"
                onClick={() => handleWordFromPlaced(item)}
                disabled={isPhraseComplete}
                className="px-3 py-1.5 rounded-lg bg-[#C85A32] text-white font-bold text-xs sm:text-sm shadow-xs hover:bg-[#A33B18] active:scale-95 transition-all flex items-center gap-1 group"
              >
                <span>{item.word}</span>
                {!isPhraseComplete && (
                  <span className="text-[10px] text-orange-200 group-hover:text-white">✕</span>
                )}
              </button>
            ))
          )}
        </div>

        {/* Word Bank */}
        {!isPhraseComplete && (
          <div>
            <div className="text-[11px] text-[#8B4513] font-bold uppercase tracking-wider mb-2">
              Keping Kata Tersedia:
            </div>
            <div className="flex flex-wrap gap-2">
              {bankWords.map(item => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => handleWordFromBank(item)}
                  className="px-3 py-1.5 rounded-lg bg-white border border-[#D5CEBF] hover:border-[#C85A32] text-[#132726] hover:text-[#C85A32] font-semibold text-xs sm:text-sm shadow-2xs hover:bg-orange-50 active:scale-95 transition-all"
                >
                  {item.word}
                </button>
              ))}
            </div>

            {/* Verification Button */}
            <div className="flex items-center justify-between mt-4 pt-3 border-t border-[#E8E2D5]">
              <button
                type="button"
                onClick={autoAssemblePhrase}
                className="text-[11px] text-[#526665] hover:text-[#C85A32] underline"
              >
                Bantu Susun Seloko
              </button>

              <button
                type="button"
                onClick={verifyPhrase}
                disabled={placedWords.length === 0}
                className="px-4 py-2 rounded-xl bg-[#1E7773] hover:bg-[#165A57] disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-all flex items-center gap-1.5"
              >
                <CheckCircle2 className="w-4 h-4" />
                <span>Periksa Kebenaran Seloko</span>
              </button>
            </div>
          </div>
        )}

        {/* Completed banner */}
        {isPhraseComplete && (
          <div className="p-3 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-900 text-xs flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
            <div>
              <strong className="font-bold">Seloko Adat Tersusun Sempurna!</strong>
              <p className="text-[11px] text-emerald-800 mt-0.5">
                "{placedWords.map(p => p.word).join(' ')}"
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Error message */}
      {errorMessage && (
        <div className="w-full mb-4 p-3 rounded-xl bg-red-50 border border-red-200 text-red-800 text-xs flex items-center gap-2 animate-shake">
          <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0" />
          <span>{errorMessage}</span>
        </div>
      )}

      {/* STAGE 2: MEANING SELECTION (Appears once phrase is complete) */}
      {isPhraseComplete && (
        <div className="w-full bg-white rounded-2xl border border-[#E8E2D5] p-5 shadow-xs animate-fade-in">
          <h4 className="text-sm font-bold text-[#132726] mb-1 flex items-center gap-1.5">
            <Sparkles className="w-4 h-4 text-[#C85A32]" />
            <span>Tafsir Makna & Falsafah Budaya:</span>
          </h4>
          <p className="text-xs text-[#526665] mb-3">
            {culturalMeaningQuestion}
          </p>

          <div className="flex flex-col gap-2.5">
            {culturalMeaningOptions.map((opt, idx) => {
              const isSelected = selectedMeaningId === opt.id;
              return (
                <button
                  key={opt.id}
                  type="button"
                  onClick={() => handleConfirmMeaning(opt)}
                  disabled={meaningConfirmed}
                  className={`p-3.5 rounded-xl border text-left text-xs transition-all ${
                    meaningConfirmed && opt.isCorrect
                      ? 'bg-emerald-50 border-emerald-400 text-emerald-900 font-semibold ring-2 ring-emerald-300'
                      : isSelected && !opt.isCorrect
                        ? 'bg-red-50 border-red-300 text-red-900'
                        : 'bg-white border-[#E8E2D5] hover:border-[#1E7773] hover:bg-[#FAF8F5]'
                  }`}
                >
                  <div className="flex items-start gap-2">
                    <span className="font-bold text-[#8B4513]">{String.fromCharCode(65 + idx)}.</span>
                    <span className="leading-relaxed">{opt.text}</span>
                  </div>
                </button>
              );
            })}
          </div>

          {meaningConfirmed && (
            <div className="mt-4 p-3.5 rounded-xl bg-emerald-900 text-white text-center">
              <span className="text-xs font-bold flex items-center justify-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-300" />
                Kearifan Seloko Telah Menetap di Hatimu! (+1 Keping Mosaik)
              </span>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
