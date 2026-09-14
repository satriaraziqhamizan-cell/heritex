import React, { useState } from 'react';
import { 
  Building2, 
  Download, 
  Filter, 
  AlertTriangle, 
  ShieldCheck, 
  FileText, 
  Printer, 
  TrendingDown, 
  TrendingUp, 
  MapPin, 
  CheckCircle2, 
  Users,
  X
} from 'lucide-react';
import { LivingMapPoint, CulturalObject, CulturalStatus } from '../types';

interface GovernmentPanelProps {
  points: LivingMapPoint[];
  culturalObjects: CulturalObject[];
}

export const GovernmentPanel: React.FC<GovernmentPanelProps> = ({
  points,
  culturalObjects
}) => {
  const [selectedRegency, setSelectedRegency] = useState<string>('all');
  const [selectedStatusFilter, setSelectedStatusFilter] = useState<CulturalStatus | 'all'>('all');
  const [showPrintReportModal, setShowPrintReportModal] = useState(false);

  const regencies = Array.from(new Set(points.map(p => p.regency)));

  const filteredPoints = points.filter(p => {
    const matchReg = selectedRegency === 'all' || p.regency === selectedRegency;
    const matchStat = selectedStatusFilter === 'all' || p.currentStatus === selectedStatusFilter;
    return matchReg && matchStat;
  });

  const criticalCount = points.filter(p => p.currentStatus === 'critical').length;
  const atRiskCount = points.filter(p => p.currentStatus === 'at_risk').length;
  const activeCount = points.filter(p => p.currentStatus === 'active').length;
  const lostCount = points.filter(p => p.currentStatus === 'lost').length;

  // Export as CSV
  const handleExportCSV = () => {
    const headers = ['Nama_Objek', 'Kategori', 'Kabupaten_Kota', 'Status_Vitalitas', 'Terakhir_Update', 'Koordinat_Lat', 'Koordinat_Long'];
    const rows = filteredPoints.map(p => [
      `"${p.name}"`,
      `"${p.category}"`,
      `"${p.regency}"`,
      `"${p.currentStatus}"`,
      `"${p.lastUpdated}"`,
      p.latitude,
      p.longitude
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `Laporan_Prioritas_Pelestarian_HERITEX_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 text-[#132726]">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold tracking-widest text-[#C85A32] uppercase">
              Dasbor Kebijakan & Pelestarian Budaya Daerah
            </span>
            <span className="rounded-md bg-[#FAF5EE] px-2 py-0.5 text-[9px] font-semibold text-[#C85A32] border border-[#E8C4B5]">
              Dinas Kebudayaan & Pemda
            </span>
          </div>
          <h1 className="font-serif text-xl sm:text-2xl font-bold text-[#0D3B3A] tracking-wide mt-0.5">
            Peta Prioritas Pelestarian Budaya (Agregat Spasial)
          </h1>
          <p className="text-xs text-[#4A5E5D] mt-0.5 max-w-2xl leading-relaxed">
            Analisis kondisi ketahanan warisan budaya daerah untuk perencanaan alokasi dana pelestarian (DAK), penerbitan Perda Adat, serta kurikulum muatan lokal.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            id="btn-export-csv"
            onClick={handleExportCSV}
            className="flex items-center gap-2 rounded-2xl bg-white hover:bg-[#FAF8F5] border border-[#E5DFD2] px-4 py-2 text-xs font-semibold text-[#2A3E3D] transition-colors shadow-2xs"
          >
            <Download className="w-4 h-4 text-[#C85A32]" />
            <span>Ekspor Data CSV</span>
          </button>

          <button
            id="btn-open-print-report"
            onClick={() => setShowPrintReportModal(true)}
            className="flex items-center gap-2 rounded-2xl bg-[#C85A32] hover:bg-[#B54E27] px-4 py-2 text-xs font-bold text-white shadow-sm transition-all"
          >
            <Printer className="w-4 h-4" />
            <span>Unduh Lembar Rekomendasi (PDF / Cetak)</span>
          </button>
        </div>
      </div>

      {/* Aggregate Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="rounded-3xl bg-white border border-red-200 p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#B3261E] flex items-center gap-1.5">
              <AlertTriangle className="w-4 h-4 text-[#B3261E]" />
              Prioritas Kritis (Mendesak)
            </span>
            <span className="font-serif text-2xl font-bold text-[#B3261E]">{criticalCount}</span>
          </div>
          <p className="text-[11px] text-[#637675] leading-relaxed">
            {Math.round((criticalCount / (points.length || 1)) * 100)}% objek budaya menghadapi ancaman kepunahan tanpa generasi penerus aktif.
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-[#E8C4B5] p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#C85A32] flex items-center gap-1.5">
              <TrendingDown className="w-4 h-4 text-[#C85A32]" />
              Waspada Degradasi (Terancam)
            </span>
            <span className="font-serif text-2xl font-bold text-[#C85A32]">{atRiskCount}</span>
          </div>
          <p className="text-[11px] text-[#637675] leading-relaxed">
            Kelangkaan bahan baku alami (kayu bulian, getah jernang) & tekanan alih fungsi lahan.
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-[#B6DFDD] p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#1E7773] flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#1E7773]" />
              Kondisi Terpelihara (Aktif)
            </span>
            <span className="font-serif text-2xl font-bold text-[#1E7773]">{activeCount}</span>
          </div>
          <p className="text-[11px] text-[#637675] leading-relaxed">
            Aktif dipraktikkan masyarakat, didukung festival, serta integrasi dalam pembelajaran sekolah.
          </p>
        </div>

        <div className="rounded-3xl bg-white border border-[#E5DFD2] p-4 space-y-1 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-[#0D3B3A] flex items-center gap-1.5">
              <Building2 className="w-4 h-4 text-[#C85A32]" />
              Cakupan Wilayah Terdata
            </span>
            <span className="font-serif text-2xl font-bold text-[#0D3B3A]">{regencies.length}</span>
          </div>
          <p className="text-[11px] text-[#637675] leading-relaxed">
            Kabupaten & kota di Provinsi Jambi dengan titik koordinat terverifikasi.
          </p>
        </div>
      </div>

      {/* Filter Options */}
      <div className="flex flex-wrap items-center justify-between gap-3 rounded-2xl bg-white border border-[#E5DFD2] p-3 shadow-2xs">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 text-xs text-[#2A3E3D]">
            <span className="font-medium text-[#637675]">Wilayah:</span>
            <select
              value={selectedRegency}
              onChange={(e) => setSelectedRegency(e.target.value)}
              className="rounded-xl bg-[#FAF8F5] border border-[#E5DFD2] px-3 py-1.5 text-xs text-[#132726] focus:outline-none"
            >
              <option value="all">Semua Kabupaten / Kota</option>
              {regencies.map(r => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2 text-xs text-[#2A3E3D]">
            <span className="font-medium text-[#637675]">Tingkat Ancaman:</span>
            <select
              value={selectedStatusFilter}
              onChange={(e) => setSelectedStatusFilter(e.target.value as CulturalStatus | 'all')}
              className="rounded-xl bg-[#FAF8F5] border border-[#E5DFD2] px-3 py-1.5 text-xs text-[#132726] focus:outline-none"
            >
              <option value="all">Semua Status</option>
              <option value="critical">🔴 Kritis (Critical)</option>
              <option value="at_risk">🟡 Terancam (At Risk)</option>
              <option value="active">🟢 Lestari (Active)</option>
              <option value="lost">⚫ Punah (Lost)</option>
            </select>
          </div>
        </div>

        <span className="text-xs text-[#637675]">
          Menampilkan {filteredPoints.length} entri prioritas
        </span>
      </div>

      {/* Aggregate Priority Table */}
      <div className="rounded-3xl bg-white border border-[#E5DFD2] overflow-hidden shadow-sm">
        <div className="p-4 border-b border-[#EFECE4] flex items-center justify-between">
          <h3 className="font-serif text-xs font-bold text-[#0D3B3A] uppercase tracking-wider">
            Matriks Rekomendasi Program Pelestarian Daerah
          </h3>
          <span className="text-[10px] text-[#C85A32] font-mono font-bold">
            SUMBER: PETA HIDUP HERITEX & BPK WILAYAH V
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-[#2A3E3D]">
            <thead className="bg-[#FAF8F5] text-[11px] font-bold text-[#637675] uppercase border-b border-[#EFECE4]">
              <tr>
                <th className="px-4 py-3">Objek Budaya</th>
                <th className="px-4 py-3">Kabupaten/Kota</th>
                <th className="px-4 py-3">Status Vitalitas</th>
                <th className="px-4 py-3">Indikator Ancaman Utama</th>
                <th className="px-4 py-3">Rekomendasi Kebijakan Pemda</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EFECE4]">
              {filteredPoints.map((pt) => {
                const fullObj = culturalObjects.find(o => o.id === pt.culturalObjectId);
                return (
                  <tr key={pt.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="px-4 py-3 font-semibold text-[#0D3B3A]">
                      {pt.name}
                      <span className="block text-[10px] text-[#637675] font-normal">{pt.category}</span>
                    </td>
                    <td className="px-4 py-3 text-[#4A5E5D]">
                      {pt.regency}
                    </td>
                    <td className="px-4 py-3">
                      <span className={`inline-block px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        pt.currentStatus === 'critical' ? 'bg-red-50 text-[#B3261E] border border-red-200' :
                        pt.currentStatus === 'at_risk' ? 'bg-[#FAF5EE] text-[#C85A32] border border-[#E8C4B5]' :
                        pt.currentStatus === 'active' ? 'bg-[#EAF6F5] text-[#1E7773] border border-[#278B86]' :
                        'bg-stone-100 text-stone-600'
                      }`}>
                        {pt.currentStatus === 'critical' ? 'Kritis' :
                         pt.currentStatus === 'at_risk' ? 'Terancam' :
                         pt.currentStatus === 'active' ? 'Lestari' : 'Punah'}
                      </span>
                    </td>
                    <td className="px-4 py-3 max-w-xs text-[11px] text-[#4A5E5D] leading-relaxed">
                      {fullObj?.threatReason || 'Perubahan gaya hidup modern serta minimnya regenerasi generasi muda.'}
                    </td>
                    <td className="px-4 py-3 max-w-sm text-[11px] text-[#2A3E3D] leading-relaxed font-normal">
                      {pt.currentStatus === 'critical' ? (
                        <span className="text-[#B3261E] font-medium">🚨 Alokasi Anggaran Revitalisasi Mendesak: Pengangkatan maestro ke muatan lokal sekolah & insentif penjaga tradisi.</span>
                      ) : pt.currentStatus === 'at_risk' ? (
                        <span className="text-[#C85A32] font-medium">⚠️ Zonasi Cagar Budaya & Perlindungan Material Alami (Peraturan Daerah / Bupati).</span>
                      ) : (
                        <span className="text-[#1E7773] font-medium">✅ Dukungan Festival Budaya Berkala & Integrasi Edu-Wisata Berkelanjutan.</span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* PRINTABLE REPORT MODAL (Executive Brief format) */}
      {showPrintReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-2xl rounded-3xl bg-white text-[#132726] p-6 sm:p-8 space-y-5 max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E5DFD2]">
            {/* Official Header */}
            <div className="border-b-2 border-[#0D3B3A] pb-4 text-center">
              <h2 className="font-serif text-base font-bold uppercase tracking-wider text-[#0D3B3A]">
                Pemerintah Daerah • Dinas Kebudayaan dan Pariwisata
              </h2>
              <p className="text-xs text-[#4A5E5D] mt-0.5">
                Laporan Ringkasan Prioritas Pelestarian Warisan Budaya Daerah (HERITEX Living Map)
              </p>
              <p className="text-[10px] text-[#637675] mt-1 font-mono">
                Tanggal Dokumen: {new Date().toLocaleDateString('id-ID', { dateStyle: 'full' })}
              </p>
            </div>

            {/* Executive Summary */}
            <div className="space-y-2 text-xs text-[#2A3E3D] leading-relaxed">
              <h3 className="font-bold text-[#0D3B3A] uppercase">1. Ringkasan Eksekutif Vitalitas Budaya</h3>
              <p>
                Berdasarkan integrasi pemantauan spasial GIS HERITEX dan verifikasi lapangan, teridentifikasi <strong>{criticalCount} objek cagar/warisan budaya</strong> berkategori <strong>KRITIS (CRITICAL)</strong> yang memerlukan intervensi kebijakan langsung untuk mencegah kepunahan transmisi pengetahuan lokal.
              </p>
            </div>

            {/* Table in Print Format */}
            <div className="space-y-2">
              <h3 className="font-bold text-xs text-[#0D3B3A] uppercase">2. Daftar Prioritas Penanganan Mendesak</h3>
              <table className="w-full text-left text-[11px] border border-[#E5DFD2]">
                <thead className="bg-[#FAF8F5] font-bold border-b border-[#E5DFD2] text-[#0D3B3A]">
                  <tr>
                    <th className="p-2 border-r border-[#E5DFD2]">Objek Budaya</th>
                    <th className="p-2 border-r border-[#E5DFD2]">Wilayah</th>
                    <th className="p-2 border-r border-[#E5DFD2]">Status</th>
                    <th className="p-2">Rekomendasi Anggaran / Aksi</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#EFECE4]">
                  {points.filter(p => p.currentStatus === 'critical' || p.currentStatus === 'at_risk').map((p) => (
                    <tr key={p.id}>
                      <td className="p-2 font-semibold border-r border-[#E5DFD2] text-[#0D3B3A]">{p.name}</td>
                      <td className="p-2 border-r border-[#E5DFD2] text-[#4A5E5D]">{p.regency}</td>
                      <td className="p-2 font-bold uppercase border-r border-[#E5DFD2] text-[#C85A32]">
                        {p.currentStatus === 'critical' ? 'Kritis' : 'Terancam'}
                      </td>
                      <td className="p-2 text-[#4A5E5D]">Pelatihan maestro di muatan lokal sekolah & program konservasi fisik cagar budaya.</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="border-t border-[#E5DFD2] pt-4 flex items-center justify-between">
              <span className="text-[10px] text-[#637675] italic">
                Dokumen resmi rekomendasi kebijakan kebudayaan (HERITEX Platform 2026)
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() => setShowPrintReportModal(false)}
                  className="rounded-xl px-4 py-2 text-xs font-semibold text-[#637675] hover:text-[#0D3B3A]"
                >
                  Tutup
                </button>
                <button
                  onClick={() => window.print()}
                  className="rounded-xl bg-[#C85A32] hover:bg-[#B54E27] text-white font-bold px-4 py-2 text-xs flex items-center gap-1.5 shadow-sm"
                >
                  <Printer className="w-3.5 h-3.5" />
                  <span>Cetak / Simpan PDF</span>
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
