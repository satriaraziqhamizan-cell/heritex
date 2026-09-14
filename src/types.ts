export type UserRole = 'player' | 'curator' | 'government' | 'admin';

export type CulturalStatus = 'active' | 'at_risk' | 'critical' | 'lost';

export type CulturalCategory = 
  | 'Arsitektur & Rumah Adat'
  | 'Seni Pertunjukan & Tari'
  | 'Kriya & Tekstil'
  | 'Sastra Lisan & Tradisi'
  | 'Kuliner Tradisional'
  | 'Ritual & Adat Istiadat'
  | 'Naskah & Aksara Kuno'
  | 'Senjata & Pusaka';

export type IslandGroup = 
  | 'Semua Nusantara'
  | 'Sumatera'
  | 'Jawa'
  | 'Bali & Nusa Tenggara'
  | 'Kalimantan'
  | 'Sulawesi'
  | 'Maluku'
  | 'Papua';

export interface AiCultureScanResult {
  id: string;
  scannedAt: string;
  imageThumbnail: string;
  culturalObjectName: string;
  category: CulturalCategory;
  region: string;
  province: string;
  confidenceScore: number;
  authenticityStatus: 'authentic' | 'hybrid_modern' | 'misattributed' | 'unrecognized';
  authenticityLabel: string;
  authenticityAnalysis: string;
  historicalContext: string;
  philosophicalMeaning: string;
  preservationStatus: CulturalStatus;
  keyFeatures: string[];
  recommendation: string;
  officialReferences: string[];
}

export interface SourceReference {
  id: string;
  title: string;
  institution: string; // e.g. Kemendikbudristek WBTb, Museum Siginjai Jambi, BPK Wilayah V
  year: number;
  urlOrDocId: string;
  type: 'WBTb_Official' | 'Museum_Archive' | 'Journal' | 'Oral_History';
}

export interface ClaimTest {
  id: string;
  statement: string;
  isTrue: boolean;
  distractorType: 'hoax' | 'false_attribution' | 'exaggeration' | 'factual';
  correctClassification: 'verified' | 'unverified' | 'contradicted';
  explanation: string;
  sourceReferenceId: string;
}

export interface CulturalObject {
  id: string;
  name: string;
  localName?: string;
  category: CulturalCategory;
  worldId: string;
  regency: string; // e.g. Kota Jambi, Muaro Jambi, Kerinci, Batanghari
  province?: string;
  islandGroup?: IslandGroup;
  latitude: number;
  longitude: number;
  mapX: number; // Percentage coordinate for game engine world map (0-100)
  mapY: number;
  thumbnail: string;
  shortDescription: string;
  fullDescription: string;
  philosophicalMeaning: string;
  historicalEra: string;
  threatLevel: CulturalStatus;
  threatReason?: string;
  references: SourceReference[];
  curatedFacts: string[];
  claimTests: ClaimTest[];
  discovered?: boolean;
  verified?: boolean;
}

export interface VerificationResult {
  claimText: string;
  classification: 'verified' | 'unverified' | 'contradicted';
  confidenceScore: number; // 0 - 100
  evidenceMatch: string;
  officialSource: SourceReference;
  rationale: string;
  flaggedForCurator: boolean;
  timestamp: string;
}

export interface StatusHistoryItem {
  id: string;
  status: CulturalStatus;
  changedBy: string;
  role: string;
  date: string;
  reason: string;
  evidenceUrl?: string;
}

export interface LivingMapPoint {
  id: string;
  culturalObjectId: string;
  name: string;
  category: CulturalCategory;
  regency: string;
  province?: string;
  islandGroup?: IslandGroup;
  thumbnail?: string;
  latitude: number;
  longitude: number;
  currentStatus: CulturalStatus;
  lastUpdated: string;
  verifiedByAi: boolean;
  culturalBearer?: string; // Pelaku / Komunitas Budaya (Maestro, Sanggar, Lembaga Adat)
  narrative?: string; // Cerita singkat & latar belakang keberlangsungan tradisi
  statusHistory: StatusHistoryItem[];
}

export interface CrowdsourceReport {
  id: string;
  userId: string;
  userName: string;
  userSchool?: string;
  livingMapPointId: string;
  culturalObjectName: string;
  regency: string;
  observedStatus: CulturalStatus;
  observationNote: string;
  evidencePhotoUrl?: string;
  submittedAt: string;
  aiClassification?: 'verified' | 'unverified' | 'contradicted';
  aiConfidenceScore?: number;
  reviewStatus: 'auto_approved' | 'pending_curator' | 'curator_approved' | 'curator_rejected';
  curatorNotes?: string;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  earnedAt?: string;
  condition: string;
}

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  school: string;
  avatar: string;
  bio?: string;
  domicile?: string;
  level: number;
  levelTitle: string;
  xp: number;
  nextLevelXp: number;
  verifiedCount: number;
  exploredCount: number;
  badges: Badge[];
  scannedCultures?: AiCultureScanResult[];
  reasoningSubmissions: {
    objectId: string;
    objectName: string;
    claimText: string;
    userAnswer: string;
    reasonText: string;
    score: number;
    submittedAt: string;
  }[];
}

export interface WorldRegion {
  id: string;
  name: string;
  province: string;
  description: string;
  isUnlocked: boolean;
  requiredXpOrProgress: number; // percentage or XP
  objectCount: number;
  previewImage: string;
}

export interface LeaderboardEntry {
  id: string;
  name: string;
  institution: string;
  xp: number;
  verifiedCount: number;
  level: number;
  avatar: string;
  rank: number;
}

export interface AdminManagedUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  institution: string;
  status: 'active' | 'suspended';
  joinedAt: string;
  lastActive: string;
  xp: number;
}

export interface SystemLogItem {
  id: string;
  timestamp: string;
  eventType: 'auth' | 'role_change' | 'world_update' | 'api_gateway' | 'config_update';
  eventLabel: string;
  actor: string;
  actorRole: UserRole | 'system';
  details: string;
  severity: 'info' | 'warning' | 'error' | 'success';
}
