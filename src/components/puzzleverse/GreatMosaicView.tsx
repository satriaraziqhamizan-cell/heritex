import React, { useState } from 'react';
import { Sparkles, Award, CheckCircle2, Lock, Eye, Share2, Heart } from 'lucide-react';
import { JAMBI_PUZZLE_WORLDS } from '../../data/puzzleverseData';
import confetti from 'canvas-confetti';

interface GreatMosaicViewProps {
  unlockedPieces: number[]; // e.g. [0, 1, 4, 8]
  onSelectLevel?: (levelId: string) => void;
}

export const GreatMosaicView: React.FC<GreatMosaicViewProps> = ({
  unlockedPieces,
  onSelectLevel
}) => {
  // Flatten all 16 levels to get their mosaic piece metadata
  const allLevels = JAMBI_PUZZLE_WORLDS.flatMap(w => w.levels);
  const totalPieces = 16;
  const [selectedPieceIndex, setSelectedPieceIndex] = useState<number | null>(null);
  const [showFullCelebration, setShowFullCelebration] = useState<boolean>(false);

  const completedCount = unlockedPieces.length;
  const progressPercent = Math.round((completedCount / totalPieces) * 100);
  const isAllComplete = completedCount === totalPieces;

  const triggerGrandCelebration = () => {
    setShowFullCelebration(true);
    confetti({
      particleCount: 150,
      spread: 100,
      origin: { y: 0.5 }
    });
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
      {/* Grand Title Banner */}
      <div className="w-full text-center mb-6">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 border border-amber-300 text-[#8B4513] text-xs font-bold mb-2 shadow-2xs">
          <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
          <span>MAHAKARYA AKBAR IDENTITAS BUDAYA JAMBI</span>
        </div>
        <h2 className="text-xl sm:text-3xl font-extrabold text-[#132726] tracking-tight">
          Mosaik Akbar Kebudayaan Jambi
        </h2>
        <p className="text-xs sm:text-sm text-[#526665] max-w-xl mx-auto mt-1 leading-relaxed">
          "Setiap keping budaya membentuk satu identitas luhur Nusantara. Kumpulkan seluruh 16 keping warisan untuk menyalakan peradaban masa depan."
        </p>

        {/* Progress bar */}
        <div className="max-w-md mx-auto mt-4">
          <div className="flex items-center justify-between text-xs mb-1 font-semibold">
            <span className="text-[#132726]">Koleksi Keping Terbuka:</span>
            <span className="text-[#C85A32] font-bold">{completedCount} / {totalPieces} Keping ({progressPercent}%)</span>
          </div>
          <div className="h-3 w-full bg-[#E5DFD2] rounded-full overflow-hidden p-0.5 border border-[#D5CEBF]">
            <div 
              className="h-full bg-gradient-to-r from-[#C85A32] via-[#E67E22] to-[#1E7773] rounded-full transition-all duration-700 shadow-xs"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 4x4 Grand Mosaic Canvas */}
      <div className="relative w-full max-w-2xl aspect-square rounded-3xl p-3 sm:p-4 bg-gradient-to-br from-[#1F2937] to-[#111827] shadow-2xl border-4 border-[#C85A32]/60 ring-8 ring-amber-100/50">
        <div className="grid grid-cols-4 gap-2 w-full h-full rounded-2xl overflow-hidden bg-black/40 p-1">
          {Array.from({ length: totalPieces }, (_, idx) => {
            const isUnlocked = unlockedPieces.includes(idx);
            const level = allLevels.find(l => l.mosaicPiece.gridIndex === idx);

            return (
              <button
                key={idx}
                type="button"
                onClick={() => {
                  setSelectedPieceIndex(idx);
                  if (level && isUnlocked && onSelectLevel) {
                    // can inspect
                  }
                }}
                className={`relative group w-full h-full rounded-xl overflow-hidden transition-all duration-300 text-left border ${
                  isUnlocked
                    ? 'border-amber-400/80 hover:scale-103 z-10 shadow-lg cursor-pointer'
                    : 'border-white/10 bg-neutral-900/90 cursor-default opacity-80'
                }`}
              >
                {isUnlocked && level ? (
                  <>
                    <img 
                      src={level.thumbnail} 
                      alt={level.title} 
                      className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex flex-col justify-end p-2">
                      <span className="text-[9px] sm:text-[10px] font-extrabold text-amber-300 truncate">
                        {level.mosaicPiece.pieceTitle}
                      </span>
                      <span className="text-[8px] text-white/80 truncate">
                        {level.title}
                      </span>
                    </div>
                    {/* Golden Star indicator */}
                    <div className="absolute top-1 right-1 bg-amber-500/90 text-white rounded-full p-0.5 shadow-xs">
                      <Sparkles className="w-2.5 h-2.5 text-amber-100" />
                    </div>
                  </>
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center p-2 text-center text-neutral-500">
                    <Lock className="w-4 h-4 mb-1 text-neutral-600" />
                    <span className="text-[8px] sm:text-[9px] font-mono text-neutral-400">
                      Keping #{idx + 1}
                    </span>
                    {level && (
                      <span className="text-[7px] text-neutral-500 mt-0.5 line-clamp-1">
                        {level.culturalCategory}
                      </span>
                    )}
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Complete Grand Ending Overlay when 16/16 done */}
        {(isAllComplete || showFullCelebration) && (
          <div className="absolute inset-0 bg-black/85 backdrop-blur-md rounded-3xl p-6 flex flex-col items-center justify-center text-center text-white animate-fade-in z-20">
            <div className="w-16 h-16 rounded-full bg-amber-500/20 border-2 border-amber-400 flex items-center justify-center mb-3">
              <Award className="w-10 h-10 text-amber-300" />
            </div>
            <span className="text-xs uppercase tracking-widest text-amber-300 font-extrabold mb-1">
              Ikrar Luhur Generasi Bangsa
            </span>
            <h3 className="text-xl sm:text-2xl font-black mb-2 text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-100 to-amber-300">
              "Setiap keping budaya membentuk satu identitas."
            </h3>
            <p className="text-xs text-neutral-200 max-w-md mb-4 leading-relaxed">
              Selamat! Kamu telah mengumpulkan seluruh 16 keping pusaka warisan Jambi: dari kemegahan Candi Muaro Jambi, Rumah Tuo Kajang Lako, gema Seloko Adat, hingga rajutan emas Songket Melayu.
            </p>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setShowFullCelebration(false)}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-extrabold text-xs shadow-lg transition-all"
              >
                Lihat Galeri Mosaik
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Action and inspection bar */}
      <div className="w-full max-w-2xl mt-4 flex items-center justify-between text-xs">
        <span className="text-[#526665]">
          *Keping akan otomatis menyala saat level terkait diselesaikan di game puzzle.
        </span>

        {!isAllComplete && (
          <button
            type="button"
            onClick={triggerGrandCelebration}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white border border-[#E5DFD2] hover:border-amber-400 text-[#8B4513] font-bold shadow-2xs transition-colors"
          >
            <Eye className="w-3.5 h-3.5 text-amber-600" />
            <span>Pratinjau Mosaik Lengkap</span>
          </button>
        )}
      </div>
    </div>
  );
};
