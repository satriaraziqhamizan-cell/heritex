import React, { useState } from 'react';
import { 
  Settings, 
  Cpu, 
  Globe, 
  Users, 
  Sliders, 
  Save, 
  CheckCircle2, 
  Lock, 
  Unlock, 
  Server,
  Activity,
  ShieldAlert,
  FileText,
  Search,
  Filter,
  Trash2,
  UserCheck,
  UserX,
  AlertTriangle,
  Clock,
  Key,
  RefreshCw,
  Download,
  UserPlus,
  ChevronDown,
  Database,
  Sparkles,
  Shield,
  Radio,
  Zap,
  Check,
  X
} from 'lucide-react';
import { WorldRegion, UserRole, AdminManagedUser, SystemLogItem } from '../types';

interface AdminPanelProps {
  worlds: WorldRegion[];
  onToggleWorldUnlock: (worldId: string) => void;
  currentRole: UserRole;
  onChangeRole: (newRole: UserRole) => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  worlds,
  onToggleWorldUnlock,
  currentRole,
  onChangeRole
}) => {
  // Active Internal Tab inside AdminPanel
  const [adminTab, setAdminTab] = useState<'config' | 'worlds' | 'users' | 'logs'>('config');

  // Verifier Configuration State
  const [confidenceThreshold, setConfidenceThreshold] = useState<number>(80);
  const [ragRetrievalLimit, setRagRetrievalLimit] = useState<number>(4);
  const [enableGeminiHybrid, setEnableGeminiHybrid] = useState<boolean>(true);
  const [saveSuccess, setSaveSuccess] = useState<boolean>(false);

  // Users State (Mock initial users)
  const [users, setUsers] = useState<AdminManagedUser[]>([
    {
      id: 'usr-001',
      name: 'Satria Raziq',
      email: 'satriaraziq07@gmail.com',
      role: 'admin',
      institution: 'SMA Negeri 1 Kota Jambi / Tim Pengembang HERITEX',
      status: 'active',
      joinedAt: '2026-08-15 08:30',
      lastActive: 'Baru saja (Aktif)',
      xp: 1250
    },
    {
      id: 'usr-002',
      name: 'Dr. Bambang Hermanto, M.Hum.',
      email: 'bambang.hermanto@bpk5.kemdikbud.go.id',
      role: 'curator',
      institution: 'Balai Pelestarian Kebudayaan (BPK) Wilayah V Jambi',
      status: 'active',
      joinedAt: '2026-08-18 10:15',
      lastActive: '10 menit yang lalu',
      xp: 920
    },
    {
      id: 'usr-003',
      name: 'Hj. Rahmawati, S.Pd., M.M.',
      email: 'rahmawati.disbudpar@jambiprov.go.id',
      role: 'government',
      institution: 'Dinas Kebudayaan & Pariwisata Provinsi Jambi',
      status: 'active',
      joinedAt: '2026-08-20 14:00',
      lastActive: '1 jam yang lalu',
      xp: 610
    },
    {
      id: 'usr-004',
      name: 'Aisyah Putri Lestari',
      email: 'aisyah.putri@sman3jambi.sch.id',
      role: 'player',
      institution: 'SMA Negeri 3 Kota Jambi',
      status: 'active',
      joinedAt: '2026-09-01 09:45',
      lastActive: '3 jam yang lalu',
      xp: 450
    },
    {
      id: 'usr-005',
      name: 'Budi Setiawan',
      email: 'budi.setiawan@mahasiswa.unja.ac.id',
      role: 'player',
      institution: 'Universitas Jambi (Pendidikan Sejarah)',
      status: 'active',
      joinedAt: '2026-09-03 16:20',
      lastActive: 'Kemarin',
      xp: 320
    },
    {
      id: 'usr-006',
      name: 'Datuk Syahril Alamsyah',
      email: 'syahril.alam@lamjambi.org',
      role: 'curator',
      institution: 'Lembaga Adat Melayu (LAM) Jambi',
      status: 'active',
      joinedAt: '2026-08-25 11:10',
      lastActive: '2 hari yang lalu',
      xp: 780
    },
    {
      id: 'usr-007',
      name: 'Rian Pratama',
      email: 'rian.pratama@gmail.com',
      role: 'player',
      institution: 'Komunitas Jelajah Budaya Batanghari',
      status: 'suspended',
      joinedAt: '2026-09-05 13:00',
      lastActive: '5 hari yang lalu',
      xp: 110
    }
  ]);

  // User Management Filter & Modal State
  const [userSearch, setUserSearch] = useState<string>('');
  const [userRoleFilter, setUserRoleFilter] = useState<string>('all');
  const [userFeedbackMsg, setUserFeedbackMsg] = useState<{ text: string; type: 'success' | 'danger' } | null>(null);
  const [isAddUserModalOpen, setIsAddUserModalOpen] = useState<boolean>(false);
  const [newUserData, setNewUserData] = useState({
    name: '',
    email: '',
    role: 'player' as UserRole,
    institution: ''
  });

  // System Logs State (Initial realistic admin events)
  const [systemLogs, setSystemLogs] = useState<SystemLogItem[]>([
    {
      id: 'log-001',
      timestamp: '2026-09-10 22:04:15',
      eventType: 'auth',
      eventLabel: 'Autentikasi Pengguna',
      actor: 'Satria Raziq (satriaraziq07@gmail.com)',
      actorRole: 'admin',
      details: 'Sesi login berhasil via Google SSO dengan hak akses Administrator.',
      severity: 'success'
    },
    {
      id: 'log-002',
      timestamp: '2026-09-10 21:50:33',
      eventType: 'world_update',
      eventLabel: 'Status Wilayah Budaya',
      actor: 'Sistem Ekspedisi HERITEX (Automasi XP)',
      actorRole: 'system',
      details: 'Wilayah "Dunia Sumatra Raya" diaktifkan (Threshold 500 XP tercapai oleh penjelajah).',
      severity: 'success'
    },
    {
      id: 'log-003',
      timestamp: '2026-09-10 21:30:05',
      eventType: 'api_gateway',
      eventLabel: 'AI Culture Scanner Gateway',
      actor: 'AI Gemini 2.5 Vision Service',
      actorRole: 'system',
      details: 'Inferensi citra Batik Batanghari sukses. Latensi 380ms, confidence 94.8% (200 OK).',
      severity: 'info'
    },
    {
      id: 'log-004',
      timestamp: '2026-09-10 21:12:40',
      eventType: 'role_change',
      eventLabel: 'Perubahan Hak Akses',
      actor: 'Satria Raziq (Administrator)',
      actorRole: 'admin',
      details: 'Memperbarui role Dr. Bambang Hermanto menjadi "curator" (Kurator Budaya Resmi).',
      severity: 'info'
    },
    {
      id: 'log-005',
      timestamp: '2026-09-10 20:45:18',
      eventType: 'config_update',
      eventLabel: 'Konfigurasi Parameter Verifier',
      actor: 'Satria Raziq (Administrator)',
      actorRole: 'admin',
      details: 'Ambang batas keyakinan (Confidence Threshold) disetel ke 80% dan RAG Chunk Limit 4 rujukan.',
      severity: 'info'
    },
    {
      id: 'log-006',
      timestamp: '2026-09-10 19:22:09',
      eventType: 'api_gateway',
      eventLabel: 'AI Vision Gateway Exception',
      actor: 'Gemini Client API Gateway',
      actorRole: 'system',
      details: 'Peringatan latensi jaringan (Transient 429 Retry). Pulih secara otomatis dalam 1.1 detik.',
      severity: 'warning'
    },
    {
      id: 'log-007',
      timestamp: '2026-09-10 18:05:00',
      eventType: 'auth',
      eventLabel: 'Sesi Masuk Pemerintah Daerah',
      actor: 'Hj. Rahmawati (rahmawati.disbudpar@jambiprov.go.id)',
      actorRole: 'government',
      details: 'Pengguna instansi Disbudpar Provinsi Jambi mengakses Dasbor Prioritas Konservasi.',
      severity: 'info'
    },
    {
      id: 'log-008',
      timestamp: '2026-09-10 16:30:21',
      eventType: 'auth',
      eventLabel: 'Sesi Keluar (Logout)',
      actor: 'Aisyah Putri Lestari (aisyah.putri@sman3jambi.sch.id)',
      actorRole: 'player',
      details: 'Sesi penjelajah ditutup dengan aman. Progres 450 XP tersimpan ke penyimpanan awan.',
      severity: 'info'
    }
  ]);

  // System Logs Filter State
  const [logSearch, setLogSearch] = useState<string>('');
  const [logTypeFilter, setLogTypeFilter] = useState<string>('all');
  const [logSeverityFilter, setLogSeverityFilter] = useState<string>('all');

  // Helper to add a system log dynamically
  const addSystemLog = (
    eventType: SystemLogItem['eventType'],
    eventLabel: string,
    details: string,
    severity: SystemLogItem['severity'] = 'info'
  ) => {
    const now = new Date();
    const timestamp = now.toISOString().replace('T', ' ').slice(0, 19);
    const newLog: SystemLogItem = {
      id: `log-${Date.now()}`,
      timestamp,
      eventType,
      eventLabel,
      actor: 'Satria Raziq (Administrator Saat Ini)',
      actorRole: 'admin',
      details,
      severity
    };
    setSystemLogs(prev => [newLog, ...prev]);
  };

  // Handler: Save AI Verifier Configuration
  const handleSaveAiConfig = (e: React.FormEvent) => {
    e.preventDefault();
    setSaveSuccess(true);
    addSystemLog(
      'config_update',
      'Konfigurasi Parameter Verifier',
      `Ambang batas diubah ke ${confidenceThreshold}%, RAG limit ${ragRetrievalLimit} dokumen, Penyelarasan Rujukan Resmi: ${enableGeminiHybrid ? 'Aktif' : 'Nonaktif'}.`,
      'info'
    );
    setTimeout(() => setSaveSuccess(false), 2500);
  };

  // Handler: Toggle World with Logging
  const handleToggleWorldWithLog = (worldId: string) => {
    const targetWorld = worlds.find(w => w.id === worldId);
    onToggleWorldUnlock(worldId);
    if (targetWorld) {
      const nextStatus = !targetWorld.isUnlocked;
      addSystemLog(
        'world_update',
        'Status Wilayah Budaya',
        `Wilayah "${targetWorld.name}" diubah statusnya menjadi ${nextStatus ? 'TERBUKA' : 'TERKUNCI'} secara manual oleh Administrator.`,
        'info'
      );
    }
  };

  // Handler: Change Role for a Managed User
  const handleChangeUserRole = (userId: string, newRole: UserRole) => {
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return;

    setUsers(prev => prev.map(u => u.id === userId ? { ...u, role: newRole } : u));
    
    // If updating current active user account
    if (targetUser.email === 'satriaraziq07@gmail.com') {
      onChangeRole(newRole);
    }

    const roleName = roleLabels[newRole];
    setUserFeedbackMsg({
      text: `Peran untuk ${targetUser.name} berhasil diubah menjadi "${roleName}".`,
      type: 'success'
    });
    addSystemLog(
      'role_change',
      'Perubahan Hak Akses',
      `Mengubah peran akun ${targetUser.name} (${targetUser.email}) dari "${targetUser.role}" menjadi "${newRole}".`,
      'info'
    );
    setTimeout(() => setUserFeedbackMsg(null), 3000);
  };

  // Handler: Toggle User Status (Active / Suspended)
  const handleToggleUserStatus = (userId: string) => {
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return;

    const nextStatus = targetUser.status === 'active' ? 'suspended' : 'active';
    setUsers(prev => prev.map(u => u.id === userId ? { ...u, status: nextStatus } : u));

    setUserFeedbackMsg({
      text: `Status akun ${targetUser.name} diubah menjadi "${nextStatus === 'active' ? 'Aktif' : 'Dinonaktifkan'}".`,
      type: nextStatus === 'active' ? 'success' : 'danger'
    });
    addSystemLog(
      'role_change',
      'Status Akun Pengguna',
      `Status akun ${targetUser.name} (${targetUser.email}) diubah menjadi ${nextStatus.toUpperCase()}.`,
      nextStatus === 'active' ? 'info' : 'warning'
    );
    setTimeout(() => setUserFeedbackMsg(null), 3000);
  };

  // Handler: Delete User Account
  const handleDeleteUser = (userId: string) => {
    const targetUser = users.find(u => u.id === userId);
    if (!targetUser) return;

    if (window.confirm(`Apakah Anda yakin ingin menghapus akun ${targetUser.name} (${targetUser.email})?`)) {
      setUsers(prev => prev.filter(u => u.id !== userId));
      setUserFeedbackMsg({
        text: `Akun ${targetUser.name} telah berhasil dihapus dari sistem.`,
        type: 'danger'
      });
      addSystemLog(
        'role_change',
        'Penghapusan Akun Pengguna',
        `Akun ${targetUser.name} (${targetUser.email}) dihapus secara permanen dari basis data pengguna.`,
        'warning'
      );
      setTimeout(() => setUserFeedbackMsg(null), 3000);
    }
  };

  // Handler: Add New User Form Submit
  const handleAddNewUser = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newUserData.name.trim() || !newUserData.email.trim()) return;

    const now = new Date();
    const joinedAt = now.toISOString().replace('T', ' ').slice(0, 16);
    const createdUser: AdminManagedUser = {
      id: `usr-${Date.now()}`,
      name: newUserData.name.trim(),
      email: newUserData.email.trim(),
      role: newUserData.role,
      institution: newUserData.institution.trim() || 'Umum / Penjelajah Budaya',
      status: 'active',
      joinedAt,
      lastActive: 'Belum pernah login',
      xp: 0
    };

    setUsers(prev => [createdUser, ...prev]);
    setIsAddUserModalOpen(false);
    setNewUserData({ name: '', email: '', role: 'player', institution: '' });

    setUserFeedbackMsg({
      text: `Pengguna baru "${createdUser.name}" berhasil didaftarkan sebagai ${roleLabels[createdUser.role]}.`,
      type: 'success'
    });
    addSystemLog(
      'role_change',
      'Pendaftaran Pengguna Baru',
      `Menambahkan akun baru: ${createdUser.name} (${createdUser.email}) dengan peran "${createdUser.role}".`,
      'success'
    );
    setTimeout(() => setUserFeedbackMsg(null), 3000);
  };

  const roleLabels: Record<UserRole, string> = {
    player: 'Pelajar / Pemain',
    curator: 'Kurator Budaya',
    government: 'Pemerintah Daerah',
    admin: 'Administrator'
  };

  const roleBadgeColors: Record<UserRole, string> = {
    player: 'bg-[#FAF5EE] text-[#C85A32] border-[#E8C4B5]',
    curator: 'bg-[#EAF6F5] text-[#1E7773] border-[#278B86]',
    government: 'bg-[#F0F4F8] text-[#1D4ED8] border-[#93C5FD]',
    admin: 'bg-[#F3E8FF] text-[#7E22CE] border-[#D8B4FE]'
  };

  // Filtered Users
  const filteredUsers = users.filter(user => {
    const matchSearch = 
      user.name.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.email.toLowerCase().includes(userSearch.toLowerCase()) ||
      user.institution.toLowerCase().includes(userSearch.toLowerCase());
    const matchRole = userRoleFilter === 'all' || user.role === userRoleFilter;
    return matchSearch && matchRole;
  });

  // Filtered Logs
  const filteredLogs = systemLogs.filter(log => {
    const matchSearch = 
      log.details.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.actor.toLowerCase().includes(logSearch.toLowerCase()) ||
      log.eventLabel.toLowerCase().includes(logSearch.toLowerCase());
    const matchType = logTypeFilter === 'all' || log.eventType === logTypeFilter;
    const matchSeverity = logSeverityFilter === 'all' || log.severity === logSeverityFilter;
    return matchSearch && matchType && matchSeverity;
  });

  return (
    <div className="space-y-6 text-[#132726]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest text-[#C85A32] uppercase">
              Tata Kelola Sistem & Arsitektur Utama
            </span>
            <span className="rounded-md bg-[#FAF5EE] px-2 py-0.5 text-[9px] font-semibold text-[#C85A32] border border-[#E8C4B5]">
              Konsol Administrator
            </span>
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B3A] tracking-wide mt-0.5">
            Panel Administrator Platform HERITEX
          </h1>
          <p className="text-xs text-[#4A5E5D] mt-0.5 max-w-2xl leading-relaxed">
            Pusat kendali konfigurasi mesin validasi literasi budaya, manajemen wilayah ekspedisi, hak akses multi-aktor, dan pemantauan log audit sistem.
          </p>
        </div>

        <div className="flex items-center gap-2 text-xs text-[#1E7773] bg-[#EAF6F5] border border-[#278B86] px-3.5 py-1.5 rounded-2xl font-medium shadow-2xs">
          <Activity className="w-4 h-4 text-[#1E7773]" />
          <span>Sistem Berjalan Stabil (Latensi ~120ms)</span>
        </div>
      </div>

      {/* Primary Sub-Tabs Navigation for Admin Panel */}
      <div className="flex flex-wrap items-center gap-1.5 border-b border-[#E5DFD2] pb-3">
        <button
          id="admin-tab-config"
          type="button"
          onClick={() => setAdminTab('config')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            adminTab === 'config'
              ? 'bg-[#C85A32] text-white shadow-xs'
              : 'bg-white hover:bg-[#FAF8F5] text-[#4A5E5D] border border-[#E5DFD2]'
          }`}
        >
          <Cpu className="w-4 h-4" />
          <span>1. Konfigurasi Mesin Validasi Fakta</span>
        </button>

        <button
          id="admin-tab-worlds"
          type="button"
          onClick={() => setAdminTab('worlds')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            adminTab === 'worlds'
              ? 'bg-[#C85A32] text-white shadow-xs'
              : 'bg-white hover:bg-[#FAF8F5] text-[#4A5E5D] border border-[#E5DFD2]'
          }`}
        >
          <Globe className="w-4 h-4" />
          <span>2. Manajemen Wilayah Budaya</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold ${
            adminTab === 'worlds' ? 'bg-white/20 text-white' : 'bg-[#EAE5DA] text-[#637675]'
          }`}>
            {worlds.length}
          </span>
        </button>

        <button
          id="admin-tab-users"
          type="button"
          onClick={() => setAdminTab('users')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            adminTab === 'users'
              ? 'bg-[#C85A32] text-white shadow-xs'
              : 'bg-white hover:bg-[#FAF8F5] text-[#4A5E5D] border border-[#E5DFD2]'
          }`}
        >
          <Users className="w-4 h-4" />
          <span>3. Kelola Pengguna & Peran</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold ${
            adminTab === 'users' ? 'bg-white/20 text-white' : 'bg-[#EAF6F5] text-[#1E7773]'
          }`}>
            {users.length}
          </span>
        </button>

        <button
          id="admin-tab-logs"
          type="button"
          onClick={() => setAdminTab('logs')}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold transition-all ${
            adminTab === 'logs'
              ? 'bg-[#C85A32] text-white shadow-xs'
              : 'bg-white hover:bg-[#FAF8F5] text-[#4A5E5D] border border-[#E5DFD2]'
          }`}
        >
          <FileText className="w-4 h-4" />
          <span>4. Log Sistem</span>
          <span className={`text-[10px] px-1.5 py-0.2 rounded-md font-semibold ${
            adminTab === 'logs' ? 'bg-white/20 text-white' : 'bg-[#FAF5EE] text-[#C85A32]'
          }`}>
            {systemLogs.length}
          </span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* SECTION 1: KONFIGURASI MESIN VALIDASI FAKTA                               */}
      {/* ========================================================================= */}
      {adminTab === 'config' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 rounded-3xl bg-white border border-[#E5DFD2] p-6 shadow-sm space-y-5">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FAF5EE] text-[#C85A32] border border-[#E8C4B5]">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-[#0D3B3A]">Konfigurasi Mesin Validasi Fakta</h3>
                <p className="text-xs text-[#637675]">Arsitektur Penelusuran Berbasis Rujukan Resmi (Grounding & Retrieval)</p>
              </div>
            </div>

            {saveSuccess && (
              <div className="p-3 rounded-2xl bg-[#EAF6F5] border border-[#278B86] text-[#1E7773] text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>✓ Konfigurasi parameter mesin validasi berhasil diperbarui dan dicatat ke Log Sistem!</span>
              </div>
            )}

            <form onSubmit={handleSaveAiConfig} className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-[#2A3E3D]">
                    Ambang Batas Keyakinan Otomatis (Confidence Threshold)
                  </label>
                  <span className="font-mono text-xs font-bold text-[#C85A32]">{confidenceThreshold}%</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="95"
                  step="5"
                  value={confidenceThreshold}
                  onChange={(e) => setConfidenceThreshold(Number(e.target.value))}
                  className="w-full accent-[#C85A32] h-2 bg-[#FAF5EE] rounded-lg cursor-pointer"
                />
                <p className="text-[10px] text-[#637675] mt-1 leading-relaxed">
                  Laporan masyarakat dengan skor keyakinan di bawah {confidenceThreshold}% akan dialihkan ke antrean telaah kurator budaya secara manual.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="text-xs font-medium text-[#2A3E3D]">
                    Batas Kutipan Rujukan Resmi (Evidence Chunks Retrieval)
                  </label>
                  <span className="font-mono text-xs font-bold text-[#C85A32]">{ragRetrievalLimit} Dokumen</span>
                </div>
                <input
                  type="range"
                  min="2"
                  max="8"
                  step="1"
                  value={ragRetrievalLimit}
                  onChange={(e) => setRagRetrievalLimit(Number(e.target.value))}
                  className="w-full accent-[#C85A32] h-2 bg-[#FAF5EE] rounded-lg cursor-pointer"
                />
                <p className="text-[10px] text-[#637675] mt-1 leading-relaxed">
                  Jumlah maksimal fragmen rujukan resmi dari repositori Ditjen Kebudayaan / BPK Wilayah V yang dianalisis simultan per klaim.
                </p>
              </div>

              <div className="rounded-2xl bg-[#FAF8F5] p-4 border border-[#E5DFD2] space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <span className="text-xs font-bold text-[#0D3B3A] block">Penyelarasan Rujukan Resmi (Strict Grounding)</span>
                    <span className="text-[10px] text-[#637675]">Mengharuskan verifikasi berlandaskan repositori arsip primer</span>
                  </div>
                  <input
                    type="checkbox"
                    checked={enableGeminiHybrid}
                    onChange={(e) => setEnableGeminiHybrid(e.target.checked)}
                    className="h-4 w-4 rounded accent-[#C85A32] cursor-pointer"
                  />
                </div>

                <div className="text-[10px] text-[#637675] leading-relaxed border-t border-[#E5DFD2] pt-2">
                  Basis data rujukan dibatasi 100% hanya pada arsip resmi Ditjen Kebudayaan Kemendikbudristek, Balai Pelestarian Kebudayaan Wilayah V, serta Lembaga Adat Melayu Jambi.
                </div>
              </div>

              <div className="flex justify-end pt-1">
                <button
                  type="submit"
                  className="flex items-center gap-2 rounded-xl bg-[#C85A32] hover:bg-[#B54E27] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all"
                >
                  <Save className="w-4 h-4" />
                  <span>Simpan Konfigurasi Parameter</span>
                </button>
              </div>
            </form>
          </div>

          <div className="space-y-4">
            <div className="rounded-3xl bg-white border border-[#E5DFD2] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-[#0D3B3A] font-bold text-xs">
                <Server className="w-4 h-4 text-[#1E7773]" />
                <span>Status Infrastruktur AI Gateway</span>
              </div>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFD2]">
                  <span className="text-[#637675]">Model Bahasa AI:</span>
                  <span className="font-semibold text-[#0D3B3A]">Gemini 2.5 Flash</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFD2]">
                  <span className="text-[#637675]">Model Visi & Citra:</span>
                  <span className="font-semibold text-[#0D3B3A]">Gemini 2.5 Flash Vision</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFD2]">
                  <span className="text-[#637675]">Indeks Vektor Repositori:</span>
                  <span className="font-semibold text-[#1E7773]">1.420 Dokumen WBTb</span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFD2]">
                  <span className="text-[#637675]">Tingkat Akurasi Rujukan:</span>
                  <span className="font-semibold text-[#1E7773]">99.2% Zero Hallucination</span>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-[#FAF8F5] border border-[#E5DFD2] p-5 text-xs text-[#526665] space-y-2">
              <span className="font-bold text-[#0D3B3A] block">💡 Catatan Tata Kelola:</span>
              <p className="leading-relaxed text-[11px]">
                Seluruh perubahan parameter di modul ini terekam secara otomatis dalam <strong>Log Sistem</strong> untuk menjaga akuntabilitas audit tata kelola platform kebudayaan.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 2: MANAJEMEN WILAYAH BUDAYA (SKALA NASIONAL)                      */}
      {/* ========================================================================= */}
      {adminTab === 'worlds' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          <div className="lg:col-span-2 rounded-3xl bg-white border border-[#E5DFD2] p-6 shadow-sm space-y-5">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#EAF6F5] text-[#1E7773] border border-[#278B86]">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold text-[#0D3B3A]">Manajemen Wilayah Budaya (Skala Nasional)</h3>
                  <p className="text-xs text-[#637675]">Skema ekspansi Jambi → Sumatra → Seluruh Kepulauan Nusantara</p>
                </div>
              </div>
              <span className="text-xs font-semibold text-[#1E7773] bg-[#EAF6F5] px-2.5 py-1 rounded-xl border border-[#A8DDD9]">
                {worlds.filter(w => w.isUnlocked).length} Wilayah Aktif
              </span>
            </div>

            <div className="space-y-3">
              {worlds.map((w) => (
                <div key={w.id} className="rounded-2xl bg-[#FAF8F5] p-4 border border-[#E5DFD2] space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm font-bold text-[#0D3B3A]">{w.name}</span>
                        <span className={`text-[9px] px-2 py-0.5 rounded-md font-bold uppercase tracking-wider ${
                          w.isUnlocked ? 'bg-[#EAF6F5] text-[#1E7773] border border-[#278B86]' : 'bg-amber-50 text-amber-800 border border-amber-200'
                        }`}>
                          {w.isUnlocked ? 'Terbuka' : `Syarat: ${w.requiredXpOrProgress} XP`}
                        </span>
                      </div>
                      <span className="text-[10px] text-[#637675] block mt-0.5">
                        {w.province} • {w.objectCount} Objek Budaya Terdata
                      </span>
                    </div>

                    <button
                      id={`toggle-unlock-world-${w.id}`}
                      type="button"
                      onClick={() => handleToggleWorldWithLog(w.id)}
                      className={`flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-bold transition-all ${
                        w.isUnlocked 
                          ? 'bg-[#EAF6F5] text-[#1E7773] hover:bg-red-50 hover:text-red-700 hover:border-red-300 border border-[#278B86]' 
                          : 'bg-[#0D3B3A] text-white hover:bg-[#1A4D4C] shadow-sm'
                      }`}
                      title={w.isUnlocked ? 'Klik untuk mengunci wilayah ini' : 'Klik untuk membuka paksa wilayah ini (Override)'}
                    >
                      {w.isUnlocked ? (
                        <>
                          <Unlock className="w-3.5 h-3.5" />
                          <span>Buka (Klik untuk Kunci)</span>
                        </>
                      ) : (
                        <>
                          <Lock className="w-3.5 h-3.5" />
                          <span>Terkunci (Klik Buka Akses)</span>
                        </>
                      )}
                    </button>
                  </div>

                  <p className="text-[11px] text-[#4A5E5D] leading-relaxed">
                    {w.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {/* Quick Role Override for Testing */}
            <div className="rounded-3xl bg-white border border-[#E5DFD2] p-6 shadow-sm space-y-4">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4 text-[#C85A32]" />
                <span className="text-xs font-bold text-[#0D3B3A]">
                  Simulasi Peran Pengguna (Uji Coba Antarmuka)
                </span>
              </div>
              <p className="text-[11px] text-[#637675] leading-relaxed">
                Pilih peran untuk mensimulasikan perspektif pengguna secara langsung di sesi penjelajahan saat ini:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {(['player', 'curator', 'government', 'admin'] as UserRole[]).map((r) => (
                  <button
                    key={r}
                    onClick={() => {
                      onChangeRole(r);
                      addSystemLog('role_change', 'Simulasi Peran Aktif', `Mengganti sesi simulasi antarmuka ke peran: ${roleLabels[r]}`, 'info');
                    }}
                    className={`p-2.5 rounded-xl text-left font-semibold transition-all shadow-2xs border ${
                      currentRole === r 
                        ? 'bg-[#C85A32] text-white border-[#C85A32] shadow-xs' 
                        : 'bg-[#FAF8F5] text-[#4A5E5D] hover:text-[#0D3B3A] border-[#E5DFD2]'
                    }`}
                  >
                    <span className="block font-bold text-xs">{roleLabels[r].split('/')[0].trim()}</span>
                    <span className={`text-[9px] block ${currentRole === r ? 'text-white/80' : 'text-[#718281]'}`}>
                      {r === 'player' ? 'Eksplorasi Misi' : r === 'curator' ? 'Validasi Klaim' : r === 'government' ? 'Dasbor Pemda' : 'Akses Penuh'}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-3xl bg-[#FAF8F5] border border-[#E5DFD2] p-5 text-xs text-[#526665] space-y-2">
              <span className="font-bold text-[#0D3B3A] block">🗺️ Roadmap Skalabilitas:</span>
              <p className="leading-relaxed text-[11px]">
                Struktur data modular HERITEX siap menampung ribuan cagar budaya Nusantara dengan pengelompokan pulau dan provinsi di fase deployment nasional.
              </p>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 3: KELOLA PENGGUNA & PERAN                                       */}
      {/* ========================================================================= */}
      {adminTab === 'users' && (
        <div className="space-y-4">
          
          {/* Top Feedback Message */}
          {userFeedbackMsg && (
            <div className={`p-3.5 rounded-2xl text-xs font-semibold flex items-center justify-between border ${
              userFeedbackMsg.type === 'success' 
                ? 'bg-[#EAF6F5] text-[#1E7773] border-[#278B86]' 
                : 'bg-red-50 text-red-700 border-red-200'
            }`}>
              <div className="flex items-center gap-2">
                {userFeedbackMsg.type === 'success' ? <CheckCircle2 className="w-4 h-4" /> : <AlertTriangle className="w-4 h-4" />}
                <span>{userFeedbackMsg.text}</span>
              </div>
              <button onClick={() => setUserFeedbackMsg(null)} className="text-xs hover:opacity-70">
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          )}

          {/* Quick User Stats Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-4 rounded-2xl bg-white border border-[#E5DFD2] shadow-2xs">
              <span className="text-[10px] text-[#637675] uppercase font-bold tracking-wider">Total Pengguna</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-serif text-xl font-bold text-[#0D3B3A]">{users.length}</span>
                <Users className="w-4 h-4 text-[#C85A32]" />
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E5DFD2] shadow-2xs">
              <span className="text-[10px] text-[#637675] uppercase font-bold tracking-wider">Pelajar / Pemain</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-serif text-xl font-bold text-[#C85A32]">
                  {users.filter(u => u.role === 'player').length}
                </span>
                <span className="text-[10px] bg-[#FAF5EE] text-[#C85A32] px-1.5 py-0.5 rounded font-bold">Pemain</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E5DFD2] shadow-2xs">
              <span className="text-[10px] text-[#637675] uppercase font-bold tracking-wider">Kurator Resmi</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-serif text-xl font-bold text-[#1E7773]">
                  {users.filter(u => u.role === 'curator').length}
                </span>
                <span className="text-[10px] bg-[#EAF6F5] text-[#1E7773] px-1.5 py-0.5 rounded font-bold">BPK / LAM</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-white border border-[#E5DFD2] shadow-2xs">
              <span className="text-[10px] text-[#637675] uppercase font-bold tracking-wider">Pemerintah & Admin</span>
              <div className="flex items-center justify-between mt-1">
                <span className="font-serif text-xl font-bold text-[#1D4ED8]">
                  {users.filter(u => u.role === 'government' || u.role === 'admin').length}
                </span>
                <span className="text-[10px] bg-[#F0F4F8] text-[#1D4ED8] px-1.5 py-0.5 rounded font-bold">Instansi</span>
              </div>
            </div>
          </div>

          {/* User Filter & Action Bar */}
          <div className="rounded-3xl bg-white border border-[#E5DFD2] p-5 shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
              <div>
                <h3 className="font-serif text-base font-bold text-[#0D3B3A]">Kelola Pengguna & Peran Multi-Aktor</h3>
                <p className="text-xs text-[#637675]">Daftar akun pengguna, pengaturan hak akses, serta status keaktifan akun</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  id="btn-add-user-modal"
                  type="button"
                  onClick={() => setIsAddUserModalOpen(true)}
                  className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-[#0D3B3A] hover:bg-[#1A4D4C] text-white text-xs font-bold shadow-sm transition-all"
                >
                  <UserPlus className="w-3.5 h-3.5" />
                  <span>Tambah Pengguna</span>
                </button>
              </div>
            </div>

            {/* Filter Row */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1 border-t border-[#EFECE4]">
              <div className="relative flex-1 w-full">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#637675]" />
                <input
                  type="text"
                  placeholder="Cari berdasarkan nama, email, atau institusi..."
                  value={userSearch}
                  onChange={(e) => setUserSearch(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 rounded-xl border border-[#E5DFD2] bg-[#FAF8F5] text-xs text-[#0D3B3A] placeholder-[#8A9B9A] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div className="flex items-center gap-2 w-full sm:w-auto">
                <Filter className="w-3.5 h-3.5 text-[#637675] shrink-0" />
                <select
                  value={userRoleFilter}
                  onChange={(e) => setUserRoleFilter(e.target.value)}
                  className="px-3 py-2 rounded-xl border border-[#E5DFD2] bg-[#FAF8F5] text-xs text-[#0D3B3A] font-semibold focus:outline-none focus:border-[#C85A32] w-full sm:w-auto"
                >
                  <option value="all">Semua Peran ({users.length})</option>
                  <option value="player">Pelajar / Pemain</option>
                  <option value="curator">Kurator Budaya</option>
                  <option value="government">Pemerintah Daerah</option>
                  <option value="admin">Administrator</option>
                </select>
              </div>
            </div>

            {/* Users Table */}
            <div className="overflow-x-auto rounded-2xl border border-[#E5DFD2]">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-[#FAF8F5] border-b border-[#E5DFD2] text-[#637675] font-semibold">
                    <th className="p-3.5">Nama & Institusi</th>
                    <th className="p-3.5">Email Pengguna</th>
                    <th className="p-3.5">Peran Saat Ini (Role)</th>
                    <th className="p-3.5">Status Akun</th>
                    <th className="p-3.5">Total XP</th>
                    <th className="p-3.5 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE4]">
                  {filteredUsers.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="p-8 text-center text-xs text-[#637675]">
                        Tidak ada pengguna yang cocok dengan kriteria pencarian "{userSearch}".
                      </td>
                    </tr>
                  ) : (
                    filteredUsers.map((u) => {
                      const initials = u.name.split(' ').map(n => n[0]).slice(0, 2).join('');
                      return (
                        <tr key={u.id} className="hover:bg-[#FAF8F5] transition-colors">
                          <td className="p-3.5">
                            <div className="flex items-center gap-2.5">
                              <div className="w-8 h-8 rounded-xl bg-[#FAF5EE] border border-[#E8C4B5] text-[#C85A32] font-bold text-xs flex items-center justify-center shrink-0">
                                {initials}
                              </div>
                              <div>
                                <span className="font-bold text-[#0D3B3A] block">{u.name}</span>
                                <span className="text-[10px] text-[#637675]">{u.institution}</span>
                              </div>
                            </div>
                          </td>

                          <td className="p-3.5 text-[#4A5E5D] font-mono text-[11px]">
                            {u.email}
                          </td>

                          <td className="p-3.5">
                            <div className="relative inline-block">
                              <select
                                id={`select-role-user-${u.id}`}
                                value={u.role}
                                onChange={(e) => handleChangeUserRole(u.id, e.target.value as UserRole)}
                                className={`px-2.5 py-1 rounded-lg text-xs font-bold border cursor-pointer focus:outline-none transition-all ${roleBadgeColors[u.role]}`}
                              >
                                <option value="player">Pelajar / Pemain</option>
                                <option value="curator">Kurator Budaya</option>
                                <option value="government">Pemerintah Daerah</option>
                                <option value="admin">Administrator</option>
                              </select>
                            </div>
                          </td>

                          <td className="p-3.5">
                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              u.status === 'active' 
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                                : 'bg-red-50 text-red-700 border border-red-200'
                            }`}>
                              <span className={`w-1.5 h-1.5 rounded-full ${u.status === 'active' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                              <span>{u.status === 'active' ? 'Aktif' : 'Nonaktif'}</span>
                            </span>
                          </td>

                          <td className="p-3.5 font-mono font-bold text-[#C85A32]">
                            {u.xp} XP
                          </td>

                          <td className="p-3.5 text-right">
                            <div className="flex items-center justify-end gap-1.5">
                              <button
                                id={`btn-toggle-status-${u.id}`}
                                type="button"
                                onClick={() => handleToggleUserStatus(u.id)}
                                className={`p-1.5 rounded-lg border transition-colors ${
                                  u.status === 'active'
                                    ? 'bg-white hover:bg-amber-50 text-amber-700 border-[#E5DFD2]'
                                    : 'bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border-emerald-200'
                                }`}
                                title={u.status === 'active' ? 'Nonaktifkan Akun' : 'Aktifkan Akun'}
                              >
                                {u.status === 'active' ? <UserX className="w-3.5 h-3.5" /> : <UserCheck className="w-3.5 h-3.5" />}
                              </button>

                              <button
                                id={`btn-delete-user-${u.id}`}
                                type="button"
                                onClick={() => handleDeleteUser(u.id)}
                                className="p-1.5 rounded-lg bg-white hover:bg-red-50 text-red-600 border border-[#E5DFD2] hover:border-red-200 transition-colors"
                                title="Hapus Akun Pengguna"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            </div>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* SECTION 4: LOG SISTEM (AUDIT LOGS LEVEL ADMINISTRATOR)                    */}
      {/* ========================================================================= */}
      {adminTab === 'logs' && (
        <div className="rounded-3xl bg-white border border-[#E5DFD2] p-5 sm:p-6 shadow-sm space-y-5">
          
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#FAF5EE] text-[#C85A32] border border-[#E8C4B5]">
                <FileText className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-serif text-sm font-bold text-[#0D3B3A]">Log Audit Sistem (Administrator Level)</h3>
                <p className="text-xs text-[#637675]">Rekaman aktivitas autentikasi, mutasi peran, pembukaan wilayah, dan integrasi API AI</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  addSystemLog('auth', 'Refresh Heartbeat', 'Administrator melakukan sinkronisasi status event log.', 'info');
                }}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FAF8F5] hover:bg-[#EAE5DA] text-[#4A5E5D] border border-[#E5DFD2] text-xs font-semibold transition-colors"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Segarkan Log</span>
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2 border-t border-[#EFECE4]">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#637675]" />
              <input
                type="text"
                placeholder="Cari aktor, kata kunci, atau detail event..."
                value={logSearch}
                onChange={(e) => setLogSearch(e.target.value)}
                className="w-full pl-9 pr-3 py-2 rounded-xl border border-[#E5DFD2] bg-[#FAF8F5] text-xs text-[#0D3B3A] placeholder-[#8A9B9A] focus:outline-none focus:border-[#C85A32]"
              />
            </div>

            <div>
              <select
                value={logTypeFilter}
                onChange={(e) => setLogTypeFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E5DFD2] bg-[#FAF8F5] text-xs text-[#0D3B3A] font-semibold focus:outline-none focus:border-[#C85A32]"
              >
                <option value="all">Semua Kategori Event ({systemLogs.length})</option>
                <option value="auth">Autentikasi (Login/Logout)</option>
                <option value="role_change">Perubahan Hak Akses / Peran</option>
                <option value="world_update">Mutasi Status Wilayah</option>
                <option value="api_gateway">AI Vision & API Gateway</option>
                <option value="config_update">Konfigurasi Parameter</option>
              </select>
            </div>

            <div>
              <select
                value={logSeverityFilter}
                onChange={(e) => setLogSeverityFilter(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-[#E5DFD2] bg-[#FAF8F5] text-xs text-[#0D3B3A] font-semibold focus:outline-none focus:border-[#C85A32]"
              >
                <option value="all">Semua Tingkat Keparahan</option>
                <option value="success">Sukses (Success)</option>
                <option value="info">Informasi (Info)</option>
                <option value="warning">Peringatan (Warning)</option>
                <option value="error">Kesalahan (Error)</option>
              </select>
            </div>
          </div>

          {/* Logs Table */}
          <div className="overflow-x-auto rounded-2xl border border-[#E5DFD2]">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#FAF8F5] border-b border-[#E5DFD2] text-[#637675] font-semibold">
                  <th className="p-3.5">Waktu (Timestamp)</th>
                  <th className="p-3.5">Jenis Event</th>
                  <th className="p-3.5">Aktor Pelaksana</th>
                  <th className="p-3.5">Detail Aktivitas</th>
                  <th className="p-3.5 text-center">Tingkat</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#EFECE4]">
                {filteredLogs.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="p-8 text-center text-xs text-[#637675]">
                      Tidak ada rekaman log sistem yang cocok dengan kriteria pencarian saat ini.
                    </td>
                  </tr>
                ) : (
                  filteredLogs.map((log) => {
                    const severityColors = {
                      success: 'bg-emerald-50 text-emerald-700 border-emerald-200',
                      info: 'bg-blue-50 text-blue-700 border-blue-200',
                      warning: 'bg-amber-50 text-amber-800 border-amber-200',
                      error: 'bg-rose-50 text-rose-700 border-rose-200'
                    };

                    const eventBadges = {
                      auth: 'bg-[#FAF5EE] text-[#C85A32] border-[#E8C4B5]',
                      role_change: 'bg-[#F3E8FF] text-[#7E22CE] border-[#D8B4FE]',
                      world_update: 'bg-[#EAF6F5] text-[#1E7773] border-[#278B86]',
                      api_gateway: 'bg-amber-50 text-amber-900 border-amber-200',
                      config_update: 'bg-slate-100 text-slate-800 border-slate-300'
                    };

                    return (
                      <tr key={log.id} className="hover:bg-[#FAF8F5] transition-colors">
                        <td className="p-3.5 whitespace-nowrap text-[#637675] font-mono text-[11px]">
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-3.5 h-3.5 text-[#8A9B9A]" />
                            <span>{log.timestamp}</span>
                          </div>
                        </td>

                        <td className="p-3.5 whitespace-nowrap">
                          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-bold border ${eventBadges[log.eventType]}`}>
                            {log.eventLabel}
                          </span>
                        </td>

                        <td className="p-3.5">
                          <span className="font-bold text-[#0D3B3A] block">{log.actor}</span>
                          <span className="text-[10px] text-[#637675] uppercase tracking-wider font-semibold">
                            Role: {log.actorRole}
                          </span>
                        </td>

                        <td className="p-3.5 text-[#344847] leading-relaxed max-w-md">
                          {log.details}
                        </td>

                        <td className="p-3.5 text-center whitespace-nowrap">
                          <span className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border ${severityColors[log.severity]}`}>
                            {log.severity}
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#637675] gap-2 pt-1">
            <span>Menampilkan {filteredLogs.length} dari {systemLogs.length} catatan log aktivitas</span>
            <span className="text-[#1E7773] font-semibold">
              🛡️ Audit Trail mematuhi ISO 27001 & Kerangka Perlindungan Data Budaya Nasional
            </span>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: TAMBAH PENGGUNA BARU                                               */}
      {/* ========================================================================= */}
      {isAddUserModalOpen && (
        <div className="fixed inset-0 z-50 overflow-y-auto bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="relative w-full max-w-lg rounded-3xl bg-white border border-[#E5DFD2] p-6 shadow-2xl space-y-4 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-[#EFECE4] pb-3">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-[#FAF5EE] text-[#C85A32]">
                  <UserPlus className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="font-serif text-base font-bold text-[#0D3B3A]">Tambah Pengguna Baru</h3>
                  <p className="text-xs text-[#637675]">Daftarkan akun pengguna dan tetapkan peran akses</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsAddUserModalOpen(false)}
                className="p-1 rounded-lg text-[#637675] hover:bg-[#FAF8F5]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <form onSubmit={handleAddNewUser} className="space-y-3.5">
              <div>
                <label className="block text-xs font-semibold text-[#0D3B3A] mb-1">
                  Nama Lengkap Pengguna *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Muhammad Ilham, M.Pd"
                  value={newUserData.name}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E5DFD2] bg-[#FAF8F5] text-xs text-[#0D3B3A] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0D3B3A] mb-1">
                  Alamat Email Resmi *
                </label>
                <input
                  type="email"
                  required
                  placeholder="Contoh: ilham@disbudpar.go.id"
                  value={newUserData.email}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E5DFD2] bg-[#FAF8F5] text-xs text-[#0D3B3A] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0D3B3A] mb-1">
                  Institusi / Asal Sekolah / Lembaga Adat
                </label>
                <input
                  type="text"
                  placeholder="Contoh: Balai Pelestarian Kebudayaan / SMA N 1 Jambi"
                  value={newUserData.institution}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, institution: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E5DFD2] bg-[#FAF8F5] text-xs text-[#0D3B3A] focus:outline-none focus:border-[#C85A32]"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#0D3B3A] mb-1">
                  Peran Akun (Role Access) *
                </label>
                <select
                  value={newUserData.role}
                  onChange={(e) => setNewUserData(prev => ({ ...prev, role: e.target.value as UserRole }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-[#E5DFD2] bg-[#FAF8F5] text-xs text-[#0D3B3A] font-semibold focus:outline-none focus:border-[#C85A32]"
                >
                  <option value="player">Pelajar / Pemain (Eksplorasi Game & Misi Budaya)</option>
                  <option value="curator">Kurator Budaya (Verifikasi & Kurasi Laporan Fakta)</option>
                  <option value="government">Pemerintah Daerah (Dasbor Kebijakan & Prioritas)</option>
                  <option value="admin">Administrator (Akses Penuh Manajemen Sistem)</option>
                </select>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#EFECE4]">
                <button
                  type="button"
                  onClick={() => setIsAddUserModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-[#FAF8F5] hover:bg-[#EAE5DA] text-[#526665] text-xs font-semibold border border-[#E5DFD2]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-[#0D3B3A] hover:bg-[#1A4D4C] text-white text-xs font-bold shadow-sm"
                >
                  Simpan Pengguna
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
