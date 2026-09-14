import React, { useState } from 'react';
import { 
  Compass, 
  MapPin, 
  BookOpen, 
  Trophy, 
  ShieldCheck, 
  Building2, 
  Settings, 
  ChevronDown, 
  UserCheck, 
  Award,
  LogOut,
  HelpCircle,
  Gamepad2,
  Camera,
  User,
  Puzzle,
  Sparkles,
  FlaskConical,
  Sun,
  Moon,
  Globe
} from 'lucide-react';
import { UserRole, UserProfile } from '../types';
import { HeritexLogo } from './HeritexLogo';
import { Language, useTranslation } from '../i18n';

interface NavbarProps {
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  userProfile: UserProfile;
  pendingReviewCount: number;
  lang: Language;
  onToggleLang: () => void;
  isDarkMode: boolean;
  onToggleDarkMode: () => void;
  onLogout?: () => void;
  onOpenOnboarding?: () => void;
  onOpenProfileModal?: () => void;
  onOpenScanner?: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentRole,
  setCurrentRole,
  activeTab,
  setActiveTab,
  userProfile,
  pendingReviewCount,
  lang,
  onToggleLang,
  isDarkMode,
  onToggleDarkMode,
  onLogout,
  onOpenOnboarding,
  onOpenProfileModal,
  onOpenScanner
}) => {
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [experimentalMenuOpen, setExperimentalMenuOpen] = useState(false);
  const { t } = useTranslation(lang);

  const rolesConfig: Record<UserRole, { label: string; icon: React.ElementType; color: string; desc: string }> = {
    player: {
      label: lang === 'en' ? 'Student & Youth' : 'Pelajar & Mahasiswa',
      icon: Compass,
      color: 'bg-[#FDF6F0] dark:bg-amber-950/40 text-[#C85A32] dark:text-[#E07A5F] border-[#E8C4B5] dark:border-amber-900/50',
      desc: lang === 'en' ? 'Explore heritage, quiz claims & earn badges' : 'Jelajah cagar budaya, telaah fakta, uji klaim & kumpulkan lencana'
    },
    curator: {
      label: lang === 'en' ? 'Curator & Expert' : 'Kurator & Ahli Budaya',
      icon: ShieldCheck,
      color: 'bg-[#EAF6F5] dark:bg-teal-950/40 text-[#1E7773] dark:text-[#268A86] border-[#A8DDD9] dark:border-teal-900/50',
      desc: lang === 'en' ? 'Validate reports & audit official archives' : 'Validasi laporan warga, kelola arsip cagar budaya & audit rujukan'
    },
    government: {
      label: lang === 'en' ? 'Cultural Dept & Gov' : 'Dinas Kebudayaan & Pemda',
      icon: Building2,
      color: 'bg-[#EDF4F4] dark:bg-slate-800 text-[#0D3B3A] dark:text-slate-200 border-[#B5CECD] dark:border-slate-700',
      desc: lang === 'en' ? 'Monitor spatial map, vulnerability & export recommendations' : 'Pantau peta sebaran, tingkat keterancaman & ekspor rekomendasi resmi'
    },
    admin: {
      label: lang === 'en' ? 'System Administrator' : 'Administrator Sistem',
      icon: Settings,
      color: 'bg-[#F2F4F7] dark:bg-slate-800 text-[#344054] dark:text-slate-200 border-[#D0D5DD] dark:border-slate-700',
      desc: lang === 'en' ? 'User management, AI engine configs & system logs' : 'Konfigurasi pipeline verifikasi, pengelolaan wilayah & hak akses'
    }
  };

  const CurrentRoleIcon = rolesConfig[currentRole].icon;
  const xpProgressPercent = Math.min(100, Math.round((userProfile.xp / userProfile.nextLevelXp) * 100));

  const isExperimentalTabActive = activeTab === 'puzzle';

  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#E8E2D5] dark:border-slate-800 bg-white/95 dark:bg-slate-900/95 shadow-xs backdrop-blur-md transition-colors">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between gap-3">
          
          {/* Brand Logo with HeritexLogo */}
          <div className="flex items-center gap-3">
            <HeritexLogo
              size="md"
              showSubtitle={true}
              onClick={() => setActiveTab('world')}
              className="py-1"
            />
          </div>

          {/* Primary Navigation Tabs */}
          <nav className="hidden md:flex items-center gap-1 rounded-xl bg-[#F4EFE6] dark:bg-slate-800 p-1 border border-[#E5DFD2] dark:border-slate-700">
            {/* Core Demo Flow Tabs */}
            <button
              id="nav-tab-world"
              onClick={() => setActiveTab('world')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'world' 
                  ? 'bg-[#C85A32] text-white font-bold shadow-xs' 
                  : 'text-[#4A5E5D] dark:text-slate-300 hover:text-[#0D3B3A] dark:hover:text-white hover:bg-[#EAE4D7] dark:hover:bg-slate-700'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5" />
              <span>{t('navWorld')}</span>
            </button>

            <button
              id="nav-tab-living-map"
              onClick={() => setActiveTab('living-map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'living-map' 
                  ? 'bg-[#C85A32] text-white font-bold shadow-xs' 
                  : 'text-[#4A5E5D] dark:text-slate-300 hover:text-[#0D3B3A] dark:hover:text-white hover:bg-[#EAE4D7] dark:hover:bg-slate-700'
              }`}
            >
              <MapPin className="w-3.5 h-3.5" />
              <span>{t('navLivingMap')}</span>
            </button>

            <button
              id="nav-tab-kb"
              onClick={() => setActiveTab('knowledge-base')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'knowledge-base' 
                  ? 'bg-[#C85A32] text-white font-bold shadow-xs' 
                  : 'text-[#4A5E5D] dark:text-slate-300 hover:text-[#0D3B3A] dark:hover:text-white hover:bg-[#EAE4D7] dark:hover:bg-slate-700'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>{t('navKnowledgeBase')}</span>
            </button>

            <button
              id="nav-tab-leaderboard"
              onClick={() => setActiveTab('leaderboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                activeTab === 'leaderboard' 
                  ? 'bg-[#C85A32] text-white font-bold shadow-xs' 
                  : 'text-[#4A5E5D] dark:text-slate-300 hover:text-[#0D3B3A] dark:hover:text-white hover:bg-[#EAE4D7] dark:hover:bg-slate-700'
              }`}
            >
              <Trophy className="w-3.5 h-3.5" />
              <span>{t('navLeaderboard')}</span>
            </button>

            {/* Role Dedicated Panel Tabs */}
            {currentRole === 'curator' && (
              <button
                id="nav-tab-curator"
                onClick={() => setActiveTab('curator-panel')}
                className={`relative flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'curator-panel'
                    ? 'bg-[#237E7A] text-white font-bold shadow-xs'
                    : 'text-[#1E7773] dark:text-teal-400 bg-[#EAF6F5] dark:bg-teal-950/40 hover:bg-[#D5EFEA] dark:hover:bg-teal-900/50 border border-[#A8DDD9] dark:border-teal-800'
                }`}
              >
                <ShieldCheck className="w-3.5 h-3.5" />
                <span>{t('navCurator')}</span>
                {pendingReviewCount > 0 && (
                  <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#C85A32] text-[10px] font-bold text-white">
                    {pendingReviewCount}
                  </span>
                )}
              </button>
            )}

            {currentRole === 'government' && (
              <button
                id="nav-tab-gov"
                onClick={() => setActiveTab('gov-panel')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'gov-panel'
                    ? 'bg-[#0D3B3A] dark:bg-teal-800 text-white font-bold shadow-xs'
                    : 'text-[#0D3B3A] dark:text-teal-300 bg-[#EDF4F4] dark:bg-slate-800 hover:bg-[#D9EAE9] dark:hover:bg-slate-700 border border-[#B5CECD] dark:border-slate-700'
                }`}
              >
                <Building2 className="w-3.5 h-3.5" />
                <span>{t('navGovernment')}</span>
              </button>
            )}

            {currentRole === 'admin' && (
              <button
                id="nav-tab-admin"
                onClick={() => setActiveTab('admin-panel')}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  activeTab === 'admin-panel'
                    ? 'bg-[#344054] dark:bg-slate-700 text-white font-bold shadow-xs'
                    : 'text-[#344054] dark:text-slate-300 bg-[#F2F4F7] dark:bg-slate-800 hover:bg-[#E4E7EC] dark:hover:bg-slate-700 border border-[#D0D5DD] dark:border-slate-700'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                <span>{t('navAdmin')}</span>
              </button>
            )}

            {/* ISOLATED MODULE: FITUR EKSPERIMENTAL / FASE LANJUTAN */}
            <div className="relative ml-1 pl-1 border-l border-[#D5CEBD] dark:border-slate-700">
              <button
                id="nav-tab-experimental"
                type="button"
                onClick={() => setExperimentalMenuOpen(!experimentalMenuOpen)}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  isExperimentalTabActive
                    ? 'bg-[#1E7773] text-white font-bold shadow-xs'
                    : 'bg-amber-50 dark:bg-amber-950/40 hover:bg-amber-100 dark:hover:bg-amber-900/60 text-amber-900 dark:text-amber-300 border border-amber-200 dark:border-amber-800'
                }`}
                title="Fitur Eksperimental & Fase Lanjutan Platform"
              >
                <FlaskConical className="w-3.5 h-3.5 text-amber-700 dark:text-amber-400" />
                <span>Fase Lanjutan</span>
                <span className="rounded bg-amber-200/80 dark:bg-amber-900/80 px-1.5 py-0.2 text-[9px] font-extrabold uppercase text-amber-900 dark:text-amber-200 tracking-wider">
                  Beta
                </span>
                <ChevronDown className="w-3 h-3 opacity-70" />
              </button>

              {experimentalMenuOpen && (
                <div 
                  id="experimental-dropdown-menu"
                  className="absolute right-0 mt-2 w-80 origin-top-right rounded-2xl border border-[#E2DDD2] dark:border-slate-700 bg-white dark:bg-slate-800 p-2.5 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100"
                >
                  <div className="px-3 py-2 border-b border-[#EFECE4] dark:border-slate-700">
                    <div className="flex items-center gap-1.5 text-[#C85A32] dark:text-[#E07A5F] font-bold text-xs">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Modul Eksperimental / Fase Lanjutan</span>
                    </div>
                    <p className="text-[10px] text-[#637675] dark:text-slate-400 mt-0.5">
                      Fitur pelengkap untuk eksplorasi gamifikasi lanjutan di luar siklus inti pilot.
                    </p>
                  </div>

                  <div className="space-y-1.5 mt-2">
                    {/* Item 1: Puzzleverse */}
                    <button
                      id="dropdown-item-puzzleverse"
                      onClick={() => {
                        setActiveTab('puzzle');
                        setExperimentalMenuOpen(false);
                      }}
                      className={`w-full flex items-start gap-2.5 rounded-xl p-2.5 text-left transition-colors ${
                        activeTab === 'puzzle'
                          ? 'bg-[#FAF5EE] dark:bg-amber-950/40 border border-[#C85A32] text-[#0D3B3A] dark:text-amber-300'
                          : 'hover:bg-[#FAF8F5] dark:hover:bg-slate-700/60 text-[#2A3E3D] dark:text-slate-200'
                      }`}
                    >
                      <div className="p-2 rounded-xl bg-[#FAF5EE] dark:bg-amber-950/60 text-[#C85A32] dark:text-[#E07A5F] border border-[#E8C4B5] dark:border-amber-800 shrink-0 mt-0.5">
                        <Puzzle className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="flex items-center gap-1.5">
                          <span className="text-xs font-bold text-[#0D3B3A] dark:text-slate-100">Puzzleverse Interaktif</span>
                          <span className="text-[9px] bg-[#EAF6F5] dark:bg-teal-950/60 text-[#1E7773] dark:text-teal-300 px-1.5 py-0.2 rounded font-semibold">2 Mode</span>
                        </div>
                        <p className="text-[10px] text-[#637675] dark:text-slate-400 leading-relaxed mt-0.5">
                          Game susun potongan visual budaya Jambi & Campaign Mosaik Nusantara.
                        </p>
                      </div>
                    </button>

                    {/* Item 2: AI Culture Scanner */}
                    {onOpenScanner && (
                      <button
                        id="dropdown-item-ai-scanner"
                        onClick={() => {
                          setExperimentalMenuOpen(false);
                          onOpenScanner();
                        }}
                        className="w-full flex items-start gap-2.5 rounded-xl p-2.5 text-left hover:bg-[#FAF8F5] dark:hover:bg-slate-700/60 text-[#2A3E3D] dark:text-slate-200 transition-colors"
                      >
                        <div className="p-2 rounded-xl bg-[#EAF6F5] dark:bg-teal-950/60 text-[#1E7773] dark:text-teal-300 border border-[#A8DDD9] dark:border-teal-800 shrink-0 mt-0.5">
                          <Camera className="w-4 h-4" />
                        </div>
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-xs font-bold text-[#0D3B3A] dark:text-slate-100">{t('navScanner')}</span>
                            <span className="text-[9px] bg-amber-100 dark:bg-amber-900/60 text-amber-800 dark:text-amber-200 px-1.5 py-0.2 rounded font-semibold">Vision AI</span>
                          </div>
                          <p className="text-[10px] text-[#637675] dark:text-slate-400 leading-relaxed mt-0.5">
                            Pindai foto kamera atau berkas citra untuk identifikasi otomatis objek budaya (+50 XP).
                          </p>
                        </div>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </nav>

          {/* Right Action: Role Switcher & Player Profile */}
          <div className="flex items-center gap-2 sm:gap-3">
            
            {/* Player Gamification Pill (Clickable to open Edit Profile Modal) */}
            <button
              id="player-profile-badge-btn"
              type="button"
              onClick={() => {
                if (onOpenProfileModal) {
                  onOpenProfileModal();
                } else {
                  setActiveTab('profile');
                }
              }}
              title="Klik untuk membuka dan mengedit Profil Pengguna"
              className="flex items-center gap-2.5 rounded-xl bg-white dark:bg-slate-800 px-3 py-1.5 border border-[#E5DFD2] dark:border-slate-700 hover:border-[#C85A32] shadow-2xs transition-all text-left group"
            >
              <div className="relative">
                <img 
                  src={userProfile.avatar} 
                  alt={userProfile.name} 
                  className="h-8 w-8 rounded-lg object-cover ring-2 ring-[#C85A32]/50 group-hover:ring-[#C85A32]" 
                />
                <span className="absolute -bottom-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#C85A32] text-[9px] font-bold text-white shadow-xs">
                  {userProfile.level}
                </span>
              </div>
              <div className="hidden lg:block">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-[#132726] dark:text-slate-100 truncate max-w-[110px] group-hover:text-[#C85A32] dark:group-hover:text-[#E07A5F] transition-colors">
                    {userProfile.name}
                  </span>
                  <span className="text-[10px] text-[#C85A32] dark:text-[#E07A5F] font-semibold flex items-center gap-0.5">
                    <Award className="w-2.5 h-2.5 text-[#C85A32]" />
                    {userProfile.xp} {t('points')}
                  </span>
                </div>
                <div className="flex items-center gap-1 mt-0.5">
                  <div className="h-1.5 w-16 rounded-full bg-[#EAE5DA] dark:bg-slate-700 overflow-hidden">
                    <div 
                      className="h-full bg-[#C85A32] rounded-full transition-all"
                      style={{ width: `${xpProgressPercent}%` }}
                    />
                  </div>
                  <span className="text-[9px] text-[#718281] dark:text-slate-400">{userProfile.verifiedCount}/12</span>
                </div>
              </div>
            </button>

            {/* Role Switcher Dropdown */}
            <div className="relative">
              <button
                id="role-switcher-toggle"
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className={`flex items-center gap-1.5 rounded-xl border px-3 py-1.5 text-xs font-semibold shadow-2xs transition-all ${rolesConfig[currentRole].color}`}
              >
                <CurrentRoleIcon className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">{rolesConfig[currentRole].label.split('&')[0].trim()}</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </button>

              {roleMenuOpen && (
                <div 
                  id="role-switcher-dropdown"
                  className="absolute right-0 mt-2 w-72 origin-top-right rounded-2xl border border-[#E2DDD2] dark:border-slate-700 bg-white dark:bg-slate-800 p-2 shadow-xl z-50 animate-in fade-in zoom-in-95 duration-100"
                >
                  <div className="px-3 py-2 border-b border-[#EFECE4] dark:border-slate-700">
                    <p className="text-[11px] font-bold text-[#0D3B3A] dark:text-slate-100">Beralih Peran Pengguna</p>
                    <p className="text-[10px] text-[#637675] dark:text-slate-400">Simulasi 4 peran multi-aktor tata kelola kebudayaan</p>
                  </div>
                  <div className="space-y-1 mt-1">
                    {(Object.keys(rolesConfig) as UserRole[]).map((roleKey) => {
                      const item = rolesConfig[roleKey];
                      const Icon = item.icon;
                      const isSelected = currentRole === roleKey;
                      return (
                        <button
                          key={roleKey}
                          id={`select-role-${roleKey}`}
                          onClick={() => {
                            setCurrentRole(roleKey);
                            setRoleMenuOpen(false);
                            if (roleKey === 'curator') setActiveTab('curator-panel');
                            else if (roleKey === 'government') setActiveTab('gov-panel');
                            else if (roleKey === 'admin') setActiveTab('admin-panel');
                            else setActiveTab('world');
                          }}
                          className={`w-full flex items-start gap-2.5 rounded-xl p-2.5 text-left transition-colors ${
                            isSelected 
                              ? 'bg-[#FAF5EE] dark:bg-amber-950/40 border border-[#E8C2B3] dark:border-amber-800 text-[#A64522] dark:text-amber-300' 
                              : 'hover:bg-[#F7F4EC] dark:hover:bg-slate-700 text-[#344847] dark:text-slate-300'
                          }`}
                        >
                          <div className={`p-1.5 rounded-lg ${isSelected ? 'bg-[#C85A32] text-white' : 'bg-[#EFECE4] dark:bg-slate-700 text-[#4A5E5D] dark:text-slate-300'}`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <div>
                            <div className="flex items-center gap-1.5">
                              <span className="text-xs font-semibold">{item.label}</span>
                              {isSelected && <UserCheck className="w-3 h-3 text-[#C85A32]" />}
                            </div>
                            <p className="text-[10px] text-[#637675] dark:text-slate-400 leading-tight mt-0.5">{item.desc}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Actions: Guide & Logout */}
                  <div className="mt-2 pt-2 border-t border-[#EFECE4] dark:border-slate-700 space-y-1">
                    {onOpenOnboarding && (
                      <button
                        type="button"
                        id="btn-nav-open-onboarding"
                        onClick={() => {
                          setRoleMenuOpen(false);
                          onOpenOnboarding();
                        }}
                        className="w-full flex items-center gap-2 rounded-xl p-2 text-left text-xs text-[#0D3B3A] dark:text-slate-200 font-semibold hover:bg-[#F3EFE6] dark:hover:bg-slate-700 transition-colors"
                      >
                        <HelpCircle className="w-4 h-4 text-[#268A86]" />
                        <span>{t('navGuide')}</span>
                      </button>
                    )}

                    {onLogout && (
                      <button
                        type="button"
                        id="btn-nav-logout"
                        onClick={() => {
                          setRoleMenuOpen(false);
                          onLogout();
                        }}
                        className="w-full flex items-center gap-2 rounded-xl p-2 text-left text-xs text-red-600 dark:text-red-400 font-semibold hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
                      >
                        <LogOut className="w-4 h-4 text-red-500" />
                        <span>{t('navLogout')}</span>
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>

            {/* Quick Guide Button */}
            {onOpenOnboarding && (
              <button
                type="button"
                id="btn-nav-guide-quick"
                title="Buka Panduan Aplikasi HERITEX"
                onClick={onOpenOnboarding}
                className="hidden lg:flex items-center justify-center p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-[#FAF5EE] dark:hover:bg-slate-700 text-[#1E7773] dark:text-teal-400 hover:text-[#0D3B3A] border border-[#E5DFD2] dark:border-slate-700 hover:border-[#1E7773] shadow-2xs transition-colors"
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            )}

            {/* Dark / Light Theme Toggle */}
            <button
              type="button"
              id="btn-nav-theme-toggle"
              title={isDarkMode ? 'Beralih ke Mode Terang' : 'Beralih ke Mode Gelap'}
              onClick={onToggleDarkMode}
              className="hidden sm:flex items-center justify-center p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-[#FAF8F5] dark:hover:bg-slate-700 text-[#4A5E5D] dark:text-slate-300 hover:text-[#0D3B3A] dark:hover:text-white border border-[#E5DFD2] dark:border-slate-700 shadow-2xs transition-colors"
            >
              {isDarkMode ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-[#637675]" />}
            </button>

            {/* Language ID / EN Toggle */}
            <button
              type="button"
              id="btn-nav-lang-toggle"
              title="Ganti Bahasa (ID / EN)"
              onClick={onToggleLang}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-white dark:bg-slate-800 hover:bg-[#FAF8F5] dark:hover:bg-slate-700 text-[10px] font-bold text-[#4A5E5D] dark:text-slate-300 hover:text-[#0D3B3A] dark:hover:text-white border border-[#E5DFD2] dark:border-slate-700 shadow-2xs transition-colors uppercase tracking-wider"
            >
              <Globe className="w-3.5 h-3.5 text-[#C85A32] dark:text-[#E07A5F]" />
              <span>{lang.toUpperCase()}</span>
            </button>

            {/* Quick Logout Button */}
            {onLogout && (
              <button
                type="button"
                id="btn-quick-logout"
                title="Keluar / Ganti Akun"
                onClick={onLogout}
                className="hidden sm:flex items-center justify-center p-2 rounded-xl bg-white dark:bg-slate-800 hover:bg-red-50 dark:hover:bg-red-950/40 text-[#637675] dark:text-slate-400 hover:text-red-600 dark:hover:text-red-400 border border-[#E5DFD2] dark:border-slate-700 hover:border-red-200 shadow-2xs transition-colors"
              >
                <LogOut className="w-4 h-4" />
              </button>
            )}

          </div>
        </div>

        {/* Mobile secondary tab bar */}
        <div className="flex md:hidden items-center justify-between gap-1 overflow-x-auto py-2 border-t border-[#E8E2D5] dark:border-slate-800 no-scrollbar">
          <button
            onClick={() => setActiveTab('world')}
            className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${activeTab === 'world' ? 'bg-[#C85A32] text-white font-bold' : 'text-[#4A5E5D] dark:text-slate-300'}`}
          >
            🎮 {t('navWorld')}
          </button>
          <button
            onClick={() => setActiveTab('living-map')}
            className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${activeTab === 'living-map' ? 'bg-[#C85A32] text-white font-bold' : 'text-[#4A5E5D] dark:text-slate-300'}`}
          >
            {t('navLivingMap')}
          </button>
          <button
            onClick={() => setActiveTab('knowledge-base')}
            className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${activeTab === 'knowledge-base' ? 'bg-[#C85A32] text-white font-bold' : 'text-[#4A5E5D] dark:text-slate-300'}`}
          >
            {t('navKnowledgeBase')}
          </button>
          <button
            onClick={() => setActiveTab('leaderboard')}
            className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap ${activeTab === 'leaderboard' ? 'bg-[#C85A32] text-white font-bold' : 'text-[#4A5E5D] dark:text-slate-300'}`}
          >
            {t('navLeaderboard')}
          </button>
          {currentRole === 'curator' && (
            <button
              onClick={() => setActiveTab('curator-panel')}
              className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap text-[#1E7773] dark:text-teal-400 ${activeTab === 'curator-panel' ? 'bg-[#237E7A] text-white font-bold' : ''}`}
            >
              {t('navCurator')} ({pendingReviewCount})
            </button>
          )}
          {currentRole === 'government' && (
            <button
              onClick={() => setActiveTab('gov-panel')}
              className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap text-[#0D3B3A] dark:text-teal-300 ${activeTab === 'gov-panel' ? 'bg-[#0D3B3A] text-white font-bold' : ''}`}
            >
              {t('navGovernment')}
            </button>
          )}
          {currentRole === 'admin' && (
            <button
              onClick={() => setActiveTab('admin-panel')}
              className={`px-3 py-1 rounded-lg text-xs whitespace-nowrap text-[#344054] dark:text-slate-300 ${activeTab === 'admin-panel' ? 'bg-[#344054] text-white font-bold' : ''}`}
            >
              {t('navAdmin')}
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

