import React, { useState } from 'react';
import { 
  Compass, 
  BookOpen, 
  ShieldCheck, 
  Building2, 
  Settings, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Lock, 
  Mail, 
  Eye, 
  EyeOff, 
  Award, 
  MapPin, 
  AlertCircle,
  HelpCircle,
  Users,
  Gamepad2,
  Share2
} from 'lucide-react';
import { UserRole } from '../types';
import { HeritexLogo } from './HeritexLogo';

interface AuthFlowProps {
  onLoginSuccess: (role: UserRole, userEmail: string, userName: string) => void;
  initialStep?: 'splash' | 'onboarding' | 'login';
  onCloseTutorial?: () => void;
}

// Credentials per role (supports both @heritex.id and original username)
export const ROLE_CREDENTIALS: Record<UserRole, {
  email: string;
  username: string;
  name: string;
  password: string;
  roleName: string;
  institution: string;
  color: string;
  badge: string;
  description: string;
  permissions: string[];
}> = {
  player: {
    email: 'pelajar@heritex.id',
    username: 'satria',
    name: 'Satria Raziq Pratama',
    password: 'pelajar2026',
    roleName: 'Pelajar & Mahasiswa (Penjelajah Budaya)',
    institution: 'SMA Negeri 1 Kota Jambi / Universitas Jambi',
    color: 'border-[#C85A32] text-[#C85A32] bg-[#FDF6F0]',
    badge: 'Mode Game & Literasi',
    description: 'Bermain petualangan di peta 2D, menyelesaikan siklus 5 tahap verifikasi fakta budaya, mengumpulkan lencana XP, dan bersaing di papan peringkat.',
    permissions: [
      'Akses Game Peta Budaya 2D Interaktif',
      'Uji Fakta Budaya & Mini-Game Kuis Kilat',
      'Koleksi Lencana & Papan Peringkat Pelajar',
      'Kirim Laporan Pengamatan Lapangan'
    ]
  },
  curator: {
    email: 'kurator@heritex.id',
    username: 'dr.andalas',
    name: 'Dr. Andalas Budiman, M.Hum',
    password: 'kurator2026',
    roleName: 'Kurator & Ahli Warisan Budaya',
    institution: 'Balai Pelestarian Kebudayaan (BPK) Wilayah V',
    color: 'border-[#278B86] text-[#1E7773] bg-[#EAF6F5]',
    badge: 'Verifikator & Kuratorial',
    description: 'Memeriksa dan menyetujui laporan observasi masyarakat di Living Map, memvalidasi rujukan SK WBTb resmi, serta mendaftarkan cagar budaya baru.',
    permissions: [
      'Antrean Validasi Laporan Partisipatif Warga',
      'Pembaruan Status Keterancaman Objek Budaya',
      'Inventarisasi & Pendaftaran Cagar Budaya Baru',
      'Audit Catatan Rujukan SK Resmi Kemendikbud'
    ]
  },
  government: {
    email: 'pemda@heritex.id',
    username: 'dinas.kebudayaan',
    name: 'Dinas Kebudayaan & Pariwisata Prov. Jambi',
    password: 'pemda2026',
    roleName: 'Pemerintah Daerah & Pengambil Kebijakan',
    institution: 'Pemerintah Daerah Provinsi Jambi',
    color: 'border-[#0D3B3A] text-[#0D3B3A] bg-[#EDF4F4]',
    badge: 'Dasbor Kebijakan & DAK',
    description: 'Memantau pemetaan spasial objek kritis yang memerlukan intervensi anggaran DAK Kebudayaan, perlindungan zonasi adat, dan regulasi Perda.',
    permissions: [
      'Peta Spasial Prioritas Keterancaman Budaya',
      'Kalkulasi Alokasi Anggaran DAK Restorasi',
      'Matriks Intervensi Kebijakan Pelestarian',
      'Cetak Lembar Rekomendasi Eksekutif (PDF)'
    ]
  },
  admin: {
    email: 'admin@heritex.id',
    username: 'superadmin',
    name: 'Administrator Sistem HERITEX',
    password: 'admin2026',
    roleName: 'Administrator Sistem & Ekosistem',
    institution: 'Pusat Manajemen Data Digital HERITEX',
    color: 'border-[#344054] text-[#344054] bg-[#F2F4F7]',
    badge: 'Kontrol Wilayah & Ekosistem',
    description: 'Mengelola kunci dunia wilayah budaya (Jambi, Sumatera Raya, Nusantara), manajemen hak akses pengguna, serta pemeliharaan parameter sistem.',
    permissions: [
      'Buka / Kunci Wilayah Peta Budaya',
      'Manajemen Kredensial & Pengguna Multi-Peran',
      'Monitoring Performa Sistem & Latensi AI',
      'Reset Data Uji & Pemeliharaan Server'
    ]
  }
};

