import React, { useState } from 'react';
import { 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  AlertTriangle, 
  Clock, 
  Plus, 
  Edit3, 
  History, 
  FileCheck,
  Send,
  Search,
  ExternalLink,
  X
} from 'lucide-react';
import { CrowdsourceReport, CulturalObject, LivingMapPoint, CulturalCategory, CulturalStatus } from '../types';
import { VERIFICATION_AUDIT_LOGS } from '../services/aiVerifier';

interface CuratorPanelProps {
  reports: CrowdsourceReport[];
  culturalObjects: CulturalObject[];
  onApproveReport: (reportId: string, updatedStatus?: CulturalStatus) => void;
  onRejectReport: (reportId: string, curatorReason: string) => void;
  onAddNewKnowledgeObject: (newObj: CulturalObject) => void;
}

export const CuratorPanel: React.FC<CuratorPanelProps> = ({
  reports,
  culturalObjects,
  onApproveReport,
  onRejectReport,
  onAddNewKnowledgeObject
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'queue' | 'add-kb' | 'audit-logs'>('queue');
  const [rejectModalReport, setRejectModalReport] = useState<CrowdsourceReport | null>(null);
  const [rejectReason, setRejectReason] = useState('');

  // Add KB Form State
  const [newObjName, setNewObjName] = useState('');
  const [newObjCategory, setNewObjCategory] = useState<CulturalCategory>('Arsitektur & Rumah Adat');
  const [newObjRegency, setNewObjRegency] = useState('Kota Jambi');
  const [newObjDesc, setNewObjDesc] = useState('');
  const [newObjPhilosophy, setNewObjPhilosophy] = useState('');
  const [newObjEra, setNewObjEra] = useState('Abad ke-18 M');
  const [newObjRefTitle, setNewObjRefTitle] = useState('');
  const [newObjRefInst, setNewObjRefInst] = useState('');
  const [newObjRefDoc, setNewObjRefDoc] = useState('');
  const [newObjFact1, setNewObjFact1] = useState('');
  const [newObjClaimStatement, setNewObjClaimStatement] = useState('');
  const [kbAddedSuccess, setKbAddedSuccess] = useState(false);

  const pendingReports = reports.filter(r => r.reviewStatus === 'pending_curator');
  const approvedReports = reports.filter(r => r.reviewStatus === 'curator_approved' || r.reviewStatus === 'auto_approved');

  const handleCreateNewKB = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newObjName || !newObjDesc || !newObjRefTitle) return;

    const newObj: CulturalObject = {
      id: 'obj-' + Date.now(),
      name: newObjName,
      category: newObjCategory,
      worldId: 'world-jambi',
      regency: newObjRegency,
      latitude: -1.61,
      longitude: 103.61,
      mapX: 50,
      mapY: 50,
      thumbnail: 'https://images.unsplash.com/photo-1544620347-c4fd4a3d5957?w=500&auto=format&fit=crop&q=80',
      shortDescription: newObjDesc,
      fullDescription: newObjDesc + ' Didokumentasikan secara terkurasi dalam panel ahli kebudayaan.',
      philosophicalMeaning: newObjPhilosophy || 'Mengandung kearifan adat istiadat leluhur dalam menjaga keserasian sosial.',
      historicalEra: newObjEra,
      threatLevel: 'at_risk',
      references: [
        {
          id: 'ref-' + Date.now(),
          title: newObjRefTitle,
          institution: newObjRefInst || 'Lembaga Adat Melayu & BPK Jambi',
          year: 2026,
          urlOrDocId: newObjRefDoc || 'WBTb-JMB-2026',
          type: 'WBTb_Official'
        }
      ],
      curatedFacts: [
        newObjFact1 || 'Tercatat dalam inventarisasi warisan budaya lokal.',
        'Memiliki signifikansi sejarah dan nilai estetika khas Melayu.'
      ],
      claimTests: [
        {
          id: 'ct-' + Date.now(),
          statement: newObjClaimStatement || `${newObjName} merupakan warisan budaya asal ${newObjRegency}.`,
          isTrue: true,
          distractorType: 'factual',
          correctClassification: 'verified',
          explanation: 'Klaim terverifikasi sesuai rujukan terdaftar.',
          sourceReferenceId: 'ref-' + Date.now()
        }
      ],
      discovered: true
    };

    onAddNewKnowledgeObject(newObj);
    setKbAddedSuccess(true);
    setTimeout(() => setKbAddedSuccess(false), 3000);

    // Reset Form
    setNewObjName('');
    setNewObjDesc('');
    setNewObjPhilosophy('');
    setNewObjRefTitle('');
    setNewObjRefInst('');
    setNewObjRefDoc('');
    setNewObjFact1('');
    setNewObjClaimStatement('');
  };

  return (
    <div className="space-y-6 text-[#132726]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest text-[#1E7773] uppercase">
              Otoritas Ahli & Dewan Pelestari BPK
            </span>
            <span className="rounded-md bg-[#FAF5EE] px-2 py-0.5 text-[9px] font-semibold text-[#C85A32] border border-[#E8C4B5]">
              Hak Akses Kurator Aktif
            </span>
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B3A] tracking-wide mt-0.5">
            Panel Kurasi & Audit Warisan Budaya
          </h1>
          <p className="text-xs text-[#4A5E5D] mt-0.5 max-w-2xl leading-relaxed">
            Validasi laporan lapangan partisipatif dari masyarakat, audit integritas klaim sejarah, serta registrasi entri cagar budaya ke dalam basis data resmi.
          </p>
        </div>

        {/* Subtabs Navigation */}
        <div className="flex items-center gap-1.5 rounded-2xl bg-white p-1.5 border border-[#E5DFD2] shadow-2xs">
          <button
            onClick={() => setActiveSubTab('queue')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'queue' ? 'bg-[#C85A32] text-white font-bold shadow-xs' : 'text-[#637675] hover:text-[#0D3B3A]'
            }`}
          >
            <Clock className="w-3.5 h-3.5" />
            <span>Antrean Telaah ({pendingReports.length})</span>
          </button>

          <button
            onClick={() => setActiveSubTab('add-kb')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'add-kb' ? 'bg-[#C85A32] text-white font-bold shadow-xs' : 'text-[#637675] hover:text-[#0D3B3A]'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Tambah Objek Budaya</span>
          </button>

          <button
            onClick={() => setActiveSubTab('audit-logs')}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all ${
              activeSubTab === 'audit-logs' ? 'bg-[#C85A32] text-white font-bold shadow-xs' : 'text-[#637675] hover:text-[#0D3B3A]'
            }`}
          >
            <History className="w-3.5 h-3.5" />
            <span>Log Audit Validasi</span>
          </button>
        </div>
      </div>

      {/* SUBTAB 1: CROWDSOURCE QUEUE */}
      {activeSubTab === 'queue' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-serif text-sm font-bold text-[#0D3B3A] flex items-center gap-2">
              <AlertTriangle className="w-4 h-4 text-[#C85A32]" />
              Laporan Lapangan Menunggu Keputusan Kurator ({pendingReports.length})
            </h3>
            <span className="text-xs text-[#637675]">
              Total {reports.length} laporan tercatat di arsip
            </span>
          </div>

          {pendingReports.length === 0 ? (
            <div className="rounded-3xl bg-white border border-[#E5DFD2] p-8 text-center space-y-2 shadow-2xs">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-[#EAF6F5] text-[#1E7773] border border-[#278B86]">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <h4 className="font-serif text-sm font-bold text-[#0D3B3A]">Semua Laporan Telah Tuntas Ditinjau</h4>
              <p className="text-xs text-[#4A5E5D] max-w-md mx-auto leading-relaxed">
                Tidak ada laporan lapangan yang tertahan dalam antrean kurator. Sistem telah memproses data laporan berkategori sahih ke peta hidup.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4">
              {pendingReports.map((rep) => (
                <div key={rep.id} className="rounded-3xl bg-white border border-[#E5DFD2] p-5 shadow-sm space-y-4">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#EFECE4] pb-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-serif text-sm font-bold text-[#0D3B3A]">{rep.culturalObjectName}</span>
                        <span className="text-[10px] bg-[#FAF8F5] text-[#637675] border border-[#E5DFD2] px-2 py-0.5 rounded">
                          📍 {rep.regency}
                        </span>
                      </div>
                      <p className="text-[11px] text-[#637675] mt-0.5">
                        Pelapor: <strong className="text-[#0D3B3A]">{rep.userName}</strong> ({rep.userSchool || 'Umum'}) • {rep.submittedAt}
                      </p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#637675]">Status dilaporkan:</span>
                      <span className="rounded-md bg-red-50 text-[#B3261E] border border-red-300 px-2.5 py-1 text-xs font-bold uppercase">
                        {rep.observedStatus}
                      </span>
                    </div>
                  </div>

                  {/* Diagnosis Warning */}
                  <div className="rounded-2xl bg-[#FAF5EE] p-3.5 border border-[#E8C4B5] space-y-1 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-[#C85A32] flex items-center gap-1.5">
                        Hasil Evaluasi Awal Sistem (Tingkat Keyakinan {rep.aiConfidenceScore}%)
                      </span>
                      <span className="text-[10px] text-[#A64522] uppercase font-bold">
                        {rep.aiClassification}
                      </span>
                    </div>
                    <p className="text-[#4A5E5D] leading-relaxed">
                      {rep.curatorNotes}
                    </p>
                  </div>

                  {/* Observation note from user */}
                  <div className="text-xs text-[#2A3E3D] bg-[#FAF8F5] p-3 rounded-xl border border-[#E5DFD2]">
                    <span className="text-[10px] text-[#637675] font-bold uppercase block mb-1">
                      Catatan Observasi Lapangan Pelapor:
                    </span>
                    "{rep.observationNote}"
                  </div>

                  {/* Curator Decisions */}
                  <div className="flex items-center justify-end gap-2 pt-1">
                    <button
                      onClick={() => {
                        setRejectModalReport(rep);
                        setRejectReason('');
                      }}
                      className="flex items-center gap-1.5 rounded-xl bg-red-50 hover:bg-red-100 text-[#B3261E] border border-red-200 px-4 py-2 text-xs font-semibold transition-colors"
                    >
                      <XCircle className="w-4 h-4" />
                      <span>Tolak Laporan (Koreksi)</span>
                    </button>

                    <button
                      onClick={() => onApproveReport(rep.id, rep.observedStatus)}
                      className="flex items-center gap-1.5 rounded-xl bg-[#1E7773] hover:bg-[#165A57] text-white px-4 py-2 text-xs font-bold shadow-sm transition-colors"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>Setujui & Perbarui Peta Hidup</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Processed Reports History */}
          <div className="rounded-3xl bg-white border border-[#E5DFD2] p-5 space-y-3 mt-6 shadow-2xs">
            <h4 className="font-serif text-xs font-bold text-[#0D3B3A] uppercase tracking-wider">
              Laporan Yang Telah Disetujui / Terverifikasi ({approvedReports.length})
            </h4>
            <div className="space-y-2">
              {approvedReports.map((ar) => (
                <div key={ar.id} className="flex items-center justify-between p-3 rounded-xl bg-[#FAF8F5] border border-[#E5DFD2] text-xs text-[#2A3E3D]">
                  <div>
                    <span className="font-serif font-bold text-[#0D3B3A] block">{ar.culturalObjectName}</span>
                    <span className="text-[11px] text-[#637675]">Oleh {ar.userName} • {ar.submittedAt}</span>
                  </div>
                  <span className="text-[10px] bg-[#EAF6F5] text-[#1E7773] border border-[#278B86] px-2.5 py-1 rounded-md font-bold">
                    Status: {ar.observedStatus.toUpperCase()} (Telah Disetujui)
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SUBTAB 2: ADD NEW KNOWLEDGE BASE ENTRY */}
      {activeSubTab === 'add-kb' && (
        <div className="rounded-3xl bg-white border border-[#E5DFD2] p-6 shadow-sm space-y-5 max-w-3xl">
          <div>
            <h3 className="font-serif text-base font-bold text-[#0D3B3A]">
              Tambah Objek Budaya Baru ke Basis Pengetahuan Resmi
            </h3>
            <p className="text-xs text-[#4A5E5D] mt-0.5 leading-relaxed">
              Setiap entri wajib melampirkan sumber rujukan resmi (Ditjen Kebudayaan, BPK Wilayah V, atau balai pelestarian adat).
            </p>
          </div>

          {kbAddedSuccess && (
            <div className="p-4 rounded-2xl bg-[#EAF6F5] border border-[#278B86] text-[#1E7773] text-xs font-semibold">
              ✓ Berhasil menyimpan entri cagar budaya baru! Objek kini telah tercatat di Basis Pengetahuan & Peta Budaya.
            </div>
          )}

          <form onSubmit={handleCreateNewKB} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#2A3E3D] block mb-1">
                  Nama Cagar / Warisan Budaya *
                </label>
                <input
                  type="text"
                  value={newObjName}
                  onChange={(e) => setNewObjName(e.target.value)}
                  placeholder="Mis. Candi Tinggi Muaro Jambi..."
                  className="w-full rounded-xl bg-[#FAF8F5] border border-[#E5DFD2] p-2.5 text-xs text-[#132726] focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:outline-none"
                  required
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#2A3E3D] block mb-1">
                  Kategori Warisan Budaya
                </label>
                <select
                  value={newObjCategory}
                  onChange={(e) => setNewObjCategory(e.target.value as CulturalCategory)}
                  className="w-full rounded-xl bg-[#FAF8F5] border border-[#E5DFD2] p-2.5 text-xs text-[#132726] focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:outline-none"
                >
                  <option value="Arsitektur & Rumah Adat">Arsitektur & Rumah Adat</option>
                  <option value="Seni Pertunjukan & Tari">Seni Pertunjukan & Tari</option>
                  <option value="Kriya & Tekstil">Kriya & Tekstil</option>
                  <option value="Sastra Lisan & Tradisi">Sastra Lisan & Tradisi</option>
                  <option value="Kuliner Tradisional">Kuliner Tradisional</option>
                  <option value="Ritual & Adat Istiadat">Ritual & Adat Istiadat</option>
                  <option value="Naskah & Aksara Kuno">Naskah & Aksara Kuno</option>
                  <option value="Senjata & Pusaka">Senjata & Pusaka</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#2A3E3D] block mb-1">
                  Wilayah / Kabupaten
                </label>
                <input
                  type="text"
                  value={newObjRegency}
                  onChange={(e) => setNewObjRegency(e.target.value)}
                  placeholder="Kabupaten Muaro Jambi..."
                  className="w-full rounded-xl bg-[#FAF8F5] border border-[#E5DFD2] p-2.5 text-xs text-[#132726] focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:outline-none"
                />
              </div>

              <div>
                <label className="text-xs font-medium text-[#2A3E3D] block mb-1">
                  Periodesasi Era Sejarah
                </label>
                <input
                  type="text"
                  value={newObjEra}
                  onChange={(e) => setNewObjEra(e.target.value)}
                  placeholder="Abad ke-11 M (Era Melayu Kuno)..."
                  className="w-full rounded-xl bg-[#FAF8F5] border border-[#E5DFD2] p-2.5 text-xs text-[#132726] focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#2A3E3D] block mb-1">
                Deskripsi Lengkap Objek *
              </label>
              <textarea
                rows={3}
                value={newObjDesc}
                onChange={(e) => setNewObjDesc(e.target.value)}
                placeholder="Jelaskan karakteristik material, arsitektur, latar sejarah, atau fungsi sosialnya..."
                className="w-full rounded-xl bg-[#FAF8F5] border border-[#E5DFD2] p-3 text-xs text-[#132726] focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:outline-none leading-relaxed"
                required
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#2A3E3D] block mb-1">
                Makna Filosofis & Nilai Kebajikan
              </label>
              <textarea
                rows={2}
                value={newObjPhilosophy}
                onChange={(e) => setNewObjPhilosophy(e.target.value)}
                placeholder="Pesan moral adat istiadat yang terkandung di balik warisan budaya..."
                className="w-full rounded-xl bg-[#FAF8F5] border border-[#E5DFD2] p-2.5 text-xs text-[#132726] focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:outline-none leading-relaxed"
              />
            </div>

            {/* Mandatory Reference Fields */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E5DFD2] space-y-3">
              <span className="text-xs font-bold text-[#C85A32] uppercase tracking-wider block">
                Sumber Rujukan Resmi (Wajib Terverifikasi)
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="text-[11px] text-[#637675] block mb-1">Judul Dokumen / Sertifikat *</label>
                  <input
                    type="text"
                    value={newObjRefTitle}
                    onChange={(e) => setNewObjRefTitle(e.target.value)}
                    placeholder="Sertifikat WBTb Indonesia..."
                    className="w-full rounded-xl bg-white border border-[#E5DFD2] p-2 text-xs text-[#132726]"
                    required
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#637675] block mb-1">Lembaga Penerbit</label>
                  <input
                    type="text"
                    value={newObjRefInst}
                    onChange={(e) => setNewObjRefInst(e.target.value)}
                    placeholder="Kemendikbudristek / BPK Wilayah V..."
                    className="w-full rounded-xl bg-white border border-[#E5DFD2] p-2 text-xs text-[#132726]"
                  />
                </div>
                <div>
                  <label className="text-[11px] text-[#637675] block mb-1">No. Registrasi / SK</label>
                  <input
                    type="text"
                    value={newObjRefDoc}
                    onChange={(e) => setNewObjRefDoc(e.target.value)}
                    placeholder="WBTb-2026-001..."
                    className="w-full rounded-xl bg-white border border-[#E5DFD2] p-2 text-xs text-[#132726] font-mono"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#2A3E3D] block mb-1">
                Pernyataan Uji Fakta (Untuk Siklus Belajar)
              </label>
              <input
                type="text"
                value={newObjClaimStatement}
                onChange={(e) => setNewObjClaimStatement(e.target.value)}
                placeholder="Pernyataan yang akan diuji pada tahap evaluasi literasi..."
                className="w-full rounded-xl bg-[#FAF8F5] border border-[#E5DFD2] p-2.5 text-xs text-[#132726]"
              />
            </div>

            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="flex items-center gap-2 rounded-xl bg-[#C85A32] hover:bg-[#B54E27] px-6 py-2.5 text-xs font-bold text-white shadow-sm transition-all"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Simpan Objek Terkurasi</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* SUBTAB 3: AUDIT LOGS */}
      {activeSubTab === 'audit-logs' && (
        <div className="rounded-3xl bg-white border border-[#E5DFD2] p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-serif text-sm font-bold text-[#0D3B3A]">Log Audit Sistem Validasi</h3>
              <p className="text-xs text-[#4A5E5D] leading-relaxed">
                Pencatatan latensi, skor keyakinan, dan rujukan otentik dari setiap pengujian klaim budaya.
              </p>
            </div>
            <span className="text-xs text-[#C85A32] font-mono bg-[#FAF5EE] px-2.5 py-1 rounded border border-[#E8C4B5]">
              Total Catatan: {VERIFICATION_AUDIT_LOGS.length}
            </span>
          </div>

          <div className="space-y-3">
            {VERIFICATION_AUDIT_LOGS.map((log) => (
              <div key={log.id} className="rounded-2xl bg-[#FAF8F5] p-4 border border-[#E5DFD2] space-y-2 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${
                      log.classification === 'verified' ? 'bg-[#EAF6F5] text-[#1E7773] border border-[#278B86]' :
                      log.classification === 'contradicted' ? 'bg-red-50 text-[#B3261E] border border-red-300' : 
                      'bg-[#FAF5EE] text-[#C85A32] border border-[#E8C4B5]'
                    }`}>
                      {log.classification === 'verified' ? 'Terverifikasi' :
                       log.classification === 'contradicted' ? 'Kontradiktif' : 'Belum Terverifikasi'}
                    </span>
                    <span className="font-serif font-bold text-[#0D3B3A]">{log.targetObjectName}</span>
                  </div>

                  <div className="flex items-center gap-3 text-[11px] text-[#637675] font-mono">
                    <span>Keyakinan: <strong className="text-[#C85A32]">{log.confidenceScore}%</strong></span>
                    <span>Latensi: {log.latencyMs}ms</span>
                    <span>{log.timestamp}</span>
                  </div>
                </div>

                <p className="text-[#2A3E3D] font-medium italic">
                  "{log.claimText}"
                </p>

                <div className="text-[11px] text-[#637675] border-t border-[#E5DFD2] pt-2 flex items-center justify-between">
                  <span>Rujukan: {log.officialSourceTitle} ({log.officialSourceRef})</span>
                  {log.flaggedForCurator && (
                    <span className="text-[#C85A32] font-bold">Ditandai untuk Telaah Kurator ⚠️</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* REJECT MODAL */}
      {rejectModalReport && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-3xl bg-white border border-[#E5DFD2] p-6 space-y-4 shadow-2xl text-[#132726]">
            <h3 className="font-serif text-base font-bold text-[#0D3B3A]">Tolak Laporan Lapangan</h3>
            <p className="text-xs text-[#4A5E5D] leading-relaxed">
              Berikan alasan kuratorial mengapa laporan ini belum memenuhi syarat atau terindikasi kekeliruan fakta.
            </p>

            <textarea
              rows={3}
              value={rejectReason}
              onChange={(e) => setRejectReason(e.target.value)}
              placeholder="Contoh: Berdasarkan data balai cagar budaya 2026, Rumah Tuo Batin Rantau Panjang masih dalam pemugaran aktif dan terpelihara..."
              className="w-full rounded-xl bg-[#FAF8F5] border border-[#D5CEBD] p-3 text-xs text-[#132726] focus:border-[#C85A32] focus:ring-1 focus:ring-[#C85A32] focus:outline-none leading-relaxed"
            />

            <div className="flex justify-end gap-2">
              <button
                onClick={() => setRejectModalReport(null)}
                className="px-4 py-2 rounded-xl text-xs text-[#637675] hover:text-[#0D3B3A]"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  onRejectReport(rejectModalReport.id, rejectReason || 'Tidak sesuai rujukan kuratorial');
                  setRejectModalReport(null);
                }}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#B3261E] hover:bg-red-800 text-white shadow-sm transition-colors"
              >
                Konfirmasi Penolakan
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
