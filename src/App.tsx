import React, { useState, useEffect } from 'react';
import { AuthFlow } from './components/AuthFlow';
import { Navbar } from './components/Navbar';
import { GameWorld } from './components/GameWorld';
import { GameplayModal } from './components/GameplayModal';
import { LivingMap } from './components/LivingMap';
import { KnowledgeBaseView } from './components/KnowledgeBaseView';
import { CuratorPanel } from './components/CuratorPanel';
import { GovernmentPanel } from './components/GovernmentPanel';
import { AdminPanel } from './components/AdminPanel';
import { LeaderboardProfileView } from './components/LeaderboardProfileView';
import { UserProfileModal } from './components/UserProfileModal';
import { CultureScannerModal } from './components/CultureScannerModal';
import { OnboardingModal } from './components/OnboardingModal';
import { JambiPuzzleComponent } from './components/JambiPuzzleComponent';
import { PuzzleverseMain } from './components/puzzleverse/PuzzleverseMain';
import { Language, useTranslation } from './i18n';
import { 
  INITIAL_WORLDS, 
  INITIAL_CULTURAL_OBJECTS, 
  INITIAL_LIVING_MAP_POINTS, 
  INITIAL_BADGES, 
  INITIAL_LEADERBOARD, 
  INITIAL_CROWDSOURCE_REPORTS 
} from './data/culturalData';
import { 
  UserRole, 
  UserProfile, 
  CulturalObject, 
  LivingMapPoint, 
  CrowdsourceReport, 
  Badge, 
  WorldRegion, 
  LeaderboardEntry,
  CulturalStatus,
  AiCultureScanResult
} from './types';

