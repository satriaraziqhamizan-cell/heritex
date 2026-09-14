export type Language = 'id' | 'en';

export const translations: Record<Language, Record<string, string>> = {
  id: {
    // Brand & Tagline
    appName: 'HERITEX',
    tagline: 'Explore Heritage, Experience Technology',
    subtitle: 'Ekosistem Gamifikasi & Verifikasi Cagar Budaya',
    
    // Navigation Tabs
    navWorld: 'Petualangan (Pilot Jambi)',
    navLivingMap: 'Peta Hidup Budaya',
    navKnowledgeBase: 'Basis Pengetahuan',
    navLeaderboard: 'Papan Peringkat',
    navCurator: 'Panel Kurator',
    navGovernment: 'Panel Pemerintah',
    navAdmin: 'Panel Admin',
    navPuzzle: 'Puzzleverse',
    navScanner: 'AI Scanner',
    navGuide: 'Panduan Aplikasi',
    navProfile: 'Profil & Lencana',
    navLogout: 'Keluar / Ganti Akun',
    
    // Common Actions & Statuses
    btnBack: 'Kembali',
    btnNext: 'Lanjut',
    btnSubmit: 'Kirim',
    btnCancel: 'Batal',
    btnSave: 'Simpan',
    btnVerify: 'Uji Validasi AI',
    btnExplore: 'Jelajahi Sekarang',
    btnShare: 'Bagikan',
    btnCopy: 'Salin',
    btnCopied: 'Tersalin!',
    btnClose: 'Tutup',
    btnSearch: 'Cari',
    btnFilter: 'Filter',
    btnReload: 'Muat Ulang Halaman',
    loading: 'Memuat data...',
    processing: 'Sedang memproses...',
    level: 'Tingkat',
    points: 'XP',
    statusPreserved: 'Lestari',
    statusVulnerable: 'Waspada',
    statusCritical: 'Kritis',
    
    // Gameplay 5-Step Titles & UI
    stepExplore: '1. Eksplorasi Visual',
    stepReference: '2. Fakta Rujukan',
    stepQuiz: '3. Uji Klaim Fakta',
    stepReason: '4. Penalaran Historis',
    stepUnlock: '5. Capaian Terbuka',
    
    gameplaySubtitle: 'Siklus 5 Tahap Verifikasi Pengetahuan Budaya',
    badgeUnlocked: 'Lencana Baru Terbuka!',
    congratulations: 'Pusaka Budaya Berhasil Diamankan!',
    verificationComplete: 'Verifikasi Berhasil Tuntas',
    backToMap: 'Kembali Menjelajah Peta Budaya',
    shareAchievement: 'Bagikan Pencapaian Literasi Budaya',
    
    // Living Map
    livingMapTitle: 'Peta Hidup Kebudayaan Nusantara',
    livingMapSubtitle: 'Pemetaan spasial cagar budaya berstatus Lestari, Waspada, dan Kritis dengan pemantauan komunitas.',
    culturalBearer: 'Pelaku / Komunitas Budaya',
    narrative: 'Latar Belakang & Narasi',
    reportCrowdsource: 'Laporkan Kondisi Lapangan',
    
    // Roles
    rolePlayer: 'Pelajar & Mahasiswa',
    roleCurator: 'Kurator & Ahli Budaya',
    roleGovernment: 'Dinas Kebudayaan & Pemda',
    roleAdmin: 'Administrator Sistem',
    
    // Scanner
    scannerTitle: 'AI Culture Scanner',
    scannerSubtitle: 'Pindai objek budaya menggunakan computer vision berbasis Gemini AI',
    scanUpload: 'Unggah Foto Budaya',
    scanCamera: 'Buka Kamera Perangkat',
    scanAnalyzing: 'AI Gemini sedang menganalisis objek budaya...',
    scanResultConfidence: 'Tingkat Kepercayaan AI',
    'scanner.title': 'Pindai & Kenali Budaya AI',
    'scanner.subtitle': 'Identifikasi objek, bedah asal daerah, telaah keaslian, dan deteksi jika ada kerancuan motif',
    'scanner.cameraTab': 'Kamera Langsung',
    'scanner.uploadTab': 'Unggah Foto',
    'scanner.sampleTab': 'Contoh Gambar Uji Cepat',
    'scanner.scanningTitle': 'AI Membedah Pola Kebudayaan...',
    'scanner.scanningSubtitle': 'Mencocokkan visual dengan basis data 38 provinsi di Nusantara, meneliti era sejarah, filosofi, dan mengaudit apakah terdapat kerancuan atau percampuran motif.',
    
    // Footer
    footerCopy: 'Inovasi Gamifikasi Budaya & AI Verifier • Berbasis Rujukan Resmi Kemendikbudristek & Lembaga Adat Melayu'
  },
  en: {
    // Brand & Tagline
    appName: 'HERITEX',
    tagline: 'Explore Heritage, Experience Technology',
    subtitle: 'Cultural Heritage Gamification & Verification Ecosystem',
    
    // Navigation Tabs
    navWorld: 'Adventure (Pilot Jambi)',
    navLivingMap: 'Cultural Living Map',
    navKnowledgeBase: 'Knowledge Base',
    navLeaderboard: 'Leaderboard',
    navCurator: 'Curator Panel',
    navGovernment: 'Government Panel',
    navAdmin: 'Admin Panel',
    navPuzzle: 'Puzzleverse',
    navScanner: 'AI Scanner',
    navGuide: 'App Guide',
    navProfile: 'Profile & Badges',
    navLogout: 'Logout / Switch Account',
    
    // Common Actions & Statuses
    btnBack: 'Back',
    btnNext: 'Next',
    btnSubmit: 'Submit',
    btnCancel: 'Cancel',
    btnSave: 'Save',
    btnVerify: 'Test AI Validation',
    btnExplore: 'Explore Now',
    btnShare: 'Share',
    btnCopy: 'Copy',
    btnCopied: 'Copied!',
    btnClose: 'Close',
    btnSearch: 'Search',
    btnFilter: 'Filter',
    btnReload: 'Reload Page',
    loading: 'Loading data...',
    processing: 'Processing...',
    level: 'Level',
    points: 'XP',
    statusPreserved: 'Preserved',
    statusVulnerable: 'Vulnerable',
    statusCritical: 'Critical',
    
    // Gameplay 5-Step Titles & UI
    stepExplore: '1. Visual Exploration',
    stepReference: '2. Official Reference',
    stepQuiz: '3. Claim Verification Quiz',
    stepReason: '4. Historical Reasoning',
    stepUnlock: '5. Achievement Unlocked',
    
    gameplaySubtitle: '5-Step Cultural Knowledge Verification Cycle',
    badgeUnlocked: 'New Badge Unlocked!',
    congratulations: 'Cultural Heritage Successfully Secured!',
    verificationComplete: 'Verification Successfully Completed',
    backToMap: 'Back to Exploring Cultural Map',
    shareAchievement: 'Share Cultural Literacy Achievement',
    
    // Living Map
    livingMapTitle: 'Cultural Living Map of Nusantara',
    livingMapSubtitle: 'Spatial mapping of cultural heritage categorized into Preserved, Vulnerable, and Critical status.',
    culturalBearer: 'Cultural Bearer / Community',
    narrative: 'Background & Narrative',
    reportCrowdsource: 'Report Field Observations',
    
    // Roles
    rolePlayer: 'Student & Youth',
    roleCurator: 'Curator & Cultural Expert',
    roleGovernment: 'Cultural Dept & Local Gov',
    roleAdmin: 'System Administrator',
    
    // Scanner
    scannerTitle: 'AI Culture Scanner',
    scannerSubtitle: 'Scan cultural heritage using Gemini AI-powered computer vision',
    scanUpload: 'Upload Heritage Photo',
    scanCamera: 'Open Device Camera',
    scanAnalyzing: 'Gemini AI is analyzing the cultural object...',
    scanResultConfidence: 'AI Confidence Score',
    'scanner.title': 'Scan & Recognize AI Culture',
    'scanner.subtitle': 'Identify objects, dissect regional origins, analyze authenticity, and detect motif inaccuracies',
    'scanner.cameraTab': 'Live Camera',
    'scanner.uploadTab': 'Upload Photo',
    'scanner.sampleTab': 'Quick Test Sample Images',
    'scanner.scanningTitle': 'AI Analyzing Cultural Motifs...',
    'scanner.scanningSubtitle': 'Cross-referencing visuals with 38 Indonesian provincial databases, investigating historical era, philosophy, and checking for anomalies.',
    
    // Footer
    footerCopy: 'Cultural Gamification & AI Verifier Innovation • Grounded in Official References from Ministry of Culture & Customary Councils'
  }
};

export type TranslationKey = string;

export const useTranslation = (lang: Language = 'id') => {
  const t = (key: TranslationKey, defaultText?: string): string => {
    return translations[lang]?.[key] || translations['id']?.[key] || defaultText || key;
  };
  return { t, lang };
};
