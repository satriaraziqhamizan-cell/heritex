import React, { useState, useEffect } from 'react';
import { 
  Puzzle, 
  MapPin, 
  Sparkles, 
  Award, 
  BookOpen, 
  GraduationCap, 
  CheckCircle2, 
  Lock, 
  ArrowRight, 
  Star, 
  Trophy, 
  Bot, 
  RotateCcw, 
  ChevronRight, 
  ChevronLeft,
  X,
  Compass,
  Layers,
  HelpCircle
} from 'lucide-react';
import { 
  PuzzleWorld, 
  PuzzleLevel, 
  PlayerPuzzleProgress 
} from '../../types/puzzleverse';
import { JAMBI_PUZZLE_WORLDS } from '../../data/puzzleverseData';
import { VisualTilePuzzle } from './VisualTilePuzzle';
import { MeaningMatchPuzzle } from './MeaningMatchPuzzle';
import { LanguageSelokoPuzzle } from './LanguageSelokoPuzzle';
import { HistoricalTimelinePuzzle } from './HistoricalTimelinePuzzle';
import { KantiAiCompanionModal } from './KantiAiCompanionModal';
import { GreatMosaicView } from './GreatMosaicView';
import { EducatorDashboardView } from './EducatorDashboardView';
import confetti from 'canvas-confetti';

interface PuzzleverseMainProps {
  onAddXp?: (amount: number, reason: string) => void;
  currentUserXp?: number;
}

