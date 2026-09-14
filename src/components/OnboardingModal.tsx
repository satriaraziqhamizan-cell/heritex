import React, { useState } from 'react';
import { 
  X, 
  Gamepad2, 
  BookOpen, 
  ShieldCheck, 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  MapPin, 
  Layers, 
  Award, 
  Camera, 
  Puzzle,
  Lightbulb
} from 'lucide-react';
import { HeritexLogo } from './HeritexLogo';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

const ONBOARDING_SLIDES = [
  {
    step: '01',
    tag: 'Petualangan Budaya 2D',
    title: 'Jelajahi Dunia Budaya & Cagar Pusaka',
    description: 'Selamat datang di HERITEX! Gerakkan karakter penjelajah Anda menggunakan tombol keyboard (WASD / Panah) atau tombol sentuh di layar. Jelajahi bentang alam Sungai Batanghari dan temukan titik-titik cagar budaya terinventarisasi resmi.',
    icon: Gamepad2,
    badgeText: 'Gamifikasi Literasi 2D',
    highlights: [
      'Dekati ikon cagar budaya di peta dan tekan tombol "Buka Lembar Fakta"',
      'Dapatkan XP dan buka kunci wilayah dunia berikutnya (Sumatera Raya & Nusantara)',
      'Nikmati visual interaktif arsitektur vernakular dan candi purba'
    ],
    bgGradient: 'from-[#FAF6EE] to-[#F2ECE0]'
  },
  {
    step: '02',
    tag: 'AI Fact-Verification Engine',
    title: 'Siklus 5 Tahap & Verifikasi Fakta Kebudayaan',
    description: 'Tiap objek mengajak Anda menjalani siklus literasi kritis: 1) Jelajah Objek → 2) Pelajari Filosofi → 3) Uji Klaim Hoaks dengan rujukan resmi SK WBTb & LAM → 4) Tuliskan Argumentasi Analitis → 5) Buka Kunci Pusaka & Koleksi Lencana!',
    icon: BookOpen,
    badgeText: 'Pencegahan Misinformasi',
    highlights: [
      'Deteksi distorsi fakta, hoaks klaim sepihak, dan klaim mitos tanpa rujukan',
      'Diverifikasi silang dengan arsip cagar budaya Kemendikbudristek & Balai Adat',
      'Raih bonus XP tinggi dengan menyusun argumentasi analitis yang tajam'
    ],
    bgGradient: 'from-[#FAF5EE] to-[#EAE2D2]'
  },
  {
    step: '03',
    tag: 'Peta Hidup GIS & Crowdsourcing',
    title: 'Living Map Pemantauan Spasial Nyata',
    description: 'Pantau status keberlangsungan tradisi secara spasial (Aktif Terjaga, Rentan, Kritis, Punah). Pelajar dapat mengirim laporan pengamatan lapangan, yang kemudian diaudit oleh Kurator BPK dan diintervensi oleh Pemerintah Daerah melalui alokasi DAK.',
    icon: MapPin,
    badgeText: 'Living Map Multi-Aktor',
    highlights: [
      'Gunakan tombol navigasi cepat untuk lompat ke pulau-pulau di seluruh Nusantara',
      'Filter berdasarkan status keterancaman, pulau, dan kabupaten/kota',
      'Kirim bukti foto dan catatan observasi lapangan langsung dari lokasi'
    ],
    bgGradient: 'from-[#FAF8F5] to-[#E8E2D5]'
  },
  {
    step: '04',
    tag: 'Fitur Eksperimental',
    title: 'AI Culture Scanner & Puzzleverse Mosaik',
    description: 'Gunakan fitur Computer Vision AI untuk memindai foto objek budaya dan mendeteksi kerancuan corak/motif. Selesaikan puzzle interaktif di menu Fase Lanjutan untuk melatih pemahaman detail visual arsitektur vernakular.',
    icon: Camera,
    badgeText: 'Computer Vision & Gamifikasi',
    highlights: [
      'Pindai foto kamera atau berkas citra untuk identifikasi otomatis objek budaya (+50 XP)',
      'Game Puzzleverse 2 Mode: Jambi Drag-Drop & Campaign Mosaik Nusantara',
      'Beralih simulasi 4 peran (Pelajar, Kurator, Pemerintah, Admin) kapan saja dari bilah navigasi'
    ],
    bgGradient: 'from-[#FAF5EE] to-[#EAE0D0]'
  }
];

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete
}) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [dontShowAgain, setDontShowAgain] = useState(false);

  if (!isOpen) return null;

  const currentSlide = ONBOARDING_SLIDES[currentSlideIndex];
  const IconComponent = currentSlide.icon;

  const handleFinish = () => {
    if (dontShowAgain) {
      try {
        localStorage.setItem('heritex_onboarding_completed', 'true');
      } catch (e) {
        console.warn('LocalStorage error:', e);
      }
    }
    if (onComplete) onComplete();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200 select-none">
      <div 
        id="onboarding-modal-card"
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl bg-white border border-[#E5DFD2] shadow-2xl overflow-hidden"
      >
        {/* Top Header */}
        <div className="bg-gradient-to-r from-[#FAF6EE] via-[#F4EDE0] to-[#EAE1D1] px-6 py-4 border-b border-[#E5DFD2] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <HeritexLogo size="sm" showSubtitle={false} />
            <div>
              <span className="text-[10px] font-bold tracking-widest text-[#C85A32] uppercase block">
                Panduan Memulai • Langkah {currentSlideIndex + 1} dari {ONBOARDING_SLIDES.length}
              </span>
              <h2 className="font-serif text-sm sm:text-base font-bold text-[#0D3B3A]">
                Petunjuk Penjelajahan HERITEX
              </h2>
            </div>
          </div>

          <button
            id="btn-close-onboarding"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-xl text-[#637675] hover:text-[#0D3B3A] hover:bg-black/5 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5 flex-1">
          {/* Card Hero */}
          <div className={`p-5 rounded-2xl bg-gradient-to-br ${currentSlide.bgGradient} border border-[#E8C4B5]/60 flex items-start gap-4`}>
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[#C85A32] text-white shadow-sm">
              <IconComponent className="w-6 h-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold text-[#C85A32] uppercase tracking-wider">
                  {currentSlide.tag}
                </span>
                <span className="rounded-md bg-white/80 px-2 py-0.5 text-[9px] font-bold text-[#1E7773] border border-[#278B86]/40">
                  {currentSlide.badgeText}
                </span>
              </div>
              <h3 className="font-serif text-lg font-bold text-[#0D3B3A]">
                {currentSlide.title}
              </h3>
              <p className="text-xs text-[#4A5E5D] leading-relaxed">
                {currentSlide.description}
              </p>
            </div>
          </div>

          {/* Highlights List */}
          <div className="space-y-2">
            <span className="text-[11px] font-bold text-[#0D3B3A] uppercase tracking-wider block">
              Poin Utama:
            </span>
            <div className="space-y-2">
              {currentSlide.highlights.map((item, idx) => (
                <div key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#FAF8F5] border border-[#EFECE4] text-xs text-[#2A3E3D]">
                  <CheckCircle2 className="w-4 h-4 text-[#C85A32] shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer with Controls */}
        <div className="px-6 py-4 border-t border-[#EFECE4] bg-[#FAF8F5] flex flex-col sm:flex-row items-center justify-between gap-3">
          {/* Checkbox Don't show again */}
          <label className="flex items-center gap-2 text-xs text-[#637675] cursor-pointer">
            <input
              type="checkbox"
              checked={dontShowAgain}
              onChange={(e) => setDontShowAgain(e.target.checked)}
              className="rounded text-[#C85A32] focus:ring-[#C85A32] h-4 w-4 border-[#D5CEBD]"
            />
            <span>Jangan tampilkan panduan ini saat masuk</span>
          </label>

          {/* Navigation Buttons & Dots */}
          <div className="flex items-center gap-3">
            {/* Step Dots */}
            <div className="flex items-center gap-1.5 mr-2">
              {ONBOARDING_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentSlideIndex === idx 
                      ? 'w-6 bg-[#C85A32]' 
                      : 'w-2 bg-[#D5CEBD] hover:bg-[#B5AB99]'
                  }`}
                  aria-label={`Slide ${idx + 1}`}
                />
              ))}
            </div>

            {currentSlideIndex > 0 && (
              <button
                onClick={() => setCurrentSlideIndex(prev => prev - 1)}
                className="flex items-center gap-1 px-3 py-2 rounded-xl text-xs font-semibold text-[#4A5E5D] hover:text-[#0D3B3A] bg-white border border-[#E5DFD2] transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Sebelumnya</span>
              </button>
            )}

            {currentSlideIndex < ONBOARDING_SLIDES.length - 1 ? (
              <button
                onClick={() => setCurrentSlideIndex(prev => prev + 1)}
                className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold text-white bg-[#C85A32] hover:bg-[#B54E27] shadow-xs transition-all"
              >
                <span>Lanjut ({currentSlideIndex + 2}/{ONBOARDING_SLIDES.length})</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            ) : (
              <button
                onClick={handleFinish}
                className="flex items-center gap-1.5 px-5 py-2 rounded-xl text-xs font-bold text-white bg-[#C85A32] hover:bg-[#B54E27] shadow-md transition-all"
              >
                <span>Mulai Eksplorasi</span>
                <CheckCircle2 className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
