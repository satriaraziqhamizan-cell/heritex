import React, { useState } from 'react';
import { 
  Trophy, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  Compass, 
  Medal, 
  Search, 
  BookOpen, 
  ShieldCheck, 
  Clock, 
  School,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { UserProfile, LeaderboardEntry, Badge } from '../types';

interface LeaderboardProfileViewProps {
  userProfile: UserProfile;
  leaderboard: LeaderboardEntry[];
  allBadges: Badge[];
  initialMode?: 'leaderboard' | 'profile';
}

export const LeaderboardProfileView: React.FC<LeaderboardProfileViewProps> = ({
  userProfile,
  leaderboard,
  allBadges,
  initialMode = 'leaderboard'
}) => {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'profile'>(initialMode);
  const [institutionFilter, setInstitutionFilter] = useState<'all' | 'sma' | 'univ'>('all');
  const [hasCopiedProfile, setHasCopiedProfile] = useState(false);

  const filteredLeaderboard = leaderboard.filter(entry => {
    if (institutionFilter === 'sma') return entry.institution.toLowerCase().includes('sma') || entry.institution.toLowerCase().includes('smk');
    if (institutionFilter === 'univ') return entry.institution.toLowerCase().includes('universitas') || entry.institution.toLowerCase().includes('unja');
    return true;
  });

  return (
    <div className="space-y-6 text-[#132726]">
      
      {/* Header & Tabs Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest text-[#C85A32] uppercase">
              Gamifikasi Literasi Kebudayaan Nusantara
            </span>
            <span className="rounded-md bg-[#FAF5EE] px-2 py-0.5 text-[9px] font-semibold text-[#C85A32] border border-[#E8C4B5]">
              Musim Pelestarian 2026
            </span>
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B3A] tracking-wide mt-0.5">
            {activeTab === 'leaderboard' ? 'Papan Peringkat Literasi Budaya' : 'Profil & Pencapaian Penjelajah'}
          </h1>
          <p className="text-xs text-[#4A5E5D] mt-0.5 max-w-2xl leading-relaxed">
            Apresiasi penjelajah dan penguji pusaka warisan budaya dari berbagai sekolah dan perguruan tinggi di Indonesia.
          </p>
        </div>

        <div className="flex items-center gap-1.5 rounded-2xl bg-white p-1.5 border border-[#E5DFD2] shadow-2xs">
          <button
            id="tab-btn-leaderboard"
            onClick={() => setActiveTab('leaderboard')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'leaderboard' 
                ? 'bg-[#C85A32] text-white font-bold shadow-xs' 
                : 'text-[#637675] hover:text-[#0D3B3A]'
            }`}
          >
            <Trophy className="w-3.5 h-3.5" />
            <span>Papan Peringkat</span>
          </button>

          <button
            id="tab-btn-profile"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold transition-all ${
              activeTab === 'profile' 
                ? 'bg-[#C85A32] text-white font-bold shadow-xs' 
                : 'text-[#637675] hover:text-[#0D3B3A]'
            }`}
          >
            <Award className="w-3.5 h-3.5" />
            <span>Profil & Lencana</span>
          </button>
        </div>
      </div>

      {/* LEADERBOARD VIEW */}
      {activeTab === 'leaderboard' && (
        <div className="space-y-6">
          
          {/* Top 3 Podium Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            
            {/* 2nd Place */}
            {leaderboard[1] && (
              <div className="order-2 md:order-1 rounded-3xl bg-white border border-[#E5DFD2] p-5 text-center relative flex flex-col justify-between shadow-sm">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-stone-100 text-[#2A3E3D] border border-stone-300 text-xs font-bold px-3 py-0.5 rounded-full shadow-2xs">
                  🥈 PERINGKAT 2
                </span>
                <div className="mt-2 space-y-2">
                  <img 
                    src={leaderboard[1].avatar} 
                    alt={leaderboard[1].name} 
                    className="h-16 w-16 mx-auto rounded-2xl object-cover ring-2 ring-stone-300" 
                  />
                  <h3 className="font-serif text-sm font-bold text-[#0D3B3A]">{leaderboard[1].name}</h3>
                  <p className="text-[11px] text-[#637675]">{leaderboard[1].institution}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EFECE4] flex items-center justify-around text-xs">
                  <div>
                    <span className="text-[10px] text-[#637675] block">Total XP</span>
                    <span className="font-bold text-[#C85A32]">{leaderboard[1].xp}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#637675] block">Terverifikasi</span>
                    <span className="font-bold text-[#1E7773]">{leaderboard[1].verifiedCount}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 1st Place Champion */}
            {leaderboard[0] && (
              <div className="order-1 md:order-2 rounded-3xl bg-[#FAF5EE] border-2 border-[#C85A32] p-6 text-center relative flex flex-col justify-between shadow-md md:scale-105 z-10">
                <span className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#C85A32] text-white text-xs font-bold px-3.5 py-0.5 rounded-full shadow-sm flex items-center gap-1">
                  👑 JUARA 1
                </span>
                <div className="mt-2 space-y-2">
                  <div className="relative inline-block">
                    <img 
                      src={leaderboard[0].avatar} 
                      alt={leaderboard[0].name} 
                      className="h-20 w-20 mx-auto rounded-3xl object-cover ring-4 ring-[#C85A32] shadow-md" 
                    />
                    <Sparkles className="w-5 h-5 text-[#C85A32] absolute -top-2 -right-2 animate-bounce" />
                  </div>
                  <h3 className="font-serif text-base font-bold text-[#0D3B3A]">{leaderboard[0].name}</h3>
                  <p className="text-xs text-[#C85A32] font-semibold">{leaderboard[0].institution}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#E8C4B5] flex items-center justify-around text-xs">
                  <div>
                    <span className="text-[10px] text-[#637675] block">Total XP</span>
                    <span className="font-bold text-[#C85A32] text-sm">{leaderboard[0].xp}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#637675] block">Terverifikasi</span>
                    <span className="font-bold text-[#1E7773] text-sm">{leaderboard[0].verifiedCount} Objek</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3rd Place */}
            {leaderboard[2] && (
              <div className="order-3 rounded-3xl bg-white border border-[#E5DFD2] p-5 text-center relative flex flex-col justify-between shadow-sm">
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-[#FAF5EE] text-[#A64522] border border-[#E8C4B5] text-xs font-bold px-3 py-0.5 rounded-full shadow-2xs">
                  🥉 PERINGKAT 3
                </span>
                <div className="mt-2 space-y-2">
                  <img 
                    src={leaderboard[2].avatar} 
                    alt={leaderboard[2].name} 
                    className="h-16 w-16 mx-auto rounded-2xl object-cover ring-2 ring-[#E8C4B5]" 
                  />
                  <h3 className="font-serif text-sm font-bold text-[#0D3B3A]">{leaderboard[2].name}</h3>
                  <p className="text-[11px] text-[#637675]">{leaderboard[2].institution}</p>
                </div>
                <div className="mt-4 pt-3 border-t border-[#EFECE4] flex items-center justify-around text-xs">
                  <div>
                    <span className="text-[10px] text-[#637675] block">Total XP</span>
                    <span className="font-bold text-[#C85A32]">{leaderboard[2].xp}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-[#637675] block">Terverifikasi</span>
                    <span className="font-bold text-[#1E7773]">{leaderboard[2].verifiedCount}</span>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-2 pt-2">
            <button
              onClick={() => setInstitutionFilter('all')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors shadow-2xs ${
                institutionFilter === 'all' 
                  ? 'bg-[#C85A32] text-white font-bold' 
                  : 'bg-white text-[#637675] hover:text-[#0D3B3A] border border-[#E5DFD2]'
              }`}
            >
              Semua Institusi
            </button>
            <button
              onClick={() => setInstitutionFilter('sma')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors shadow-2xs ${
                institutionFilter === 'sma' 
                  ? 'bg-[#C85A32] text-white font-bold' 
                  : 'bg-white text-[#637675] hover:text-[#0D3B3A] border border-[#E5DFD2]'
              }`}
            >
              SMA / SMK Sederajat
            </button>
            <button
              onClick={() => setInstitutionFilter('univ')}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-colors shadow-2xs ${
                institutionFilter === 'univ' 
                  ? 'bg-[#C85A32] text-white font-bold' 
                  : 'bg-white text-[#637675] hover:text-[#0D3B3A] border border-[#E5DFD2]'
              }`}
            >
              Perguruan Tinggi
            </button>
          </div>

          {/* Full Leaderboard Table */}
          <div className="rounded-3xl bg-white border border-[#E5DFD2] overflow-hidden shadow-sm">
            <table className="w-full text-left text-xs text-[#2A3E3D]">
              <thead className="bg-[#FAF8F5] text-[11px] font-bold text-[#637675] uppercase border-b border-[#EFECE4]">
                <tr>
                  <th className="px-4 py-3">Peringkat</th>
                  <th className="px-4 py-3">Nama Penjelajah</th>
                  <th className="px-4 py-3">Asal Sekolah / Kampus</th>
                  <th className="px-4 py-3">Tingkat</th>
                  <th className="px-4 py-3">Total XP</th>
                  <th className="px-4 py-3">Verifikasi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE4]">
                {filteredLeaderboard.map((entry) => (
                  <tr key={entry.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-4 py-3 font-bold text-[#C85A32]">
                      #{entry.rank}
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={entry.avatar} 
                          alt={entry.name} 
                          className="h-7 w-7 rounded-lg object-cover ring-1 ring-[#E5DFD2]" 
                        />
                        <span className="font-semibold text-[#0D3B3A]">{entry.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-[#4A5E5D]">
                      {entry.institution}
                    </td>
                    <td className="px-4 py-3">
                      <span className="rounded bg-[#FAF5EE] border border-[#E8C4B5] px-2 py-0.5 text-[10px] font-bold text-[#C85A32]">
                        Tingkat {entry.level}
                      </span>
                    </td>
                    <td className="px-4 py-3 font-mono font-bold text-[#C85A32]">
                      {entry.xp} XP
                    </td>
                    <td className="px-4 py-3 text-[#1E7773] font-semibold">
                      {entry.verifiedCount} Cagar
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

        </div>
      )}

      {/* PLAYER PROFILE VIEW */}
      {activeTab === 'profile' && (
        <div className="space-y-6">
          
          {/* User Hero Card */}
          <div className="rounded-3xl bg-white border border-[#E5DFD2] p-6 shadow-sm flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <img 
                src={userProfile.avatar} 
                alt={userProfile.name} 
                className="h-24 w-24 rounded-3xl object-cover ring-4 ring-[#C85A32] shadow-sm" 
              />
              <span className="absolute -bottom-2 -right-2 flex h-8 w-8 items-center justify-center rounded-2xl bg-[#C85A32] text-xs font-bold text-white shadow">
                Lvl {userProfile.level}
              </span>
            </div>

            <div className="flex-1 text-center md:text-left space-y-1">
              <span className="text-[10px] font-bold text-[#C85A32] uppercase tracking-widest">
                {userProfile.levelTitle}
              </span>
              <h2 className="font-serif text-xl font-bold text-[#0D3B3A]">{userProfile.name}</h2>
              <p className="text-xs text-[#4A5E5D] flex items-center justify-center md:justify-start gap-1.5">
                <School className="w-3.5 h-3.5 text-[#637675]" />
                <span>{userProfile.school}</span>
              </p>

              {/* Progress to Next Level */}
              <div className="pt-3 max-w-md">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-[#637675]">Progres Menuju Tingkat {userProfile.level + 1}</span>
                  <span className="font-bold text-[#C85A32]">{userProfile.xp} / {userProfile.nextLevelXp} XP</span>
                </div>
                <div className="h-2.5 w-full rounded-full bg-[#FAF5EE] overflow-hidden border border-[#E8C4B5]">
                  <div 
                    className="h-full bg-gradient-to-r from-[#C85A32] to-[#E07A5F] rounded-full transition-all"
                    style={{ width: `${Math.min(100, (userProfile.xp / userProfile.nextLevelXp) * 100)}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Quick Stats Box & Share Action */}
            <div className="flex flex-col items-stretch gap-2.5 w-full md:w-auto">
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="rounded-2xl bg-[#FAF8F5] p-3 border border-[#E5DFD2]">
                  <span className="text-[10px] text-[#637675] uppercase font-bold block">Terverifikasi</span>
                  <span className="font-serif text-lg font-bold text-[#1E7773] mt-0.5 block">{userProfile.verifiedCount} / 9</span>
                </div>
                <div className="rounded-2xl bg-[#FAF8F5] p-3 border border-[#E5DFD2]">
                  <span className="text-[10px] text-[#637675] uppercase font-bold block">Lencana Koleksi</span>
                  <span className="font-serif text-lg font-bold text-[#C85A32] mt-0.5 block">{userProfile.badges.length} Lencana</span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="btn-share-profile-wa"
                  onClick={() => {
                    const text = `Profil Penjelajah HERITEX: ${userProfile.name} (${userProfile.levelTitle} - Tingkat ${userProfile.level}, ${userProfile.xp} XP, ${userProfile.badges.length} Lencana Cagar Budaya). Yuk lestarikan warisan Nusantara bersama!`;
                    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(text)}`, '_blank');
                  }}
                  className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-colors shadow-2xs"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>WhatsApp</span>
                </button>

                <button
                  id="btn-copy-profile"
                  onClick={() => {
                    const text = `Profil Penjelajah HERITEX: ${userProfile.name} (${userProfile.levelTitle} - Tingkat ${userProfile.level}, ${userProfile.xp} XP, ${userProfile.badges.length} Lencana Cagar Budaya).`;
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(text);
                      setHasCopiedProfile(true);
                      setTimeout(() => setHasCopiedProfile(false), 2500);
                    }
                  }}
                  className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white hover:bg-[#FAF8F5] border border-[#D5CEBD] text-[#0D3B3A] text-xs font-bold transition-colors shadow-2xs"
                >
                  {hasCopiedProfile ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[#1E7773]" />
                      <span className="text-[#1E7773]">Tersalin</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-[#637675]" />
                      <span>Salin</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* Badges Collection Showcase */}
          <div className="rounded-3xl bg-white border border-[#E5DFD2] p-6 shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="font-serif text-sm font-bold text-[#0D3B3A] flex items-center gap-2">
                  <Award className="w-4 h-4 text-[#C85A32]" />
                  Koleksi Lencana & Prestasi Kebudayaan
                </h3>
                <p className="text-xs text-[#4A5E5D] mt-0.5 leading-relaxed">
                  Diraih melalui penjelajahan cagar budaya, ketepatan analisis fakta rujukan, dan laporan observasi lapangan.
                </p>
              </div>
              <span className="text-xs font-bold text-[#C85A32] bg-[#FAF5EE] px-2.5 py-1 rounded-lg border border-[#E8C4B5]">
                {userProfile.badges.length} dari {allBadges.length} Terkumpul
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {allBadges.map((b) => {
                const isEarned = userProfile.badges.some(ub => ub.id === b.id);
                return (
                  <div 
                    key={b.id}
                    className={`rounded-2xl p-4 border transition-all flex items-start gap-3 shadow-2xs ${
                      isEarned 
                        ? 'bg-[#FAF5EE] border-[#E8C4B5]' 
                        : 'bg-[#FAF8F5] border-[#E5DFD2] opacity-60'
                    }`}
                  >
                    <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-bold ${
                      isEarned ? 'bg-[#C85A32] text-white shadow-xs' : 'bg-stone-200 text-stone-500'
                    }`}>
                      <Award className="w-5 h-5" />
                    </div>
                    <div className="space-y-0.5">
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-serif text-xs font-bold text-[#0D3B3A]">{b.name}</h4>
                        {isEarned && <span className="text-[#1E7773] text-xs font-bold">✓</span>}
                      </div>
                      <p className="text-[11px] text-[#4A5E5D] leading-relaxed">{b.description}</p>
                      <span className="text-[9px] text-[#C85A32] font-mono block pt-1">
                        Syarat: {b.condition}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Reasoning History */}
          <div className="rounded-3xl bg-white border border-[#E5DFD2] p-6 shadow-sm space-y-4">
            <div>
              <h3 className="font-serif text-sm font-bold text-[#0D3B3A] flex items-center gap-2">
                <BookOpen className="w-4 h-4 text-[#C85A32]" />
                Riwayat Argumentasi & Nalar Kritis (Fase Penegasan)
              </h3>
              <p className="text-xs text-[#4A5E5D] mt-0.5 leading-relaxed">
                Kompilasi argumentasi analitis yang Anda tuliskan saat memverifikasi klaim kebudayaan.
              </p>
            </div>

            {userProfile.reasoningSubmissions.length === 0 ? (
              <p className="text-xs text-[#637675] italic p-4 text-center rounded-2xl bg-[#FAF8F5] border border-[#E5DFD2]">
                Belum ada catatan argumentasi. Jelajahi objek pusaka di Peta Dunia Budaya lalu selesaikan siklus 5 tahap untuk melatih nalar kritis Anda.
              </p>
            ) : (
              <div className="space-y-2.5">
                {userProfile.reasoningSubmissions.map((sub, idx) => (
                  <div key={idx} className="p-3.5 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD2] space-y-1.5 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-serif font-bold text-[#0D3B3A]">{sub.objectName}</span>
                      <span className="text-[10px] text-[#637675]">{sub.submittedAt}</span>
                    </div>
                    <p className="text-[#4A5E5D] text-[11px]">
                      Klaim yang diuji: <em className="text-[#0D3B3A] font-medium">"{sub.claimText}"</em>
                    </p>
                    <div className="p-2.5 rounded-xl bg-white border border-[#E5DFD2] text-[#2A3E3D]">
                      <span className="text-[10px] text-[#1E7773] font-bold block mb-0.5">Argumentasi Analitis Anda:</span>
                      "{sub.reasonText}"
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      )}

    </div>
  );
};