export const PuzzleverseMain: React.FC<PuzzleverseMainProps> = ({
  onAddXp,
  currentUserXp = 450
}) => {
  // Mode: Student vs Educator
  const [currentMode, setCurrentMode] = useState<'student' | 'educator'>('student');

  // Student Sub-tabs: 'map' | 'mosaic' | 'badges'
  const [activeSubTab, setActiveSubTab] = useState<'map' | 'mosaic' | 'badges'>('map');

  // Active World Selected on Map
  const [selectedWorldId, setSelectedWorldId] = useState<string>('world-1-warisan');

  // Active Gameplay Session
  const [activeLevel, setActiveLevel] = useState<PuzzleLevel | null>(null);

  // Active Step inside level gameplay: 'play' | 'learn' | 'prove' | 'complete'
  const [gameplayStep, setGameplayStep] = useState<'play' | 'learn' | 'prove' | 'complete'>('play');

  // Kanti AI modal
  const [isKantiAiOpen, setIsKantiAiOpen] = useState<boolean>(false);

  // Quiz State
  const [selectedQuizOptionId, setSelectedQuizOptionId] = useState<string | null>(null);
  const [quizSubmitted, setQuizSubmitted] = useState<boolean>(false);
  const [quizPassed, setQuizPassed] = useState<boolean>(false);

  // Persistent Player Progress State
  const [playerProgress, setPlayerProgress] = useState<PlayerPuzzleProgress>(() => {
    try {
      const saved = localStorage.getItem('heritex_puzzleverse_progress');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not load puzzle progress:', e);
    }
    return {
      completedLevelIds: ['lvl-kajang-lako'], // 1 level completed as demonstration
      levelScores: {
        'lvl-kajang-lako': { stars: 3, bestScore: 95, completedAt: '09/09/2026' }
      },
      unlockedWorldIds: ['world-1-warisan', 'world-2-suara'],
      unlockedMosaicPieces: [0], // Piece 0 unlocked
      totalPuzzleXp: 150,
      earnedBadges: ['badge-arsitektur']
    };
  });

  // Save progress helper
  const saveProgress = (updated: PlayerPuzzleProgress) => {
    setPlayerProgress(updated);
    try {
      localStorage.setItem('heritex_puzzleverse_progress', JSON.stringify(updated));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  };

  const currentWorld = JAMBI_PUZZLE_WORLDS.find(w => w.id === selectedWorldId) || JAMBI_PUZZLE_WORLDS[0];

  // Check if a level is unlocked: either it's the first level of World 1, or the previous level is completed
  const isLevelUnlocked = (level: PuzzleLevel): boolean => {
    if (level.worldId === 'world-1-warisan' && level.levelNumber === 1) return true;
    
    // Check if player has unlocked world
    const world = JAMBI_PUZZLE_WORLDS.find(w => w.id === level.worldId);
    if (world && (currentUserXp < world.requiredXpToUnlock && !playerProgress.unlockedWorldIds.includes(world.id))) {
      return false;
    }

    // If already completed
    if (playerProgress.completedLevelIds.includes(level.id)) return true;

    // Check previous level in world
    const levelsInWorld = world?.levels || [];
    const idx = levelsInWorld.findIndex(l => l.id === level.id);
    if (idx > 0) {
      const prevLevel = levelsInWorld[idx - 1];
      return playerProgress.completedLevelIds.includes(prevLevel.id);
    }

    return true;
  };

  // Launch a Level
  const handleStartLevel = (level: PuzzleLevel) => {
    if (!isLevelUnlocked(level)) return;
    setActiveLevel(level);
    setGameplayStep('play');
    setSelectedQuizOptionId(null);
    setQuizSubmitted(false);
    setQuizPassed(false);
  };

  // Handlers for 3-layer gameplay loop
  const handlePlaySolved = (score: number) => {
    // Step 1: PLAY solved -> move to LEARN after brief celebration
    setTimeout(() => {
      setGameplayStep('learn');
    }, 1200);
  };

  const handleLearnContinue = () => {
    // Step 2: LEARN finished -> move to PROVE
    setGameplayStep('prove');
  };

  const handleQuizSubmit = () => {
    if (!activeLevel || !selectedQuizOptionId) return;
    setQuizSubmitted(true);

    const selected = activeLevel.challengeQuiz.options.find(o => o.id === selectedQuizOptionId);
    if (selected?.isCorrect) {
      setQuizPassed(true);
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });

      // Complete Level!
      const levelId = activeLevel.id;
      const pieceIdx = activeLevel.mosaicPiece.gridIndex;
      const isFirstTime = !playerProgress.completedLevelIds.includes(levelId);

      const newCompletedIds = Array.from(new Set([...playerProgress.completedLevelIds, levelId]));
      const newMosaic = Array.from(new Set([...playerProgress.unlockedMosaicPieces, pieceIdx]));
      const newXp = playerProgress.totalPuzzleXp + activeLevel.xpReward;

      const newProgress: PlayerPuzzleProgress = {
        ...playerProgress,
        completedLevelIds: newCompletedIds,
        unlockedMosaicPieces: newMosaic,
        totalPuzzleXp: newXp,
        levelScores: {
          ...playerProgress.levelScores,
          [levelId]: {
            stars: 3,
            bestScore: 100,
            completedAt: new Date().toLocaleDateString('id-ID')
          }
        }
      };

      saveProgress(newProgress);

      // Reward XP to global user profile!
      if (onAddXp) {
        onAddXp(activeLevel.xpReward, `Menyelesaikan Tantangan Puzzle: ${activeLevel.title}`);
      }

      setTimeout(() => {
        setGameplayStep('complete');
      }, 1500);
    } else {
      setQuizPassed(false);
    }
  };

  // Badges calculation
  const BADGES_CONFIG = [
    {
      id: 'badge-arsitektur',
      name: 'Penjelajah Arsitektur Jambi',
      desc: 'Tuntaskan puzzle Rumah Kajang Lako dan Candi Muaro Jambi',
      icon: '🏛️',
      unlocked: playerProgress.completedLevelIds.includes('lvl-kajang-lako')
    },
    {
      id: 'badge-suara',
      name: 'Pendengar Tradisi Melayu',
      desc: 'Selesaikan puzzle Tari Selampit Delapan dan Seloko Adat Jambi',
      icon: '🎵',
      unlocked: playerProgress.completedLevelIds.includes('lvl-tari-selampit') || playerProgress.completedLevelIds.includes('lvl-seloko-adat-jambi')
    },
    {
      id: 'badge-rasa',
      name: 'Penikmat Rasa Pusaka',
      desc: 'Pahami kearifan gastronomi Tempoyak Patin dan Kopi Kerinci',
      icon: '🍲',
      unlocked: playerProgress.completedLevelIds.includes('lvl-tempoyak-patin')
    },
    {
      id: 'badge-motif',
      name: 'Pecinta Motif & Songket Jambi',
      desc: 'Kuasai filosofi Batik Durian Pecah dan Songket Benang Emas',
      icon: '🧵',
      unlocked: playerProgress.completedLevelIds.includes('lvl-batik-durian-pecah')
    },
    {
      id: 'badge-master',
      name: 'Jambi Cultural Master',
      desc: 'Kumpulkan seluruh 16 keping mosaik peradaban budaya Jambi',
      icon: '👑',
      unlocked: playerProgress.unlockedMosaicPieces.length >= 16
    }
  ];

  return (
    <div className="w-full min-h-[calc(100vh-4rem)] bg-[#FAF8F5] py-6 px-3 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl flex flex-col gap-6">
        
        {/* Top Hub Bar: Branding, Mode Switcher & Global Mosaic Progress */}
        <div className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E8E2D5] shadow-xs flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-[#C85A32] to-[#E67E22] flex items-center justify-center text-white shadow-md shadow-orange-950/20">
              <Puzzle className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg sm:text-xl font-black text-[#132726] tracking-tight">
                  JAMBI PUZZLEVERSE
                </h1>
                <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full bg-orange-100 text-[#9C3817] border border-orange-200">
                  Media Edukasi Interaktif
                </span>
              </div>
              <p className="text-xs text-[#526665]">
                Membangun kembali kepingan pengetahuan dan identitas budaya Jambi melalui game puzzle
              </p>
            </div>
          </div>

          {/* Dual Mode Switcher (Student Mode vs Educator Mode) */}
          <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-[#F4EFE6] border border-[#E5DFD2]">
            <button
              type="button"
              onClick={() => setCurrentMode('student')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentMode === 'student'
                  ? 'bg-[#C85A32] text-white shadow-xs'
                  : 'text-[#4A5E5D] hover:text-[#0D3B3A]'
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Mode Siswa</span>
            </button>

            <button
              type="button"
              onClick={() => setCurrentMode('educator')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentMode === 'educator'
                  ? 'bg-[#1E7773] text-white shadow-xs'
                  : 'text-[#4A5E5D] hover:text-[#0D3B3A]'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Mode Pendidik (Guru)</span>
            </button>
          </div>
        </div>

        {/* ----------------- EDUCATOR MODE VIEW ----------------- */}
        {currentMode === 'educator' && (
          <EducatorDashboardView />
        )}

        {/* ----------------- STUDENT MODE VIEW ----------------- */}
        {currentMode === 'student' && (
          <div className="flex flex-col gap-6">
            
            {/* Student Navigation Sub-tabs */}
            <div className="flex items-center justify-between border-b border-[#E8E2D5] pb-2 overflow-x-auto gap-2 no-scrollbar">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveSubTab('map')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeSubTab === 'map'
                      ? 'bg-[#132726] text-white shadow-xs'
                      : 'bg-white text-[#526665] hover:bg-[#F4EFE6] border border-[#E8E2D5]'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Peta Petualangan 4 Dunia</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSubTab('mosaic')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all relative ${
                    activeSubTab === 'mosaic'
                      ? 'bg-[#132726] text-white shadow-xs'
                      : 'bg-white text-[#526665] hover:bg-[#F4EFE6] border border-[#E8E2D5]'
                  }`}
                >
                  <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                  <span>Mosaik Akbar Jambi</span>
                  <span className="bg-amber-100 text-[#8B4513] text-[10px] font-black px-1.5 py-0.2 rounded-full">
                    {playerProgress.unlockedMosaicPieces.length}/16
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveSubTab('badges')}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                    activeSubTab === 'badges'
                      ? 'bg-[#132726] text-white shadow-xs'
                      : 'bg-white text-[#526665] hover:bg-[#F4EFE6] border border-[#E8E2D5]'
                  }`}
                >
                  <Award className="w-3.5 h-3.5" />
                  <span>Lencana Budaya</span>
                </button>
              </div>

              {/* Cultural XP Pill */}
              <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl shadow-2xs">
                <Trophy className="w-4 h-4 text-[#C85A32]" />
                <span className="text-xs text-[#8B4513] font-bold">
                  {playerProgress.totalPuzzleXp} Cultural XP
                </span>
              </div>
            </div>

            {/* SUB-VIEW 1: WORLD MAP SELECTION & LEVEL PATHWAY */}
            {activeSubTab === 'map' && (
              <div className="flex flex-col gap-6">
                
                {/* 4 Worlds Selector Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                  {JAMBI_PUZZLE_WORLDS.map(world => {
                    const isSelected = selectedWorldId === world.id;
                    const isLocked = currentUserXp < world.requiredXpToUnlock && !playerProgress.unlockedWorldIds.includes(world.id);
                    const worldCompletedCount = world.levels.filter(l => playerProgress.completedLevelIds.includes(l.id)).length;

                    return (
                      <button
                        key={world.id}
                        type="button"
                        onClick={() => {
                          if (!isLocked) setSelectedWorldId(world.id);
                        }}
                        disabled={isLocked}
                        className={`p-4 rounded-3xl border text-left transition-all relative overflow-hidden flex flex-col justify-between min-h-[140px] ${
                          isLocked
                            ? 'bg-[#F2EFE9] border-[#E0D9CC] opacity-70 cursor-not-allowed'
                            : isSelected
                              ? 'bg-white border-[#C85A32] ring-3 ring-[#C85A32]/30 shadow-md scale-101'
                              : 'bg-white border-[#E8E2D5] hover:border-[#C85A32]/60 hover:bg-[#FAF8F5] shadow-xs'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2 mb-2">
                          <span className="text-[10px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-[#F4EFE6] text-[#8B4513]">
                            Dunia 0{world.worldNumber}
                          </span>
                          {isLocked ? (
                            <span className="flex items-center gap-1 text-[10px] text-[#8A9B9A] font-bold">
                              <Lock className="w-3 h-3" />
                              {world.requiredXpToUnlock} XP
                            </span>
                          ) : (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                              {worldCompletedCount}/4 Tuntas
                            </span>
                          )}
                        </div>

                        <div>
                          <h3 className="text-xs sm:text-sm font-extrabold text-[#132726] mb-0.5">
                            {world.name.replace('WORLD ' + world.worldNumber + ': ', '')}
                          </h3>
                          <p className="text-[11px] text-[#526665] line-clamp-1">
                            {world.subName}
                          </p>
                        </div>

                        <div className="mt-2 pt-2 border-t border-[#E8E2D5]/70 flex items-center justify-between text-[10px]">
                          <span className="text-[#8B4513] font-semibold">
                            {world.levels.length} Level Puzzle
                          </span>
                          {isSelected && (
                            <span className="font-bold text-[#C85A32] flex items-center gap-0.5">
                              Aktif <ChevronRight className="w-3 h-3" />
                            </span>
                          )}
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Active World Pathway Visualizer */}
                <div className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-xs">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="w-2.5 h-2.5 rounded-full bg-[#C85A32]" />
                        <h2 className="text-base sm:text-lg font-extrabold text-[#132726]">
                          {currentWorld.name}: {currentWorld.subName}
                        </h2>
                      </div>
                      <p className="text-xs text-[#526665] mt-0.5">
                        {currentWorld.description}
                      </p>
                    </div>

                    <div className="text-xs font-semibold text-[#8B4513] bg-orange-50 px-3 py-1.5 rounded-xl border border-orange-200 self-start sm:self-auto">
                      Selesaikan berurutan untuk membuka keping mosaik
                    </div>
                  </div>

                  {/* Level Pathway Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {currentWorld.levels.map((level, idx) => {
                      const isCompleted = playerProgress.completedLevelIds.includes(level.id);
                      const unlocked = isLevelUnlocked(level);
                      const scoreData = playerProgress.levelScores[level.id];

                      return (
                        <div
                          key={level.id}
                          className={`rounded-2xl border p-4 flex flex-col justify-between transition-all relative overflow-hidden group ${
                            isCompleted
                              ? 'bg-emerald-50/50 border-emerald-300 shadow-xs'
                              : unlocked
                                ? 'bg-white border-[#E8E2D5] hover:border-[#C85A32] hover:shadow-md'
                                : 'bg-[#F7F5F0] border-[#E8E2D5]/60 opacity-65'
                          }`}
                        >
                          <div>
                            {/* Thumbnail & Level Badge */}
                            <div className="relative aspect-video rounded-xl overflow-hidden mb-3 border border-[#E8E2D5]">
                              <img 
                                src={level.thumbnail} 
                                alt={level.title} 
                                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-300"
                              />
                              <div className="absolute top-2 left-2 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur-xs text-white text-[10px] font-black">
                                Level {level.levelNumber}
                              </div>
                              <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded-md bg-[#C85A32] text-white text-[9px] font-bold uppercase tracking-wider">
                                {level.type === 'visual' ? '🧩 Visual' : level.type === 'meaning' ? '🔤 Makna' : level.type === 'language' ? '🗣️ Seloko' : '🏛️ Kronologi'}
                              </div>
                            </div>

                            <div className="text-[10px] font-semibold text-[#8B4513] uppercase tracking-wider mb-0.5">
                              {level.culturalCategory} • {level.regency}
                            </div>
                            <h3 className="text-xs sm:text-sm font-bold text-[#132726] mb-1 leading-snug">
                              {level.title}
                            </h3>
                            <p className="text-[11px] text-[#526665] line-clamp-2 leading-relaxed italic mb-3">
                              "{level.culturalQuote}"
                            </p>
                          </div>

                          {/* Action Button & Completion Status */}
                          <div className="pt-3 border-t border-[#E8E2D5] flex items-center justify-between mt-auto">
                            <div className="flex items-center gap-1">
                              {isCompleted ? (
                                <div className="flex items-center gap-1 text-emerald-700 font-bold text-xs">
                                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                                  <span>Tuntas</span>
                                </div>
                              ) : (
                                <span className="text-[11px] font-bold text-[#C85A32]">
                                  +{level.xpReward} XP
                                </span>
                              )}
                            </div>

                            {unlocked ? (
                              <button
                                type="button"
                                onClick={() => handleStartLevel(level)}
                                className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-all flex items-center gap-1 shadow-2xs ${
                                  isCompleted
                                    ? 'bg-white border border-[#D5CEBF] text-[#526665] hover:bg-[#F4EFE6]'
                                    : 'bg-[#C85A32] hover:bg-[#A33B18] text-white shadow-xs'
                                }`}
                              >
                                <span>{isCompleted ? 'Main Lagi' : 'Mulai'}</span>
                                <ArrowRight className="w-3 h-3" />
                              </button>
                            ) : (
                              <div className="flex items-center gap-1 text-[11px] text-[#8A9B9A] font-semibold">
                                <Lock className="w-3 h-3" />
                                <span>Terkunci</span>
                              </div>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* SUB-VIEW 2: GREAT MOSAIC VIEW */}
            {activeSubTab === 'mosaic' && (
              <GreatMosaicView
                unlockedPieces={playerProgress.unlockedMosaicPieces}
                onSelectLevel={(levelId) => {
                  const targetLevel = JAMBI_PUZZLE_WORLDS.flatMap(w => w.levels).find(l => l.id === levelId);
                  if (targetLevel) handleStartLevel(targetLevel);
                }}
              />
            )}

            {/* SUB-VIEW 3: BADGES & ACHIEVEMENTS */}
            {activeSubTab === 'badges' && (
              <div className="bg-white rounded-3xl p-6 border border-[#E8E2D5] shadow-xs">
                <div className="mb-6">
                  <h2 className="text-lg font-extrabold text-[#132726] flex items-center gap-2">
                    <Award className="w-5 h-5 text-[#C85A32]" />
                    <span>Lencana Kehormatan Penjaga Budaya Jambi</span>
                  </h2>
                  <p className="text-xs text-[#526665] mt-1">
                    Buktikan dedikasimu dengan menuntaskan setiap tantangan pembelajaran dan mengumpulkan lencana eksklusif.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {BADGES_CONFIG.map(badge => (
                    <div
                      key={badge.id}
                      className={`p-4 rounded-2xl border transition-all flex items-start gap-3.5 ${
                        badge.unlocked
                          ? 'bg-gradient-to-br from-amber-50 to-orange-50/50 border-amber-300 shadow-xs'
                          : 'bg-[#F7F5F0] border-[#E8E2D5]/70 opacity-60'
                      }`}
                    >
                      <div className="w-12 h-12 rounded-2xl bg-white border border-[#E8E2D5] flex items-center justify-center text-2xl shadow-xs flex-shrink-0">
                        {badge.icon}
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5 mb-0.5">
                          <h4 className="text-xs sm:text-sm font-bold text-[#132726]">
                            {badge.name}
                          </h4>
                          {badge.unlocked && (
                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                          )}
                        </div>
                        <p className="text-[11px] text-[#526665] leading-relaxed">
                          {badge.desc}
                        </p>
                        <span className={`text-[10px] font-bold mt-2 inline-block ${
                          badge.unlocked ? 'text-[#C85A32]' : 'text-neutral-400'
                        }`}>
                          {badge.unlocked ? '✓ Terbuka' : 'Belum Terbuka'}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        {/* ----------------- ACTIVE GAMEPLAY MODAL (3-LAPISAN: PLAY -> LEARN -> PROVE) ----------------- */}
        {activeLevel && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-xs p-3 sm:p-5 overflow-y-auto animate-fade-in">
            <div className="relative w-full max-w-3xl rounded-3xl bg-[#FAF8F5] border border-[#E8E2D5] shadow-2xl flex flex-col my-auto max-h-[95vh] overflow-hidden">
              
              {/* Modal Top Bar */}
              <div className="bg-white border-b border-[#E8E2D5] px-5 py-3.5 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-black uppercase px-2 py-0.5 rounded-md bg-orange-100 text-[#9C3817]">
                      Level {activeLevel.levelNumber} • {activeLevel.culturalCategory}
                    </span>
                    <span className="text-xs text-[#8A9B9A]">•</span>
                    <span className="text-xs text-[#526665] font-semibold">{activeLevel.regency}</span>
                  </div>
                  <h3 className="text-sm sm:text-base font-extrabold text-[#132726]">
                    {activeLevel.title}
                  </h3>
                </div>

                <div className="flex items-center gap-2">
                  {/* Kanti AI Companion Button */}
                  <button
                    type="button"
                    onClick={() => setIsKantiAiOpen(true)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#0D3B3A] hover:bg-[#165A57] text-white text-xs font-bold shadow-xs transition-all hover:scale-102"
                    title="Buka panduan teman belajar Kanti AI"
                  >
                    <Bot className="w-4 h-4 text-emerald-300" />
                    <span className="hidden sm:inline">Kanti AI</span>
                  </button>

                  {/* Close Modal */}
                  <button
                    type="button"
                    onClick={() => setActiveLevel(null)}
                    className="p-1.5 rounded-xl bg-neutral-100 hover:bg-neutral-200 text-[#526665] transition-colors"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* 3-Layer Step Indicator */}
              <div className="bg-[#F4EFE6] px-5 py-2.5 border-b border-[#E8E2D5] flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 sm:gap-6 font-bold">
                  <div className={`flex items-center gap-1.5 ${
                    gameplayStep === 'play' 
                      ? 'text-[#C85A32]' 
                      : 'text-emerald-700'
                  }`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black ${
                      gameplayStep === 'play' ? 'bg-[#C85A32] text-white' : 'bg-emerald-600 text-white'
                    }`}>
                      1
                    </span>
                    <span>🧩 PLAY (Susun)</span>
                  </div>

                  <span className="text-[#D5CEBF]">➔</span>

                  <div className={`flex items-center gap-1.5 ${
                    gameplayStep === 'learn' 
                      ? 'text-[#C85A32]' 
                      : gameplayStep === 'prove' || gameplayStep === 'complete'
                        ? 'text-emerald-700'
                        : 'text-[#8A9B9A]'
                  }`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black ${
                      gameplayStep === 'learn' 
                        ? 'bg-[#C85A32] text-white' 
                        : gameplayStep === 'prove' || gameplayStep === 'complete'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#E5DFD2] text-[#526665]'
                    }`}>
                      2
                    </span>
                    <span>📖 LEARN (Makna)</span>
                  </div>

                  <span className="text-[#D5CEBF]">➔</span>

                  <div className={`flex items-center gap-1.5 ${
                    gameplayStep === 'prove' 
                      ? 'text-[#C85A32]' 
                      : gameplayStep === 'complete'
                        ? 'text-emerald-700'
                        : 'text-[#8A9B9A]'
                  }`}>
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[11px] font-black ${
                      gameplayStep === 'prove' 
                        ? 'bg-[#C85A32] text-white' 
                        : gameplayStep === 'complete'
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#E5DFD2] text-[#526665]'
                    }`}>
                      3
                    </span>
                    <span>🎯 PROVE (Kuis)</span>
                  </div>
                </div>

                <span className="text-[11px] text-[#8B4513] font-semibold hidden md:inline">
                  {activeLevel.mosaicPiece.label}
                </span>
              </div>

              {/* Step Content Container */}
              <div className="p-4 sm:p-6 overflow-y-auto flex-1">
                
                {/* 1. PLAY STEP */}
                {gameplayStep === 'play' && (
                  <div>
                    {activeLevel.type === 'visual' && activeLevel.visualConfig && (
                      <VisualTilePuzzle
                        imageSrc={activeLevel.visualConfig.imageSrc}
                        gridSize={activeLevel.visualConfig.gridSize}
                        title={activeLevel.title}
                        onSolved={handlePlaySolved}
                      />
                    )}

                    {activeLevel.type === 'meaning' && activeLevel.meaningConfig && (
                      <MeaningMatchPuzzle
                        pairs={activeLevel.meaningConfig.pairs}
                        title={activeLevel.title}
                        onSolved={handlePlaySolved}
                      />
                    )}

                    {activeLevel.type === 'language' && activeLevel.languageConfig && (
                      <LanguageSelokoPuzzle
                        rawPhrase={activeLevel.languageConfig.rawPhrase}
                        words={activeLevel.languageConfig.words}
                        correctOrder={activeLevel.languageConfig.correctOrder}
                        culturalMeaningQuestion={activeLevel.languageConfig.culturalMeaningQuestion}
                        culturalMeaningOptions={activeLevel.languageConfig.culturalMeaningOptions}
                        title={activeLevel.title}
                        onSolved={handlePlaySolved}
                      />
                    )}

                    {activeLevel.type === 'historical' && activeLevel.historicalConfig && (
                      <HistoricalTimelinePuzzle
                        events={activeLevel.historicalConfig.events}
                        title={activeLevel.title}
                        onSolved={handlePlaySolved}
                      />
                    )}
                  </div>
                )}

                {/* 2. LEARN STEP (Edukasi Mendalam setelah Puzzle Selesai) */}
                {gameplayStep === 'learn' && (
                  <div className="flex flex-col gap-4 animate-fade-in max-w-2xl mx-auto">
                    <div className="text-center mb-2">
                      <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#C85A32] bg-orange-100 px-3 py-1 rounded-full">
                        Tahap 2 • Eksplorasi Pengetahuan Budaya
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#132726] mt-2">
                        Kisah di Balik {activeLevel.title}
                      </h3>
                      <p className="text-xs text-[#526665] max-w-md mx-auto mt-0.5">
                        Pelajari sejarah, fungsi sakral, dan falsafah hidupnya sebelum menjawab kuis pembuktian pemahaman.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="p-4 rounded-2xl bg-white border border-[#E8E2D5] shadow-2xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#8B4513] block mb-1">
                          🏛️ Asal Usul & Latar Sejarah
                        </span>
                        <p className="text-xs text-[#2C3E3D] leading-relaxed">
                          {activeLevel.learningMaterial.historicalContext}
                        </p>
                        <span className="text-[10px] text-[#8A9B9A] mt-2 block italic">
                          Wilayah: {activeLevel.learningMaterial.origin}
                        </span>
                      </div>

                      <div className="p-4 rounded-2xl bg-white border border-[#E8E2D5] shadow-2xs">
                        <span className="text-[10px] font-bold uppercase tracking-wider text-[#1E7773] block mb-1">
                          🌿 Makna Filosofis Luhur
                        </span>
                        <p className="text-xs text-[#2C3E3D] leading-relaxed">
                          {activeLevel.learningMaterial.philosophicalMeaning}
                        </p>
                      </div>
                    </div>

                    <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950">
                      <span className="text-xs font-bold text-[#8B4513] flex items-center gap-1.5 mb-1">
                        <Sparkles className="w-4 h-4 text-[#C85A32]" />
                        <span>Kunci Karakter Budaya:</span>
                      </span>
                      <p className="text-xs leading-relaxed text-[#5C2B10] font-medium">
                        "{activeLevel.learningMaterial.keyTakeaway}"
                      </p>
                      <div className="mt-2 text-[10px] text-[#8B4513]/80">
                        Rujukan Arsip Resmi: <strong>{activeLevel.learningMaterial.officialReference}</strong>
                      </div>
                    </div>

                    {/* Action to PROVE */}
                    <div className="flex justify-end mt-2">
                      <button
                        type="button"
                        onClick={handleLearnContinue}
                        className="px-6 py-2.5 rounded-2xl bg-[#C85A32] hover:bg-[#A33B18] text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 hover:scale-102"
                      >
                        <span>Lanjut ke Tantangan Kuis Pemahaman</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* 3. PROVE STEP (Kuis Pemahaman Budaya) */}
                {gameplayStep === 'prove' && (
                  <div className="flex flex-col gap-4 animate-fade-in max-w-2xl mx-auto">
                    <div className="text-center mb-2">
                      <span className="text-[10px] uppercase tracking-widest font-extrabold text-[#1E7773] bg-emerald-100 px-3 py-1 rounded-full">
                        Tahap 3 • Buktikan Pemahamanmu
                      </span>
                      <h3 className="text-lg sm:text-xl font-extrabold text-[#132726] mt-2">
                        Tantangan Kuis Budaya Jambi
                      </h3>
                      <p className="text-xs text-[#526665] max-w-md mx-auto mt-0.5">
                        Jawab pertanyaan ini untuk mengklaim <strong>+{activeLevel.xpReward} Cultural XP</strong> dan membuka keping mosaik!
                      </p>
                    </div>

                    {/* Question Card */}
                    <div className="p-5 rounded-2xl bg-white border border-[#E8E2D5] shadow-xs">
                      <h4 className="text-sm sm:text-base font-bold text-[#132726] mb-4 leading-snug">
                        {activeLevel.challengeQuiz.question}
                      </h4>

                      <div className="flex flex-col gap-2.5">
                        {activeLevel.challengeQuiz.options.map((opt, idx) => {
                          const isSelected = selectedQuizOptionId === opt.id;
                          const showCorrect = quizSubmitted && opt.isCorrect;
                          const showWrong = quizSubmitted && isSelected && !opt.isCorrect;

                          return (
                            <button
                              key={opt.id}
                              type="button"
                              onClick={() => {
                                if (!quizSubmitted) setSelectedQuizOptionId(opt.id);
                              }}
                              disabled={quizSubmitted}
                              className={`p-3.5 rounded-xl border text-left text-xs transition-all flex items-start gap-2.5 ${
                                showCorrect
                                  ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-semibold ring-2 ring-emerald-300'
                                  : showWrong
                                    ? 'bg-red-50 border-red-300 text-red-950'
                                    : isSelected
                                      ? 'bg-amber-50 border-[#C85A32] ring-2 ring-[#C85A32]/40'
                                      : 'bg-[#FAF8F5] border-[#E8E2D5] hover:border-[#1E7773] hover:bg-white'
                              }`}
                            >
                              <span className="font-bold text-[#8B4513]">{String.fromCharCode(65 + idx)}.</span>
                              <span className="leading-relaxed flex-1">{opt.text}</span>
                              {showCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    {/* Feedback when wrong */}
                    {quizSubmitted && !quizPassed && (
                      <div className="p-3.5 rounded-2xl bg-red-50 border border-red-200 text-red-900 text-xs flex items-center justify-between gap-2 animate-shake">
                        <span>Pilihanmu belum tepat. Pelajari kembali materi dan coba lagi!</span>
                        <button
                          type="button"
                          onClick={() => {
                            setQuizSubmitted(false);
                            setSelectedQuizOptionId(null);
                          }}
                          className="px-3 py-1 rounded-lg bg-red-600 text-white font-bold text-xs"
                        >
                          Coba Lagi
                        </button>
                      </div>
                    )}

                    {/* Submit Button */}
                    {!quizSubmitted && (
                      <div className="flex justify-end mt-2">
                        <button
                          type="button"
                          onClick={handleQuizSubmit}
                          disabled={!selectedQuizOptionId}
                          className="px-6 py-2.5 rounded-2xl bg-[#1E7773] hover:bg-[#165A57] disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all flex items-center gap-2 hover:scale-102"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Kirim Jawaban Kuis</span>
                        </button>
                      </div>
                    )}
                  </div>
                )}

                {/* 4. COMPLETE STEP (Perayaan Kemenangan Level & Mosaik) */}
                {gameplayStep === 'complete' && (
                  <div className="flex flex-col items-center text-center p-6 animate-fade-in max-w-lg mx-auto">
                    <div className="w-16 h-16 rounded-3xl bg-gradient-to-tr from-[#C85A32] to-amber-500 flex items-center justify-center text-white shadow-xl shadow-orange-950/20 mb-3">
                      <Trophy className="w-8 h-8" />
                    </div>

                    <span className="text-xs font-black text-amber-700 uppercase tracking-wider mb-1">
                      Level Selesai Sempurna!
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#132726] mb-1">
                      {activeLevel.title}
                    </h3>
                    <p className="text-xs text-[#526665] mb-4 leading-relaxed">
                      Kamu telah menuntaskan ketiga lapisan pembelajaran (Play, Learn, Prove) dan mengukir kepingan identitas budaya Jambi.
                    </p>

                    <div className="grid grid-cols-2 gap-3 w-full mb-5">
                      <div className="p-3.5 rounded-2xl bg-amber-50 border border-amber-200">
                        <span className="text-[10px] text-[#8B4513] font-bold block">Hadiah Budaya</span>
                        <div className="text-base font-black text-[#C85A32]">+{activeLevel.xpReward} XP</div>
                      </div>

                      <div className="p-3.5 rounded-2xl bg-emerald-50 border border-emerald-200">
                        <span className="text-[10px] text-emerald-800 font-bold block">Keping Mosaik Terbuka</span>
                        <div className="text-base font-black text-emerald-700">#{activeLevel.mosaicPiece.gridIndex + 1} Terpasang</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveLevel(null);
                          setActiveSubTab('mosaic');
                        }}
                        className="px-5 py-2.5 rounded-2xl bg-[#0D3B3A] hover:bg-[#165A57] text-white font-bold text-xs shadow-md transition-all flex items-center gap-1.5"
                      >
                        <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                        <span>Buka Mosaik Akbar Jambi</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setActiveLevel(null)}
                        className="px-5 py-2.5 rounded-2xl bg-white border border-[#E8E2D5] text-[#132726] font-bold text-xs hover:bg-[#F4EFE6] transition-all"
                      >
                        Kembali ke Peta Dunia
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Kanti AI Companion Modal Dialog */}
        {activeLevel && (
          <KantiAiCompanionModal
            isOpen={isKantiAiOpen}
            onClose={() => setIsKantiAiOpen(false)}
            level={activeLevel}
          />
        )}

      </div>
    </div>
  );
};