export const AuthFlow: React.FC<AuthFlowProps> = ({
  onLoginSuccess,
  initialStep = 'splash',
  onCloseTutorial
}) => {
  const [currentStep, setCurrentStep] = useState<'splash' | 'onboarding' | 'login'>(initialStep);
  const [onboardingIndex, setOnboardingIndex] = useState(0);

  // Login form state
  const [selectedRole, setSelectedRole] = useState<UserRole>('player');
  const [emailInput, setEmailInput] = useState(ROLE_CREDENTIALS.player.email);
  const [passwordInput, setPasswordInput] = useState(ROLE_CREDENTIALS.player.password);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // When selected role changes via quick card, update input defaults
  const handleSelectRole = (role: UserRole) => {
    setSelectedRole(role);
    setEmailInput(ROLE_CREDENTIALS[role].email);
    setPasswordInput(ROLE_CREDENTIALS[role].password);
    setErrorMessage('');
  };

  // Submit login
  const handleLogin = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const targetConfig = ROLE_CREDENTIALS[selectedRole];

      // Validate email and password for the selected role (allows @heritex.id or @nusaora.id or username)
      const inputTrimmed = emailInput.trim().toLowerCase();
      const isEmailOrUserMatch = 
        inputTrimmed === targetConfig.email.toLowerCase() || 
        inputTrimmed === targetConfig.email.replace('@heritex.id', '@nusaora.id').toLowerCase() ||
        inputTrimmed === targetConfig.username.toLowerCase();

      if (!isEmailOrUserMatch || passwordInput !== targetConfig.password) {
        setErrorMessage('Email/nama pengguna atau kata sandi tidak sesuai. Silakan periksa kembali kredensial login Anda.');
        return;
      }

      // Login success
      onLoginSuccess(selectedRole, targetConfig.email, targetConfig.name);
    }, 400);
  };

  // 3-Page Onboarding Data
  const onboardingSlides = [
    {
      stepNumber: '01',
      tag: 'Petualangan & Game Berbasis Warisan Nyata',
      title: 'Jelajahi Peta 2D Budaya Nusantara',
      description: 'HERITEX adalah gerbang digital yang menghubungkan warisan budaya dengan teknologi. Melalui visual peta 2D interaktif, gerakkan avatar penjelajah di atas bentang alam Sungai Batanghari, menelusuri Kompleks Candi Muaro Jambi, Rumah Tuo Rantau Panjang, hingga Tari Selampit Delapan.',
      badgeText: 'Gamifikasi Petualangan 2D',
      icon: Gamepad2,
      highlights: [
        'Navigasi karakter penjelajah dengan kontrol keyboard (WASD) atau Virtual D-Pad',
        'Jelajahi 9 objek cagar budaya berarsip resmi dengan koordinat spasial nyata',
        'Selesaikan Mini-Game Kuis Kilat, kumpulkan XP, dan buka wilayah dunia baru'
      ],
      image: 'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=800&auto=format&fit=crop&q=80'
    },
    {
      stepNumber: '02',
      tag: 'AI Verifier & Literasi Kritis Bebas Hoaks',
      title: 'Siklus 5 Tahap & Verifikasi Rujukan Resmi',
      description: 'Setiap cagar budaya mengajak Anda melatih nalar kritis: Jelajahi Objek → Pelajari Filosofi & Kearifan Lokal → Uji Klaim Hoaks dengan Rujukan SK Kemendikbudristek & LAM Jambi → Susun Argumentasi Analitis → Koleksi Lencana Pusaka!',
      badgeText: 'AI Verifier & Rujukan Resmi',
      icon: BookOpen,
      highlights: [
        'Diverifikasi silang dengan nomor SK WBTb resmi dan buku adat Melayu',
        'Uji kemampuan mendeteksi fakta autentik vs klaim mitos yang beredar di publik',
        'Tuliskan nalar kritis analitis untuk melatih literasi budaya generasi muda'
      ],
      image: 'https://images.unsplash.com/photo-1578632767115-351597cf2477?w=800&auto=format&fit=crop&q=80'
    },
    {
      stepNumber: '03',
      tag: 'Living Map & Crowdsourcing Pelestarian',
      title: 'Peta Hidup GIS & Kolaborasi 4 Peran',
      description: 'Pelestarian adalah kerja bersama. HERITEX menghubungkan 4 aktor kunci: Pelajar melaporkan kondisi fisik cagar budaya, Kurator mengaudit laporan warga, Pemerintah Daerah mengalokasikan anggaran DAK pemulihan, dan Administrator menjaga ekosistem.',
      badgeText: 'Living Map & Crowdsourcing',
      icon: ShieldCheck,
      highlights: [
        'Pelajar & Mahasiswa: Eksplorasi game, kuis fakta, dan lencana XP',
        'Kurator Budaya: Validasi laporan partisipatif dan audit bukti rujukan',
        'Pemerintah Daerah: Pemantauan keterancaman dan alokasi anggaran DAK',
        'Administrator: Manajemen pembukaan kunci dunia wilayah budaya'
      ],
      image: 'https://images.unsplash.com/photo-1524492412937-b28074a5d7da?w=800&auto=format&fit=crop&q=80'
    }
  ];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-[#FAF8F5] text-[#132726] flex items-center justify-center p-4 sm:p-6 select-none font-sans">
      
      {/* Subtle traditional ornament overlay in light theme */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="heritage-pattern-light" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 80 40 L 40 80 L 0 40 Z" fill="none" stroke="#DED6C7" strokeWidth="0.8" />
              <circle cx="40" cy="40" r="3" fill="#C85A32" opacity="0.15" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#heritage-pattern-light)" />
        </svg>
      </div>

      {/* Gentle ambient colored blooms */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#C85A32]/8 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 translate-y-1/2 w-96 h-96 bg-[#278B86]/8 rounded-full blur-3xl pointer-events-none" />

      {/* ========================================================================= */}
      {/* 1. SCREEN ANIMASI PEMBUKA DENGAN LOGO (SPLASH SCREEN)                    */}
      {/* ========================================================================= */}
      {currentStep === 'splash' && (
        <div className="relative z-10 max-w-2xl w-full text-center space-y-7 animate-in fade-in zoom-in-95 duration-500 py-8 px-4 sm:px-8 bg-white/95 rounded-3xl border border-[#E5DFD2] shadow-xl">
          
          {/* Official Animated HERITEX Logo */}
          <div className="pt-2 flex flex-col items-center">
            <div className="relative p-3 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D5] shadow-xs">
              <HeritexLogo size="xl" showSubtitle={false} />
            </div>
            <p className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#0D3B3A] mt-3">
              HERITE<span className="text-[#C85A32]">X</span>
            </p>
            <p className="text-xs sm:text-sm font-medium text-[#4A5E5D] tracking-wide">
              Explore Heritage, Experience Technology
            </p>
          </div>

          {/* Pilot Badge */}
          <div className="inline-flex items-center gap-2 rounded-full bg-[#FAF5EE] px-4 py-1.5 border border-[#E8C4B5] text-xs font-semibold text-[#A64522] shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#C85A32]" />
            <span>Pilot Wilayah Kebudayaan Jambi 2026</span>
          </div>

          {/* Meaning / Mission Statement from Brand Identity */}
          <p className="text-sm sm:text-base text-[#2A3E3D] max-w-lg mx-auto leading-relaxed">
            Gerbang digital yang menghubungkan warisan budaya dengan teknologi, mengajak generasi muda untuk 
            <span className="font-semibold text-[#0D3B3A]"> menjelajah, belajar, memverifikasi, </span> 
            dan menjaga identitas warisan Indonesia.
          </p>

          {/* 5 Core Feature Pillars from the Brand Guidelines */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-1 text-center text-xs">
            <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD2] shadow-2xs flex flex-col items-center">
              <div className="w-8 h-8 rounded-xl bg-[#FDF6F0] flex items-center justify-center text-[#C85A32] mb-1.5 border border-[#E8C4B5]">
                <Gamepad2 className="w-4 h-4" />
              </div>
              <span className="font-bold text-[#0D3B3A] text-[11px] block">Gamifikasi</span>
              <span className="text-[10px] text-[#637675] mt-0.5">Belajar lebih seru</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD2] shadow-2xs flex flex-col items-center">
              <div className="w-8 h-8 rounded-xl bg-[#EAF6F5] flex items-center justify-center text-[#278B86] mb-1.5 border border-[#A8DDD9]">
                <Sparkles className="w-4 h-4" />
              </div>
              <span className="font-bold text-[#0D3B3A] text-[11px] block">AI Verifier</span>
              <span className="text-[10px] text-[#637675] mt-0.5">Akurat & terpercaya</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD2] shadow-2xs flex flex-col items-center">
              <div className="w-8 h-8 rounded-xl bg-[#FAF8F5] flex items-center justify-center text-[#0D3B3A] mb-1.5 border border-[#CCD8D7]">
                <BookOpen className="w-4 h-4" />
              </div>
              <span className="font-bold text-[#0D3B3A] text-[11px] block">Knowledge Base</span>
              <span className="text-[10px] text-[#637675] mt-0.5">Sumber terkurasi</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD2] shadow-2xs flex flex-col items-center">
              <div className="w-8 h-8 rounded-xl bg-[#EAF6F5] flex items-center justify-center text-[#278B86] mb-1.5 border border-[#A8DDD9]">
                <MapPin className="w-4 h-4" />
              </div>
              <span className="font-bold text-[#0D3B3A] text-[11px] block">Living Map</span>
              <span className="text-[10px] text-[#637675] mt-0.5">Peta interaktif</span>
            </div>

            <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD2] shadow-2xs flex flex-col items-center col-span-2 sm:col-span-1">
              <div className="w-8 h-8 rounded-xl bg-[#FDF6F0] flex items-center justify-center text-[#C85A32] mb-1.5 border border-[#E8C4B5]">
                <Users className="w-4 h-4" />
              </div>
              <span className="font-bold text-[#0D3B3A] text-[11px] block">Crowdsourcing</span>
              <span className="text-[10px] text-[#637675] mt-0.5">Jaga bersama</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 pt-2 max-w-md mx-auto">
            <button
              id="btn-quick-explore"
              onClick={() => onLoginSuccess('player', ROLE_CREDENTIALS.player.email, ROLE_CREDENTIALS.player.name)}
              className="w-full flex items-center justify-center gap-2.5 rounded-2xl bg-[#C85A32] hover:bg-[#B54E27] py-3.5 px-6 text-sm font-bold text-white shadow-md transition-all hover:scale-[1.01]"
            >
              <Sparkles className="w-4 h-4" />
              <span>Masuk Langsung Sebagai Penjelajah Budaya</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-4 text-xs font-medium">
              <button
                id="btn-start-onboarding"
                onClick={() => setCurrentStep('onboarding')}
                className="text-[#4A5E5D] hover:text-[#C85A32] transition-colors py-1 inline-flex items-center gap-1 underline underline-offset-4"
              >
                <span>Panduan 3 Halaman</span>
              </button>
              <span className="text-[#D5CEBD]">•</span>
              <button
                id="btn-skip-to-login"
                onClick={() => setCurrentStep('login')}
                className="text-[#4A5E5D] hover:text-[#0D3B3A] transition-colors py-1 inline-flex items-center gap-1 underline underline-offset-4"
              >
                <span>Pilih Peran Lain (Kurator/Pemda/Admin) →</span>
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. ARAHAN INI APLIKASI APA (3 HALAMAN ONBOARDING CAROUSEL)               */}
      {/* ========================================================================= */}
      {currentStep === 'onboarding' && (
        <div className="relative z-10 max-w-2xl w-full rounded-3xl bg-white border border-[#E5DFD2] p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in duration-300">
          
          {/* Header Progress & Skip */}
          <div className="flex items-center justify-between border-b border-[#EFECE4] pb-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-bold text-[#C85A32] bg-[#FAF5EE] px-2.5 py-0.5 rounded-lg border border-[#E8C4B5]">
                Panduan {onboardingSlides[onboardingIndex].stepNumber} / 03
              </span>
              <span className="text-xs text-[#637675]">Pengenalan HERITEX</span>
            </div>

            {onCloseTutorial ? (
              <button
                type="button"
                id="btn-close-onboarding-tutorial"
                onClick={onCloseTutorial}
                className="text-xs text-[#0D3B3A] hover:text-black font-semibold transition-colors bg-[#FAF8F5] px-3 py-1 rounded-lg border border-[#E5DFD2]"
              >
                Tutup Panduan ✕
              </button>
            ) : (
              <button
                type="button"
                id="btn-skip-onboarding"
                onClick={() => setCurrentStep('login')}
                className="text-xs text-[#637675] hover:text-[#0D3B3A] transition-colors font-medium"
              >
                Lewati ke Login ✕
              </button>
            )}
          </div>

          {/* Current Slide Content */}
          <div className="space-y-4">
            
            {/* Visual Hero Banner */}
            <div className="relative h-44 sm:h-52 w-full rounded-2xl overflow-hidden border border-[#E5DFD2] shadow-2xs">
              <img 
                src={onboardingSlides[onboardingIndex].image} 
                alt={onboardingSlides[onboardingIndex].title} 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B3A]/90 via-[#0D3B3A]/30 to-transparent" />
              
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <span className="rounded-md bg-[#C85A32] text-white px-2.5 py-0.5 text-[10px] font-bold shadow">
                  {onboardingSlides[onboardingIndex].badgeText}
                </span>
                <span className="text-[10px] text-white/90 font-mono font-medium">
                  {onboardingSlides[onboardingIndex].tag}
                </span>
              </div>
            </div>

            {/* Slide Title & Text */}
            <div className="space-y-2">
              <h2 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B3A]">
                {onboardingSlides[onboardingIndex].title}
              </h2>
              <p className="text-xs sm:text-sm text-[#3E5251] leading-relaxed">
                {onboardingSlides[onboardingIndex].description}
              </p>
            </div>

            {/* Bullet Highlights */}
            <div className="space-y-2 pt-1">
              {onboardingSlides[onboardingIndex].highlights.map((highlight, idx) => (
                <div key={idx} className="flex items-start gap-2.5 text-xs text-[#2A3E3D] bg-[#FAF8F5] p-2.5 rounded-xl border border-[#E8E2D5]">
                  <CheckCircle2 className="w-4 h-4 text-[#C85A32] flex-shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </div>
              ))}
            </div>

          </div>

          {/* Carousel Footer Controls */}
          <div className="flex items-center justify-between pt-4 border-t border-[#EFECE4]">
            
            {/* 3 Step Dot Indicators */}
            <div className="flex items-center gap-1.5">
              {onboardingSlides.map((_, dotIdx) => (
                <button
                  key={dotIdx}
                  type="button"
                  onClick={() => setOnboardingIndex(dotIdx)}
                  className={`h-2 rounded-full transition-all ${
                    onboardingIndex === dotIdx 
                      ? 'w-6 bg-[#C85A32]' 
                      : 'w-2 bg-[#D5CEBD] hover:bg-[#B5AB99]'
                  }`}
                  aria-label={`Go to slide ${dotIdx + 1}`}
                />
              ))}
            </div>

            {/* Navigation Buttons */}
            <div className="flex items-center gap-2">
              {onboardingIndex > 0 && (
                <button
                  id="btn-onboarding-prev"
                  onClick={() => setOnboardingIndex(prev => prev - 1)}
                  className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-[#4A5E5D] hover:text-[#0D3B3A] bg-[#FAF8F5] hover:bg-[#F3EFE6] border border-[#E5DFD2] transition-colors"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Sebelumnya</span>
                </button>
              )}

              {onboardingIndex < onboardingSlides.length - 1 ? (
                <button
                  id="btn-onboarding-next"
                  onClick={() => setOnboardingIndex(prev => prev + 1)}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#C85A32] hover:bg-[#B54E27] transition-all shadow-xs"
                >
                  <span>Lanjut (Halaman {onboardingIndex + 2})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              ) : (
                <button
                  id="btn-onboarding-finish"
                  onClick={() => setCurrentStep('login')}
                  className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#C85A32] hover:bg-[#B54E27] transition-all shadow-md"
                >
                  <span>Pilih Peran & Masuk Login</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. HALAMAN LOGIN DENGAN 4 PERAN & PASSWORD KHUSUS TIAP PERAN             */}
      {/* ========================================================================= */}
      {currentStep === 'login' && (
        <div className="relative z-10 max-w-4xl w-full rounded-3xl bg-white border border-[#E5DFD2] p-6 sm:p-8 shadow-xl space-y-6 animate-in fade-in duration-300">
          
          {/* Header */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#EFECE4] pb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-[#C85A32] uppercase">
                  Autentikasi Multi-Aktor HERITEX
                </span>
                <span className="rounded-md bg-[#FAF5EE] px-2 py-0.5 text-[9px] font-semibold text-[#A64522] border border-[#E8C4B5]">
                  4 Peran Siap Pakai
                </span>
              </div>
              <h2 className="font-serif text-2xl font-bold text-[#0D3B3A] mt-0.5">
                Masuk ke Ruang Kebudayaan
              </h2>
              <p className="text-xs text-[#526665] mt-0.5">
                Pilih peran Anda di bawah ini untuk mengisi formulir otomatis, atau masukkan kata sandi yang telah ditentukan.
              </p>
            </div>

            <button
              id="btn-back-to-onboarding"
              onClick={() => {
                setOnboardingIndex(0);
                setCurrentStep('onboarding');
              }}
              className="flex items-center gap-1 text-xs text-[#0D3B3A] font-semibold hover:text-black transition-colors self-start sm:self-auto bg-[#FAF8F5] px-3 py-1.5 rounded-xl border border-[#E5DFD2]"
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#278B86]" />
              <span>Baca Panduan Lagi</span>
            </button>
          </div>

          {/* Grid of 4 Role Selection Cards */}
          <div className="space-y-2">
            <span className="text-[10px] font-bold text-[#637675] uppercase tracking-wider block">
              1. Pilih Salah Satu Akun Peran Demo:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {(Object.keys(ROLE_CREDENTIALS) as UserRole[]).map((roleKey) => {
                const cred = ROLE_CREDENTIALS[roleKey];
                const isSelected = selectedRole === roleKey;

                return (
                  <button
                    key={roleKey}
                    type="button"
                    id={`btn-select-role-${roleKey}`}
                    onClick={() => handleSelectRole(roleKey)}
                    className={`rounded-2xl p-3.5 text-left transition-all relative border flex flex-col justify-between ${
                      isSelected 
                        ? 'bg-[#FAF5EE] border-[#C85A32] shadow-sm ring-1 ring-[#C85A32]/50 scale-[1.01]' 
                        : 'bg-[#FAF8F5] border-[#E5DFD2] hover:border-[#D5CEBD] hover:bg-white'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className={`text-[9px] font-bold px-2 py-0.5 rounded-md ${
                          isSelected ? 'bg-[#C85A32] text-white' : 'bg-white text-[#637675] border border-[#E5DFD2]'
                        }`}>
                          {roleKey.toUpperCase()}
                        </span>
                        {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-[#C85A32]" />}
                      </div>

                      <h3 className="font-serif text-xs font-bold text-[#0D3B3A]">
                        {cred.roleName.split('(')[0].trim()}
                      </h3>
                      <p className="text-[10px] text-[#526665] mt-1 line-clamp-2 leading-relaxed">
                        {cred.description}
                      </p>
                    </div>

                    {/* Role Account Info Box */}
                    <div className="mt-3 pt-2.5 border-t border-[#EFECE4] space-y-0.5">
                      <div className="text-[9px] text-[#637675] flex justify-between items-center">
                        <span>Akun Demo:</span>
                        <span className="font-mono text-[#0D3B3A] font-semibold bg-[#EFECE4]/60 px-1.5 py-0.5 rounded">{cred.email.split('@')[0]}</span>
                      </div>
                      <div className="text-[9px] text-[#5B6D6C] flex justify-between items-center">
                        <span>Akses:</span>
                        <span className="font-medium text-[#1E7773]">{cred.badge}</span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Form Login */}
          <div className="rounded-2xl bg-[#FAF8F5] border border-[#E5DFD2] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="p-1.5 rounded-lg bg-[#FAF5EE] text-[#C85A32] border border-[#E8C4B5]">
                  <Lock className="w-4 h-4" />
                </div>
                <div>
                  <span className="text-xs font-bold text-[#0D3B3A] block">
                    2. Masuk Sebagai: {ROLE_CREDENTIALS[selectedRole].name}
                  </span>
                  <span className="text-[10px] text-[#637675]">
                    {ROLE_CREDENTIALS[selectedRole].institution}
                  </span>
                </div>
              </div>

              <span className="hidden sm:inline-block text-[10px] bg-white text-[#C85A32] font-semibold px-2 py-0.5 rounded-full border border-[#E8C4B5]">
                {ROLE_CREDENTIALS[selectedRole].badge}
              </span>
            </div>

            {/* Error banner if any */}
            {errorMessage && (
              <div className="flex items-start gap-2 rounded-xl bg-red-50 p-3 border border-red-200 text-xs text-red-700 animate-in fade-in">
                <AlertCircle className="w-4 h-4 text-red-600 flex-shrink-0 mt-0.5" />
                <span>{errorMessage}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-3.5">
              
              {/* Email Input */}
              <div className="space-y-1">
                <label className="text-[11px] font-semibold text-[#2A3E3D] flex items-center justify-between">
                  <span>Alamat Email atau Nama Pengguna</span>
                  <span className="text-[10px] text-[#637675] font-normal">
                    Contoh: {ROLE_CREDENTIALS[selectedRole].email}
                  </span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A8E8D]" />
                  <input
                    id="login-email-input"
                    type="text"
                    value={emailInput}
                    onChange={(e) => {
                      setEmailInput(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="nama@heritex.id"
                    required
                    className="w-full rounded-xl bg-white border border-[#D5CEBD] pl-10 pr-4 py-2.5 text-xs text-[#132726] placeholder-[#9EABA9] focus:outline-none focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] transition-colors shadow-2xs"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-[11px] font-semibold text-[#2A3E3D]">
                    Kata Sandi Khusus Peran
                  </label>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[#7A8E8D]" />
                  <input
                    id="login-password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={passwordInput}
                    onChange={(e) => {
                      setPasswordInput(e.target.value);
                      setErrorMessage('');
                    }}
                    placeholder="Masukkan kata sandi..."
                    required
                    className="w-full rounded-xl bg-white border border-[#D5CEBD] pl-10 pr-10 py-2.5 text-xs text-[#132726] placeholder-[#9EABA9] focus:outline-none focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] transition-colors shadow-2xs font-mono"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7A8E8D] hover:text-[#132726] transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Role Permissions Preview */}
              <div className="p-3 rounded-xl bg-white border border-[#E8E2D5] text-[11px] space-y-1.5">
                <span className="font-semibold text-[#0D3B3A] block">
                  Hak Akses & Otoritas Peran Ini:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-[#4A5E5D]">
                  {ROLE_CREDENTIALS[selectedRole].permissions.map((perm, idx) => (
                    <div key={idx} className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3 h-3 text-[#278B86]" />
                      <span>{perm}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                id="btn-submit-login"
                disabled={isLoading}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-[#C85A32] hover:bg-[#B54E27] py-3 px-4 text-xs font-bold text-white shadow-sm transition-all hover:scale-[1.01] disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Memverifikasi Akses...</span>
                  </>
                ) : (
                  <>
                    <span>Masuk Sebagai {ROLE_CREDENTIALS[selectedRole].roleName.split('(')[0]}</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>
      )}

    </div>
  );
};
