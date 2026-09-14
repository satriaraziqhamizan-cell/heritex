export type PuzzleType = 'visual' | 'meaning' | 'language' | 'historical';

export type PuzzleDifficulty = 'mudah' | 'sedang' | 'menantang';

export interface VisualTile {
  id: number;
  currentPos: number; // 0 to 8 (for 3x3)
  targetPos: number;  // Correct position
}

export interface MeaningPair {
  id: string;
  symbolName: string;
  symbolIcon?: string;
  symbolSnippet: string;
  meaningText: string;
  matched?: boolean;
}

export interface LanguageWordBlock {
  id: string;
  word: string;
  order: number;
}

export interface HistoricalEventCard {
  id: string;
  title: string;
  periodText: string;
  description: string;
  correctRank: number; // 1, 2, 3, 4
}

export interface QuizChallenge {
  question: string;
  options: {
    id: string;
    text: string;
    isCorrect: boolean;
  }[];
  explanation: string;
  philosophicalNote: string;
}

export interface PuzzleLevel {
  id: string;
  worldId: string;
  levelNumber: number;
  title: string;
  culturalCategory: string;
  regency: string; // e.g. 'Kota Jambi', 'Muaro Jambi', 'Batanghari', 'Kerinci'
  thumbnail: string;
  type: PuzzleType;
  difficulty: PuzzleDifficulty;
  xpReward: number;
  culturalQuote: string;
  
  // 1. PLAY Config
  visualConfig?: {
    imageSrc: string;
    gridSize: 3; // 3x3 tiles
  };
  meaningConfig?: {
    pairs: MeaningPair[];
  };
  languageConfig?: {
    rawPhrase: string;
    words: string[];
    correctOrder: string[];
    culturalMeaningQuestion: string;
    culturalMeaningOptions: { id: string; text: string; isCorrect: boolean }[];
  };
  historicalConfig?: {
    events: HistoricalEventCard[];
  };

  // 2. LEARN Config
  learningMaterial: {
    origin: string;
    historicalContext: string;
    philosophicalMeaning: string;
    culturalFunction: string;
    officialReference: string; // e.g. "Kemendikbudristek WBTb No. 201500207"
    keyTakeaway: string;
    galleryImages?: string[];
  };

  // 3. PROVE Config
  challengeQuiz: QuizChallenge;

  // Kanti AI Advice
  kantiAdvice: {
    hint: string;
    whyItMatters: string;
    interactivePrompt: string;
  };

  // Mosaic Piece Info
  mosaicPiece: {
    gridIndex: number; // 0 to 15 (16 pieces)
    label: string;
    pieceTitle: string;
  };
}

export interface PuzzleWorld {
  id: string;
  worldNumber: number;
  name: string;
  subName: string;
  themeColor: string; // Tailwind color or hex
  accentColor: string;
  iconName: string;
  description: string;
  requiredXpToUnlock: number;
  levels: PuzzleLevel[];
}

export interface PlayerPuzzleProgress {
  completedLevelIds: string[];
  levelScores: Record<string, {
    stars: number; // 1 to 3
    bestScore: number;
    completedAt: string;
  }>;
  unlockedWorldIds: string[];
  unlockedMosaicPieces: number[]; // Array of grid indices [0..15]
  totalPuzzleXp: number;
  earnedBadges: string[];
}

export interface StudentProgressEntry {
  id: string;
  studentName: string;
  avatar: string;
  schoolClass: string;
  completedPuzzlesCount: number;
  totalPuzzles: number;
  averageScore: number;
  timeSpentMinutes: number;
  lastActive: string;
  status: 'active' | 'completed_assignment' | 'needs_guidance';
}

export interface CultureAssignment {
  id: string;
  title: string;
  assignedWorldId: string;
  targetLevelCount: number;
  minimumScorePercent: number;
  dueDate: string;
  description: string;
  targetGrade: string;
  status: 'active' | 'draft' | 'archived';
}
