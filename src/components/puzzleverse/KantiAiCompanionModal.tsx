import React, { useState } from 'react';
import { Sparkles, Bot, HelpCircle, BookOpen, Lightbulb, MessageSquare, X } from 'lucide-react';
import { PuzzleLevel } from '../../types/puzzleverse';

interface KantiAiCompanionModalProps {
  isOpen: boolean;
  onClose: () => void;
  level: PuzzleLevel;
}

export const KantiAiCompanionModal: React.FC<KantiAiCompanionModalProps> = ({
  isOpen,
  onClose,
  level
}) => {
  const [activeTab, setActiveTab] = useState<'hint' | 'why' | 'ask'>('hint');
  const [userQuestion, setUserQuestion] = useState<string>('');
  const [aiAnswer, setAiAnswer] = useState<string | null>(null);
  const [isAnswering, setIsAnswering] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleAskQuestion = (preset?: string) => {
    const q = preset || userQuestion;
    if (!q.trim()) return;

    setIsAnswering(true);
    setAiAnswer(null);

    // Knowledge-grounded AI reply simulation based on curated level material
    setTimeout(() => {
      let reply = '';
      const lower = q.toLowerCase();

      if (lower.includes('kenapa') || lower.includes('mengapa') || lower.includes('penting') || lower.includes('arti')) {
        reply = `Kanti AI: "${level.title} sangat penting karena ${level.learningMaterial.philosophicalMeaning} Sebagai generasi muda penerus, memahami nilai ini membuat kita berakar kokoh pada identitas luhur sekaligus bijaksana menghadapi kemajuan teknologi."`;
      } else if (lower.includes('sejarah') || lower.includes('asal') || lower.includes('kapan')) {
        reply = `Kanti AI: "Berdasarkan arsip resmi ${level.learningMaterial.officialReference}, ${level.title} berasal dari ${level.learningMaterial.origin}. ${level.learningMaterial.historicalContext}"`;
      } else if (lower.includes('fungsi') || lower.includes('manfaat')) {
        reply = `Kanti AI: "Dalam tradisi masyarakat Jambi, objek budaya ini berfungsi sebagai: ${level.learningMaterial.culturalFunction} Intinya: ${level.learningMaterial.keyTakeaway}"`;
      } else {
        reply = `Kanti AI: "Menarik sekali pertanyaanmu tentang ${level.title}! Yang perlu kita resapi bersama adalah ${level.learningMaterial.keyTakeaway} Tetap semangat memecahkan kepingan puzzle budaya ini ya, Kanti!"`;
      }

      setAiAnswer(reply);
      setIsAnswering(false);
    }, 450);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-[#FAF8F5] border border-[#E8E2D5] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0D3B3A] to-[#1E7773] text-white p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center shadow-inner">
              <Bot className="w-6 h-6 text-emerald-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="font-extrabold text-sm sm:text-base">Kanti AI Budaya</h3>
                <span className="text-[10px] bg-emerald-400/20 text-emerald-300 font-bold px-2 py-0.5 rounded-full border border-emerald-400/30">
                  Tutor Cerdas Jambi
                </span>
              </div>
              <p className="text-[11px] text-emerald-100">
                Pendamping belajar kurasi cagar budaya Jambi & tradisi Melayu
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-[#E8E2D5] bg-white px-4 pt-2">
          <button
            type="button"
            onClick={() => setActiveTab('hint')}
            className={`flex items-center gap-1.5 pb-2.5 px-2 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'hint'
                ? 'border-[#C85A32] text-[#C85A32]'
                : 'border-transparent text-[#526665] hover:text-[#132726]'
            }`}
          >
            <Lightbulb className="w-4 h-4" />
            <span>Petunjuk Puzzle</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('why')}
            className={`flex items-center gap-1.5 pb-2.5 px-2 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'why'
                ? 'border-[#C85A32] text-[#C85A32]'
                : 'border-transparent text-[#526665] hover:text-[#132726]'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Kenapa Ini Penting?</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('ask')}
            className={`flex items-center gap-1.5 pb-2.5 px-2 text-xs font-bold border-b-2 transition-all ${
              activeTab === 'ask'
                ? 'border-[#C85A32] text-[#C85A32]'
                : 'border-transparent text-[#526665] hover:text-[#132726]'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Tanya Kanti AI</span>
          </button>
        </div>

        {/* Content Body */}
        <div className="p-5 overflow-y-auto flex-1 text-xs">
          {activeTab === 'hint' && (
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-amber-950">
                <div className="flex items-center gap-2 font-bold text-xs text-[#8B4513] mb-1.5">
                  <Sparkles className="w-4 h-4 text-[#C85A32]" />
                  <span>Petunjuk Kanti untuk Level "{level.title}":</span>
                </div>
                <p className="text-xs leading-relaxed text-[#5C2B10]">
                  {level.kantiAdvice.hint}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E2D5] text-[#526665]">
                <strong className="text-[#132726] block mb-1">Catatan Kurator:</strong>
                <p className="text-[11px] leading-relaxed">
                  Semua puzzle dirancang berdasarkan data resmi: <em>{level.learningMaterial.officialReference}</em>. Kerjakan dengan tenang dan resapi setiap kepingnya.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'why' && (
            <div className="flex flex-col gap-3">
              <div className="p-4 rounded-2xl bg-emerald-50/80 border border-emerald-200 text-emerald-950">
                <div className="flex items-center gap-2 font-bold text-xs text-[#0D3B3A] mb-1.5">
                  <Lightbulb className="w-4 h-4 text-[#1E7773]" />
                  <span>Mengapa Budaya Ini Penting Bagi Kita?</span>
                </div>
                <p className="text-xs leading-relaxed text-[#164E4D]">
                  {level.kantiAdvice.whyItMatters}
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-white border border-[#E8E2D5] text-[#132726]">
                <strong className="text-xs text-[#C85A32] block mb-1">Renungan Kanti:</strong>
                <p className="text-[11px] text-[#526665] italic leading-relaxed">
                  "{level.kantiAdvice.interactivePrompt}"
                </p>
              </div>
            </div>
          )}

          {activeTab === 'ask' && (
            <div className="flex flex-col gap-3">
              <p className="text-[#526665] text-[11px]">
                Pilih topik cepat atau ajukan pertanyaan spesifik seputar <strong>{level.title}</strong>:
              </p>

              {/* Quick Preset Buttons */}
              <div className="flex flex-wrap gap-1.5">
                <button
                  type="button"
                  onClick={() => handleAskQuestion("Mengapa budaya ini penting bagi generasi muda?")}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E2D5] hover:border-[#C85A32] text-[#132726] text-[11px] transition-colors"
                >
                  Kenapa ini penting?
                </button>
                <button
                  type="button"
                  onClick={() => handleAskQuestion("Bagaimana sejarah asalnya?")}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E2D5] hover:border-[#C85A32] text-[#132726] text-[11px] transition-colors"
                >
                  Sejarah asalnya?
                </button>
                <button
                  type="button"
                  onClick={() => handleAskQuestion("Apa fungsi dan maknanya bagi masyarakat Jambi?")}
                  className="px-2.5 py-1 rounded-lg bg-white border border-[#E8E2D5] hover:border-[#C85A32] text-[#132726] text-[11px] transition-colors"
                >
                  Fungsi & maknanya?
                </button>
              </div>

              {/* Input */}
              <div className="flex items-center gap-2 mt-2">
                <input
                  type="text"
                  value={userQuestion}
                  onChange={(e) => setUserQuestion(e.target.value)}
                  placeholder="Ketik pertanyaanmu untuk Kanti AI..."
                  className="flex-1 rounded-xl bg-white border border-[#E8E2D5] px-3 py-2 text-xs text-[#132726] focus:outline-hidden focus:border-[#1E7773]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleAskQuestion();
                  }}
                />
                <button
                  type="button"
                  onClick={() => handleAskQuestion()}
                  disabled={isAnswering || !userQuestion.trim()}
                  className="px-4 py-2 rounded-xl bg-[#1E7773] hover:bg-[#165A57] disabled:opacity-50 text-white font-bold text-xs transition-all shadow-xs"
                >
                  {isAnswering ? '...' : 'Tanya'}
                </button>
              </div>

              {/* Answer display */}
              {aiAnswer && (
                <div className="mt-3 p-3.5 rounded-2xl bg-white border border-emerald-200 text-[#132726] leading-relaxed shadow-xs animate-fade-in">
                  <div className="flex items-center gap-1.5 text-[#1E7773] font-bold text-[11px] mb-1">
                    <Bot className="w-3.5 h-3.5" />
                    <span>Jawaban Kanti AI:</span>
                  </div>
                  <p className="text-[11px] text-[#2C3E3D] whitespace-pre-line">
                    {aiAnswer}
                  </p>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t border-[#E8E2D5] bg-[#F4EFE6] px-5 py-3 flex items-center justify-between text-[11px] text-[#526665]">
          <span>Kanti AI • Knowledge Base Terkurasi Budaya Jambi</span>
          <button
            type="button"
            onClick={onClose}
            className="font-bold text-[#C85A32] hover:underline"
          >
            Kembali ke Game
          </button>
        </div>
      </div>
    </div>
  );
};
