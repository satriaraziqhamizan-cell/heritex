import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Filter, 
  ShieldCheck, 
  ExternalLink, 
  FileText, 
  CheckCircle2, 
  HelpCircle,
  Clock,
  Layers,
  Building,
  Tag
} from 'lucide-react';
import { CulturalObject, CulturalCategory } from '../types';

interface KnowledgeBaseViewProps {
  culturalObjects: CulturalObject[];
  onOpenObjectInGame?: (obj: CulturalObject) => void;
}

export const KnowledgeBaseView: React.FC<KnowledgeBaseViewProps> = ({
  culturalObjects,
  onOpenObjectInGame
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeDetailObj, setActiveDetailObj] = useState<CulturalObject | null>(culturalObjects[0] || null);

  const categories: CulturalCategory[] = [
    'Arsitektur & Rumah Adat',
    'Seni Pertunjukan & Tari',
    'Kriya & Tekstil',
    'Sastra Lisan & Tradisi',
    'Kuliner Tradisional',
    'Ritual & Adat Istiadat',
    'Naskah & Aksara Kuno',
    'Senjata & Pusaka'
  ];

  const filtered = culturalObjects.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.regency.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.curatedFacts.some(f => f.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesSearch;
  });

  return (
    <div className="space-y-6 text-[#132726]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest text-[#C85A32] uppercase">
              Repositori Pengetahuan Budaya Terkurasi
            </span>
            <span className="rounded-md bg-[#EAF6F5] px-2 py-0.5 text-[9px] font-semibold text-[#1E7773] border border-[#278B86]">
              Terverifikasi WBTb & BPK
            </span>
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B3A] tracking-wide mt-0.5">
            Basis Pengetahuan Warisan Budaya
          </h1>
          <p className="text-xs text-[#4A5E5D] mt-0.5 max-w-2xl leading-relaxed">
            Basis data terstruktur warisan budaya yang terkurasi dengan rujukan resmi Ditjen Kebudayaan Kemendikbudristek, Balai Pelestarian Kebudayaan (BPK) Wilayah V, serta museum daerah.
          </p>
        </div>

        {/* Search */}
        <div className="relative min-w-[260px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#637675]" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Cari cagar budaya, nama lokal, atau kata kunci..."
            className="w-full rounded-2xl bg-white border border-[#E5DFD2] pl-9 pr-4 py-2 text-xs text-[#132726] placeholder:text-[#8C9C9B] focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:outline-none shadow-2xs"
          />
        </div>
      </div>

      {/* Categories Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
        <button
          onClick={() => setSelectedCategory('all')}
          className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shadow-2xs ${
            selectedCategory === 'all' 
              ? 'bg-[#C85A32] text-white font-bold' 
              : 'bg-white border border-[#E5DFD2] text-[#4A5E5D] hover:text-[#0D3B3A]'
          }`}
        >
          Semua Kategori ({culturalObjects.length})
        </button>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors shadow-2xs ${
              selectedCategory === cat 
                ? 'bg-[#C85A32] text-white font-bold' 
                : 'bg-white border border-[#E5DFD2] text-[#4A5E5D] hover:text-[#0D3B3A]'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main 2-Column Content: Left List, Right Deep Dive Detail */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left Side: Cards List (5 Cols) */}
        <div className="lg:col-span-5 space-y-3 max-h-[75vh] overflow-y-auto pr-1">
          {filtered.map((item) => {
            const isSelected = activeDetailObj?.id === item.id;
            return (
              <button
                key={item.id}
                id={`kb-card-${item.id}`}
                onClick={() => setActiveDetailObj(item)}
                className={`w-full flex items-start gap-3 rounded-2xl p-3.5 text-left border transition-all shadow-2xs ${
                  isSelected 
                    ? 'bg-[#FAF5EE] border-[#C85A32] ring-2 ring-[#C85A32]/20 shadow-xs' 
                    : 'bg-white border-[#E5DFD2] hover:border-[#D5CEBD] hover:bg-[#FAF8F5]'
                }`}
              >
                <img 
                  src={item.thumbnail} 
                  alt={item.name} 
                  className="h-16 w-16 rounded-xl object-cover shrink-0 border border-[#E5DFD2]" 
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-1">
                    <span className="text-[10px] text-[#C85A32] font-bold uppercase tracking-wider truncate">
                      {item.category}
                    </span>
                    <span className="text-[9px] text-[#637675] shrink-0 font-mono font-medium">
                      {item.historicalEra.split('(')[0]}
                    </span>
                  </div>
                  <h3 className="font-serif text-xs font-bold text-[#0D3B3A] truncate mt-0.5">
                    {item.name}
                  </h3>
                  <p className="text-[11px] text-[#4A5E5D] line-clamp-2 mt-1 leading-relaxed">
                    {item.shortDescription}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-[10px] text-[#637675]">
                    <span>📍 {item.regency}</span>
                    <span>•</span>
                    <span className="text-[#1E7773] font-bold">{item.references.length} Rujukan Resmi</span>
                  </div>
                </div>
              </button>
            );
          })}
        </div>

        {/* Right Side: Detailed Curated Dossier (7 Cols) */}
        <div className="lg:col-span-7">
          {activeDetailObj ? (
            <div className="rounded-3xl bg-white border border-[#E5DFD2] p-6 shadow-sm space-y-5">
              
              {/* Header Hero */}
              <div className="relative h-48 w-full rounded-2xl overflow-hidden border border-[#E5DFD2] shadow-2xs">
                <img 
                  src={activeDetailObj.thumbnail} 
                  alt={activeDetailObj.name} 
                  className="h-full w-full object-cover" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0D3B3A]/90 via-[#0D3B3A]/35 to-transparent" />
                <div className="absolute bottom-3 left-4 right-4 flex items-end justify-between">
                  <div>
                    <span className="rounded-md bg-[#C85A32] px-2 py-0.5 text-[10px] font-bold text-white shadow-2xs">
                      {activeDetailObj.category}
                    </span>
                    <h2 className="font-serif text-lg sm:text-xl font-bold text-white mt-1 drop-shadow-xs">
                      {activeDetailObj.name}
                    </h2>
                    <p className="text-xs text-white/90">
                      Nama Lokal: <span className="text-white font-semibold italic">{activeDetailObj.localName || activeDetailObj.name}</span>
                    </p>
                  </div>

                  {onOpenObjectInGame && (
                    <button
                      onClick={() => onOpenObjectInGame(activeDetailObj)}
                      className="rounded-xl bg-[#C85A32] hover:bg-[#B54E27] text-white font-bold px-3 py-1.5 text-xs shadow transition-colors"
                    >
                      Jelajahi di Peta 🗺️
                    </button>
                  )}
                </div>
              </div>

              {/* Quick Spec Matrix */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
                <div className="rounded-xl bg-[#FAF8F5] p-2.5 border border-[#E5DFD2]">
                  <span className="text-[10px] text-[#637675] font-bold uppercase block">Wilayah Asal</span>
                  <span className="text-[#0D3B3A] font-semibold block mt-0.5">{activeDetailObj.regency}</span>
                </div>
                <div className="rounded-xl bg-[#FAF8F5] p-2.5 border border-[#E5DFD2]">
                  <span className="text-[10px] text-[#637675] font-bold uppercase block">Periodesasi Sejarah</span>
                  <span className="text-[#0D3B3A] font-semibold block mt-0.5">{activeDetailObj.historicalEra}</span>
                </div>
                <div className="rounded-xl bg-[#FAF8F5] p-2.5 border border-[#E5DFD2] col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-[#637675] font-bold uppercase block">Status Pelestarian</span>
                  <span className={`font-bold block mt-0.5 text-[11px] ${
                    activeDetailObj.threatLevel === 'critical' ? 'text-[#B3261E]' :
                    activeDetailObj.threatLevel === 'at_risk' ? 'text-[#C85A32]' : 'text-[#1E7773]'
                  }`}>
                    {activeDetailObj.threatLevel === 'critical' ? 'Kritis Mendesak' :
                     activeDetailObj.threatLevel === 'at_risk' ? 'Rentan / Terancam' : 'Aktif Terjaga'}
                  </span>
                </div>
              </div>

              {/* Philosophical Meaning */}
              <div className="rounded-2xl bg-[#FAF8F5] border border-[#E5DFD2] p-4 space-y-1">
                <h4 className="font-serif text-xs font-bold text-[#C85A32] uppercase tracking-wider flex items-center gap-1.5">
                  Filosofi & Nilai Kearifan Budaya
                </h4>
                <p className="text-xs text-[#2A3E3D] leading-relaxed italic border-l-3 border-[#C85A32] pl-3">
                  "{activeDetailObj.philosophicalMeaning}"
                </p>
              </div>

              {/* Curated Facts */}
              <div className="rounded-2xl bg-[#FAF8F5] p-4 border border-[#E5DFD2] space-y-2">
                <h4 className="text-xs font-bold text-[#1E7773] uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Fakta Kunci Terverifikasi (Landasan Pengetahuan Resmi)
                </h4>
                <ul className="space-y-1.5 text-xs text-[#2A3E3D]">
                  {activeDetailObj.curatedFacts.map((fact, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#C85A32] font-bold shrink-0">•</span>
                      <span className="leading-relaxed">{fact}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Claim Tests Designed for Engine */}
              <div className="rounded-2xl bg-[#FAF8F5] p-4 border border-[#E5DFD2] space-y-2.5">
                <h4 className="text-xs font-bold text-[#0D3B3A] uppercase tracking-wider flex items-center gap-1.5">
                  <HelpCircle className="w-3.5 h-3.5 text-[#C85A32]" />
                  Struktur Uji Klaim Budaya (Claim Tests)
                </h4>
                <div className="space-y-2">
                  {activeDetailObj.claimTests.map((ct) => (
                    <div key={ct.id} className="rounded-xl bg-white p-3 border border-[#E5DFD2] space-y-1 text-xs shadow-2xs">
                      <div className="flex items-center justify-between">
                        <span className={`text-[9px] font-bold uppercase px-2 py-0.5 rounded ${
                          ct.correctClassification === 'verified' ? 'bg-[#EAF6F5] text-[#1E7773] border border-[#278B86]' :
                          ct.correctClassification === 'contradicted' ? 'bg-red-50 text-[#B3261E] border border-red-200' : 
                          'bg-[#FAF5EE] text-[#C85A32] border border-[#E8C4B5]'
                        }`}>
                          {ct.correctClassification === 'verified' ? 'Terverifikasi' :
                           ct.correctClassification === 'contradicted' ? 'Kontradiktif' : 'Belum Terverifikasi'}
                        </span>
                        <span className="text-[10px] text-[#637675]">Tipe Uji: {ct.distractorType}</span>
                      </div>
                      <p className="text-[#0D3B3A] font-semibold pt-0.5">"{ct.statement}"</p>
                      <p className="text-[11px] text-[#4A5E5D] italic pt-0.5">{ct.explanation}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Verified Official Sources */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-[#637675] uppercase tracking-wider block">
                  Daftar Rujukan Resmi (Telah Diverifikasi)
                </span>
                <div className="space-y-1.5">
                  {activeDetailObj.references.map((ref) => (
                    <div key={ref.id} className="flex items-center justify-between p-2.5 rounded-xl bg-[#FAF8F5] border border-[#E5DFD2] text-xs">
                      <div>
                        <span className="font-semibold text-[#0D3B3A] block">{ref.title}</span>
                        <span className="text-[10px] text-[#637675]">{ref.institution} ({ref.year})</span>
                      </div>
                      <span className="font-mono text-[10px] bg-[#FAF5EE] px-2 py-1 rounded text-[#C85A32] border border-[#E8C4B5]">
                        {ref.urlOrDocId}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          ) : null}
        </div>

      </div>

    </div>
  );
};
