import React, { useState } from 'react';
import { 
  X, 
  User, 
  Mail, 
  Building2, 
  MapPin, 
  Sparkles, 
  Save, 
  Award, 
  CheckCircle2, 
  Camera, 
  BookOpen, 
  Compass, 
  ShieldCheck,
  Calendar,
  ExternalLink
} from 'lucide-react';
import { UserProfile, Badge, AiCultureScanResult } from '../types';

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userProfile: UserProfile;
  allBadges?: Badge[];
  onSaveProfile: (updatedData: Partial<UserProfile>) => void;
  onOpenScanner?: () => void;
}

const AVATAR_PRESETS = [
  { id: 'av-1', label: 'Pendekar Ksatria', url: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=200&auto=format&fit=crop&q=80' },
  { id: 'av-2', label: 'Peneliti Sejarah', url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&auto=format&fit=crop&q=80' },
  { id: 'av-3', label: 'Penari Tradisi', url: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=200&auto=format&fit=crop&q=80' },
  { id: 'av-4', label: 'Kurator Muda', url: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=200&auto=format&fit=crop&q=80' },
  { id: 'av-5', label: 'Arkeolog Cilik', url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&auto=format&fit=crop&q=80' },
  { id: 'av-6', label: 'Pemberdaya Kriya', url: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&auto=format&fit=crop&q=80' },
  { id: 'av-7', label: 'Musisi Tradisi', url: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&auto=format&fit=crop&q=80' },
  { id: 'av-8', label: 'Pencinta Adat', url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&auto=format&fit=crop&q=80' }
];

export const UserProfileModal: React.FC<UserProfileModalProps> = ({
  isOpen,
  onClose,
  userProfile,
  onSaveProfile,
  onOpenScanner
}) => {
  if (!isOpen) return null;

  const [activeTab, setActiveTab] = useState<'profile' | 'badges' | 'scans'>('profile');

  // Form states
  const [name, setName] = useState(userProfile.name);
  const [email, setEmail] = useState(userProfile.email);
  const [school, setSchool] = useState(userProfile.school);
  const [domicile, setDomicile] = useState(userProfile.domicile || 'Jambi / Nusantara');
  const [bio, setBio] = useState(userProfile.bio || 'Pelestari cagar budaya dan penjelajah kearifan lokal Nusantara di platform HERITEX.');
  const [avatar, setAvatar] = useState(userProfile.avatar);
  const [customAvatarUrl, setCustomAvatarUrl] = useState('');
  const [isSavedAlert, setIsSavedAlert] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      name: name.trim(),
      email: email.trim(),
      school: school.trim(),
      domicile: domicile.trim(),
      bio: bio.trim(),
      avatar: avatar
    });

    setIsSavedAlert(true);
    setTimeout(() => {
      setIsSavedAlert(false);
    }, 2500);
  };

  const handleApplyCustomAvatar = () => {
    if (customAvatarUrl.trim()) {
      setAvatar(customAvatarUrl.trim());
      setCustomAvatarUrl('');
    }
  };

  const xpProgressPercent = Math.min(100, Math.round((userProfile.xp / userProfile.nextLevelXp) * 100));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div 
        id="user-profile-modal"
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-white border border-[#E5DFD2] shadow-2xl overflow-hidden"
      >
        {/* Header with Warm Cream Banner */}
        <div className="relative bg-gradient-to-r from-[#FAF6EE] via-[#F4EDE0] to-[#EAE1D1] px-6 pt-6 pb-5 border-b border-[#E5DFD2]">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#C85A32] text-white shadow-xs">
                <User className="w-5 h-5" />
              </div>
              <div>
                <h2 className="font-serif text-lg sm:text-xl font-bold text-[#0D3B3A]">
                  Profil Pengguna & Penjelajah
                </h2>
                <p className="text-xs text-[#5B6D6C]">
                  Kelola identitas pelestari, avatar pusaka, dan rekam jejak eksplorasi
                </p>
              </div>
            </div>

            <button
              id="close-profile-modal-btn"
              onClick={onClose}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-[#637675] hover:text-[#0D3B3A] hover:bg-black/5 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation Sub-Tabs */}
          <div className="flex items-center gap-2 mt-5">
            <button
              id="tab-profile-edit"
              onClick={() => setActiveTab('profile')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'profile'
                  ? 'bg-[#C85A32] text-white shadow-xs'
                  : 'bg-white/80 text-[#4A5E5D] hover:bg-white hover:text-[#0D3B3A]'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              <span>Edit Profil</span>
            </button>

            <button
              id="tab-profile-badges"
              onClick={() => setActiveTab('badges')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'badges'
                  ? 'bg-[#C85A32] text-white shadow-xs'
                  : 'bg-white/80 text-[#4A5E5D] hover:bg-white hover:text-[#0D3B3A]'
              }`}
            >
              <Award className="w-3.5 h-3.5" />
              <span>Koleksi Lencana ({userProfile.badges?.length || 0})</span>
            </button>

            <button
              id="tab-profile-scans"
              onClick={() => setActiveTab('scans')}
              className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'scans'
                  ? 'bg-[#C85A32] text-white shadow-xs'
                  : 'bg-white/80 text-[#4A5E5D] hover:bg-white hover:text-[#0D3B3A]'
              }`}
            >
              <Camera className="w-3.5 h-3.5" />
              <span>Jurnal Pindai AI ({userProfile.scannedCultures?.length || 0})</span>
            </button>
          </div>
        </div>

        {/* Modal Body - Scrollable */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          
          {/* Saved Alert Toast */}
          {isSavedAlert && (
            <div className="flex items-center gap-2.5 rounded-2xl bg-[#EAF6F5] border border-[#278B86] p-3 text-xs font-bold text-[#1E7773] animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-[#1E7773] shrink-0" />
              <span>Profil pengguna berhasil disimpan! Perubahan tersimpan secara lokal di peramban Anda.</span>
            </div>
          )}

          {/* TAB 1: EDIT PROFILE */}
          {activeTab === 'profile' && (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Top Banner: Current Avatar & Level Summary */}
              <div className="flex flex-col sm:flex-row items-center gap-5 rounded-2xl bg-[#FAF8F5] p-4 border border-[#E5DFD2]">
                <div className="relative">
                  <img 
                    src={avatar} 
                    alt={name}
                    className="h-20 w-20 rounded-2xl object-cover ring-2 ring-[#C85A32] shadow-md"
                  />
                  <span className="absolute -bottom-2 -right-2 flex h-6 w-6 items-center justify-center rounded-full bg-[#C85A32] text-xs font-bold text-white shadow-xs">
                    {userProfile.level}
                  </span>
                </div>

                <div className="flex-1 text-center sm:text-left space-y-1">
                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                    <h3 className="font-bold text-base text-[#0D3B3A]">{name}</h3>
                    <span className="rounded-md bg-[#FAF5EE] px-2 py-0.5 text-[10px] font-bold text-[#C85A32] border border-[#E8C4B5]">
                      {userProfile.levelTitle}
                    </span>
                  </div>
                  <p className="text-xs text-[#637675]">{school}</p>

                  <div className="pt-1.5">
                    <div className="flex items-center justify-between text-[10px] text-[#4A5E5D] font-semibold mb-1">
                      <span>Progres Menuju Level {userProfile.level + 1}</span>
                      <span className="text-[#C85A32] font-bold">{userProfile.xp} / {userProfile.nextLevelXp} XP</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-[#E5DFD2] overflow-hidden">
                      <div 
                        className="h-full bg-[#C85A32] rounded-full transition-all duration-300"
                        style={{ width: `${xpProgressPercent}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Avatar Selector Presets */}
              <div className="space-y-2">
                <label className="text-xs font-bold text-[#0D3B3A] block">
                  Pilih Avatar Budaya Nusantara:
                </label>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-2">
                  {AVATAR_PRESETS.map((p) => {
                    const isSelected = avatar === p.url;
                    return (
                      <button
                        key={p.id}
                        type="button"
                        onClick={() => setAvatar(p.url)}
                        title={p.label}
                        className={`group relative flex flex-col items-center rounded-xl p-1 border transition-all ${
                          isSelected 
                            ? 'bg-[#FAF5EE] border-[#C85A32] ring-2 ring-[#C85A32]/40' 
                            : 'bg-white border-[#E5DFD2] hover:border-[#C85A32]'
                        }`}
                      >
                        <img 
                          src={p.url} 
                          alt={p.label}
                          className="h-11 w-11 rounded-lg object-cover"
                        />
                        <span className="text-[9px] text-[#637675] font-semibold truncate w-full text-center mt-1">
                          {p.label.split(' ')[0]}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Custom Avatar URL Input */}
                <div className="flex items-center gap-2 pt-1">
                  <input
                    type="url"
                    placeholder="Atau tempel URL gambar avatar kustom..."
                    value={customAvatarUrl}
                    onChange={(e) => setCustomAvatarUrl(e.target.value)}
                    className="flex-1 rounded-xl border border-[#E5DFD2] bg-white px-3 py-1.5 text-xs text-[#0D3B3A] focus:outline-none focus:border-[#C85A32]"
                  />
                  <button
                    type="button"
                    onClick={handleApplyCustomAvatar}
                    className="rounded-xl bg-[#F4EFE6] hover:bg-[#EAE4D7] px-3 py-1.5 text-xs font-bold text-[#0D3B3A] border border-[#E5DFD2]"
                  >
                    Terapkan
                  </button>
                </div>
              </div>

              {/* Form Input Fields */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                
                {/* Nama Lengkap */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0D3B3A] flex items-center gap-1.5">
                    <User className="w-3.5 h-3.5 text-[#C85A32]" />
                    Nama Lengkap
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-[#E5DFD2] bg-white px-3 py-2 text-xs text-[#0D3B3A] font-semibold focus:outline-none focus:border-[#C85A32]"
                    placeholder="Masukkan nama Anda..."
                  />
                </div>

                {/* Email Kontak */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0D3B3A] flex items-center gap-1.5">
                    <Mail className="w-3.5 h-3.5 text-[#C85A32]" />
                    Alamat Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-[#E5DFD2] bg-white px-3 py-2 text-xs text-[#0D3B3A] font-semibold focus:outline-none focus:border-[#C85A32]"
                    placeholder="email@sekolah.sch.id"
                  />
                </div>

                {/* Sekolah / Institusi */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0D3B3A] flex items-center gap-1.5">
                    <Building2 className="w-3.5 h-3.5 text-[#C85A32]" />
                    Asal Sekolah / Kampus / Komunitas
                  </label>
                  <input
                    type="text"
                    required
                    value={school}
                    onChange={(e) => setSchool(e.target.value)}
                    className="w-full rounded-xl border border-[#E5DFD2] bg-white px-3 py-2 text-xs text-[#0D3B3A] font-semibold focus:outline-none focus:border-[#C85A32]"
                    placeholder="Contoh: SMA N 1 Jambi / Universitas Indonesia"
                  />
                </div>

                {/* Domisili / Daerah Asal */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-[#0D3B3A] flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-[#C85A32]" />
                    Domisili / Daerah Asal
                  </label>
                  <input
                    type="text"
                    value={domicile}
                    onChange={(e) => setDomicile(e.target.value)}
                    className="w-full rounded-xl border border-[#E5DFD2] bg-white px-3 py-2 text-xs text-[#0D3B3A] font-semibold focus:outline-none focus:border-[#C85A32]"
                    placeholder="Contoh: Kota Jambi / Jawa Tengah / Bali"
                  />
                </div>

              </div>

              {/* Bio / Slogan Budaya */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-[#0D3B3A] flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
                  Bio / Motto Pelestarian Budaya
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full rounded-xl border border-[#E5DFD2] bg-white px-3 py-2 text-xs text-[#0D3B3A] leading-relaxed focus:outline-none focus:border-[#C85A32]"
                  placeholder="Ceritakan minat Anda terhadap warisan budaya Indonesia..."
                />
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-xl px-4 py-2 text-xs font-bold text-[#637675] hover:text-[#0D3B3A] hover:bg-stone-100 transition-colors"
                >
                  Tutup
                </button>

                <button
                  id="btn-save-user-profile"
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-[#C85A32] hover:bg-[#B54E27] px-5 py-2.5 text-xs font-bold text-white shadow-xs transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Perubahan Profil</span>
                </button>
              </div>

            </form>
          )}

          {/* TAB 2: BADGES COLLECTION */}
          {activeTab === 'badges' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#0D3B3A]">Lencana Pencapaian Adat</h3>
                  <p className="text-xs text-[#637675]">Penghargaan yang telah Anda raih dalam memverifikasi warisan budaya</p>
                </div>
                <span className="rounded-lg bg-[#FAF5EE] px-2.5 py-1 text-xs font-bold text-[#C85A32] border border-[#E8C4B5]">
                  {userProfile.badges?.length || 0} Terkumpul
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {userProfile.badges?.map((badge: Badge) => (
                  <div 
                    key={badge.id}
                    className="flex items-start gap-3 rounded-2xl bg-[#FAF8F5] p-3.5 border border-[#E5DFD2]"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#C85A32] text-white shadow-xs shrink-0">
                      <Award className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-xs font-bold text-[#0D3B3A]">{badge.name}</h4>
                      <p className="text-[11px] text-[#4A5E5D] mt-0.5 leading-relaxed">{badge.description}</p>
                      <span className="inline-block mt-2 rounded-md bg-[#EAF6F5] px-2 py-0.5 text-[9px] font-bold text-[#1E7773]">
                        Kategori: {badge.category}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: SCANNED CULTURES JOURNAL */}
          {activeTab === 'scans' && (
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-bold text-sm text-[#0D3B3A]">Jurnal Pindai Kamera AI</h3>
                  <p className="text-xs text-[#637675]">Riwayat identifikasi objek budaya yang Anda rekam dengan AI</p>
                </div>
                {onOpenScanner && (
                  <button
                    onClick={() => {
                      onClose();
                      onOpenScanner();
                    }}
                    className="flex items-center gap-1.5 rounded-xl bg-[#C85A32] hover:bg-[#B54E27] px-3 py-1.5 text-xs font-bold text-white transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    <span>Pindai Objek Baru</span>
                  </button>
                )}
              </div>

              {(!userProfile.scannedCultures || userProfile.scannedCultures.length === 0) ? (
                <div className="text-center py-10 px-4 rounded-2xl bg-[#FAF8F5] border border-dashed border-[#D5CEBD]">
                  <Camera className="w-8 h-8 text-[#C85A32] mx-auto opacity-70 mb-2" />
                  <p className="text-xs font-bold text-[#0D3B3A]">Belum Ada Objek yang Dipindai</p>
                  <p className="text-[11px] text-[#637675] max-w-sm mx-auto mt-1 mb-4">
                    Gunakan fitur kamera AI untuk memotret objek cagar budaya, mengenali asal-usulnya, dan memeriksa keasliannya!
                  </p>
                  {onOpenScanner && (
                    <button
                      onClick={() => {
                        onClose();
                        onOpenScanner();
                      }}
                      className="inline-flex items-center gap-1.5 rounded-xl bg-[#C85A32] px-4 py-2 text-xs font-bold text-white shadow-xs"
                    >
                      <Camera className="w-3.5 h-3.5" />
                      <span>Buka Kamera Pindai Budaya AI</span>
                    </button>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  {userProfile.scannedCultures.map((scan: AiCultureScanResult) => (
                    <div 
                      key={scan.id}
                      className="flex flex-col sm:flex-row items-start sm:items-center gap-3 rounded-2xl bg-white p-3.5 border border-[#E5DFD2] shadow-2xs"
                    >
                      <img 
                        src={scan.imageThumbnail} 
                        alt={scan.culturalObjectName}
                        className="h-16 w-16 rounded-xl object-cover shrink-0 ring-1 ring-[#D5CEBD]"
                      />
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] text-[#C85A32] font-bold uppercase">{scan.category}</span>
                          <span className="text-[10px] text-[#637675]">• {scan.scannedAt}</span>
                        </div>
                        <h4 className="text-xs font-bold text-[#0D3B3A] truncate">{scan.culturalObjectName}</h4>
                        <p className="text-[11px] text-[#4A5E5D] truncate">📍 {scan.region}, {scan.province}</p>
                        <p className="text-[11px] text-[#1E7773] font-semibold mt-0.5">{scan.authenticityLabel}</p>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="rounded-md bg-[#FAF5EE] px-2 py-0.5 text-[10px] font-bold text-[#C85A32] border border-[#E8C4B5]">
                          Skor AI: {scan.confidenceScore}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
