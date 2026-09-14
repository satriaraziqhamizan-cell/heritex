import React, { useState, useEffect } from 'react';
import { Eye, RotateCcw, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';
import confetti from 'canvas-confetti';

interface VisualTilePuzzleProps {
  imageSrc: string;
  gridSize?: number; // default 3 (3x3 = 9 tiles)
  title: string;
  onSolved: (score: number) => void;
  onHintRequested?: () => void;
}

export const VisualTilePuzzle: React.FC<VisualTilePuzzleProps> = ({
  imageSrc,
  gridSize = 3,
  title,
  onSolved,
  onHintRequested
}) => {
  const totalTiles = gridSize * gridSize;
  
  // State: array of tile indices. Correct state is [0, 1, 2, ..., totalTiles - 1]
  const [tiles, setTiles] = useState<number[]>([]);
  const [selectedTileIndex, setSelectedTileIndex] = useState<number | null>(null);
  const [movesCount, setMovesCount] = useState<number>(0);
  const [isSolved, setIsSolved] = useState<boolean>(false);
  const [showPreviewModal, setShowPreviewModal] = useState<boolean>(false);
  const [hintActive, setHintActive] = useState<boolean>(false);

  // Initialize and shuffle
  const initializePuzzle = () => {
    const original = Array.from({ length: totalTiles }, (_, i) => i);
    // Shuffle ensuring it's not immediately solved
    let shuffled = [...original];
    let isDifferent = false;
    for (let attempts = 0; attempts < 10 && !isDifferent; attempts++) {
      shuffled.sort(() => Math.random() - 0.5);
      if (shuffled.some((val, idx) => val !== idx)) {
        isDifferent = true;
      }
    }
    setTiles(shuffled);
    setSelectedTileIndex(null);
    setMovesCount(0);
    setIsSolved(false);
  };

  useEffect(() => {
    initializePuzzle();
  }, [imageSrc]);

  // Check victory condition whenever tiles change
  useEffect(() => {
    if (tiles.length === totalTiles) {
      const allCorrect = tiles.every((tile, index) => tile === index);
      if (allCorrect && movesCount > 0 && !isSolved) {
        setIsSolved(true);
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
        const score = Math.max(70, 100 - Math.max(0, movesCount - 12) * 2);
        onSolved(score);
      }
    }
  }, [tiles, movesCount]);

  // Handle tile click (swap two tiles)
  const handleTileClick = (index: number) => {
    if (isSolved) return;

    if (selectedTileIndex === null) {
      // First tile selected
      setSelectedTileIndex(index);
    } else if (selectedTileIndex === index) {
      // Deselect
      setSelectedTileIndex(null);
    } else {
      // Swap selectedTileIndex and index
      const newTiles = [...tiles];
      const temp = newTiles[selectedTileIndex];
      newTiles[selectedTileIndex] = newTiles[index];
      newTiles[index] = temp;

      setTiles(newTiles);
      setSelectedTileIndex(null);
      setMovesCount(prev => prev + 1);
    }
  };

  // Quick auto-solve (useful for previewing or testing educational flow)
  const handleAutoSolve = () => {
    const solved = Array.from({ length: totalTiles }, (_, i) => i);
    setTiles(solved);
    setIsSolved(true);
    confetti({ particleCount: 50, spread: 60 });
    onSolved(90);
  };

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto">
      {/* Top Bar Controls */}
      <div className="flex items-center justify-between w-full mb-3 px-1 text-xs">
        <div className="flex items-center gap-2">
          <span className="font-bold text-[#132726] bg-amber-50 border border-amber-200 px-2.5 py-1 rounded-lg">
            Langkah: <strong className="text-[#C85A32]">{movesCount}</strong>
          </span>
          <span className="text-[#526665]">
            Klik 2 keping berurutan untuk menukarnya
          </span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => setShowPreviewModal(!showPreviewModal)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-[#E5DFD2] text-[#4A5E5D] hover:text-[#0D3B3A] hover:bg-[#F4EFE6] transition-colors font-medium shadow-2xs"
            title="Lihat bentuk gambar asli"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>Lihat Asli</span>
          </button>

          <button
            type="button"
            onClick={() => setHintActive(!hintActive)}
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg border transition-colors font-medium shadow-2xs ${
              hintActive 
                ? 'bg-emerald-50 border-emerald-300 text-emerald-800' 
                : 'bg-white border-[#E5DFD2] text-[#4A5E5D] hover:bg-[#F4EFE6]'
            }`}
            title="Tandai nomor keping"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>{hintActive ? 'Sembunyikan Petunjuk' : 'Nomor Keping'}</span>
          </button>

          <button
            type="button"
            onClick={initializePuzzle}
            className="p-1.5 rounded-lg bg-white border border-[#E5DFD2] text-[#4A5E5D] hover:text-[#C85A32] hover:bg-orange-50 transition-colors shadow-2xs"
            title="Acak ulang kepingan"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Preview Modal Popup */}
      {showPreviewModal && (
        <div className="w-full mb-3 p-3 rounded-2xl bg-[#FDFBF7] border border-[#E8C4B5] shadow-xs flex flex-col items-center">
          <div className="flex items-center justify-between w-full mb-2">
            <span className="text-xs font-bold text-[#8B4513]">Panduan Gambar Asli: {title}</span>
            <button
              onClick={() => setShowPreviewModal(false)}
              className="text-xs text-[#8B4513] hover:underline font-bold"
            >
              Tutup ✕
            </button>
          </div>
          <img 
            src={imageSrc} 
            alt={title} 
            className="w-48 h-48 object-cover rounded-xl border border-[#C85A32]/40 shadow-xs"
          />
        </div>
      )}

      {/* The 3x3 Puzzle Canvas */}
      <div 
        className={`relative w-full max-w-[380px] sm:max-w-[420px] aspect-square rounded-2xl p-2.5 bg-[#1F2937] shadow-xl border-4 ${
          isSolved ? 'border-emerald-500 ring-4 ring-emerald-300/50' : 'border-[#D5CEBF]'
        } transition-all`}
      >
        <div 
          className="grid grid-cols-3 gap-1.5 w-full h-full rounded-xl overflow-hidden bg-black/20"
          style={{ gridTemplateColumns: `repeat(${gridSize}, minmax(0, 1fr))` }}
        >
          {tiles.map((tileTargetId, currentSlotIdx) => {
            const isCorrectPosition = tileTargetId === currentSlotIdx;
            const isSelected = selectedTileIndex === currentSlotIdx;

            // Calculate background position offset for 3x3
            const row = Math.floor(tileTargetId / gridSize);
            const col = tileTargetId % gridSize;
            const posX = (col / (gridSize - 1)) * 100;
            const posY = (row / (gridSize - 1)) * 100;

            return (
              <button
                key={currentSlotIdx}
                type="button"
                onClick={() => handleTileClick(currentSlotIdx)}
                disabled={isSolved}
                className={`relative group w-full h-full rounded-lg overflow-hidden transition-all duration-200 cursor-pointer select-none focus:outline-hidden ${
                  isSelected 
                    ? 'ring-4 ring-[#C85A32] scale-96 z-10 brightness-110 shadow-lg' 
                    : 'hover:brightness-105 active:scale-98'
                } ${
                  isSolved 
                    ? 'ring-1 ring-emerald-400/40' 
                    : isCorrectPosition && hintActive 
                      ? 'ring-2 ring-emerald-400' 
                      : 'border border-white/20'
                }`}
                style={{
                  backgroundImage: `url(${imageSrc})`,
                  backgroundSize: `${gridSize * 100}% ${gridSize * 100}%`,
                  backgroundPosition: `${posX}% ${posY}%`,
                  backgroundRepeat: 'no-repeat'
                }}
              >
                {/* Visual indicators */}
                {isSelected && (
                  <div className="absolute inset-0 bg-[#C85A32]/20 backdrop-brightness-110 flex items-center justify-center">
                    <span className="text-[11px] font-extrabold bg-[#C85A32] text-white px-2 py-0.5 rounded-md shadow-xs">
                      Pilih Tujuan
                    </span>
                  </div>
                )}

                {/* Hint indicator */}
                {hintActive && (
                  <div className="absolute top-1 left-1 bg-black/70 text-white font-mono font-bold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-xs">
                    {tileTargetId + 1}
                  </div>
                )}

                {isCorrectPosition && !isSolved && (
                  <div className="absolute bottom-1 right-1 opacity-70 group-hover:opacity-100 transition-opacity">
                    <span className="flex h-4 w-4 items-center justify-center rounded-full bg-emerald-600 text-white text-[9px] font-bold">
                      ✓
                    </span>
                  </div>
                )}
              </button>
            );
          })}
        </div>

        {/* Solved Overlay */}
        {isSolved && (
          <div className="absolute inset-0 bg-emerald-950/80 backdrop-blur-xs rounded-2xl flex flex-col items-center justify-center text-white p-6 text-center animate-fade-in">
            <div className="w-14 h-14 rounded-full bg-emerald-500/30 border-2 border-emerald-400 flex items-center justify-center mb-3">
              <CheckCircle2 className="w-8 h-8 text-emerald-300" />
            </div>
            <h3 className="text-lg font-extrabold mb-1">Maha Karya Tersusun Rapi!</h3>
            <p className="text-xs text-emerald-100 max-w-xs mb-3">
              Kamu berhasil merekonstruksi gambar budaya <strong>{title}</strong> dalam {movesCount} langkah.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs bg-emerald-800/80 text-emerald-200 px-3 py-1 rounded-full font-bold border border-emerald-600">
                +1 Keping Mosaik Budaya
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer controls & Skip for accessibility/testing */}
      <div className="flex items-center justify-between w-full max-w-[420px] mt-3 pt-2 border-t border-[#E8E2D5] text-xs">
        <div className="flex items-center gap-1 text-[#667085]">
          <AlertCircle className="w-3.5 h-3.5" />
          <span>Tersusun: {tiles.filter((t, idx) => t === idx).length} / {totalTiles} keping</span>
        </div>

        {!isSolved && (
          <button
            type="button"
            onClick={handleAutoSolve}
            className="text-[11px] text-[#C85A32] hover:text-[#9C3817] font-semibold underline"
          >
            Bantu Susun Otomatis
          </button>
        )}
      </div>
    </div>
  );
};
