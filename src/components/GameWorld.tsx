import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Compass, 
  MapPin, 
  Lock, 
  Unlock, 
  CheckCircle2, 
  Navigation,
  ChevronRight,
  BookOpen, 
  Award,
  Gamepad2,
  Sparkles,
  Zap,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  HelpCircle,
  Trophy,
  X,
  Play
} from 'lucide-react';
import { CulturalObject, WorldRegion } from '../types';

interface GameWorldProps {
  worlds: WorldRegion[];
  currentWorld: WorldRegion;
  setCurrentWorld: (world: WorldRegion) => void;
  culturalObjects: CulturalObject[];
  onSelectObject: (obj: CulturalObject) => void;
  verifiedObjectIds: Set<string>;
  currentUserXp?: number;
  onAwardBonusXp?: (xp: number) => void;
}

export const GameWorld: React.FC<GameWorldProps> = ({
  worlds,
  currentWorld,
  setCurrentWorld,
  culturalObjects,
  onSelectObject,
  verifiedObjectIds,
  currentUserXp = 0,
  onAwardBonusXp
}) => {
  // Avatar Player Coordinates on Map Canvas (Percentage: 0-100)
  const [avatarPos, setAvatarPos] = useState({ x: 55, y: 46 });
  const [isMoving, setIsMoving] = useState(false);
  const [selectedPin, setSelectedPin] = useState<CulturalObject | null>(null);

  // Locked World Click Alert Modal
  const [lockedWorldAlert, setLockedWorldAlert] = useState<WorldRegion | null>(null);

  // Mini-Game Trivia State
  const [isMiniGameOpen, setIsMiniGameOpen] = useState(false);
  const [triviaIndex, setTriviaIndex] = useState(0);
  const [triviaScore, setTriviaScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [miniGameFinished, setMiniGameFinished] = useState(false);

  // Trivia questions
  const triviaQuestions = [
    {
      question: 'Berapa jumlah penari dalam Tari Selampit Delapan khas Jambi?',
      options: ['4 Penari Tunggal', '8 Penari (4 Pasang)', '12 Penari Dayang'],
      correctIndex: 1,
      explanation: 'Tari Selampit Delapan ditarikan oleh 8 orang penari yang menganyam 8 helai selendang sutra warna-warni secara ritmis dan kompak.'
    },
    {
      question: 'Bahan alami apa yang digunakan untuk menghasilkan warna kuning keemasan pada Batik Jambi tradisional?',
      options: ['Kayu Tembesu & Kunyit Hutan', 'Kulit Buah Manggis', 'Getah Karet Hitam'],
      correctIndex: 0,
      explanation: 'Kayu tembesu dan rimpang kunyit hutan merupakan pewarna alami warisan perajin batik seberang Kota Jambi.'
    },
    {
      question: 'Apa keunikan teknik rekayasa Rumah Tuo Batin Rantau Panjang yang membuatnya tahan gempa?',
      options: ['Cor semen bertulang modern', 'Sistem pasak knock-down kayu ulin tanpa paku logam', 'Dinding batu bata merah tebal'],
      correctIndex: 1,
      explanation: 'Konstruksi pasak kayu bersendi elastis menyerap getaran gempa tanpa merusak struktur utama balok rumah panggung.'
    }
  ];

  // Filter objects for the active world
  const activeObjects = culturalObjects.filter(o => o.worldId === currentWorld.id);
  const verifiedCountInWorld = activeObjects.filter(o => verifiedObjectIds.has(o.id)).length;
  const progressPercent = activeObjects.length > 0 
    ? Math.round((verifiedCountInWorld / activeObjects.length) * 100) 
    : 0;

  // Sync selected pin on world change
  useEffect(() => {
    if (activeObjects.length > 0) {
      setSelectedPin(activeObjects[0]);
      setAvatarPos({ x: activeObjects[0].mapX, y: activeObjects[0].mapY });
    } else {
      setSelectedPin(null);
    }
  }, [currentWorld.id]);

  // Handle World Selection with Progressive Unlock Validation
  const handleSelectWorld = (targetWorld: WorldRegion) => {
    if (targetWorld.isUnlocked) {
      setCurrentWorld(targetWorld);
    } else {
      setLockedWorldAlert(targetWorld);
    }
  };

  // Move avatar to a cultural landmark
  const handleTravelToObject = (obj: CulturalObject) => {
    setIsMoving(true);
    setAvatarPos({ x: obj.mapX, y: obj.mapY });
    setSelectedPin(obj);

    setTimeout(() => {
      setIsMoving(false);
    }, 400);
  };

  // Step avatar with direction
  const handleMoveStep = (direction: 'up' | 'down' | 'left' | 'right') => {
    const step = 5;
    setIsMoving(true);
    setAvatarPos(prev => {
      let nx = prev.x;
      let ny = prev.y;
      if (direction === 'up') ny = Math.max(12, prev.y - step);
      if (direction === 'down') ny = Math.min(88, prev.y + step);
      if (direction === 'left') nx = Math.max(12, prev.x - step);
      if (direction === 'right') nx = Math.min(88, prev.x + step);

      // Check proximity to nearest landmark
      const nearest = activeObjects.find(obj => {
        const dx = obj.mapX - nx;
        const dy = obj.mapY - ny;
        return Math.sqrt(dx * dx + dy * dy) < 10;
      });
      if (nearest) {
        setSelectedPin(nearest);
      }

      return { x: nx, y: ny };
    });

    setTimeout(() => {
      setIsMoving(false);
    }, 200);
  };

  // Keyboard navigation for WASD and Arrow Keys
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (['INPUT', 'TEXTAREA'].includes((e.target as HTMLElement).tagName)) return;

      if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        handleMoveStep('up');
      } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        handleMoveStep('down');
      } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        handleMoveStep('left');
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        handleMoveStep('right');
      } else if (e.key === ' ' || e.key === 'Enter') {
        if (selectedPin) {
          onSelectObject(selectedPin);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedPin, activeObjects]);

  // Handle Trivia Answer
  const handleAnswerTrivia = (index: number) => {
    if (isAnswered) return;
    setSelectedAnswer(index);
    setIsAnswered(true);

    const isCorrect = index === triviaQuestions[triviaIndex].correctIndex;
    if (isCorrect) {
      setTriviaScore(prev => prev + 1);
    }
  };

  const handleNextTrivia = () => {
    if (triviaIndex < triviaQuestions.length - 1) {
      setTriviaIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setIsAnswered(false);
    } else {
      setMiniGameFinished(true);
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
      if (onAwardBonusXp) {
        onAwardBonusXp(100);
      }
    }
  };

  const handleResetMiniGame = () => {
    setTriviaIndex(0);
    setTriviaScore(0);
    setSelectedAnswer(null);
    setIsAnswered(false);
    setMiniGameFinished(false);
    setIsMiniGameOpen(false);
  };

  return (
    <div className="space-y-6">
      
      {/* 1. PROGRESSIVE WORLD SELECTOR ("PILOT JAMBI → SCALE UP") */}
      <div className="rounded-3xl bg-white border border-[#E5DFD2] p-5 sm:p-6 shadow-sm space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-md bg-[#0D3B3A] px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-xs">
                <Compass className="w-3.5 h-3.5 text-amber-300" />
                Peta Penjelajahan Progresif
              </span>
              <span className="rounded-md bg-[#FAF5EE] px-2.5 py-0.5 text-[10px] font-semibold text-[#C85A32] border border-[#E8C4B5]">
                Pilot Jambi → Scale-Up Nusantara
              </span>
            </div>
            <h2 className="font-serif text-lg sm:text-xl font-bold text-[#0D3B3A] mt-1">
              Pilih Wilayah Khazanah Budaya
            </h2>
            <p className="text-xs text-[#526665]">
              Buka gerbang penjelajahan wilayah baru secara bertahap melalui akumulasi XP dari verifikasi fakta cagar budaya.
            </p>
          </div>

          <div className="flex items-center gap-2 bg-[#FAF8F5] px-3.5 py-2 rounded-2xl border border-[#E5DFD2] shrink-0">
            <Award className="w-4 h-4 text-[#C85A32]" />
            <div className="text-xs">
              <span className="text-[#637675] text-[10px] block">Total XP Anda Saat Ini:</span>
              <span className="font-bold text-[#0D3B3A] font-mono text-sm">{currentUserXp} XP</span>
            </div>
          </div>
        </div>

        {/* 3 World Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 pt-1">
          {worlds.map((world) => {
            const isCurrent = currentWorld.id === world.id;
            const isUnlocked = world.isUnlocked;
            const reqXp = world.requiredXpOrProgress;
            const progressToUnlock = reqXp > 0 ? Math.min(100, Math.round((currentUserXp / reqXp) * 100)) : 100;
            const remainingXp = Math.max(0, reqXp - currentUserXp);

            return (
              <button
                key={world.id}
                id={`btn-select-world-${world.id}`}
                onClick={() => handleSelectWorld(world)}
                className={`relative text-left p-4 rounded-2xl border-2 transition-all duration-200 flex flex-col justify-between gap-3 group ${
                  isCurrent
                    ? 'bg-[#FAF5EE] border-[#C85A32] shadow-md ring-2 ring-[#C85A32]/20'
                    : isUnlocked
                      ? 'bg-white hover:bg-[#FAF8F5] border-[#E5DFD2] hover:border-[#C85A32]/60 shadow-2xs'
                      : 'bg-[#F9F7F4] border-[#E5DFD2]/70 opacity-90 hover:opacity-100 hover:border-amber-400'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider flex items-center gap-1 ${
                      isCurrent
                        ? 'bg-[#C85A32] text-white'
                        : isUnlocked
                          ? 'bg-[#EAF6F5] text-[#1E7773] border border-[#278B86]'
                          : 'bg-amber-100 text-amber-900 border border-amber-300'
                    }`}>
                      {isCurrent ? (
                        <><span>●</span> Wilayah Aktif</>
                      ) : isUnlocked ? (
                        <><span>✓</span> Terbuka</>
                      ) : (
                        <><Lock className="w-3 h-3 text-amber-800" /> Terkunci ({reqXp} XP)</>
                      )}
                    </span>

                    <span className="text-[10px] font-semibold text-[#637675] bg-white/80 px-2 py-0.5 rounded border border-[#E5DFD2]">
                      {world.objectCount} Objek
                    </span>
                  </div>

                  <h3 className="font-serif text-sm font-bold text-[#0D3B3A] line-clamp-1 group-hover:text-[#C85A32] transition-colors">
                    {world.name}
                  </h3>
                  <p className="text-[11px] text-[#637675] mt-1 line-clamp-2 leading-relaxed">
                    {world.description}
                  </p>
                </div>

                {/* Bottom Lock / Progress Status */}
                <div className="pt-2 border-t border-[#EFECE4] w-full">
                  {isUnlocked ? (
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-[#1E7773] font-medium flex items-center gap-1">
                        <Unlock className="w-3 h-3" /> Akses Penuh
                      </span>
                      <span className="text-[#C85A32] font-semibold text-[10px] group-hover:underline">
                        {isCurrent ? 'Sedang Dijelajahi' : 'Buka Peta →'}
                      </span>
                    </div>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[10px]">
                        <span className="text-amber-900 font-semibold flex items-center gap-1">
                          <Lock className="w-3 h-3 text-amber-700" /> Butuh {reqXp} XP
                        </span>
                        <span className="font-mono text-[#C85A32] font-bold">
                          {currentUserXp}/{reqXp} ({progressToUnlock}%)
                        </span>
                      </div>
                      
                      {/* XP Progress Bar towards Unlock */}
                      <div className="h-2 w-full rounded-full bg-amber-100 overflow-hidden border border-amber-200">
                        <div 
                          className="h-full bg-gradient-to-r from-amber-500 to-[#C85A32] rounded-full transition-all duration-500"
                          style={{ width: `${progressToUnlock}%` }}
                        />
                      </div>
                      <span className="text-[9px] text-[#637675] block text-right font-medium">
                        Kurang {remainingXp} XP lagi
                      </span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. PROMINENT GAME CALLOUT & ACTIVE WORLD MISSION HUB */}
      <div className="rounded-3xl bg-white border border-[#E5DFD2] p-5 sm:p-6 shadow-sm relative overflow-hidden">
        
        {/* Soft background accents */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-[#C85A32]/5 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/3 w-60 h-60 bg-[#278B86]/5 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-5">
          
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="flex items-center gap-1.5 rounded-md bg-[#C85A32] px-2.5 py-0.5 text-[10px] font-bold text-white uppercase tracking-wider shadow-xs">
                <Gamepad2 className="w-3.5 h-3.5" />
                Mode Petualangan
              </span>
              <span className="rounded-md bg-[#FAF5EE] px-2.5 py-0.5 text-[10px] font-semibold text-[#A64522] border border-[#E8C4B5]">
                {currentWorld.name}
              </span>
            </div>

            <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B3A] tracking-tight">
              Penjelajahan Khazanah Budaya & Seloko Adat
            </h1>
            
            <p className="text-xs sm:text-sm text-[#4A5E5D] max-w-2xl leading-relaxed">
              Jelajahi peta interaktif cagar budaya! Gerakkan karakter penjelajah dengan tombol <strong>WASD / Tombol Panah</strong>, kunjungi landmark situs bersejarah, dan selesaikan <strong>Siklus 5 Tahap Uji Fakta</strong> untuk meraih XP & lencana pusaka.
            </p>
          </div>

          {/* Direct Game Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              id="btn-play-mission-now"
              onClick={() => {
                if (selectedPin) onSelectObject(selectedPin);
                else if (activeObjects.length > 0) onSelectObject(activeObjects[0]);
              }}
              disabled={activeObjects.length === 0}
              className="flex items-center gap-2 px-5 py-3 rounded-2xl bg-[#C85A32] hover:bg-[#B54E27] disabled:opacity-50 text-white font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
            >
              <Zap className="w-4 h-4 fill-current text-white" />
              <span>Mainkan Misi Budaya (+275 XP)</span>
            </button>

            <button
              id="btn-open-minigame-trivia"
              onClick={() => {
                setTriviaIndex(0);
                setTriviaScore(0);
                setSelectedAnswer(null);
                setIsAnswered(false);
                setMiniGameFinished(false);
                setIsMiniGameOpen(true);
              }}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-[#FAF8F5] hover:bg-[#F3EFE6] text-[#0D3B3A] border border-[#E5DFD2] text-xs font-semibold shadow-2xs transition-all"
            >
              <Sparkles className="w-4 h-4 text-[#C85A32]" />
              <span>Mini-Game: Kuis Kilat Pusaka</span>
            </button>
          </div>

        </div>

        {/* Quest Progress Bar in Current World */}
        <div className="mt-4 pt-3 border-t border-[#EFECE4] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <span className="text-[#637675] text-[11px]">Progres Misi {currentWorld.name.split(' ')[0]} {currentWorld.name.split(' ')[1]}:</span>
            <div className="h-2.5 w-40 sm:w-56 rounded-full bg-[#FAF8F5] overflow-hidden border border-[#E5DFD2]">
              <div 
                className="h-full bg-gradient-to-r from-[#C85A32] to-[#E27650] rounded-full transition-all duration-500"
                style={{ width: `${progressPercent}%` }}
              />
            </div>
            <span className="font-bold text-[#C85A32] font-mono text-xs">{progressPercent}%</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[#637675] text-[11px]">Cagar Budaya Terverifikasi:</span>
            <span className="text-[#1E7773] font-bold font-mono">
              {verifiedCountInWorld} / {activeObjects.length} Objek
            </span>
          </div>
        </div>

      </div>

      {/* 3. MAIN INTERACTIVE MAP & LANDMARK CANVAS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left 2 Cols: The 2D Cultural World Stage */}
        <div className="lg:col-span-2 space-y-3">
          <div className="relative aspect-[4/3] w-full rounded-3xl overflow-hidden border-2 border-[#E5DFD2] bg-[#FAF6EE] shadow-md select-none group">
            
            {/* Dynamic Illustrated Terrain (Custom per world) */}
            <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="none" viewBox="0 0 1000 750">
              <defs>
                <linearGradient id="riverGrad" x1="0%" y1="100%" x2="100%" y2="20%">
                  <stop offset="0%" stopColor="#2A7B76" stopOpacity="0.85" />
                  <stop offset="50%" stopColor="#3E9B95" stopOpacity="0.8" />
                  <stop offset="100%" stopColor="#1E6561" stopOpacity="0.9" />
                </linearGradient>
                <linearGradient id="mountainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#6C8B72" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#54755A" stopOpacity="0.75" />
                </linearGradient>
                <linearGradient id="seaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#D2E8E6" />
                  <stop offset="100%" stopColor="#BCE0DC" />
                </linearGradient>
              </defs>

              {/* Base terrain background */}
              <rect width="1000" height="750" fill={currentWorld.id === 'world-nusantara' ? "url(#seaGrad)" : "#F4EFE6"} />

              {/* World 1: DUNIA JAMBI */}
              {currentWorld.id === 'world-jambi' && (
                <>
                  {/* Topography: Mountain Range Bukit Barisan (West side) */}
                  <path d="M 0,0 L 330,0 L 290,300 L 230,500 L 160,750 L 0,750 Z" fill="url(#mountainGrad)" />
                  <polygon points="120,680 180,540 240,680" fill="#5F8165" opacity="0.6" />
                  <polygon points="50,450 140,310 200,450" fill="#5F8165" opacity="0.6" />
                  <polygon points="160,740 210,600 260,740" fill="#4B6E52" opacity="0.6" />
                  {/* Rain Forest Adat Bukit Duabelas */}
                  <ellipse cx="290" cy="330" rx="120" ry="90" fill="#75987A" opacity="0.5" />
                  {/* Sungai Batanghari */}
                  <path d="M 120,700 C 260,620 280,480 390,460 C 500,440 480,280 610,240 C 720,200 850,260 1000,210" fill="none" stroke="url(#riverGrad)" strokeWidth="32" strokeLinecap="round" />
                  <path d="M 120,700 C 260,620 280,480 390,460 C 500,440 480,280 610,240 C 720,200 850,260 1000,210" fill="none" stroke="#A8DDD9" strokeWidth="3" strokeDasharray="6 10" opacity="0.8" />
                  {/* Tributaries */}
                  <path d="M 390,460 Q 360,600 380,680" fill="none" stroke="#2A7B76" strokeWidth="14" opacity="0.75" />
                  <path d="M 610,240 Q 640,360 670,420" fill="none" stroke="#2A7B76" strokeWidth="12" opacity="0.75" />
                  {/* East Coast Estuary */}
                  <path d="M 900,0 L 1000,0 L 1000,420 L 870,300 Z" fill="#205E5A" opacity="0.65" />
                </>
              )}

              {/* World 2: DUNIA SUMATRA RAYA */}
              {currentWorld.id === 'world-sumatra' && (
                <>
                  {/* Sumatra Island Shape */}
                  <path d="M 150,50 L 350,150 L 500,320 L 680,520 L 850,720 L 780,750 L 550,600 L 400,420 L 250,260 L 100,100 Z" fill="#EADFCF" stroke="#D3C5AF" strokeWidth="4" />
                  {/* Bukit Barisan Spine */}
                  <path d="M 120,80 L 240,240 L 380,400 L 530,580 L 750,730" fill="none" stroke="#5F8165" strokeWidth="24" strokeLinecap="round" opacity="0.6" />
                  {/* Danau Toba */}
                  <ellipse cx="280" cy="220" rx="35" ry="22" fill="#2A7B76" opacity="0.9" />
                  {/* Musi River Palembang */}
                  <path d="M 520,550 Q 640,560 760,510" fill="none" stroke="#2A7B76" strokeWidth="16" strokeLinecap="round" />
                  {/* Malacca Strait */}
                  <path d="M 360,120 L 550,280 L 750,450" fill="none" stroke="#A8DDD9" strokeWidth="4" strokeDasharray="8 8" opacity="0.7" />
                </>
              )}

              {/* World 3: SEMESTA BUDAYA NUSANTARA */}
              {currentWorld.id === 'world-nusantara' && (
                <>
                  {/* Sumatra */}
                  <path d="M 60,180 L 140,240 L 220,380 L 200,410 L 120,300 L 50,200 Z" fill="#E8DEC9" stroke="#CFC2A7" strokeWidth="3" />
                  {/* Jawa */}
                  <path d="M 230,460 L 440,490 L 450,510 L 240,485 Z" fill="#E8DEC9" stroke="#CFC2A7" strokeWidth="3" />
                  {/* Kalimantan */}
                  <path d="M 280,260 L 420,240 L 440,360 L 340,390 L 270,340 Z" fill="#E8DEC9" stroke="#CFC2A7" strokeWidth="3" />
                  {/* Sulawesi */}
                  <path d="M 480,260 L 530,240 L 540,310 L 590,320 L 530,400 L 490,380 Z" fill="#E8DEC9" stroke="#CFC2A7" strokeWidth="3" />
                  {/* Bali & Nusa Tenggara */}
                  <path d="M 460,510 L 620,530 L 610,545 L 455,525 Z" fill="#E8DEC9" stroke="#CFC2A7" strokeWidth="3" />
                  {/* Maluku */}
                  <ellipse cx="660" cy="320" rx="40" ry="60" fill="#E8DEC9" stroke="#CFC2A7" strokeWidth="3" />
                  {/* Papua */}
                  <path d="M 740,310 L 890,320 L 950,420 L 860,470 L 750,430 L 720,360 Z" fill="#E8DEC9" stroke="#CFC2A7" strokeWidth="3" />
                  {/* Maritime shipping / trade lines */}
                  <path d="M 80,200 C 260,350 480,300 750,330 C 850,340 920,410 950,430" fill="none" stroke="#278B86" strokeWidth="3" strokeDasharray="6 8" opacity="0.6" />
                </>
              )}
            </svg>

            {/* Geographical Region Labels on Canvas */}
            {currentWorld.id === 'world-jambi' && (
              <>
                <div className="absolute top-4 left-5 pointer-events-none">
                  <span className="text-[10px] font-sans font-semibold tracking-wide text-[#0D3B3A] bg-white/90 px-2.5 py-1 rounded-md border border-[#E5DFD2] shadow-xs">
                    Pegunungan Kerinci & Danau Gunung Tujuh
                  </span>
                </div>
                <div className="absolute top-1/2 left-1/3 -translate-y-1/2 pointer-events-none">
                  <span className="text-[10px] font-sans font-semibold tracking-wide text-[#0D3B3A] bg-white/90 px-2.5 py-1 rounded-md border border-[#E5DFD2] shadow-xs">
                    Alur Sungai Batanghari
                  </span>
                </div>
                <div className="absolute bottom-5 right-6 pointer-events-none">
                  <span className="text-[10px] font-sans font-semibold tracking-wide text-[#0D3B3A] bg-white/90 px-2.5 py-1 rounded-md border border-[#E5DFD2] shadow-xs">
                    Kawasan Percandian Muaro Jambi (3.981 Ha)
                  </span>
                </div>
              </>
            )}

            {currentWorld.id === 'world-sumatra' && (
              <>
                <div className="absolute top-4 left-6 pointer-events-none">
                  <span className="text-[10px] font-sans font-semibold tracking-wide text-[#0D3B3A] bg-white/90 px-2.5 py-1 rounded-md border border-[#E5DFD2] shadow-xs">
                    Kesultanan Aceh & Danau Toba
                  </span>
                </div>
                <div className="absolute top-1/2 left-1/4 pointer-events-none">
                  <span className="text-[10px] font-sans font-semibold tracking-wide text-[#0D3B3A] bg-white/90 px-2.5 py-1 rounded-md border border-[#E5DFD2] shadow-xs">
                    Minangkabau & Lembah Batanghari
                  </span>
                </div>
                <div className="absolute bottom-6 right-8 pointer-events-none">
                  <span className="text-[10px] font-sans font-semibold tracking-wide text-[#0D3B3A] bg-white/90 px-2.5 py-1 rounded-md border border-[#E5DFD2] shadow-xs">
                    Pusat Kedatuan Sriwijaya & Selat Sunda
                  </span>
                </div>
              </>
            )}

            {currentWorld.id === 'world-nusantara' && (
              <>
                <div className="absolute top-4 left-6 pointer-events-none">
                  <span className="text-[10px] font-sans font-semibold tracking-wide text-[#0D3B3A] bg-white/90 px-2.5 py-1 rounded-md border border-[#E5DFD2] shadow-xs">
                    Sumatra & Sabang
                  </span>
                </div>
                <div className="absolute top-6 left-1/2 -translate-x-1/2 pointer-events-none">
                  <span className="text-[10px] font-sans font-semibold tracking-wide text-[#0D3B3A] bg-white/90 px-2.5 py-1 rounded-md border border-[#E5DFD2] shadow-xs">
                    Kalimantan & Sulawesi
                  </span>
                </div>
                <div className="absolute bottom-6 right-8 pointer-events-none">
                  <span className="text-[10px] font-sans font-semibold tracking-wide text-[#0D3B3A] bg-white/90 px-2.5 py-1 rounded-md border border-[#E5DFD2] shadow-xs">
                    Maluku & Tanah Papua (Merauke)
                  </span>
                </div>
              </>
            )}

            {/* Click-to-Travel Canvas Handler */}
            <div 
              className="absolute inset-0 cursor-pointer"
              onClick={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = Math.round(((e.clientX - rect.left) / rect.width) * 100);
                const y = Math.round(((e.clientY - rect.top) / rect.height) * 100);
                setIsMoving(true);
                setAvatarPos({ x, y });
                setTimeout(() => setIsMoving(false), 300);
              }}
            />

            {/* Cultural Object Landmarks (Pins) */}
            {activeObjects.map((obj) => {
              const isVerified = verifiedObjectIds.has(obj.id);
              const isSelected = selectedPin?.id === obj.id;

              return (
                <div
                  key={obj.id}
                  style={{ left: `${obj.mapX}%`, top: `${obj.mapY}%` }}
                  className="absolute -translate-x-1/2 -translate-y-1/2 z-20"
                >
                  <button
                    id={`map-pin-${obj.id}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleTravelToObject(obj);
                    }}
                    className={`group relative flex flex-col items-center focus:outline-none transition-all duration-200 ${
                      isSelected ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                  >
                    {/* Pin Icon Bubble */}
                    <div className={`relative flex h-10 w-10 items-center justify-center rounded-2xl shadow-md transition-all border-2 ${
                      isVerified 
                        ? 'bg-[#1E7773] text-white border-white shadow-[#1E7773]/40' 
                        : isSelected 
                          ? 'bg-[#C85A32] text-white border-white ring-4 ring-[#C85A32]/30 animate-pulse shadow-lg' 
                          : obj.threatLevel === 'critical'
                            ? 'bg-[#B3261E] text-white border-white'
                            : 'bg-white text-[#C85A32] border-[#C85A32] hover:bg-[#FAF5EE]'
                    }`}>
                      {isVerified ? (
                        <CheckCircle2 className="w-5 h-5" />
                      ) : (
                        <MapPin className="w-5 h-5" />
                      )}
                    </div>

                    {/* Floating Label */}
                    <div className="absolute top-11 whitespace-nowrap rounded-md bg-white px-2 py-0.5 text-[10px] font-semibold text-[#0D3B3A] border border-[#E5DFD2] shadow-xs pointer-events-none">
                      <span>{obj.name.split(' ')[0]}</span>
                      {isVerified && <span className="text-[#1E7773] ml-1 font-bold">✓</span>}
                    </div>
                  </button>
                </div>
              );
            })}

            {/* Avatar Player Character (Penjelajah Budaya) */}
            <div
              style={{ left: `${avatarPos.x}%`, top: `${avatarPos.y}%` }}
              className="absolute -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none transition-all duration-300 ease-out"
            >
              <div className="relative flex flex-col items-center">
                
                {/* Proximity prompt when near selected object */}
                {selectedPin && (
                  <div className="absolute -top-10 whitespace-nowrap rounded-lg bg-[#C85A32] text-white px-2.5 py-0.5 text-[9px] font-bold shadow-md animate-bounce flex items-center gap-1">
                    <Play className="w-2.5 h-2.5 fill-current" />
                    <span>Klik Misi {selectedPin.name.split(' ')[0]}!</span>
                  </div>
                )}

                <div className="flex h-9 w-9 items-center justify-center rounded-2xl bg-[#C85A32] text-white font-bold shadow-lg ring-2 ring-white">
                  <Navigation className="w-5 h-5 fill-current rotate-45" />
                </div>

                <div className="mt-1 rounded bg-[#0D3B3A] px-2 py-0.5 text-[9px] font-semibold text-white shadow-xs whitespace-nowrap">
                  Penjelajah
                </div>
              </div>
            </div>

            {/* VIRTUAL D-PAD CONTROLLER ON MAP (BOTTOM-LEFT) */}
            <div className="absolute bottom-4 left-4 z-30 bg-white/95 backdrop-blur-md rounded-2xl p-2 border border-[#E5DFD2] shadow-lg flex flex-col items-center gap-1 select-none">
              <span className="text-[8px] font-bold text-[#C85A32] uppercase tracking-widest mb-0.5">
                Kontrol D-Pad
              </span>
              
              {/* Up Button */}
              <button
                id="dpad-btn-up"
                onClick={(e) => {
                  e.stopPropagation();
                  handleMoveStep('up');
                }}
                className="w-9 h-9 rounded-xl bg-[#FAF8F5] hover:bg-[#C85A32] hover:text-white active:scale-95 text-[#0D3B3A] flex items-center justify-center transition-all border border-[#E5DFD2] shadow-2xs"
                aria-label="Gerak ke Atas"
              >
                <ArrowUp className="w-4 h-4" />
              </button>

              {/* Left, Down, Right row */}
              <div className="flex items-center gap-1">
                <button
                  id="dpad-btn-left"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoveStep('left');
                  }}
                  className="w-9 h-9 rounded-xl bg-[#FAF8F5] hover:bg-[#C85A32] hover:text-white active:scale-95 text-[#0D3B3A] flex items-center justify-center transition-all border border-[#E5DFD2] shadow-2xs"
                  aria-label="Gerak ke Kiri"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                <button
                  id="dpad-btn-down"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoveStep('down');
                  }}
                  className="w-9 h-9 rounded-xl bg-[#FAF8F5] hover:bg-[#C85A32] hover:text-white active:scale-95 text-[#0D3B3A] flex items-center justify-center transition-all border border-[#E5DFD2] shadow-2xs"
                  aria-label="Gerak ke Bawah"
                >
                  <ArrowDown className="w-4 h-4" />
                </button>

                <button
                  id="dpad-btn-right"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleMoveStep('right');
                  }}
                  className="w-9 h-9 rounded-xl bg-[#FAF8F5] hover:bg-[#C85A32] hover:text-white active:scale-95 text-[#0D3B3A] flex items-center justify-center transition-all border border-[#E5DFD2] shadow-2xs"
                  aria-label="Gerak ke Kanan"
                >
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Keyboard Hint Overlay */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-xl px-2.5 py-1 border border-[#E5DFD2] text-[10px] text-[#4A5E5D] hidden sm:flex items-center gap-2 pointer-events-none shadow-2xs">
              <span className="font-mono bg-[#FAF5EE] text-[#C85A32] px-1.5 py-0.5 rounded border border-[#E8C4B5] font-bold">W A S D</span>
              <span>atau ketuk peta untuk melangkah</span>
            </div>

          </div>

          {/* Quick World Legend */}
          <div className="flex flex-wrap items-center justify-between gap-2 px-2 text-xs text-[#526665]">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#1E7773] border border-white shadow-2xs"></span>
                <span>Terverifikasi (Selesai)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#C85A32] border border-white shadow-2xs"></span>
                <span>Belum Diverifikasi</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2.5 w-2.5 rounded-full bg-[#B3261E] border border-white shadow-2xs"></span>
                <span>Tradisi Kritis (Mendesak)</span>
              </div>
            </div>

            <span className="text-[11px] text-[#0D3B3A] font-medium">
              💡 Tekan ikon cagar budaya untuk membuka eksplorasi 5 tahap!
            </span>
          </div>
        </div>

        {/* Right 1 Col: Selected Landmark Quick Card & Interactive Trigger */}
        <div className="space-y-4">
          {selectedPin ? (
            <div className="rounded-3xl bg-white border border-[#E5DFD2] p-5 shadow-sm space-y-4">
              
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#C85A32]">
                  Target Misi Terpilih
                </span>
                <span className="rounded-md bg-[#FAF5EE] border border-[#E8C4B5] px-2 py-0.5 text-[10px] font-semibold text-[#A64522]">
                  {selectedPin.category}
                </span>
              </div>

              <div className="relative h-44 w-full rounded-2xl overflow-hidden border border-[#E5DFD2] shadow-2xs">
                <img 
                  src={selectedPin.thumbnail} 
                  alt={selectedPin.name} 
                  className="h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B3A]/80 via-transparent to-transparent" />
                
                {verifiedObjectIds.has(selectedPin.id) && (
                  <span className="absolute top-2.5 right-2.5 rounded-md bg-[#1E7773] text-white px-2 py-0.5 text-[10px] font-semibold flex items-center gap-1 shadow">
                    <CheckCircle2 className="w-3 h-3 text-white" /> Terverifikasi
                  </span>
                )}
              </div>

              <div>
                <span className="text-[11px] text-[#637675] font-medium">
                  📍 {selectedPin.regency}
                </span>
                <h3 className="font-serif text-lg font-bold text-[#0D3B3A] mt-0.5">
                  {selectedPin.name}
                </h3>
                <p className="text-xs text-[#3E5251] line-clamp-3 mt-2 leading-relaxed">
                  {selectedPin.shortDescription}
                </p>
              </div>

              {/* Status Alert & Reward */}
              <div className="rounded-2xl bg-[#FAF8F5] p-3 border border-[#E5DFD2] flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-[#637675] font-bold uppercase block">Status Lapangan</span>
                  <span className={`text-xs font-bold ${
                    selectedPin.threatLevel === 'critical' ? 'text-[#B3261E]' :
                    selectedPin.threatLevel === 'at_risk' ? 'text-[#C85A32]' : 'text-[#1E7773]'
                  }`}>
                    {selectedPin.threatLevel === 'critical' ? 'Kritis Terancam' :
                     selectedPin.threatLevel === 'at_risk' ? 'Rentan / Perlu Pemantauan' : 'Aktif Terjaga'}
                  </span>
                </div>

                <span className="text-xs font-bold text-[#C85A32] bg-[#FAF5EE] px-3 py-1.5 rounded-xl border border-[#E8C4B5]">
                  +275 XP Misi
                </span>
              </div>

              {/* Big Pulsing Trigger Button to Launch the 5-Step Loop */}
              <button
                id="btn-trigger-discover-modal"
                onClick={() => onSelectObject(selectedPin)}
                className="w-full flex items-center justify-center gap-2 rounded-2xl bg-[#C85A32] hover:bg-[#B54E27] py-3.5 text-xs font-bold text-white shadow-md hover:scale-[1.01] transition-all"
              >
                <BookOpen className="w-4 h-4" />
                <span>
                  {verifiedObjectIds.has(selectedPin.id) ? 'Ulas Pengetahuan Pusaka Ini' : 'Mulai Eksplorasi 5 Tahap'}
                </span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <div className="rounded-3xl bg-white border border-[#E5DFD2] p-8 text-center space-y-3 shadow-sm">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FAF8F5] text-[#637675] border border-[#E5DFD2]">
                <Compass className="w-6 h-6 text-[#C85A32]" />
              </div>
              <h3 className="font-serif text-sm font-bold text-[#0D3B3A]">Pilih Cagar Budaya di Peta</h3>
              <p className="text-xs text-[#637675] leading-relaxed">
                Ketuk salah satu pin cagar budaya di peta atau daftar di bawah untuk memulai misi verifikasi fakta.
              </p>
            </div>
          )}

          {/* Quick List of All Pilot Objects */}
          <div className="rounded-3xl bg-white border border-[#E5DFD2] p-4 space-y-2 shadow-sm">
            <span className="text-[10px] font-bold text-[#637675] uppercase tracking-wider block px-1">
              Daftar Target Budaya Wilayah Jambi ({activeObjects.length})
            </span>
            <div className="space-y-1.5 max-h-56 overflow-y-auto pr-1">
              {activeObjects.map((obj) => {
                const isVerified = verifiedObjectIds.has(obj.id);
                return (
                  <button
                    key={obj.id}
                    id={`quick-list-obj-${obj.id}`}
                    onClick={() => handleTravelToObject(obj)}
                    className={`w-full flex items-center justify-between rounded-xl p-2.5 text-left text-xs transition-colors ${
                      selectedPin?.id === obj.id
                        ? 'bg-[#FAF5EE] border border-[#C85A32] text-[#0D3B3A]'
                        : 'bg-[#FAF8F5] hover:bg-[#FAF5EE] border border-[#E5DFD2] text-[#2A3E3D]'
                    }`}
                  >
                    <div className="truncate mr-2">
                      <span className="font-medium block truncate">{obj.name}</span>
                      <span className="text-[10px] text-[#637675]">{obj.regency}</span>
                    </div>
                    {isVerified ? (
                      <span className="text-[#1E7773] font-semibold shrink-0 text-[11px]">✓ Selesai</span>
                    ) : (
                      <span className="text-[#C85A32] shrink-0 text-[11px] font-bold">Mulai</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>

      </div>

      {/* ========================================================================= */}
      {/* MINI-GAME MODAL: KUIS KILAT DETEKTIF PUSAKA                              */}
      {/* ========================================================================= */}
      {isMiniGameOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border border-[#E5DFD2] p-6 sm:p-7 shadow-2xl space-y-5 animate-in fade-in zoom-in-95 duration-200 text-[#132726]">
            
            {/* Header */}
            <div className="flex items-center justify-between border-b border-[#EFECE4] pb-3">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-xl bg-[#C85A32] text-white font-bold">
                  <Gamepad2 className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#0D3B3A]">
                    Mini-Game: Kuis Kilat Detektif Pusaka
                  </h3>
                  <span className="text-[10px] text-[#637675]">
                    Uji kecepatan & ketelitian fakta warisan budaya Jambi
                  </span>
                </div>
              </div>

              <button
                id="btn-close-minigame"
                onClick={handleResetMiniGame}
                className="p-1.5 rounded-xl text-[#637675] hover:text-[#0D3B3A] hover:bg-[#FAF8F5]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* If mini-game is in progress */}
            {!miniGameFinished ? (
              <div className="space-y-4">
                
                {/* Progress bar and counter */}
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#C85A32] font-bold font-mono">
                    Pertanyaan {triviaIndex + 1} dari {triviaQuestions.length}
                  </span>
                  <span className="text-[#637675] font-mono">
                    Skor Sementara: <strong className="text-[#0D3B3A]">{triviaScore}</strong>
                  </span>
                </div>

                <div className="h-1.5 w-full rounded-full bg-[#FAF8F5] border border-[#E5DFD2] overflow-hidden">
                  <div 
                    className="h-full bg-[#C85A32] rounded-full transition-all"
                    style={{ width: `${((triviaIndex + 1) / triviaQuestions.length) * 100}%` }}
                  />
                </div>

                {/* Question */}
                <div className="rounded-2xl bg-[#FAF8F5] p-4 border border-[#E5DFD2]">
                  <p className="text-sm font-semibold text-[#0D3B3A] leading-relaxed">
                    {triviaQuestions[triviaIndex].question}
                  </p>
                </div>

                {/* Options */}
                <div className="space-y-2">
                  {triviaQuestions[triviaIndex].options.map((option, optIdx) => {
                    const isSelected = selectedAnswer === optIdx;
                    const isCorrect = optIdx === triviaQuestions[triviaIndex].correctIndex;

                    let btnStyle = 'bg-white border-[#D5CEBD] text-[#2A3E3D] hover:border-[#C85A32] hover:bg-[#FAF5EE]';
                    if (isAnswered) {
                      if (isCorrect) {
                        btnStyle = 'bg-[#EAF6F5] border-[#278B86] text-[#0D3B3A] font-bold';
                      } else if (isSelected && !isCorrect) {
                        btnStyle = 'bg-red-50 border-red-300 text-red-700';
                      } else {
                        btnStyle = 'bg-[#FAF8F5] border-[#E5DFD2] text-[#8C9C9B] opacity-60';
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleAnswerTrivia(optIdx)}
                        className={`w-full p-3 rounded-xl border text-left text-xs transition-all flex items-center justify-between ${btnStyle}`}
                      >
                        <span>{option}</span>
                        {isAnswered && isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-[#1E7773] shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation on answered */}
                {isAnswered && (
                  <div className="p-3 rounded-xl bg-[#FAF8F5] border border-[#E5DFD2] text-xs text-[#3E5251] space-y-1 animate-in fade-in">
                    <span className="text-[10px] font-bold text-[#C85A32] uppercase tracking-wider block">
                      Penjelasan Rujukan Sejarah:
                    </span>
                    <p className="leading-relaxed text-[11px]">
                      {triviaQuestions[triviaIndex].explanation}
                    </p>
                  </div>
                )}

                {/* Next button */}
                {isAnswered && (
                  <button
                    id="btn-trivia-next"
                    onClick={handleNextTrivia}
                    className="w-full py-2.5 rounded-xl bg-[#C85A32] hover:bg-[#B54E27] text-white font-bold text-xs shadow-sm transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>
                      {triviaIndex < triviaQuestions.length - 1 ? 'Pertanyaan Berikutnya' : 'Lihat Hasil Akhir Kuis'}
                    </span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                )}

              </div>
            ) : (
              /* Mini-Game Finished Screen */
              <div className="text-center space-y-4 py-2">
                <div className="mx-auto w-16 h-16 rounded-2xl bg-[#FAF5EE] border-2 border-[#C85A32] flex items-center justify-center text-[#C85A32] shadow-sm">
                  <Trophy className="w-8 h-8" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-serif text-lg font-bold text-[#0D3B3A]">
                    Kuis Kilat Selesai!
                  </h4>
                  <p className="text-xs text-[#4A5E5D]">
                    Anda berhasil menjawab <strong className="text-[#C85A32]">{triviaScore}</strong> dari {triviaQuestions.length} pertanyaan dengan benar.
                  </p>
                </div>

                <div className="rounded-2xl bg-[#FAF8F5] p-4 border border-[#E5DFD2] inline-block">
                  <span className="text-[10px] text-[#637675] uppercase font-bold block">Hadiah Mini-Game</span>
                  <span className="text-base font-bold text-[#C85A32] font-mono">+100 XP Diberikan!</span>
                </div>

                <div className="flex items-center justify-center gap-2 pt-2">
                  <button
                    onClick={handleResetMiniGame}
                    className="px-6 py-2.5 rounded-xl bg-[#C85A32] hover:bg-[#B54E27] text-white font-bold text-xs shadow-sm transition-all"
                  >
                    Tutup & Kembali ke Petualangan
                  </button>
                </div>
              </div>
            )}

          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* LOCKED WORLD DIALOG ALERT                                                */}
      {/* ========================================================================= */}
      {lockedWorldAlert && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white border-2 border-amber-300 p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="mx-auto w-14 h-14 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-600 shadow-xs">
              <Lock className="w-7 h-7" />
            </div>

            <div className="text-center space-y-2">
              <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider bg-amber-100 px-2.5 py-0.5 rounded-md">
                Wilayah Terkunci
              </span>
              <h3 className="font-serif text-lg font-bold text-[#0D3B3A]">
                {lockedWorldAlert.name}
              </h3>
              <p className="text-xs text-[#526665] leading-relaxed">
                Wilayah ini membutuhkan reputasi penjelajah minimal <strong className="text-[#C85A32] font-mono">{lockedWorldAlert.requiredXpOrProgress} XP</strong>. Selesaikan misi verifikasi fakta pada wilayah sebelumnya untuk membuka gerbang ekspedisi ini!
              </p>
            </div>

            <div className="rounded-2xl bg-[#FAF8F5] p-3.5 border border-[#E5DFD2] space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-[#637675]">Progres Akumulasi XP:</span>
                <span className="font-bold text-[#C85A32] font-mono">
                  {currentUserXp} / {lockedWorldAlert.requiredXpOrProgress} XP
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-amber-100 overflow-hidden border border-amber-200">
                <div 
                  className="h-full bg-gradient-to-r from-amber-500 to-[#C85A32] rounded-full transition-all duration-500"
                  style={{ width: `${Math.min(100, Math.round((currentUserXp / lockedWorldAlert.requiredXpOrProgress) * 100))}%` }}
                />
              </div>
              <span className="text-[10px] text-[#637675] block text-right font-medium">
                Kurang {Math.max(0, lockedWorldAlert.requiredXpOrProgress - currentUserXp)} XP lagi
              </span>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                onClick={() => setLockedWorldAlert(null)}
                className="w-full py-2.5 rounded-xl bg-[#0D3B3A] hover:bg-[#1A4D4C] text-white font-bold text-xs shadow-sm transition-all"
              >
                Kembali & Kumpulkan XP di Dunia Jambi
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
