import React, { useState } from 'react';
import { 
  Users, 
  GraduationCap, 
  BookCheck, 
  Clock, 
  Calendar, 
  Plus, 
  CheckCircle2, 
  Award, 
  Search, 
  FileText, 
  TrendingUp, 
  AlertCircle,
  Download
} from 'lucide-react';
import { StudentProgressEntry, CultureAssignment } from '../../types/puzzleverse';
import { INITIAL_STUDENT_PROGRESS, INITIAL_CULTURE_ASSIGNMENTS, JAMBI_PUZZLE_WORLDS } from '../../data/puzzleverseData';

export const EducatorDashboardView: React.FC = () => {
  const [students, setStudents] = useState<StudentProgressEntry[]>(INITIAL_STUDENT_PROGRESS);
  const [assignments, setAssignments] = useState<CultureAssignment[]>(INITIAL_CULTURE_ASSIGNMENTS);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);

  // Form State for new assignment
  const [newTitle, setNewTitle] = useState<string>('');
  const [newWorldId, setNewWorldId] = useState<string>('world-1-warisan');
  const [newMinScore, setNewMinScore] = useState<number>(80);
  const [newDueDate, setNewDueDate] = useState<string>('25 September 2026');
  const [newTargetGrade, setNewTargetGrade] = useState<string>('Kelas XI SMA');
  const [newDescription, setNewDescription] = useState<string>('');

  const filteredStudents = students.filter(s => 
    s.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    s.schoolClass.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalClassAverage = Math.round(
    students.reduce((acc, curr) => acc + curr.averageScore, 0) / students.length
  );

  const totalCompletedPuzzles = students.reduce(
    (acc, curr) => acc + curr.completedPuzzlesCount, 0
  );

  const handleCreateAssignment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newAssignment: CultureAssignment = {
      id: `asg-${Date.now()}`,
      title: newTitle,
      assignedWorldId: newWorldId,
      targetLevelCount: 4,
      minimumScorePercent: newMinScore,
      dueDate: newDueDate,
      description: newDescription || 'Tuntaskan pembelajaran interaktif dan capai target nilai kelulusan kuis pemahaman budaya.',
      targetGrade: newTargetGrade,
      status: 'active'
    };

    setAssignments([newAssignment, ...assignments]);
    setShowCreateModal(false);
    setNewTitle('');
    setNewDescription('');
  };

  return (
    <div className="w-full max-w-5xl mx-auto flex flex-col gap-6">
      {/* Educator Header Banner */}
      <div className="bg-gradient-to-r from-[#0D3B3A] via-[#1E7773] to-[#2E8B87] rounded-3xl p-6 text-white shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-emerald-200 border border-white/20 text-xs font-bold mb-2">
            <GraduationCap className="w-4 h-4" />
            <span>PORTAL PENDIDIK & GURU MUATAN LOKAL</span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
            Dashboard Pembelajaran Budaya Jambi
          </h2>
          <p className="text-xs sm:text-sm text-emerald-100 max-w-xl mt-1 leading-relaxed">
            Pantau ketercapaian kompetensi literasi budaya peserta didik, pantau ketuntasan puzzle 3-lapisan (Play, Learn, Prove), dan distribusikan penugasan kurikuler.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCreateModal(true)}
          className="flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-amber-500 hover:bg-amber-600 text-neutral-950 font-bold text-xs shadow-md transition-all hover:scale-102 flex-shrink-0"
        >
          <Plus className="w-4 h-4" />
          <span>Buat Penugasan Baru</span>
        </button>
      </div>

      {/* Class Metric Highlights */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl bg-white border border-[#E8E2D5] shadow-2xs">
          <div className="flex items-center gap-2 text-[#526665] text-xs font-semibold mb-1">
            <Users className="w-4 h-4 text-[#1E7773]" />
            <span>Siswa Terdaftar</span>
          </div>
          <div className="text-2xl font-black text-[#132726]">{students.length} Siswa</div>
          <span className="text-[10px] text-emerald-700 font-medium">100% aktif pekan ini</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E8E2D5] shadow-2xs">
          <div className="flex items-center gap-2 text-[#526665] text-xs font-semibold mb-1">
            <BookCheck className="w-4 h-4 text-[#C85A32]" />
            <span>Total Puzzle Tuntas</span>
          </div>
          <div className="text-2xl font-black text-[#C85A32]">{totalCompletedPuzzles} Selesai</div>
          <span className="text-[10px] text-[#526665]">Dari 16 keping mosaik</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E8E2D5] shadow-2xs">
          <div className="flex items-center gap-2 text-[#526665] text-xs font-semibold mb-1">
            <TrendingUp className="w-4 h-4 text-emerald-600" />
            <span>Rerata Kuis Pemahaman</span>
          </div>
          <div className="text-2xl font-black text-emerald-700">{totalClassAverage}%</div>
          <span className="text-[10px] text-emerald-700 font-medium">Melampaui KKM (75%)</span>
        </div>

        <div className="p-4 rounded-2xl bg-white border border-[#E8E2D5] shadow-2xs">
          <div className="flex items-center gap-2 text-[#526665] text-xs font-semibold mb-1">
            <Award className="w-4 h-4 text-amber-600" />
            <span>Penugasan Aktif</span>
          </div>
          <div className="text-2xl font-black text-[#8B4513]">{assignments.filter(a => a.status === 'active').length} Tugas</div>
          <span className="text-[10px] text-[#526665]">Berdasarkan World 1-4</span>
        </div>
      </div>

      {/* Active Assignments Section */}
      <div className="bg-white rounded-3xl p-5 border border-[#E8E2D5] shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#C85A32]" />
            <h3 className="font-bold text-sm text-[#132726]">Daftar Penugasan Budaya Jambi (Culture Assignments)</h3>
          </div>
          <span className="text-xs text-[#526665]">{assignments.length} Penugasan Terjadwal</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {assignments.map(asg => {
            const world = JAMBI_PUZZLE_WORLDS.find(w => w.id === asg.assignedWorldId);

            return (
              <div 
                key={asg.id}
                className="p-4 rounded-2xl border border-[#E8E2D5] bg-[#FAF8F5] hover:border-[#C85A32]/60 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1.5">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-amber-100 text-[#8B4513]">
                      {world?.name || 'World Budaya'}
                    </span>
                    <span className={`text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded ${
                      asg.status === 'active' ? 'bg-emerald-100 text-emerald-800' : 'bg-neutral-200 text-neutral-600'
                    }`}>
                      {asg.status === 'active' ? 'Sedang Berjalan' : 'Draft'}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-[#132726] mb-1 leading-snug">
                    {asg.title}
                  </h4>
                  <p className="text-[11px] text-[#526665] line-clamp-2 leading-relaxed mb-3">
                    {asg.description}
                  </p>
                </div>

                <div className="border-t border-[#E8E2D5] pt-2 mt-auto text-[10px] text-[#526665] flex items-center justify-between">
                  <span>Target: Min. {asg.minimumScorePercent}%</span>
                  <span className="flex items-center gap-1 font-semibold text-[#8B4513]">
                    <Calendar className="w-3 h-3" />
                    {asg.dueDate}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Student Progress Monitoring Table */}
      <div className="bg-white rounded-3xl p-5 border border-[#E8E2D5] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
          <div>
            <h3 className="font-bold text-sm text-[#132726] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#1E7773]" />
              <span>Monitoring Aktivitas Siswa Secara Real-Time</span>
            </h3>
            <p className="text-xs text-[#526665]">
              Rekapitulasi pengerjaan puzzle visual, pemadanan makna, seloko adat, dan kuis pemahaman
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-[#8A9B9A] absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari siswa atau kelas..."
                className="pl-8 pr-3 py-1.5 rounded-xl border border-[#E8E2D5] bg-[#FAF8F5] text-xs focus:outline-hidden focus:border-[#1E7773] w-44 sm:w-56"
              />
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E8E2D5] text-[#526665] font-bold text-[11px]">
                <th className="pb-3 px-2">Nama Siswa</th>
                <th className="pb-3 px-2">Kelas</th>
                <th className="pb-3 px-2">Puzzle Selesai</th>
                <th className="pb-3 px-2">Rerata Kuis</th>
                <th className="pb-3 px-2">Waktu Belajar</th>
                <th className="pb-3 px-2">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#E8E2D5]/60">
              {filteredStudents.map(student => {
                const percent = Math.round((student.completedPuzzlesCount / student.totalPuzzles) * 100);

                return (
                  <tr key={student.id} className="hover:bg-[#FAF8F5] transition-colors">
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2.5">
                        <img 
                          src={student.avatar} 
                          alt={student.studentName} 
                          className="w-7 h-7 rounded-full object-cover ring-1 ring-[#C85A32]/40"
                        />
                        <div>
                          <span className="font-bold text-[#132726] block">
                            {student.studentName}
                          </span>
                          <span className="text-[10px] text-[#526665]">
                            Aktif: {student.lastActive}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-2 text-[#526665]">
                      {student.schoolClass}
                    </td>
                    <td className="py-3 px-2">
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-[#E8E2D5] rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-[#1E7773] rounded-full"
                            style={{ width: `${percent}%` }}
                          />
                        </div>
                        <span className="font-semibold text-[#132726]">
                          {student.completedPuzzlesCount}/{student.totalPuzzles}
                        </span>
                      </div>
                    </td>
                    <td className="py-3 px-2">
                      <span className={`font-bold px-2 py-0.5 rounded-md ${
                        student.averageScore >= 85 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : student.averageScore >= 75 
                            ? 'bg-amber-100 text-amber-800' 
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {student.averageScore}%
                      </span>
                    </td>
                    <td className="py-3 px-2 text-[#526665]">
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-[#C85A32]" />
                        {student.timeSpentMinutes} menit
                      </span>
                    </td>
                    <td className="py-3 px-2">
                      {student.status === 'completed_assignment' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3" />
                          Tuntas Sempurna
                        </span>
                      ) : student.status === 'needs_guidance' ? (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-red-700 bg-red-50 px-2 py-0.5 rounded-full border border-red-200">
                          <AlertCircle className="w-3 h-3" />
                          Perlu Bimbingan
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-[#8B4513] bg-orange-50 px-2 py-0.5 rounded-full border border-orange-200">
                          Aktif Mengerjakan
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: Create Assignment */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-fade-in">
          <div className="relative w-full max-w-lg rounded-3xl bg-[#FAF8F5] border border-[#E8E2D5] shadow-2xl p-6">
            <h3 className="text-base font-extrabold text-[#132726] mb-1">
              Buat Penugasan Budaya Jambi Baru
            </h3>
            <p className="text-xs text-[#526665] mb-4">
              Integrasikan pembelajaran game puzzle dengan RPP / Kurikulum Muatan Lokal Jambi.
            </p>

            <form onSubmit={handleCreateAssignment} className="flex flex-col gap-3 text-xs">
              <div>
                <label className="font-bold text-[#132726] block mb-1">
                  Judul Penugasan
                </label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="Contoh: Eksplorasi Rumah Kajang Lako & Candi Muaro Jambi"
                  className="w-full rounded-xl bg-white border border-[#E8E2D5] px-3 py-2 text-xs text-[#132726] focus:outline-hidden focus:border-[#1E7773]"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#132726] block mb-1">
                    Target World
                  </label>
                  <select
                    value={newWorldId}
                    onChange={(e) => setNewWorldId(e.target.value)}
                    className="w-full rounded-xl bg-white border border-[#E8E2D5] px-3 py-2 text-xs text-[#132726] focus:outline-hidden focus:border-[#1E7773]"
                  >
                    {JAMBI_PUZZLE_WORLDS.map(w => (
                      <option key={w.id} value={w.id}>
                        {w.name} ({w.subName})
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="font-bold text-[#132726] block mb-1">
                    Minimal Skor Kuis (%)
                  </label>
                  <input
                    type="number"
                    min="50"
                    max="100"
                    value={newMinScore}
                    onChange={(e) => setNewMinScore(Number(e.target.value))}
                    className="w-full rounded-xl bg-white border border-[#E8E2D5] px-3 py-2 text-xs text-[#132726] focus:outline-hidden focus:border-[#1E7773]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-[#132726] block mb-1">
                    Target Jenjang / Kelas
                  </label>
                  <input
                    type="text"
                    value={newTargetGrade}
                    onChange={(e) => setNewTargetGrade(e.target.value)}
                    className="w-full rounded-xl bg-white border border-[#E8E2D5] px-3 py-2 text-xs text-[#132726] focus:outline-hidden focus:border-[#1E7773]"
                  />
                </div>

                <div>
                  <label className="font-bold text-[#132726] block mb-1">
                    Batas Waktu (Deadline)
                  </label>
                  <input
                    type="text"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full rounded-xl bg-white border border-[#E8E2D5] px-3 py-2 text-xs text-[#132726] focus:outline-hidden focus:border-[#1E7773]"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-[#132726] block mb-1">
                  Petunjuk Tambahan untuk Siswa
                </label>
                <textarea
                  rows={2}
                  value={newDescription}
                  onChange={(e) => setNewDescription(e.target.value)}
                  placeholder="Catat poin penting dari kuis pemahaman untuk didiskusikan di kelas berikutnya."
                  className="w-full rounded-xl bg-white border border-[#E8E2D5] px-3 py-2 text-xs text-[#132726] focus:outline-hidden focus:border-[#1E7773]"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-[#E8E2D5] mt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="px-4 py-2 rounded-xl bg-white border border-[#E8E2D5] text-[#526665] font-semibold text-xs hover:bg-[#F4EFE6]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-[#1E7773] hover:bg-[#165A57] text-white font-bold text-xs shadow-xs"
                >
                  Simpan & Terbitkan
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