export default function App() {
  // Theme & Language State with LocalStorage Persistence
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('heritex_theme') === 'dark';
    } catch {
      return false;
    }
  });

  const [lang, setLang] = useState<Language>(() => {
    try {
      const saved = localStorage.getItem('heritex_lang');
      if (saved === 'en' || saved === 'id') return saved;
    } catch {}
    return 'id';
  });

  const { t } = useTranslation(lang);

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      try {
        localStorage.setItem('heritex_theme', 'dark');
      } catch {}
    } else {
      document.documentElement.classList.remove('dark');
      try {
        localStorage.setItem('heritex_theme', 'light');
      } catch {}
    }
  }, [isDarkMode]);

  const toggleDarkMode = () => {
    setIsDarkMode(prev => !prev);
  };

  const toggleLang = () => {
    setLang(prev => {
      const nextLang: Language = prev === 'id' ? 'en' : 'id';
      try {
        localStorage.setItem('heritex_lang', nextLang);
      } catch {}
      return nextLang;
    });
  };

  // Authentication & Onboarding State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showOnboardingTutorial, setShowOnboardingTutorial] = useState<boolean>(false);

  // Navigation & Role State
  const [activeTab, setActiveTab] = useState<
    'world' | 'puzzle' | 'living-map' | 'knowledge-base' | 'leaderboard' | 'curator-panel' | 'gov-panel' | 'admin-panel' | 'profile'
  >('world');

  // Submode for puzzle tab: 'drag-drop' (Jambi & Nusantara Drag-and-Drop) vs 'campaign' (Jambi Puzzleverse 4 Worlds)
  const [puzzleMode, setPuzzleMode] = useState<'drag-drop' | 'campaign'>('drag-drop');
  
  const [currentRole, setCurrentRole] = useState<UserRole>('player');

  // Core Data States
  const [worlds, setWorlds] = useState<WorldRegion[]>(INITIAL_WORLDS);
  const [currentWorld, setCurrentWorld] = useState<WorldRegion>(INITIAL_WORLDS[0]);
  const [culturalObjects, setCulturalObjects] = useState<CulturalObject[]>(INITIAL_CULTURAL_OBJECTS);
  const [livingMapPoints, setLivingMapPoints] = useState<LivingMapPoint[]>(INITIAL_LIVING_MAP_POINTS);
  const [crowdsourceReports, setCrowdsourceReports] = useState<CrowdsourceReport[]>(INITIAL_CROWDSOURCE_REPORTS);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>(INITIAL_LEADERBOARD);
  const [allBadges] = useState<Badge[]>(INITIAL_BADGES);

  // Active Gameplay Modal
  const [selectedGameplayObject, setSelectedGameplayObject] = useState<CulturalObject | null>(null);

  // Profile and Scanner Modals
  const [isProfileModalOpen, setIsProfileModalOpen] = useState<boolean>(false);
  const [isScannerModalOpen, setIsScannerModalOpen] = useState<boolean>(false);
  const [unlockedWorldNotification, setUnlockedWorldNotification] = useState<WorldRegion | null>(null);

  // Verified Object IDs Set (Tracks player's solved landmarks)
  const [verifiedObjectIds, setVerifiedObjectIds] = useState<Set<string>>(
    new Set(['obj-tari-selampit-delapan']) // 1 initially verified
  );

  // User Profile State
  const [userProfile, setUserProfile] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem('heritex_user_profile');
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Could not read saved profile:', e);
    }
    return {
      id: 'user-player-current',
      name: 'Satria Raziq Pratama',
      email: 'satriaraziq07@gmail.com',
      role: 'player',
      school: 'SMA Negeri 1 Kota Jambi / Universitas Jambi',
      domicile: 'Kota Jambi, Jambi',
      bio: 'Pelestari cagar budaya dan penjelajah kearifan lokal Nusantara di platform HERITEX.',
      avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=150&auto=format&fit=crop&q=80',
      level: 2,
      levelTitle: 'Pengamat Tradisi Batin',
      xp: 450,
      nextLevelXp: 800,
      verifiedCount: 1,
      exploredCount: 4,
      badges: [INITIAL_BADGES[0]], // Detektif Warisan Budaya
      scannedCultures: [],
      reasoningSubmissions: [
        {
          objectId: 'obj-tari-selampit-delapan',
          objectName: 'Tari Selampit Delapan',
          claimText: 'Tari Selampit Delapan diciptakan pada tahun 1930-an oleh seniman M. Tarip.',
          userAnswer: 'verified',
          reasonText: 'Sesuai dengan arsip Taman Budaya Jambi dan SK WBTb Kemendikbudristek No. 201500207.',
          score: 100,
          submittedAt: '08/09/2026'
        }
      ]
    };
  });

  // Calculate pending reviews for curator badge indicator
  const pendingReviewCount = crowdsourceReports.filter(r => r.reviewStatus === 'pending_curator').length;

  // Level & XP progression calculation helper
  const calculateLevelDetails = (totalXp: number): { level: number; levelTitle: string; nextLevelXp: number } => {
    if (totalXp < 300) return { level: 1, levelTitle: 'Penjelajah Mula', nextLevelXp: 300 };
    if (totalXp < 800) return { level: 2, levelTitle: 'Pengamat Tradisi Batin', nextLevelXp: 800 };
    if (totalXp < 1500) return { level: 3, levelTitle: 'Pemeriksa Pusaka Budaya', nextLevelXp: 1500 };
    if (totalXp < 2500) return { level: 4, levelTitle: 'Kurator Madya Nusantara', nextLevelXp: 2500 };
    return { level: 5, levelTitle: 'Penjaga Pusaka Nusantara', nextLevelXp: 4000 };
  };

  // Handler: Save User Profile Updates (Persistent to localStorage)
  const handleSaveProfile = (updatedData: Partial<UserProfile>) => {
    setUserProfile(prev => {
      const updated = {
        ...prev,
        ...updatedData
      };
      try {
        localStorage.setItem('heritex_user_profile', JSON.stringify(updated));
      } catch (err) {
        console.warn('Storage save failed:', err);
      }
      return updated;
    });

    // Also update player entry in leaderboard if name/avatar changed
    if (updatedData.name || updatedData.avatar) {
      setLeaderboard(prev => prev.map(item => {
        if (item.name === userProfile.name) {
          return {
            ...item,
            name: updatedData.name || item.name,
            avatar: updatedData.avatar || item.avatar
          };
        }
        return item;
      }));
    }
  };

  // Handler: Save AI Cultural Scan to Profile (+50 XP bonus)
  const handleSaveScanToProfile = (scanResult: AiCultureScanResult) => {
    setUserProfile(prev => {
      const currentScans = prev.scannedCultures || [];
      const exists = currentScans.some(s => s.id === scanResult.id || s.culturalObjectName === scanResult.culturalObjectName);
      const newScans = exists ? currentScans : [scanResult, ...currentScans];

      const newXp = prev.xp + 50; // Bonus +50 XP
      const { level, levelTitle, nextLevelXp } = calculateLevelDetails(newXp);

      const updated = {
        ...prev,
        xp: newXp,
        level,
        levelTitle,
        nextLevelXp,
        scannedCultures: newScans
      };

      try {
        localStorage.setItem('heritex_user_profile', JSON.stringify(updated));
      } catch (err) {
        console.warn('Storage save failed:', err);
      }
      return updated;
    });
  };

  // Handler: When user logs in via AuthFlow
  const handleLoginSuccess = (role: UserRole, userEmail: string, userName: string) => {
    setCurrentRole(role);
    setUserProfile(prev => ({
      ...prev,
      name: userName,
      email: userEmail,
      role: role
    }));
    setIsAuthenticated(true);
    setShowOnboardingTutorial(false);

    // Direct user to role's home view, defaulting player straight into the 2D Game
    if (role === 'curator') setActiveTab('curator-panel');
    else if (role === 'government') setActiveTab('gov-panel');
    else if (role === 'admin') setActiveTab('admin-panel');
    else setActiveTab('world');
  };

  // Handler: Bonus XP from GameWorld Mini-Game or Puzzle Modules
  const handleAwardBonusXp = (bonusXp: number, _reason?: string) => {
    setUserProfile(prev => {
      const newXp = prev.xp + bonusXp;
      const { level, levelTitle, nextLevelXp } = calculateLevelDetails(newXp);
      return {
        ...prev,
        xp: newXp,
        level,
        levelTitle,
        nextLevelXp
      };
    });
  };

  // Handler: When user completes an object verification in GameplayModal
  const handleCompleteObject = (
    objectId: string,
    earnedXp: number,
    newBadge?: Badge,
    reasonSubmission?: { claimText: string; userAnswer: string; reasonText: string; score: number }
  ) => {
    // 1. Update verified IDs set
    const updatedVerified = new Set(verifiedObjectIds);
    updatedVerified.add(objectId);
    setVerifiedObjectIds(updatedVerified);

    // 2. Update user profile
    setUserProfile(prev => {
      const newXp = prev.xp + earnedXp;
      const { level, levelTitle, nextLevelXp } = calculateLevelDetails(newXp);
      
      const updatedBadges = [...prev.badges];
      if (newBadge && !updatedBadges.some(b => b.id === newBadge.id)) {
        updatedBadges.push(newBadge);
      }

      // Check exploration badge (5+ verified)
      if (updatedVerified.size >= 5 && !updatedBadges.some(b => b.id === 'badge-penjelajah-jambi')) {
        updatedBadges.push(INITIAL_BADGES[1]);
      }

      const updatedSubmissions = [...prev.reasoningSubmissions];
      if (reasonSubmission && selectedGameplayObject) {
        updatedSubmissions.unshift({
          objectId,
          objectName: selectedGameplayObject.name,
          claimText: reasonSubmission.claimText,
          userAnswer: reasonSubmission.userAnswer,
          reasonText: reasonSubmission.reasonText,
          score: reasonSubmission.score,
          submittedAt: new Date().toLocaleDateString('id-ID')
        });
      }

      return {
        ...prev,
        xp: newXp,
        level,
        levelTitle,
        nextLevelXp,
        verifiedCount: updatedVerified.size,
        badges: updatedBadges,
        reasoningSubmissions: updatedSubmissions
      };
    });
  };

  // Progressive World Unlock: whenever userProfile.xp changes, check if any world thresholds are reached
  useEffect(() => {
    setWorlds(prevWorlds => {
      let newlyUnlocked: WorldRegion | null = null;
      let hasChanges = false;

      const nextWorlds = prevWorlds.map(w => {
        if (!w.isUnlocked && userProfile.xp >= w.requiredXpOrProgress) {
          hasChanges = true;
          newlyUnlocked = { ...w, isUnlocked: true };
          return { ...w, isUnlocked: true };
        }
        return w;
      });

      if (hasChanges && newlyUnlocked) {
        setUnlockedWorldNotification(newlyUnlocked);
        return nextWorlds;
      }
      return prevWorlds;
    });
  }, [userProfile.xp]);

  // Handler: Crowdsource Report submitted from Living Map
  const handleCrowdsourceReportSubmitted = (
    newReport: CrowdsourceReport, 
    updatedPoint?: LivingMapPoint
  ) => {
    setCrowdsourceReports(prev => [newReport, ...prev]);

    if (updatedPoint) {
      setLivingMapPoints(prev => prev.map(pt => pt.id === updatedPoint.id ? updatedPoint : pt));
    }

    // Award XP and crowdsource badge to player
    setUserProfile(prev => {
      const newXp = prev.xp + 150;
      const { level, levelTitle, nextLevelXp } = calculateLevelDetails(newXp);
      const updatedBadges = [...prev.badges];
      if (!updatedBadges.some(b => b.id === 'badge-living-map-sentinel')) {
        updatedBadges.push(INITIAL_BADGES[3]);
      }

      return {
        ...prev,
        xp: newXp,
        level,
        levelTitle,
        nextLevelXp,
        badges: updatedBadges
      };
    });
  };

  // Handler: Curator approves report
  const handleCuratorApprove = (reportId: string, updatedStatus?: CulturalStatus) => {
    const report = crowdsourceReports.find(r => r.id === reportId);
    if (!report) return;

    setCrowdsourceReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          reviewStatus: 'curator_approved',
          curatorNotes: 'Disetujui oleh kurator ahli kebudayaan setelah verifikasi silang.'
        };
      }
      return r;
    }));

    if (updatedStatus) {
      setLivingMapPoints(prev => prev.map(pt => {
        if (pt.id === report.livingMapPointId) {
          return {
            ...pt,
            currentStatus: updatedStatus,
            lastUpdated: new Date().toISOString().split('T')[0],
            statusHistory: [
              {
                id: 'sh-' + Date.now(),
                status: updatedStatus,
                changedBy: 'Kurator Ahli Budaya',
                role: 'Curator',
                date: new Date().toISOString().split('T')[0],
                reason: report.observationNote
              },
              ...pt.statusHistory
            ]
          };
        }
        return pt;
      }));
    }
  };

  // Handler: Curator rejects report
  const handleCuratorReject = (reportId: string, curatorReason: string) => {
    setCrowdsourceReports(prev => prev.map(r => {
      if (r.id === reportId) {
        return {
          ...r,
          reviewStatus: 'curator_rejected',
          curatorNotes: curatorReason
        };
      }
      return r;
    }));
  };

  // Handler: Curator adds new Knowledge Base Object
  const handleAddNewKnowledgeObject = (newObj: CulturalObject) => {
    setCulturalObjects(prev => [newObj, ...prev]);

    // Also add to Living Map
    const newLmp: LivingMapPoint = {
      id: 'lmp-' + newObj.id,
      culturalObjectId: newObj.id,
      name: newObj.name,
      category: newObj.category,
      regency: newObj.regency,
      latitude: newObj.latitude,
      longitude: newObj.longitude,
      currentStatus: newObj.threatLevel,
      lastUpdated: new Date().toISOString().split('T')[0],
      verifiedByAi: true,
      statusHistory: [
        {
          id: 'sh-' + Date.now(),
          status: newObj.threatLevel,
          changedBy: 'Kurator Ahli (Entri Baru)',
          role: 'Curator',
          date: new Date().toISOString().split('T')[0],
          reason: 'Penambahan inventarisasi cagar budaya terkurasi.'
        }
      ]
    };

    setLivingMapPoints(prev => [newLmp, ...prev]);
  };

  // Handler: Admin toggles world unlock
  const handleToggleWorldUnlock = (worldId: string) => {
    setWorlds(prev => prev.map(w => {
      if (w.id === worldId) {
        return { ...w, isUnlocked: !w.isUnlocked };
      }
      return w;
    }));
  };

  // If user is not yet logged in, show the Splash -> 3-Page Onboarding -> Role Login flow
  if (!isAuthenticated) {
    return (
      <AuthFlow 
        onLoginSuccess={handleLoginSuccess}
        initialStep="splash"
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] dark:bg-slate-950 text-[#132726] dark:text-slate-100 flex flex-col font-sans transition-colors">
      
      {/* Universal Navigation Header with Role Switcher & Profile */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={(tab) => setActiveTab(tab as any)}
        currentRole={currentRole}
        setCurrentRole={setCurrentRole}
        userProfile={userProfile}
        pendingReviewCount={pendingReviewCount}
        lang={lang}
        onToggleLang={toggleLang}
        isDarkMode={isDarkMode}
        onToggleDarkMode={toggleDarkMode}
        onLogout={() => setIsAuthenticated(false)}
        onOpenOnboarding={() => setShowOnboardingTutorial(true)}
        onOpenProfileModal={() => setIsProfileModalOpen(true)}
        onOpenScanner={() => setIsScannerModalOpen(true)}
      />

      {/* Main Viewport Container */}
      <main className="flex-1 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        
        {/* TAB 1: CULTURAL WORLD (GAME ENGINE) */}
        {activeTab === 'world' && (
          <GameWorld
            worlds={worlds}
            currentWorld={currentWorld}
            setCurrentWorld={setCurrentWorld}
            culturalObjects={culturalObjects}
            onSelectObject={(obj) => setSelectedGameplayObject(obj)}
            verifiedObjectIds={verifiedObjectIds}
            onAwardBonusXp={handleAwardBonusXp}
          />
        )}

        {/* TAB 1.5: INTERACTIVE CULTURAL PUZZLE ENGINE (JAMBI & NUSANTARA) */}
        {activeTab === 'puzzle' && (
          <div className="flex flex-col gap-4">
            {/* Experimental Phase Banner */}
            <div className="rounded-2xl bg-amber-50/90 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 p-4 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div className="flex items-start gap-3">
                <div className="p-2 rounded-xl bg-amber-100 dark:bg-amber-900/60 text-amber-900 dark:text-amber-200 shrink-0 mt-0.5">
                  <span className="text-base">🔬</span>
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-sm font-bold text-[#0D3B3A] dark:text-slate-100">
                      Modul Eksperimental / Fase Lanjutan
                    </h2>
                    <span className="rounded bg-amber-200 dark:bg-amber-900 px-2 py-0.5 text-[9px] font-extrabold uppercase text-amber-950 dark:text-amber-200 tracking-wider">
                      Fase 2 Scale-Up
                    </span>
                  </div>
                  <p className="text-xs text-[#526665] dark:text-slate-300 mt-0.5">
                    Modul puzzle interaktif visual ini merupakan instrumen gamifikasi eksperimental pelengkap di luar siklus 5 tahap kurasi inti.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setActiveTab('world')}
                className="self-start sm:self-auto shrink-0 px-3 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-amber-100/50 dark:hover:bg-slate-700 text-[#0D3B3A] dark:text-slate-200 border border-amber-300 dark:border-slate-700 text-xs font-bold shadow-2xs transition-colors"
              >
                ← {t('btnBack')}
              </button>
            </div>

            {/* Submode Switcher Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-white dark:bg-slate-900 p-3.5 rounded-2xl border border-[#E8E2D5] dark:border-slate-800 shadow-xs">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-[#132726] dark:text-slate-200">Pilih Mode Puzzle:</span>
                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[#F4EFE6] dark:bg-slate-800">
                  <button
                    type="button"
                    onClick={() => setPuzzleMode('drag-drop')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      puzzleMode === 'drag-drop'
                        ? 'bg-[#C85A32] text-white shadow-2xs'
                        : 'text-[#526665] dark:text-slate-300 hover:text-[#132726] dark:hover:text-white'
                    }`}
                  >
                    🧩 Drag & Drop Heritage (Jambi & Nusantara)
                  </button>
                  <button
                    type="button"
                    onClick={() => setPuzzleMode('campaign')}
                    className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                      puzzleMode === 'campaign'
                        ? 'bg-[#1E7773] text-white shadow-2xs'
                        : 'text-[#526665] dark:text-slate-300 hover:text-[#132726] dark:hover:text-white'
                    }`}
                  >
                    🗺️ Jambi Puzzleverse Campaign (4 Dunia & Mosaik)
                  </button>
                </div>
              </div>

              <div className="text-xs text-[#8B4513] dark:text-amber-400 font-semibold flex items-center gap-1">
                <span>🌟 Level {userProfile.level} • {userProfile.xp} XP</span>
              </div>
            </div>

            {/* Submode Views */}
            {puzzleMode === 'drag-drop' ? (
              <JambiPuzzleComponent
                currentUserXp={userProfile.xp}
                onAwardXp={(amt, reason) => handleAwardBonusXp(amt, reason)}
              />
            ) : (
              <PuzzleverseMain
                currentUserXp={userProfile.xp}
                onAddXp={(amt, reason) => handleAwardBonusXp(amt, reason)}
              />
            )}
          </div>
        )}

        {/* TAB 2: NUSAORA LIVING MAP (GIS) */}
        {activeTab === 'living-map' && (
          <LivingMap
            points={livingMapPoints}
            onReportSubmitted={handleCrowdsourceReportSubmitted}
            currentRole={currentRole}
            currentUserName={userProfile.name}
            onOpenScanner={() => setIsScannerModalOpen(true)}
            lang={lang}
          />
        )}

        {/* TAB 3: CULTURAL KNOWLEDGE BASE */}
        {activeTab === 'knowledge-base' && (
          <KnowledgeBaseView
            culturalObjects={culturalObjects}
            onOpenObjectInGame={(obj) => {
              setSelectedGameplayObject(obj);
              setActiveTab('world');
            }}
          />
        )}

        {/* TAB 4: LEADERBOARD & PROFILE */}
        {activeTab === 'leaderboard' && (
          <LeaderboardProfileView
            userProfile={userProfile}
            leaderboard={leaderboard}
            allBadges={allBadges}
            initialMode="leaderboard"
          />
        )}

        {/* TAB 5: PROFILE DIRECT TAB */}
        {activeTab === 'profile' && (
          <LeaderboardProfileView
            userProfile={userProfile}
            leaderboard={leaderboard}
            allBadges={allBadges}
            initialMode="profile"
          />
        )}

        {/* TAB 6: CURATOR PANEL */}
        {activeTab === 'curator-panel' && (
          <CuratorPanel
            reports={crowdsourceReports}
            culturalObjects={culturalObjects}
            onApproveReport={handleCuratorApprove}
            onRejectReport={handleCuratorReject}
            onAddNewKnowledgeObject={handleAddNewKnowledgeObject}
          />
        )}

        {/* TAB 7: GOVERNMENT / DINAS KEBUDAYAAN PANEL */}
        {activeTab === 'gov-panel' && (
          <GovernmentPanel
            points={livingMapPoints}
            culturalObjects={culturalObjects}
          />
        )}

        {/* TAB 8: ADMIN PANEL */}
        {activeTab === 'admin-panel' && (
          <AdminPanel
            worlds={worlds}
            onToggleWorldUnlock={handleToggleWorldUnlock}
            currentRole={currentRole}
            onChangeRole={setCurrentRole}
          />
        )}

      </main>

      {/* GAMEPLAY MODAL (6-Step Loop: Explore -> Discover -> Learn -> Verify -> Reason -> Unlock) */}
      {selectedGameplayObject && (
        <GameplayModal
          culturalObject={selectedGameplayObject}
          onClose={() => setSelectedGameplayObject(null)}
          onCompleteObject={handleCompleteObject}
          isAlreadyVerified={verifiedObjectIds.has(selectedGameplayObject.id)}
          lang={lang}
        />
      )}

      {/* Onboarding Tutorial Modal (3-Step Interactive Guide) */}
      <OnboardingModal
        isOpen={showOnboardingTutorial}
        onClose={() => setShowOnboardingTutorial(false)}
      />

      {/* User Profile Modal (Edit, Save, Avatar Picker & Scan History) */}
      <UserProfileModal
        isOpen={isProfileModalOpen}
        onClose={() => setIsProfileModalOpen(false)}
        userProfile={userProfile}
        allBadges={allBadges}
        onSaveProfile={handleSaveProfile}
        onOpenScanner={() => {
          setIsProfileModalOpen(false);
          setIsScannerModalOpen(true);
        }}
      />

      {/* AI Cultural Vision Scanner Modal (Camera, Upload, Pre-tested analysis) */}
      <CultureScannerModal
        isOpen={isScannerModalOpen}
        onClose={() => setIsScannerModalOpen(false)}
        onSaveScanToProfile={handleSaveScanToProfile}
        lang={lang}
      />

      {/* World Baru Terbuka Celebration Notification Modal */}
      {unlockedWorldNotification && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-md rounded-3xl bg-white dark:bg-slate-900 border-2 border-[#1E7773] dark:border-teal-500 p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="mx-auto w-16 h-16 rounded-3xl bg-[#EAF6F5] dark:bg-teal-950/60 border-2 border-[#1E7773] flex items-center justify-center text-[#1E7773] dark:text-teal-400 shadow-md animate-bounce">
              <span className="text-2xl">🎉</span>
            </div>

            <div className="text-center space-y-1.5">
              <span className="text-[10px] font-extrabold text-[#1E7773] dark:text-teal-400 uppercase tracking-widest bg-[#EAF6F5] dark:bg-teal-950/80 px-3 py-1 rounded-full border border-[#A8DDD9] dark:border-teal-800">
                Pencapaian Ekspedisi Baru!
              </span>
              <h3 className="font-serif text-xl font-bold text-[#0D3B3A] dark:text-slate-100 pt-1">
                World Baru Terbuka: {unlockedWorldNotification.name}!
              </h3>
              <p className="text-xs text-[#526665] dark:text-slate-300 leading-relaxed">
                Hebat! Total XP Anda telah mencapai <strong className="text-[#C85A32] font-mono">{userProfile.xp} XP</strong>. Gerbang petualangan cagar budaya untuk wilayah <strong>{unlockedWorldNotification.name}</strong> kini telah resmi dibuka.
              </p>
            </div>

            <div className="rounded-2xl bg-[#FAF8F5] dark:bg-slate-800 p-3.5 border border-[#E5DFD2] dark:border-slate-700 flex items-center justify-between text-xs">
              <div className="flex items-center gap-2">
                <span className="text-xl">🗺️</span>
                <div>
                  <span className="font-bold text-[#0D3B3A] dark:text-slate-100 block">{unlockedWorldNotification.name}</span>
                  <span className="text-[10px] text-[#637675] dark:text-slate-400">{unlockedWorldNotification.description.slice(0, 45)}...</span>
                </div>
              </div>
              <span className="rounded-md bg-[#1E7773] text-white px-2 py-1 text-[10px] font-bold">
                Unlocked
              </span>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setCurrentWorld(unlockedWorldNotification);
                  setActiveTab('world');
                  setUnlockedWorldNotification(null);
                }}
                className="w-full py-2.5 rounded-xl bg-[#1E7773] hover:bg-[#165A57] text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-1.5"
              >
                <span>Jelajahi {unlockedWorldNotification.name} Sekarang</span>
                <span>→</span>
              </button>
              <button
                type="button"
                onClick={() => setUnlockedWorldNotification(null)}
                className="py-2.5 px-4 rounded-xl bg-[#FAF8F5] dark:bg-slate-800 hover:bg-[#EAE5DA] dark:hover:bg-slate-700 text-[#526665] dark:text-slate-300 font-semibold text-xs border border-[#E5DFD2] dark:border-slate-700 transition-colors"
              >
                Nanti
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="border-t border-[#E8E2D5] dark:border-slate-800 bg-white dark:bg-slate-900 py-6 text-center text-xs text-[#526665] dark:text-slate-400 transition-colors">
        <div className="mx-auto max-w-7xl px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-sans font-bold text-[#0D3B3A] dark:text-teal-400">HERITE<span className="text-[#C85A32] dark:text-[#E07A5F]">X</span></span>
            <span>• {t('tagline')}</span>
          </div>
          <div className="text-[11px] text-[#718584] dark:text-slate-400">
            {t('footerCopy')}
          </div>
        </div>
      </footer>

    </div>
  );
}
