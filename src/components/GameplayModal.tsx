import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { 
  X, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  BookOpen, 
  ShieldCheck, 
  Award, 
  HelpCircle, 
  ExternalLink, 
  Send, 
  ArrowRight, 
  RefreshCw, 
  Info,
  Share2,
  Copy,
  Check
} from 'lucide-react';
import { CulturalObject, ClaimTest, VerificationResult, Badge } from '../types';
import { verifyClaim } from '../services/aiVerifier';
import { playVictoryChime } from '../utils/audio';
import { LoadingSpinner } from './LoadingSpinner';
import { Language, useTranslation } from '../i18n';

interface GameplayModalProps {
  culturalObject: CulturalObject;
  onClose: () => void;
  onCompleteObject: (
    objectId: string, 
    earnedXp: number, 
    newBadge?: Badge, 
    reasonSubmission?: { claimText: string; userAnswer: string; reasonText: string; score: number }
  ) => void;
  isAlreadyVerified: boolean;
  lang?: Language;
}

type GameplayStep = 'discover' | 'learn' | 'verify' | 'reason' | 'unlock';

export const GameplayModal: React.FC<GameplayModalProps> = ({
  culturalObject,
  onClose,
  onCompleteObject,
  isAlreadyVerified,
  lang = 'id'
}) => {
  const { t } = useTranslation(lang);
  const [currentStep, setCurrentStep] = useState<GameplayStep>('discover');
  
  // Verify state
  const [selectedClaimTest] = useState<ClaimTest>(
    culturalObject.claimTests[0] || {
      id: 'default-claim',
      statement: culturalObject.curatedFacts[0],
      isTrue: true,
      distractorType: 'factual',
      correctClassification: 'verified',
      explanation: 'Klaim bersumber dari cagar budaya resmi.',
      sourceReferenceId: culturalObject.references[0]?.id || ''
    }
  );

  const [playerChoice, setPlayerChoice] = useState<'verified' | 'unverified' | 'contradicted' | null>(null);
  const [isVerifyingWithAi, setIsVerifyingWithAi] = useState(false);
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);
  const [reasonInput, setReasonInput] = useState('');
  const [earnedBadge, setEarnedBadge] = useState<Badge | null>(null);
  const [hasCopied, setHasCopied] = useState(false);

  // Trigger verification for the selected claim
  const handleRunVerification = (choice: 'verified' | 'unverified' | 'contradicted') => {
    setPlayerChoice(choice);
    setIsVerifyingWithAi(true);

    setTimeout(() => {
      const result = verifyClaim(selectedClaimTest.statement, culturalObject.id);
      setVerificationResult(result);
      setIsVerifyingWithAi(false);
      setCurrentStep('reason');
    }, 800);
  };

  // Submit reasoning and trigger unlock
  const handleFinishReasonAndUnlock = () => {
    // Determine reward
    const isPlayerAccurate = playerChoice === verificationResult?.classification;
    const baseRewardXp = isPlayerAccurate ? 200 : 120;
    const reasonBonusXp = reasonInput.trim().length > 15 ? 75 : 30;
    const totalXp = baseRewardXp + reasonBonusXp;

    // Check potential badge
    let badgeToAward: Badge | undefined;
    if (culturalObject.threatLevel === 'critical') {
      badgeToAward = {
        id: 'badge-critical-savior',
        name: 'Penyelamat Tradisi Kritis',
        description: `Menganalisis dan menyusun alasan argumentatif untuk warisan berstatus Kritis (${culturalObject.name}).`,
        category: 'Advokasi Budaya',
        icon: 'ShieldAlert',
        condition: 'Verifikasi objek berstatus Kritis',
        earnedAt: new Date().toLocaleDateString('id-ID')
      };
    } else if (culturalObject.id === 'obj-rumah-kajang-lako') {
      badgeToAward = {
        id: 'badge-kajang-lako-master',
        name: 'Arsitek Vernakular Kajang Lako',
        description: 'Menuntaskan analisis rekayasa tahan gempa Rumah Tuo Batin Rantau Panjang.',
        category: 'Pengetahuan',
        icon: 'Home',
        condition: 'Verifikasi Rumah Tuo',
        earnedAt: new Date().toLocaleDateString('id-ID')
      };
    } else if (culturalObject.id === 'obj-candi-muaro-jambi') {
      badgeToAward = {
        id: 'badge-candi-scholar',
        name: 'Pujangga Muaro Jambi',
        description: 'Menganalisis sejarah candi bata terluas di Asia Tenggara.',
        category: 'Pengetahuan',
        icon: 'Scroll',
        condition: 'Verifikasi Candi Muaro Jambi',
        earnedAt: new Date().toLocaleDateString('id-ID')
      };
    }

    if (badgeToAward) {
      setEarnedBadge(badgeToAward);
    }

    try {
      playVictoryChime();
    } catch (e) {
      console.warn('Audio chime error:', e);
    }

    confetti({
      particleCount: 100,
      spread: 90,
      origin: { y: 0.55 },
      colors: ['#C85A32', '#1E7773', '#E5A93C', '#0D3B3A', '#FAF5EE']
    });

    setCurrentStep('unlock');

    // Notify parent
    onCompleteObject(
      culturalObject.id, 
      totalXp, 
      badgeToAward, 
      {
        claimText: selectedClaimTest.statement,
        userAnswer: playerChoice || 'verified',
        reasonText: reasonInput || 'Argumentasi disusun berdasarkan rujukan resmi dan kearifan sejarah lokal.',
        score: isPlayerAccurate ? 100 : 70
      }
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
      <div className="relative w-full max-w-3xl rounded-3xl bg-white dark:bg-slate-900 border border-[#E5DFD2] dark:border-slate-800 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#132726] dark:text-slate-100">
        
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#EFECE4] dark:border-slate-800 bg-[#FAF8F5] dark:bg-slate-800/80">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#FAF5EE] dark:bg-slate-800 text-[#C85A32] font-bold border border-[#E8C4B5] dark:border-amber-900/40 text-xs">
              0{['discover', 'learn', 'verify', 'reason', 'unlock'].indexOf(currentStep) + 1}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] font-bold tracking-widest text-[#C85A32] uppercase">
                  Siklus Literasi Budaya • Tahap: {
                    currentStep === 'discover' ? 'Jelajah' :
                    currentStep === 'learn' ? 'Pelajari' :
                    currentStep === 'verify' ? 'Uji Fakta' :
                    currentStep === 'reason' ? 'Bernalar' : 'Buka Pusaka'
                  }
                </span>
                {isAlreadyVerified && (
                  <span className="rounded-md bg-[#EAF6F5] dark:bg-teal-950/50 px-2 py-0.5 text-[9px] font-semibold text-[#1E7773] dark:text-teal-400 border border-[#278B86] dark:border-teal-800">
                    Telah Terverifikasi
                  </span>
                )}
              </div>
              <h2 className="font-serif text-base font-bold text-[#0D3B3A] dark:text-slate-100 truncate max-w-[280px] sm:max-w-md">
                {culturalObject.name}
              </h2>
            </div>
          </div>

          <button
            id="close-gameplay-modal"
            onClick={onClose}
            className="rounded-xl p-2 text-[#637675] dark:text-slate-400 hover:bg-[#FAF8F5] dark:hover:bg-slate-800 hover:text-[#0D3B3A] dark:hover:text-slate-100 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Step Progression Indicators */}
        <div className="grid grid-cols-5 border-b border-[#EFECE4] dark:border-slate-800 bg-[#FAF8F5] dark:bg-slate-800/60 text-center text-[11px] font-semibold">
          {[
            { id: 'discover', label: '1. Jelajah' },
            { id: 'learn', label: '2. Pelajari' },
            { id: 'verify', label: '3. Uji Fakta' },
            { id: 'reason', label: '4. Bernalar' },
            { id: 'unlock', label: '5. Buka Pusaka' }
          ].map((s, idx) => {
            const stepOrder = ['discover', 'learn', 'verify', 'reason', 'unlock'];
            const isCurrent = currentStep === s.id;
            const isPast = stepOrder.indexOf(currentStep) > idx;

            return (
              <div 
                key={s.id}
                className={`py-2.5 px-1 border-r border-[#EFECE4] dark:border-slate-800 last:border-r-0 transition-colors ${
                  isCurrent 
                    ? 'bg-[#FAF5EE] dark:bg-amber-950/40 text-[#C85A32] dark:text-amber-400 font-bold border-b-2 border-[#C85A32]' 
                    : isPast 
                      ? 'text-[#1E7773] dark:text-teal-400 bg-[#EAF6F5] dark:bg-teal-950/30' 
                      : 'text-[#8C9C9B] dark:text-slate-500'
                }`}
              >
                {s.label}
              </div>
            );
          })}
        </div>

        {/* Modal Scrollable Body */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5 bg-white dark:bg-slate-900">

          {/* STEP 1: DISCOVER */}
          {currentStep === 'discover' && (
            <div className="space-y-5">
              <div className="relative h-60 w-full rounded-2xl overflow-hidden border border-[#E5DFD2] dark:border-slate-800 group shadow-2xs">
                <img 
                  src={culturalObject.thumbnail} 
                  alt={culturalObject.name} 
                  className="h-full w-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B3A]/90 dark:from-slate-950/90 via-[#0D3B3A]/30 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <span className="inline-block rounded-md bg-[#C85A32] px-2.5 py-0.5 text-xs font-bold text-white shadow-sm">
                    {culturalObject.category}
                  </span>
                  <h3 className="font-serif mt-1 text-xl font-bold text-white drop-shadow">
                    {culturalObject.name}
                  </h3>
                  <p className="text-xs text-white/90 font-medium">
                    📍 {culturalObject.regency} • {culturalObject.historicalEra}
                  </p>
                </div>
              </div>

              <div className="rounded-2xl bg-[#FAF8F5] dark:bg-slate-800/60 p-4 border border-[#E5DFD2] dark:border-slate-800">
                <p className="text-sm text-[#2A3E3D] dark:text-slate-200 leading-relaxed">
                  {culturalObject.shortDescription}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="rounded-xl bg-[#FAF8F5] dark:bg-slate-800/60 p-3 border border-[#E5DFD2] dark:border-slate-800">
                  <span className="text-[10px] text-[#637675] dark:text-slate-400 font-bold uppercase block">Status Pelestarian</span>
                  <span className={`inline-flex items-center gap-1.5 mt-1 font-bold ${
                    culturalObject.threatLevel === 'active' ? 'text-[#1E7773] dark:text-teal-400' :
                    culturalObject.threatLevel === 'at_risk' ? 'text-[#C85A32] dark:text-amber-400' : 'text-[#B3261E] dark:text-red-400'
                  }`}>
                    <span className="h-2 w-2 rounded-full bg-current"></span>
                    {culturalObject.threatLevel === 'active' ? 'Aktif Terjaga' :
                     culturalObject.threatLevel === 'at_risk' ? 'Rentan / Perlu Pengawasan' : 'Kritis Terancam'}
                  </span>
                </div>
                <div className="rounded-xl bg-[#FAF8F5] dark:bg-slate-800/60 p-3 border border-[#E5DFD2] dark:border-slate-800">
                  <span className="text-[10px] text-[#637675] dark:text-slate-400 font-bold uppercase block">Koordinat GIS</span>
                  <span className="font-mono text-[#0D3B3A] dark:text-slate-200 font-semibold block mt-1">
                    {culturalObject.latitude.toFixed(4)}, {culturalObject.longitude.toFixed(4)}
                  </span>
                </div>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  id="btn-next-to-learn"
                  onClick={() => setCurrentStep('learn')}
                  className="flex items-center gap-2 rounded-xl bg-[#C85A32] hover:bg-[#B54E27] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Buka Kartu Pengetahuan (Pelajari Objek)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: LEARN */}
          {currentStep === 'learn' && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-[#FAF5EE] dark:bg-amber-950/20 border border-[#E8C4B5] dark:border-amber-900/40 p-4">
                <div className="flex items-center gap-2 text-[#A64522] dark:text-amber-400 font-bold text-xs uppercase tracking-wider mb-1">
                  <Info className="w-4 h-4 text-[#C85A32]" />
                  <span>Kartu Informasi Terkurasi (Basis Pengetahuan Budaya)</span>
                </div>
                <p className="text-xs text-[#4A5E5D] dark:text-slate-300 leading-relaxed">
                  Setiap rujukan berikut telah diverifikasi dan diaudit langsung oleh Balai Pelestarian Kebudayaan (BPK) Wilayah V & Kemendikbudristek RI.
                </p>
              </div>

              {/* Philosophical Meaning Deep Dive */}
              <div className="rounded-2xl bg-[#FAF8F5] dark:bg-slate-800/60 p-5 border border-[#E5DFD2] dark:border-slate-800 space-y-2">
                <h4 className="font-serif text-xs font-bold text-[#C85A32] dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                  Makna Filosofis & Nilai Kearifan Lokal
                </h4>
                <p className="text-sm text-[#2A3E3D] dark:text-slate-200 leading-relaxed italic border-l-3 border-[#C85A32] pl-3">
                  "{culturalObject.philosophicalMeaning}"
                </p>
              </div>

              {/* Full Historical & Architecture Description */}
              <div className="rounded-2xl bg-[#FAF8F5] dark:bg-slate-800/60 p-5 border border-[#E5DFD2] dark:border-slate-800 space-y-2">
                <h4 className="text-xs font-bold text-[#0D3B3A] dark:text-slate-200 uppercase tracking-wider">
                  Deskripsi Komprehensif Sejarah & Konstruksi
                </h4>
                <p className="text-xs text-[#3E5251] dark:text-slate-300 leading-relaxed">
                  {culturalObject.fullDescription}
                </p>
              </div>

              {/* Curated Facts */}
              <div className="rounded-2xl bg-[#FAF8F5] dark:bg-slate-800/60 p-5 border border-[#E5DFD2] dark:border-slate-800 space-y-2.5">
                <h4 className="text-xs font-bold text-[#1E7773] dark:text-teal-400 uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Fakta-Fakta Kunci Terkurasi (Bukti Lapangan)
                </h4>
                <ul className="space-y-2 text-xs text-[#2A3E3D] dark:text-slate-300">
                  {culturalObject.curatedFacts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-[#EAF6F5] dark:bg-teal-950 text-[#1E7773] dark:text-teal-300 text-[10px] font-bold mt-0.5 border border-[#278B86]">
                        {idx + 1}
                      </span>
                      <span>{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Official References */}
              <div className="rounded-2xl bg-[#FAF8F5] dark:bg-slate-800/60 p-4 border border-[#E5DFD2] dark:border-slate-800 space-y-2">
                <span className="text-[10px] font-bold text-[#637675] dark:text-slate-400 uppercase block">
                  Sumber Rujukan Resmi WBTb / Balai Pelestarian Kebudayaan
                </span>
                <div className="space-y-1.5">
                  {culturalObject.references.map((ref) => (
                    <div key={ref.id} className="flex items-center justify-between text-xs text-[#2A3E3D] dark:text-slate-300 rounded-lg bg-white dark:bg-slate-800 p-2.5 border border-[#E5DFD2] dark:border-slate-700">
                      <div>
                        <span className="font-semibold text-[#0D3B3A] dark:text-slate-100 block">{ref.title}</span>
                        <span className="text-[10px] text-[#637675] dark:text-slate-400">{ref.institution} ({ref.year})</span>
                      </div>
                      <span className="font-mono text-[10px] bg-[#FAF5EE] dark:bg-slate-900 px-2 py-0.5 rounded text-[#C85A32] dark:text-amber-400 border border-[#E8C4B5] dark:border-amber-900/50">
                        {ref.urlOrDocId}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-2 flex justify-between">
                <button
                  onClick={() => setCurrentStep('discover')}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-[#637675] dark:text-slate-400 hover:text-[#0D3B3A] dark:hover:text-slate-100"
                >
                  Kembali
                </button>

                <button
                  id="btn-next-to-verify"
                  onClick={() => setCurrentStep('verify')}
                  className="flex items-center gap-2 rounded-xl bg-[#C85A32] hover:bg-[#B54E27] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all"
                >
                  <ShieldCheck className="w-4 h-4" />
                  <span>Lanjut ke Tahap Uji Fakta Budaya</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: VERIFY */}
          {currentStep === 'verify' && (
            <div className="space-y-5">
              <div className="rounded-2xl bg-[#FAF8F5] dark:bg-slate-800/60 border border-[#E5DFD2] dark:border-slate-800 p-5">
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] font-bold text-[#C85A32] dark:text-amber-400 uppercase tracking-wider flex items-center gap-1.5">
                    <HelpCircle className="w-4 h-4" />
                    Tantangan Uji Klaim Budaya (Claim Test)
                  </span>
                  <span className="text-[10px] bg-white dark:bg-slate-800 px-2 py-0.5 rounded text-[#637675] dark:text-slate-400 border border-[#E5DFD2] dark:border-slate-700">
                    Pilih Klasifikasi yang Tepat
                  </span>
                </div>
                
                {/* The Claim Statement */}
                <div className="rounded-xl bg-[#FAF5EE] dark:bg-amber-950/30 p-4 border border-[#E8C4B5] dark:border-amber-900/40 my-3">
                  <p className="text-sm sm:text-base font-semibold text-[#0D3B3A] dark:text-amber-200 leading-relaxed">
                    "{selectedClaimTest.statement}"
                  </p>
                </div>

                <p className="text-xs text-[#4A5E5D] dark:text-slate-300 leading-relaxed">
                  Uji kecakapan literasi budaya Anda: Berdasarkan arsip dan rujukan cagar budaya yang telah dipelajari, tentukan apakah klaim di atas terverifikasi sahih, belum terverifikasi (kurang bukti), atau keliru / kontradiktif?
                </p>
              </div>

              {/* Verification Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <button
                  id="btn-choice-verified"
                  disabled={isVerifyingWithAi}
                  onClick={() => handleRunVerification('verified')}
                  className="group relative flex flex-col items-center justify-center p-4 rounded-2xl border border-[#278B86] dark:border-teal-700/60 bg-[#EAF6F5] dark:bg-teal-950/40 hover:bg-[#D4EFEF] dark:hover:bg-teal-950/70 text-[#0D3B3A] dark:text-teal-200 font-bold transition-all shadow-2xs"
                >
                  <CheckCircle2 className="w-6 h-6 mb-1 text-[#1E7773] dark:text-teal-400 group-hover:scale-105 transition-transform" />
                  <span className="text-xs uppercase tracking-wider">Terverifikasi</span>
                  <span className="text-[10px] text-[#278B86] dark:text-teal-400 font-normal mt-0.5">Sesuai Fakta Resmi</span>
                </button>

                <button
                  id="btn-choice-unverified"
                  disabled={isVerifyingWithAi}
                  onClick={() => handleRunVerification('unverified')}
                  className="group relative flex flex-col items-center justify-center p-4 rounded-2xl border border-[#E8C4B5] dark:border-amber-900/50 bg-[#FAF5EE] dark:bg-amber-950/40 hover:bg-[#F5ECE0] dark:hover:bg-amber-950/70 text-[#A64522] dark:text-amber-300 font-bold transition-all shadow-2xs"
                >
                  <AlertTriangle className="w-6 h-6 mb-1 text-[#C85A32] dark:text-amber-400 group-hover:scale-105 transition-transform" />
                  <span className="text-xs uppercase tracking-wider">Belum Terverifikasi</span>
                  <span className="text-[10px] text-[#A64522]/80 dark:text-amber-400/80 font-normal mt-0.5">Bukti Belum Cukup</span>
                </button>

                <button
                  id="btn-choice-contradicted"
                  disabled={isVerifyingWithAi}
                  onClick={() => handleRunVerification('contradicted')}
                  className="group relative flex flex-col items-center justify-center p-4 rounded-2xl border border-red-200 dark:border-red-900/60 bg-red-50 dark:bg-red-950/40 hover:bg-red-100 dark:hover:bg-red-950/70 text-red-800 dark:text-red-300 font-bold transition-all shadow-2xs"
                >
                  <XCircle className="w-6 h-6 mb-1 text-red-600 dark:text-red-400 group-hover:scale-105 transition-transform" />
                  <span className="text-xs uppercase tracking-wider">Keliru / Kontradiktif</span>
                  <span className="text-[10px] text-red-600 dark:text-red-400 font-normal mt-0.5">Bertentangan / Hoaks</span>
                </button>
              </div>

              {isVerifyingWithAi && (
                <div className="rounded-2xl bg-[#FAF8F5] dark:bg-slate-800/80 p-6 border border-[#E5DFD2] dark:border-slate-700 flex flex-col items-center justify-center">
                  <LoadingSpinner size="md" message="Sistem memvalidasi klaim terhadap basis data rujukan resmi..." />
                </div>
              )}
            </div>
          )}

          {/* STEP 4: REASON */}
          {currentStep === 'reason' && verificationResult && (
            <div className="space-y-5">
              
              {/* AI Verifier Evaluation Box */}
              <div className="rounded-2xl bg-white dark:bg-slate-800/80 border border-[#E5DFD2] dark:border-slate-700 p-5 space-y-3 shadow-2xs">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-[#0D3B3A] dark:text-slate-100 uppercase tracking-wider flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#1E7773] dark:text-teal-400" />
                    Hasil Evaluasi Sistem Rujukan Resmi
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-[11px] font-bold text-[#637675] dark:text-slate-400">Tingkat Keyakinan Sistem:</span>
                    <span className="rounded-md bg-[#EAF6F5] dark:bg-teal-950 px-2 py-0.5 text-xs font-bold text-[#1E7773] dark:text-teal-400 border border-[#278B86] dark:border-teal-700">
                      {verificationResult.confidenceScore}%
                    </span>
                  </div>
                </div>

                <div className="p-3.5 rounded-xl bg-[#FAF8F5] dark:bg-slate-900/60 border border-[#E5DFD2] dark:border-slate-700 space-y-1.5">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs text-[#637675] dark:text-slate-400">Klasifikasi Resmi:</span>
                    <span className={`text-xs font-bold uppercase px-2 py-0.5 rounded ${
                      verificationResult.classification === 'verified' ? 'bg-[#EAF6F5] text-[#1E7773] dark:bg-teal-950 dark:text-teal-300 border border-[#278B86]' :
                      verificationResult.classification === 'contradicted' ? 'bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300 border border-red-200 dark:border-red-800' :
                      'bg-[#FAF5EE] text-[#C85A32] dark:bg-amber-950 dark:text-amber-300 border border-[#E8C4B5] dark:border-amber-800'
                    }`}>
                      {verificationResult.classification === 'verified' ? 'Terverifikasi' :
                       verificationResult.classification === 'contradicted' ? 'Keliru / Kontradiktif' : 'Belum Terverifikasi'}
                    </span>

                    <span className="text-[10px] text-[#637675] dark:text-slate-400 ml-auto">
                      Pilihan Anda: <strong className="text-[#0D3B3A] dark:text-slate-200 uppercase">{
                        playerChoice === 'verified' ? 'Terverifikasi' :
                        playerChoice === 'contradicted' ? 'Keliru' : 'Belum Terverifikasi'
                      }</strong> {playerChoice === verificationResult.classification ? '✅ (Tepat)' : '⚠️ (Perlu Evaluasi)'}
                    </span>
                  </div>

                  <p className="text-xs text-[#2A3E3D] dark:text-slate-300 leading-relaxed pt-1">
                    {verificationResult.rationale}
                  </p>
                </div>

                <div className="rounded-xl bg-[#FAF8F5] dark:bg-slate-900/60 p-3 border border-[#E5DFD2] dark:border-slate-700 text-[11px] text-[#4A5E5D] dark:text-slate-300 flex items-start gap-2">
                  <ExternalLink className="w-3.5 h-3.5 text-[#C85A32] dark:text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-[#0D3B3A] dark:text-slate-100">Rujukan Otentik: </span>
                    <span>{verificationResult.officialSource.title} — {verificationResult.officialSource.institution} ({verificationResult.officialSource.urlOrDocId})</span>
                  </div>
                </div>
              </div>

              {/* Reason Input to Train Critical Thinking */}
              <div className="rounded-2xl bg-white dark:bg-slate-800/80 border border-[#E5DFD2] dark:border-slate-700 p-5 space-y-2.5 shadow-2xs">
                <div className="flex items-center justify-between">
                  <label htmlFor="reason-input-field" className="text-xs font-bold text-[#0D3B3A] dark:text-slate-100 flex items-center gap-1.5">
                    <BookOpen className="w-3.5 h-3.5 text-[#C85A32] dark:text-amber-400" />
                    Tuliskan Alasan / Argumentasi Kritis Anda (Melatih Nalar Budaya)
                  </label>
                  <span className="text-[10px] text-[#C85A32] dark:text-amber-400 font-semibold bg-[#FAF5EE] dark:bg-amber-950/40 px-2 py-0.5 rounded border border-[#E8C4B5] dark:border-amber-900/50">+75 XP Bonus</span>
                </div>

                <p className="text-[11px] text-[#637675] dark:text-slate-400">
                  Tuliskan 1-2 kalimat mengapa klaim tersebut diklasifikasikan demikian (misalnya berdasarkan material bangunan, konteks era sejarah, atau bukti dokumen arsip).
                </p>

                <textarea
                  id="reason-input-field"
                  value={reasonInput}
                  onChange={(e) => setReasonInput(e.target.value)}
                  placeholder="Contoh: Klaim ini kontradiktif karena Percandian Muaro Jambi berbahan dasar bata merah bakar lempung lokal era Melayu Kuno abad ke-7 hingga 14 M, bukan batu andesit era Majapahit..."
                  rows={3}
                  className="w-full rounded-xl bg-[#FAF8F5] dark:bg-slate-900 border border-[#D5CEBD] dark:border-slate-700 p-3 text-xs text-[#132726] dark:text-slate-100 placeholder:text-[#9EABA9] dark:placeholder:text-slate-500 focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:outline-none leading-relaxed shadow-2xs"
                />

                <div className="pt-2 flex justify-end">
                  <button
                    id="btn-submit-reason-unlock"
                    onClick={handleFinishReasonAndUnlock}
                    className="flex items-center gap-2 rounded-xl bg-[#1E7773] hover:bg-[#165A57] px-5 py-2.5 text-xs font-bold text-white shadow-sm transition-all"
                  >
                    <Send className="w-4 h-4" />
                    <span>Kirim Argumentasi & Selesaikan Modul</span>
                  </button>
                </div>
              </div>

            </div>
          )}

          {/* STEP 5: UNLOCK */}
          {currentStep === 'unlock' && (
            <div className="space-y-6 text-center py-4">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FAF5EE] dark:bg-amber-950/40 border-2 border-[#C85A32] text-[#C85A32] dark:text-amber-400 shadow-sm">
                <Award className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-widest text-[#1E7773] dark:text-teal-400">
                  Verifikasi Berhasil Tuntas
                </span>
                <h3 className="font-serif text-xl font-bold text-[#0D3B3A] dark:text-slate-100 mt-1">
                  Pusaka Budaya Berhasil Diamankan!
                </h3>
                <p className="text-xs text-[#4A5E5D] dark:text-slate-300 mt-1 max-w-md mx-auto leading-relaxed">
                  Pengetahuan tentang <strong className="text-[#0D3B3A] dark:text-slate-100">{culturalObject.name}</strong> kini tercatat di lembar capaian Anda dan data Peta Hidup telah tersinkronkan.
                </p>
              </div>

              {/* XP & Rewards Pill */}
              <div className="flex flex-wrap items-center justify-center gap-3">
                <div className="flex items-center gap-2 rounded-xl bg-[#FAF5EE] dark:bg-amber-950/40 border border-[#E8C4B5] dark:border-amber-900/50 px-4 py-2 text-[#C85A32] dark:text-amber-400 font-bold text-xs">
                  <Award className="w-4 h-4" />
                  <span>+275 XP Diperoleh</span>
                </div>

                <div className="flex items-center gap-2 rounded-xl bg-[#EAF6F5] dark:bg-teal-950/40 border border-[#278B86] dark:border-teal-700 px-4 py-2 text-[#1E7773] dark:text-teal-400 font-bold text-xs">
                  <ShieldCheck className="w-4 h-4" />
                  <span>Peta Hidup Tersinkronisasi</span>
                </div>
              </div>

              {/* Earned Badge Alert */}
              {earnedBadge && (
                <div className="max-w-md mx-auto rounded-2xl bg-[#FAF8F5] dark:bg-slate-800/80 border border-[#E5DFD2] dark:border-slate-700 p-4 text-left flex items-center gap-3">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-[#C85A32] text-white font-bold shadow-xs">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-[10px] font-bold text-[#C85A32] dark:text-amber-400 uppercase tracking-wider block">
                      Lencana Baru Terbuka!
                    </span>
                    <h4 className="text-sm font-bold text-[#0D3B3A] dark:text-slate-100">{earnedBadge.name}</h4>
                    <p className="text-[11px] text-[#4A5E5D] dark:text-slate-300 leading-tight mt-0.5">{earnedBadge.description}</p>
                  </div>
                </div>
              )}

              {/* Share Achievement Box */}
              <div className="max-w-md mx-auto rounded-2xl bg-[#FAF6EE] dark:bg-slate-800/80 border border-[#E8C4B5] dark:border-amber-900/40 p-3.5 space-y-2.5">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-bold text-[#0D3B3A] dark:text-slate-100 flex items-center gap-1.5">
                    <Share2 className="w-3.5 h-3.5 text-[#C85A32] dark:text-amber-400" />
                    Bagikan Pencapaian Literasi Budaya
                  </span>
                  <span className="text-[10px] text-[#637675] dark:text-slate-400">#HERITEX #BudayaNusantara</span>
                </div>

                <div className="flex items-center justify-center gap-2">
                  <button
                    id="btn-share-whatsapp"
                    onClick={() => {
                      const shareText = `Saya baru saja memverifikasi cagar budaya "${culturalObject.name}" dan memperoleh lencana di HERITEX! Jelajahi warisan nusantara bersama di HERITEX.`;
                      const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(shareText)}`;
                      window.open(url, '_blank');
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-[#25D366] hover:bg-[#20bd5a] text-white text-xs font-bold transition-colors shadow-2xs"
                  >
                    <span>WhatsApp</span>
                  </button>

                  <button
                    id="btn-copy-achievement"
                    onClick={() => {
                      const text = `Saya telah memverifikasi cagar budaya "${culturalObject.name}" di HERITEX (Akurasi Terverifikasi). Ikuti petualangan budaya nusantara di HERITEX!`;
                      if (navigator.clipboard) {
                        navigator.clipboard.writeText(text);
                        setHasCopied(true);
                        setTimeout(() => setHasCopied(false), 2500);
                      }
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl bg-white dark:bg-slate-800 hover:bg-[#FAF8F5] dark:hover:bg-slate-700 border border-[#D5CEBD] dark:border-slate-600 text-[#0D3B3A] dark:text-slate-100 text-xs font-bold transition-colors shadow-2xs"
                  >
                    {hasCopied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-[#1E7773] dark:text-teal-400" />
                        <span className="text-[#1E7773] dark:text-teal-400">Tersalin!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#637675] dark:text-slate-400" />
                        <span>Salin Catatan</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  id="btn-finish-and-close"
                  onClick={onClose}
                  className="rounded-xl bg-[#C85A32] hover:bg-[#B54E27] px-6 py-2.5 text-xs font-bold text-white transition-all shadow-sm"
                >
                  Kembali Menjelajah Peta Budaya
                </button>
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

