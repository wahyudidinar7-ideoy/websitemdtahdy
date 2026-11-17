import React, { useState, useRef } from "react";
import {
  X,
  Lock,
  Plus,
  Pencil,
  Trash2,
  Save,
  Download,
  Upload,
  RotateCcw,
  LogOut,
  Building2,
  BookOpen,
  Users,
  Newspaper,
  Image as ImageIcon,
  HelpCircle,
  GraduationCap,
  ShieldCheck,
  CheckCircle2,
  Eye,
  EyeOff,
  MessageCircle,
  Settings,
} from "lucide-react";
import { useMadrasah, MadrasahPortalState, PpdbSubmission } from "../context/MadrasahContext";
import {
  AnnouncementItem,
  ClassLevel,
  FaqItem,
  GalleryPhoto,
  MADRASAH_IMAGES,
  NewsItem,
  ProgramItem,
  TeacherItem,
} from "../data/madrasahData";
import { SmartImage } from "./SmartImage";

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
}

type AdminTab =
  | "identitas"
  | "profil"
  | "program"
  | "kelas"
  | "guru"
  | "berita"
  | "galeri"
  | "ppdb"
  | "pengaturan";

const TAB_LIST: { id: AdminTab; label: string; icon: React.ReactNode }[] = [
  { id: "identitas", label: "Identitas & Hero", icon: <Building2 className="w-4 h-4" /> },
  { id: "profil", label: "Profil & Visi Misi", icon: <ShieldCheck className="w-4 h-4" /> },
  { id: "program", label: "Program Unggulan", icon: <BookOpen className="w-4 h-4" /> },
  { id: "kelas", label: "Kelas & Jadwal", icon: <GraduationCap className="w-4 h-4" /> },
  { id: "guru", label: "Guru & Kepala", icon: <Users className="w-4 h-4" /> },
  { id: "berita", label: "Berita & Info", icon: <Newspaper className="w-4 h-4" /> },
  { id: "galeri", label: "Galeri Foto", icon: <ImageIcon className="w-4 h-4" /> },
  { id: "ppdb", label: "PPDB & FAQ", icon: <HelpCircle className="w-4 h-4" /> },
  { id: "pengaturan", label: "Backup & Sandi", icon: <Settings className="w-4 h-4" /> },
];

const ImageUploadField: React.FC<{
  label: string;
  value: string;
  onChange: (val: string) => void;
}> = ({ label, value, onChange }) => {
  const fileRef = useRef<HTMLInputElement | null>(null);

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === "string") {
        onChange(reader.result);
      }
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold text-[#14532d]">{label}</label>
      <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
        <div className="w-20 h-16 rounded-xl overflow-hidden bg-[#dcfce7] border border-emerald-900/15 shrink-0">
          <SmartImage src={value} alt={label} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1 w-full space-y-2">
          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="URL / path foto..."
            className="w-full min-h-[40px] rounded-xl border border-emerald-900/20 px-3 py-2 text-xs text-[#112a1c] focus:outline-none focus:ring-2 focus:ring-[#15803d]"
          />
          <div className="flex flex-wrap items-center gap-2">
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              onChange={handleFile}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileRef.current?.click()}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#dcfce7] hover:bg-[#bbf7d0] text-[#14532d] text-xs font-semibold transition-colors cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload Foto dari Perangkat</span>
            </button>
            <select
              value=""
              onChange={(e) => {
                if (e.target.value) onChange(e.target.value);
              }}
              aria-label="Pilih foto bawaan"
              className="px-2.5 py-1.5 rounded-lg border border-emerald-900/15 bg-white text-xs text-[#14532d]"
            >
              <option value="">Atau pilih foto bawaan...</option>
              <option value={MADRASAH_IMAGES.campusHero}>Foto Gedung Madrasah</option>
              <option value={MADRASAH_IMAGES.studentsQuran}>Foto Siswa Mengaji</option>
              <option value={MADRASAH_IMAGES.classroomStudy}>Foto Belajar di Kelas</option>
              <option value={MADRASAH_IMAGES.principalPortrait}>Foto Kepala Madrasah</option>
              <option value={MADRASAH_IMAGES.hadrahActivity}>Foto Ekskul Hadrah</option>
              <option value={MADRASAH_IMAGES.competitionTrophy}>Foto Prestasi Lomba</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export const AdminPanel: React.FC<AdminPanelProps> = ({ isOpen, onClose }) => {
  const { data, updateState, resetToDefault, importState } = useMadrasah();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState("");

  const [activeTab, setActiveTab] = useState<AdminTab>("identitas");
  const [toastMsg, setToastMsg] = useState("");
  const [confirmDeleteKey, setConfirmDeleteKey] = useState<string | null>(null);
  const [confirmReset, setConfirmReset] = useState(false);

  // Edit / Create state per module
  const [editingProgram, setEditingProgram] = useState<ProgramItem | null>(null);
  const [editingClassIdx, setEditingClassIdx] = useState<number | "new" | null>(null);
  const [classDraft, setClassDraft] = useState<ClassLevel>({
    kelas: "",
    rombel: "",
    waliKelas: "",
    jumlahSiswa: 28,
    programKhusus: "",
  });

  const [editingTeacher, setEditingTeacher] = useState<TeacherItem | null>(null);
  const [editingAnnouncement, setEditingAnnouncement] = useState<AnnouncementItem | null>(null);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [editingGallery, setEditingGallery] = useState<GalleryPhoto | null>(null);
  const [editingFaqIdx, setEditingFaqIdx] = useState<number | "new" | null>(null);
  const [faqDraft, setFaqDraft] = useState<FaqItem>({ question: "", answer: "" });

  const [newPassword, setNewPassword] = useState("");
  const importFileRef = useRef<HTMLInputElement | null>(null);

  if (!isOpen) return null;

  const notify = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(""), 3000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput === data.adminPassword) {
      setIsAuthenticated(true);
      setLoginError("");
      setPasswordInput("");
    } else {
      setLoginError("Kata sandi admin salah. Silakan coba lagi.");
    }
  };

  // Login Gate
  if (!isAuthenticated) {
    return (
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="admin-login-title"
        className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4"
        onClick={onClose}
      >
        <div
          className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-emerald-900/15 space-y-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-11 h-11 rounded-2xl bg-[#14532d] text-amber-300 flex items-center justify-center shrink-0">
                <Lock className="w-5 h-5" />
              </span>
              <div>
                <h2 id="admin-login-title" className="font-display font-bold text-xl text-[#14532d]">
                  Menu Admin Madrasah
                </h2>
                <p className="text-xs text-[#4b6b56] mt-0.5">
                  Kelola konten profil, berita, guru, galeri &amp; PPDB
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={onClose}
              aria-label="Tutup panel login admin"
              className="w-9 h-9 rounded-full hover:bg-[#f4faf5] text-[#4b6b56] flex items-center justify-center cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label
                htmlFor="admin-password-input"
                className="block text-sm font-semibold text-[#14532d] mb-1.5"
              >
                Kata Sandi Admin
              </label>
              <div className="relative">
                <input
                  id="admin-password-input"
                  type={showPassword ? "text" : "password"}
                  value={passwordInput}
                  onChange={(e) => {
                    setPasswordInput(e.target.value);
                    if (loginError) setLoginError("");
                  }}
                  placeholder="Masukkan kata sandi admin..."
                  autoFocus
                  className="w-full min-h-[44px] rounded-xl border border-emerald-900/20 pl-4 pr-11 py-2.5 text-sm text-[#112a1c] focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  aria-label={showPassword ? "Sembunyikan sandi" : "Tampilkan sandi"}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4b6b56] hover:text-[#14532d] p-1 cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <p className="text-xs text-[#4b6b56] mt-1.5">
                Kata sandi awal: <code className="font-mono font-bold text-[#14532d]">admin123</code> (dapat diubah di menu Backup &amp; Sandi)
              </p>
            </div>

            {loginError && (
              <p role="alert" className="text-xs font-medium text-red-700 bg-red-50 px-3 py-2 rounded-lg">
                {loginError}
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pt-1">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2.5 rounded-full text-sm font-semibold text-[#4b6b56] hover:bg-[#f4faf5] cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#14532d] hover:bg-[#15803d] text-white text-sm font-bold transition-colors cursor-pointer"
              >
                Masuk Panel Admin
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Export & Import JSON helpers
  const handleExportJson = () => {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `data-madrasah-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
    notify("File cadangan JSON berhasil diunduh.");
  };

  const handleImportJson = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result)) as MadrasahPortalState;
        importState(parsed);
        notify("Data cadangan berhasil dipulihkan.");
      } catch {
        notify("Format file JSON tidak valid.");
      }
    };
    reader.readAsText(file);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Dashboard Admin Madrasah"
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4"
    >
      <div className="bg-[#f6fbf7] rounded-2xl w-full max-w-6xl h-[92vh] flex flex-col overflow-hidden shadow-2xl border border-emerald-900/15">
        {/* Top Admin Header */}
        <div className="bg-[#14532d] text-white px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <span className="w-9 h-9 rounded-xl bg-white/15 text-amber-300 flex items-center justify-center shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </span>
            <div className="min-w-0">
              <h2 className="font-display font-bold text-base sm:text-lg truncate">
                Menu Admin · {data.identity.namaSingkat}
              </h2>
              <p className="text-xs text-emerald-100/80 hidden sm:block">
                Setiap perubahan langsung tersimpan otomatis &amp; tampil di website
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {toastMsg && (
              <span className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-300 text-[#052e16] text-xs font-bold">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>{toastMsg}</span>
              </span>
            )}
            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-full bg-white/10 hover:bg-white/20 text-xs font-semibold transition-colors cursor-pointer"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Keluar</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#f59e0b] hover:bg-[#fbbf24] text-[#052e16] text-xs font-bold transition-colors cursor-pointer"
            >
              <X className="w-4 h-4" />
              <span>Lihat Website</span>
            </button>
          </div>
        </div>

        {/* Toast bar on mobile */}
        {toastMsg && (
          <div className="md:hidden bg-amber-300 text-[#052e16] px-4 py-2 text-xs font-bold flex items-center gap-2 shrink-0">
            <CheckCircle2 className="w-4 h-4 shrink-0" />
            <span>{toastMsg}</span>
          </div>
        )}

        {/* Body Layout: Sidebar + Content */}
        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Sidebar / Horizontal Tab Bar */}
          <aside className="lg:w-60 bg-white border-b lg:border-b-0 lg:border-r border-emerald-900/10 p-2 sm:p-3 overflow-x-auto lg:overflow-y-auto shrink-0">
            <nav className="flex lg:flex-col gap-1.5">
              {TAB_LIST.map((tab) => {
                const active = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setConfirmDeleteKey(null);
                    }}
                    className={`flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-colors cursor-pointer ${
                      active
                        ? "bg-[#14532d] text-white shadow-xs"
                        : "text-[#1e3a28] hover:bg-[#dcfce7]/60"
                    }`}
                  >
                    {tab.icon}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </aside>

          {/* Main Admin Workspace */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6">
            {/* ==================== TAB 1: IDENTITAS & HERO ==================== */}
            {activeTab === "identitas" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-900/10 shadow-xs space-y-4">
                  <h3 className="font-display font-bold text-lg text-[#14532d]">
                    Identitas &amp; Kontak Madrasah
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-[#14532d] mb-1">
                        Nama Singkat Madrasah
                      </label>
                      <input
                        type="text"
                        value={data.identity.namaSingkat}
                        onChange={(e) =>
                          updateState((prev) => ({
                            ...prev,
                            identity: { ...prev.identity, namaSingkat: e.target.value },
                          }))
                        }
                        className="w-full min-h-[40px] rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#14532d] mb-1">
                        Nama Lengkap Madrasah
                      </label>
                      <input
                        type="text"
                        value={data.identity.namaLengkap}
                        onChange={(e) =>
                          updateState((prev) => ({
                            ...prev,
                            identity: { ...prev.identity, namaLengkap: e.target.value },
                          }))
                        }
                        className="w-full min-h-[40px] rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#14532d] mb-1">
                        NSM
                      </label>
                      <input
                        type="text"
                        value={data.identity.nsm}
                        onChange={(e) =>
                          updateState((prev) => ({
                            ...prev,
                            identity: { ...prev.identity, nsm: e.target.value },
                          }))
                        }
                        className="w-full min-h-[40px] rounded-xl border border-emerald-900/20 px-3 py-2 text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#14532d] mb-1">
                        NPSN
                      </label>
                      <input
                        type="text"
                        value={data.identity.npsn}
                        onChange={(e) =>
                          updateState((prev) => ({
                            ...prev,
                            identity: { ...prev.identity, npsn: e.target.value },
                          }))
                        }
                        className="w-full min-h-[40px] rounded-xl border border-emerald-900/20 px-3 py-2 text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#14532d] mb-1">
                        Akreditasi
                      </label>
                      <input
                        type="text"
                        value={data.identity.akreditasi}
                        onChange={(e) =>
                          updateState((prev) => ({
                            ...prev,
                            identity: { ...prev.identity, akreditasi: e.target.value },
                          }))
                        }
                        className="w-full min-h-[40px] rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#14532d] mb-1">
                        Tahun Berdiri
                      </label>
                      <input
                        type="number"
                        value={data.identity.tahunBerdiri}
                        onChange={(e) =>
                          updateState((prev) => ({
                            ...prev,
                            identity: {
                              ...prev.identity,
                              tahunBerdiri: Number(e.target.value) || 1998,
                            },
                          }))
                        }
                        className="w-full min-h-[40px] rounded-xl border border-emerald-900/20 px-3 py-2 text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#14532d] mb-1">
                        No. WhatsApp (Format 628xxx untuk link wa.me)
                      </label>
                      <input
                        type="text"
                        value={data.identity.whatsappNumber}
                        onChange={(e) =>
                          updateState((prev) => ({
                            ...prev,
                            identity: { ...prev.identity, whatsappNumber: e.target.value },
                          }))
                        }
                        className="w-full min-h-[40px] rounded-xl border border-emerald-900/20 px-3 py-2 text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#14532d] mb-1">
                        Tampilan Nomor WhatsApp
                      </label>
                      <input
                        type="text"
                        value={data.identity.whatsappDisplay}
                        onChange={(e) =>
                          updateState((prev) => ({
                            ...prev,
                            identity: { ...prev.identity, whatsappDisplay: e.target.value },
                          }))
                        }
                        className="w-full min-h-[40px] rounded-xl border border-emerald-900/20 px-3 py-2 text-sm font-mono"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#14532d] mb-1">
                        Email Resmi
                      </label>
                      <input
                        type="email"
                        value={data.identity.email}
                        onChange={(e) =>
                          updateState((prev) => ({
                            ...prev,
                            identity: { ...prev.identity, email: e.target.value },
                          }))
                        }
                        className="w-full min-h-[40px] rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#14532d] mb-1">
                        Jam Layanan
                      </label>
                      <input
                        type="text"
                        value={data.identity.jamLayanan}
                        onChange={(e) =>
                          updateState((prev) => ({
                            ...prev,
                            identity: { ...prev.identity, jamLayanan: e.target.value },
                          }))
                        }
                        className="w-full min-h-[40px] rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#14532d] mb-1">
                        Instagram
                      </label>
                      <input
                        type="text"
                        value={data.identity.instagram}
                        onChange={(e) =>
                          updateState((prev) => ({
                            ...prev,
                            identity: { ...prev.identity, instagram: e.target.value },
                          }))
                        }
                        className="w-full min-h-[40px] rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#14532d] mb-1">
                        ID Video Profil YouTube
                      </label>
                      <input
                        type="text"
                        value={data.identity.videoProfilYoutubeId}
                        onChange={(e) =>
                          updateState((prev) => ({
                            ...prev,
                            identity: { ...prev.identity, videoProfilYoutubeId: e.target.value },
                          }))
                        }
                        className="w-full min-h-[40px] rounded-xl border border-emerald-900/20 px-3 py-2 text-sm font-mono"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#14532d] mb-1">
                        Alamat Lengkap
                      </label>
                      <textarea
                        rows={2}
                        value={data.identity.alamatLengkap}
                        onChange={(e) =>
                          updateState((prev) => ({
                            ...prev,
                            identity: { ...prev.identity, alamatLengkap: e.target.value },
                          }))
                        }
                        className="w-full rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#14532d] mb-1">
                        URL Embed Google Maps
                      </label>
                      <input
                        type="text"
                        value={data.identity.googleMapsEmbedUrl}
                        onChange={(e) =>
                          updateState((prev) => ({
                            ...prev,
                            identity: { ...prev.identity, googleMapsEmbedUrl: e.target.value },
                          }))
                        }
                        className="w-full min-h-[40px] rounded-xl border border-emerald-900/20 px-3 py-2 text-xs font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* Foto Hero & Statistik */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-900/10 shadow-xs space-y-5">
                  <h3 className="font-display font-bold text-lg text-[#14532d]">
                    Foto Utama Hero &amp; 4 Statistik
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <ImageUploadField
                      label="Foto Gedung / Kampus Madrasah (Hero)"
                      value={data.images.campusHero}
                      onChange={(val) =>
                        updateState((prev) => ({
                          ...prev,
                          images: { ...prev.images, campusHero: val },
                        }))
                      }
                    />
                    <ImageUploadField
                      label="Foto Siswa Mengaji (Kartu Inset Hero)"
                      value={data.images.studentsQuran}
                      onChange={(val) =>
                        updateState((prev) => ({
                          ...prev,
                          images: { ...prev.images, studentsQuran: val },
                        }))
                      }
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-2">
                    {data.heroStats.map((stat, idx) => (
                      <div key={idx} className="p-3 rounded-xl bg-[#f4faf5] border border-emerald-900/10 space-y-2">
                        <input
                          type="text"
                          value={stat.value}
                          onChange={(e) =>
                            updateState((prev) => {
                              const next = [...prev.heroStats];
                              next[idx] = { ...next[idx], value: e.target.value };
                              return { ...prev, heroStats: next };
                            })
                          }
                          placeholder="Angka"
                          className="w-full rounded-lg border border-emerald-900/15 bg-white px-2.5 py-1.5 text-sm font-bold font-mono"
                        />
                        <input
                          type="text"
                          value={stat.label}
                          onChange={(e) =>
                            updateState((prev) => {
                              const next = [...prev.heroStats];
                              next[idx] = { ...next[idx], label: e.target.value };
                              return { ...prev, heroStats: next };
                            })
                          }
                          placeholder="Label"
                          className="w-full rounded-lg border border-emerald-900/15 bg-white px-2.5 py-1.5 text-xs font-semibold"
                        />
                        <input
                          type="text"
                          value={stat.unit}
                          onChange={(e) =>
                            updateState((prev) => {
                              const next = [...prev.heroStats];
                              next[idx] = { ...next[idx], unit: e.target.value };
                              return { ...prev, heroStats: next };
                            })
                          }
                          placeholder="Keterangan"
                          className="w-full rounded-lg border border-emerald-900/15 bg-white px-2.5 py-1.5 text-xs"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ==================== TAB 2: PROFIL & VISI MISI ==================== */}
            {activeTab === "profil" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-900/10 shadow-xs space-y-4">
                  <h3 className="font-display font-bold text-lg text-[#14532d]">
                    Visi &amp; Tujuan Madrasah
                  </h3>
                  <div>
                    <label className="block text-xs font-semibold text-[#14532d] mb-1">
                      Visi Madrasah
                    </label>
                    <textarea
                      rows={3}
                      value={data.profile.visi}
                      onChange={(e) =>
                        updateState((prev) => ({
                          ...prev,
                          profile: { ...prev.profile, visi: e.target.value },
                        }))
                      }
                      className="w-full rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-[#14532d] mb-1">
                      Tujuan Madrasah
                    </label>
                    <textarea
                      rows={3}
                      value={data.profile.tujuan}
                      onChange={(e) =>
                        updateState((prev) => ({
                          ...prev,
                          profile: { ...prev.profile, tujuan: e.target.value },
                        }))
                      }
                      className="w-full rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                {/* Sejarah Paragraf */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-900/10 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-lg text-[#14532d]">
                      Sejarah Singkat (Paragraf)
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        updateState((prev) => ({
                          ...prev,
                          profile: {
                            ...prev.profile,
                            sejarah: [...prev.profile.sejarah, "Paragraf baru sejarah madrasah."],
                          },
                        }))
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#14532d] text-white text-xs font-semibold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Paragraf</span>
                    </button>
                  </div>
                  {data.profile.sejarah.map((p, idx) => (
                    <div key={idx} className="flex gap-2 items-start">
                      <textarea
                        rows={2}
                        value={p}
                        onChange={(e) =>
                          updateState((prev) => {
                            const next = [...prev.profile.sejarah];
                            next[idx] = e.target.value;
                            return { ...prev, profile: { ...prev.profile, sejarah: next } };
                          })
                        }
                        className="flex-1 rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                      {data.profile.sejarah.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            updateState((prev) => ({
                              ...prev,
                              profile: {
                                ...prev.profile,
                                sejarah: prev.profile.sejarah.filter((_, i) => i !== idx),
                              },
                            }))
                          }
                          aria-label="Hapus paragraf"
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                {/* Misi Madrasah */}
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-900/10 shadow-xs space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-lg text-[#14532d]">
                      Poin Misi Madrasah
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        updateState((prev) => ({
                          ...prev,
                          profile: {
                            ...prev.profile,
                            misi: [...prev.profile.misi, "Poin misi baru madrasah."],
                          },
                        }))
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#14532d] text-white text-xs font-semibold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Misi</span>
                    </button>
                  </div>
                  {data.profile.misi.map((m, idx) => (
                    <div key={idx} className="flex gap-2 items-center">
                      <input
                        type="text"
                        value={m}
                        onChange={(e) =>
                          updateState((prev) => {
                            const next = [...prev.profile.misi];
                            next[idx] = e.target.value;
                            return { ...prev, profile: { ...prev.profile, misi: next } };
                          })
                        }
                        className="flex-1 min-h-[40px] rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                      <button
                        type="button"
                        onClick={() =>
                          updateState((prev) => ({
                            ...prev,
                            profile: {
                              ...prev.profile,
                              misi: prev.profile.misi.filter((_, i) => i !== idx),
                            },
                          }))
                        }
                        aria-label="Hapus misi"
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg cursor-pointer"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== TAB 3: PROGRAM UNGGULAN ==================== */}
            {activeTab === "program" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-[#14532d]">
                    Daftar Program Unggulan ({data.programs.length})
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingProgram({
                        id: `prog-${Date.now()}`,
                        number: `0${data.programs.length + 1}`,
                        title: "",
                        subtitle: "",
                        description: "",
                        highlights: ["Poin unggulan 1", "Poin unggulan 2"],
                        iconName: "book-open",
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#14532d] hover:bg-[#15803d] text-white text-xs font-bold cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Program</span>
                  </button>
                </div>

                {editingProgram && (
                  <div className="bg-white rounded-2xl p-5 border-2 border-[#15803d] space-y-4">
                    <h4 className="font-display font-bold text-base text-[#14532d]">
                      {data.programs.some((p) => p.id === editingProgram.id)
                        ? "Edit Program"
                        : "Tambah Program Baru"}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-[#14532d] mb-1">
                          Nomor
                        </label>
                        <input
                          type="text"
                          value={editingProgram.number}
                          onChange={(e) =>
                            setEditingProgram({ ...editingProgram, number: e.target.value })
                          }
                          className="w-full rounded-xl border border-emerald-900/20 px-3 py-2 text-sm font-mono"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-[#14532d] mb-1">
                          Judul Program
                        </label>
                        <input
                          type="text"
                          value={editingProgram.title}
                          onChange={(e) =>
                            setEditingProgram({ ...editingProgram, title: e.target.value })
                          }
                          className="w-full rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-[#14532d] mb-1">
                          Subjudul Singkat
                        </label>
                        <input
                          type="text"
                          value={editingProgram.subtitle}
                          onChange={(e) =>
                            setEditingProgram({ ...editingProgram, subtitle: e.target.value })
                          }
                          className="w-full rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-[#14532d] mb-1">
                          Ikon
                        </label>
                        <select
                          value={editingProgram.iconName}
                          onChange={(e) =>
                            setEditingProgram({
                              ...editingProgram,
                              iconName: e.target.value as ProgramItem["iconName"],
                            })
                          }
                          className="w-full rounded-xl border border-emerald-900/20 bg-white px-3 py-2 text-sm"
                        >
                          <option value="book-open">Al-Qur&apos;an / Buku</option>
                          <option value="mosque">Masjid / Diniyah</option>
                          <option value="sparkles">Kurikulum / Kreatif</option>
                          <option value="palette">Seni / Ekskul</option>
                          <option value="heart">Karakter / Ibadah</option>
                          <option value="trophy">Prestasi / Piala</option>
                        </select>
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-xs font-semibold text-[#14532d] mb-1">
                          Deskripsi
                        </label>
                        <textarea
                          rows={2}
                          value={editingProgram.description}
                          onChange={(e) =>
                            setEditingProgram({ ...editingProgram, description: e.target.value })
                          }
                          className="w-full rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="sm:col-span-3">
                        <label className="block text-xs font-semibold text-[#14532d] mb-1">
                          Poin Highlight (pisahkan per baris)
                        </label>
                        <textarea
                          rows={3}
                          value={editingProgram.highlights.join("\n")}
                          onChange={(e) =>
                            setEditingProgram({
                              ...editingProgram,
                              highlights: e.target.value.split("\n"),
                            })
                          }
                          className="w-full rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingProgram(null)}
                        className="px-4 py-2 rounded-full text-xs font-semibold text-[#4b6b56] hover:bg-[#f4faf5] cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!editingProgram.title.trim()) return;
                          const cleaned = {
                            ...editingProgram,
                            highlights: editingProgram.highlights
                              .map((h) => h.trim())
                              .filter(Boolean),
                          };
                          updateState((prev) => {
                            const exists = prev.programs.some((p) => p.id === cleaned.id);
                            return {
                              ...prev,
                              programs: exists
                                ? prev.programs.map((p) => (p.id === cleaned.id ? cleaned : p))
                                : [...prev.programs, cleaned],
                            };
                          });
                          setEditingProgram(null);
                          notify("Program berhasil disimpan.");
                        }}
                        className="inline-flex items-center gap-1.5 px-5 py-2 rounded-full bg-[#14532d] text-white text-xs font-bold cursor-pointer"
                      >
                        <Save className="w-3.5 h-3.5" />
                        <span>Simpan Program</span>
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.programs.map((prog) => (
                    <div
                      key={prog.id}
                      className="bg-white rounded-2xl p-4 border border-emerald-900/10 flex flex-col justify-between gap-3"
                    >
                      <div>
                        <span className="font-mono text-xs font-bold text-[#15803d]">
                          {prog.number}
                        </span>
                        <h4 className="font-display font-bold text-base text-[#14532d]">
                          {prog.title}
                        </h4>
                        <p className="text-xs text-[#4b6b56] mt-0.5">{prog.subtitle}</p>
                      </div>
                      <div className="flex items-center justify-end gap-2 pt-2 border-t border-emerald-900/10">
                        <button
                          type="button"
                          onClick={() => setEditingProgram(prog)}
                          className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#dcfce7] text-[#14532d] text-xs font-semibold cursor-pointer"
                        >
                          <Pencil className="w-3.5 h-3.5" />
                          <span>Edit</span>
                        </button>
                        {confirmDeleteKey === prog.id ? (
                          <button
                            type="button"
                            onClick={() => {
                              updateState((prev) => ({
                                ...prev,
                                programs: prev.programs.filter((p) => p.id !== prog.id),
                              }));
                              setConfirmDeleteKey(null);
                              notify("Program dihapus.");
                            }}
                            className="px-3 py-1.5 rounded-lg bg-red-600 text-white text-xs font-bold cursor-pointer"
                          >
                            Yakin Hapus?
                          </button>
                        ) : (
                          <button
                            type="button"
                            onClick={() => setConfirmDeleteKey(prog.id)}
                            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-semibold cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                            <span>Hapus</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== TAB 4: KELAS & JAM BELAJAR ==================== */}
            {activeTab === "kelas" && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-[#14532d]">
                    Jenjang &amp; Rombongan Belajar ({data.classLevels.length})
                  </h3>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingClassIdx("new");
                      setClassDraft({
                        kelas: `Kelas ${data.classLevels.length + 1}`,
                        rombel: "3 Rombel",
                        waliKelas: "",
                        jumlahSiswa: 28,
                        programKhusus: "",
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#14532d] text-white text-xs font-bold cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Kelas</span>
                  </button>
                </div>

                {editingClassIdx !== null && (
                  <div className="bg-white rounded-2xl p-5 border-2 border-[#15803d] space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={classDraft.kelas}
                        onChange={(e) => setClassDraft({ ...classDraft, kelas: e.target.value })}
                        placeholder="Contoh: Kelas 1"
                        className="rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        value={classDraft.rombel}
                        onChange={(e) => setClassDraft({ ...classDraft, rombel: e.target.value })}
                        placeholder="Rombel (mis: 3 Rombel)"
                        className="rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        value={classDraft.waliKelas}
                        onChange={(e) =>
                          setClassDraft({ ...classDraft, waliKelas: e.target.value })
                        }
                        placeholder="Nama Wali Kelas"
                        className="rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                      <input
                        type="number"
                        value={classDraft.jumlahSiswa}
                        onChange={(e) =>
                          setClassDraft({
                            ...classDraft,
                            jumlahSiswa: Number(e.target.value) || 0,
                          })
                        }
                        placeholder="Jumlah Siswa"
                        className="rounded-xl border border-emerald-900/20 px-3 py-2 text-sm font-mono"
                      />
                      <textarea
                        rows={2}
                        value={classDraft.programKhusus}
                        onChange={(e) =>
                          setClassDraft({ ...classDraft, programKhusus: e.target.value })
                        }
                        placeholder="Program khusus kelas..."
                        className="sm:col-span-2 rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingClassIdx(null)}
                        className="px-4 py-2 rounded-full text-xs font-semibold text-[#4b6b56] cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!classDraft.kelas.trim()) return;
                          updateState((prev) => {
                            const next = [...prev.classLevels];
                            if (editingClassIdx === "new") {
                              next.push(classDraft);
                            } else {
                              next[editingClassIdx] = classDraft;
                            }
                            return { ...prev, classLevels: next };
                          });
                          setEditingClassIdx(null);
                          notify("Data kelas berhasil disimpan.");
                        }}
                        className="px-5 py-2 rounded-full bg-[#14532d] text-white text-xs font-bold cursor-pointer"
                      >
                        Simpan Kelas
                      </button>
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  {data.classLevels.map((cls, idx) => (
                    <div
                      key={idx}
                      className="bg-white rounded-2xl p-4 border border-emerald-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div>
                        <h4 className="font-display font-bold text-base text-[#14532d]">
                          {cls.kelas} · <span className="font-mono">{cls.jumlahSiswa} siswa</span>
                        </h4>
                        <p className="text-xs text-[#4b6b56]">
                          {cls.rombel} · Wali: {cls.waliKelas}
                        </p>
                        <p className="text-xs text-[#2c4435] mt-1">{cls.programKhusus}</p>
                      </div>
                      <div className="flex items-center gap-2 shrink-0">
                        <button
                          type="button"
                          onClick={() => {
                            setEditingClassIdx(idx);
                            setClassDraft(cls);
                          }}
                          className="px-3 py-1.5 rounded-lg bg-[#dcfce7] text-[#14532d] text-xs font-semibold cursor-pointer"
                        >
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            updateState((prev) => ({
                              ...prev,
                              classLevels: prev.classLevels.filter((_, i) => i !== idx),
                            }));
                            notify("Kelas dihapus.");
                          }}
                          className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-xs font-semibold cursor-pointer"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Jam Belajar */}
                <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 space-y-3">
                  <h4 className="font-display font-bold text-base text-[#14532d]">
                    Jam Belajar Siswa
                  </h4>
                  {data.studyHours.map((sh, idx) => (
                    <div key={idx} className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                      <input
                        type="text"
                        value={sh.hari}
                        onChange={(e) =>
                          updateState((prev) => {
                            const next = [...prev.studyHours];
                            next[idx] = { ...next[idx], hari: e.target.value };
                            return { ...prev, studyHours: next };
                          })
                        }
                        className="rounded-xl border border-emerald-900/20 px-3 py-2 text-xs font-semibold"
                      />
                      <input
                        type="text"
                        value={sh.waktu}
                        onChange={(e) =>
                          updateState((prev) => {
                            const next = [...prev.studyHours];
                            next[idx] = { ...next[idx], waktu: e.target.value };
                            return { ...prev, studyHours: next };
                          })
                        }
                        className="rounded-xl border border-emerald-900/20 px-3 py-2 text-xs font-mono"
                      />
                      <input
                        type="text"
                        value={sh.keterangan}
                        onChange={(e) =>
                          updateState((prev) => {
                            const next = [...prev.studyHours];
                            next[idx] = { ...next[idx], keterangan: e.target.value };
                            return { ...prev, studyHours: next };
                          })
                        }
                        className="rounded-xl border border-emerald-900/20 px-3 py-2 text-xs"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== TAB 5: GURU & KEPALA ==================== */}
            {activeTab === "guru" && (
              <div className="space-y-6">
                {/* Sambutan Kepala Madrasah */}
                <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 space-y-4">
                  <h3 className="font-display font-bold text-lg text-[#14532d]">
                    Sambutan Kepala Madrasah
                  </h3>
                  <ImageUploadField
                    label="Foto Kepala Madrasah"
                    value={data.images.principalPortrait}
                    onChange={(val) =>
                      updateState((prev) => ({
                        ...prev,
                        images: { ...prev.images, principalPortrait: val },
                      }))
                    }
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      value={data.principalMessage.nama}
                      onChange={(e) =>
                        updateState((prev) => ({
                          ...prev,
                          principalMessage: { ...prev.principalMessage, nama: e.target.value },
                        }))
                      }
                      placeholder="Nama Kepala Madrasah"
                      className="rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                    />
                    <input
                      type="text"
                      value={data.principalMessage.jabatan}
                      onChange={(e) =>
                        updateState((prev) => ({
                          ...prev,
                          principalMessage: { ...prev.principalMessage, jabatan: e.target.value },
                        }))
                      }
                      placeholder="Jabatan"
                      className="rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                    />
                    <textarea
                      rows={3}
                      value={data.principalMessage.quote}
                      onChange={(e) =>
                        updateState((prev) => ({
                          ...prev,
                          principalMessage: { ...prev.principalMessage, quote: e.target.value },
                        }))
                      }
                      placeholder="Isi sambutan..."
                      className="sm:col-span-2 rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                    />
                  </div>
                </div>

                {/* Daftar Guru */}
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-[#14532d]">
                    Guru &amp; Tenaga Kependidikan ({data.teachers.length})
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingTeacher({
                        id: `t-${Date.now()}`,
                        nama: "",
                        jabatan: "",
                        pendidikan: "S1 Pendidikan Islam",
                        bidang: "",
                        foto: MADRASAH_IMAGES.classroomStudy,
                        inisial: "GR",
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#14532d] text-white text-xs font-bold cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Guru</span>
                  </button>
                </div>

                {editingTeacher && (
                  <div className="bg-white rounded-2xl p-5 border-2 border-[#15803d] space-y-4">
                    <h4 className="font-display font-bold text-base text-[#14532d]">
                      {data.teachers.some((t) => t.id === editingTeacher.id)
                        ? "Edit Data Guru"
                        : "Tambah Guru Baru"}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <input
                        type="text"
                        value={editingTeacher.nama}
                        onChange={(e) =>
                          setEditingTeacher({ ...editingTeacher, nama: e.target.value })
                        }
                        placeholder="Nama lengkap & gelar"
                        className="rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        value={editingTeacher.jabatan}
                        onChange={(e) =>
                          setEditingTeacher({ ...editingTeacher, jabatan: e.target.value })
                        }
                        placeholder="Jabatan (mis: Guru Tahfidz)"
                        className="rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        value={editingTeacher.pendidikan}
                        onChange={(e) =>
                          setEditingTeacher({ ...editingTeacher, pendidikan: e.target.value })
                        }
                        placeholder="Pendidikan terakhir"
                        className="rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        value={editingTeacher.bidang}
                        onChange={(e) =>
                          setEditingTeacher({ ...editingTeacher, bidang: e.target.value })
                        }
                        placeholder="Bidang ajar / tugas"
                        className="rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                      <div className="sm:col-span-2">
                        <ImageUploadField
                          label="Foto Guru"
                          value={editingTeacher.foto}
                          onChange={(val) =>
                            setEditingTeacher({ ...editingTeacher, foto: val })
                          }
                        />
                      </div>
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingTeacher(null)}
                        className="px-4 py-2 rounded-full text-xs font-semibold text-[#4b6b56] cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!editingTeacher.nama.trim()) return;
                          updateState((prev) => {
                            const exists = prev.teachers.some((t) => t.id === editingTeacher.id);
                            return {
                              ...prev,
                              teachers: exists
                                ? prev.teachers.map((t) =>
                                    t.id === editingTeacher.id ? editingTeacher : t
                                  )
                                : [...prev.teachers, editingTeacher],
                            };
                          });
                          setEditingTeacher(null);
                          notify("Data guru berhasil disimpan.");
                        }}
                        className="px-5 py-2 rounded-full bg-[#14532d] text-white text-xs font-bold cursor-pointer"
                      >
                        Simpan Guru
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.teachers.map((teacher) => (
                    <div
                      key={teacher.id}
                      className="bg-white rounded-2xl p-4 border border-emerald-900/10 flex items-center gap-4"
                    >
                      <div className="w-16 h-16 rounded-xl overflow-hidden bg-[#dcfce7] shrink-0">
                        <SmartImage
                          src={teacher.foto}
                          alt={teacher.nama}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-display font-bold text-sm text-[#14532d] truncate">
                          {teacher.nama}
                        </h4>
                        <p className="text-xs text-[#15803d] font-medium truncate">
                          {teacher.jabatan}
                        </p>
                        <p className="text-xs text-[#4b6b56] truncate">{teacher.pendidikan}</p>
                        <div className="flex gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => setEditingTeacher(teacher)}
                            className="px-2.5 py-1 rounded-md bg-[#dcfce7] text-[#14532d] text-xs font-semibold cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              updateState((prev) => ({
                                ...prev,
                                teachers: prev.teachers.filter((t) => t.id !== teacher.id),
                              }));
                              notify("Guru dihapus.");
                            }}
                            className="px-2.5 py-1 rounded-md bg-red-50 text-red-700 text-xs font-semibold cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== TAB 6: BERITA & PENGUMUMAN ==================== */}
            {activeTab === "berita" && (
              <div className="space-y-6">
                {/* Pengumuman Penting */}
                <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-lg text-[#14532d]">
                      Pengumuman Penting ({data.announcements.length})
                    </h3>
                    <button
                      type="button"
                      onClick={() =>
                        setEditingAnnouncement({
                          id: `ann-${Date.now()}`,
                          title: "",
                          date: new Date().toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric",
                          }),
                          summary: "",
                          tag: "Penting",
                        })
                      }
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#14532d] text-white text-xs font-bold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah Pengumuman</span>
                    </button>
                  </div>

                  {editingAnnouncement && (
                    <div className="p-4 rounded-xl border-2 border-[#15803d] bg-[#f4faf5] space-y-3">
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <input
                          type="text"
                          value={editingAnnouncement.title}
                          onChange={(e) =>
                            setEditingAnnouncement({
                              ...editingAnnouncement,
                              title: e.target.value,
                            })
                          }
                          placeholder="Judul pengumuman..."
                          className="sm:col-span-2 rounded-lg border border-emerald-900/20 bg-white px-3 py-2 text-sm"
                        />
                        <input
                          type="text"
                          value={editingAnnouncement.date}
                          onChange={(e) =>
                            setEditingAnnouncement({ ...editingAnnouncement, date: e.target.value })
                          }
                          placeholder="Tanggal"
                          className="rounded-lg border border-emerald-900/20 bg-white px-3 py-2 text-sm"
                        />
                        <textarea
                          rows={2}
                          value={editingAnnouncement.summary}
                          onChange={(e) =>
                            setEditingAnnouncement({
                              ...editingAnnouncement,
                              summary: e.target.value,
                            })
                          }
                          placeholder="Ringkasan pengumuman..."
                          className="sm:col-span-3 rounded-lg border border-emerald-900/20 bg-white px-3 py-2 text-sm"
                        />
                      </div>
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingAnnouncement(null)}
                          className="px-3 py-1.5 text-xs font-semibold text-[#4b6b56] cursor-pointer"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!editingAnnouncement.title.trim()) return;
                            updateState((prev) => {
                              const exists = prev.announcements.some(
                                (a) => a.id === editingAnnouncement.id
                              );
                              return {
                                ...prev,
                                announcements: exists
                                  ? prev.announcements.map((a) =>
                                      a.id === editingAnnouncement.id ? editingAnnouncement : a
                                    )
                                  : [editingAnnouncement, ...prev.announcements],
                              };
                            });
                            setEditingAnnouncement(null);
                            notify("Pengumuman disimpan.");
                          }}
                          className="px-4 py-1.5 rounded-full bg-[#14532d] text-white text-xs font-bold cursor-pointer"
                        >
                          Simpan
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2.5">
                    {data.announcements.map((ann) => (
                      <div
                        key={ann.id}
                        className="p-3.5 rounded-xl bg-[#f4faf5] border border-emerald-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <p className="font-semibold text-sm text-[#14532d]">{ann.title}</p>
                          <p className="text-xs text-[#4b6b56]">{ann.date}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => setEditingAnnouncement(ann)}
                            className="px-3 py-1 rounded-md bg-white border border-emerald-900/15 text-[#14532d] text-xs font-semibold cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              updateState((prev) => ({
                                ...prev,
                                announcements: prev.announcements.filter((a) => a.id !== ann.id),
                              }));
                              notify("Pengumuman dihapus.");
                            }}
                            className="px-3 py-1 rounded-md bg-red-50 text-red-700 text-xs font-semibold cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Daftar Berita */}
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-[#14532d]">
                    Daftar Berita Madrasah ({data.news.length})
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingNews({
                        id: `news-${Date.now()}`,
                        title: "",
                        date: new Date().toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        }),
                        category: "Kegiatan",
                        author: "Humas Madrasah",
                        image: MADRASAH_IMAGES.campusHero,
                        summary: "",
                        content: [""],
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#14532d] text-white text-xs font-bold cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Berita</span>
                  </button>
                </div>

                {editingNews && (
                  <div className="bg-white rounded-2xl p-5 border-2 border-[#15803d] space-y-4">
                    <h4 className="font-display font-bold text-base text-[#14532d]">
                      {data.news.some((n) => n.id === editingNews.id)
                        ? "Edit Berita"
                        : "Tambah Berita Baru"}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={editingNews.title}
                        onChange={(e) => setEditingNews({ ...editingNews, title: e.target.value })}
                        placeholder="Judul berita..."
                        className="sm:col-span-3 rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        value={editingNews.category}
                        onChange={(e) =>
                          setEditingNews({ ...editingNews, category: e.target.value })
                        }
                        placeholder="Kategori (mis: Prestasi)"
                        className="rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        value={editingNews.date}
                        onChange={(e) => setEditingNews({ ...editingNews, date: e.target.value })}
                        placeholder="Tanggal"
                        className="rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                      <input
                        type="text"
                        value={editingNews.author}
                        onChange={(e) => setEditingNews({ ...editingNews, author: e.target.value })}
                        placeholder="Penulis"
                        className="rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                      <div className="sm:col-span-3">
                        <ImageUploadField
                          label="Foto Berita"
                          value={editingNews.image}
                          onChange={(val) => setEditingNews({ ...editingNews, image: val })}
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={editingNews.summary}
                        onChange={(e) =>
                          setEditingNews({ ...editingNews, summary: e.target.value })
                        }
                        placeholder="Ringkasan 2 kalimat..."
                        className="sm:col-span-3 rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                      <textarea
                        rows={4}
                        value={editingNews.content.join("\n\n")}
                        onChange={(e) =>
                          setEditingNews({
                            ...editingNews,
                            content: e.target.value.split(/\n\s*\n/),
                          })
                        }
                        placeholder="Isi artikel lengkap (pisahkan paragraf dengan baris kosong)..."
                        className="sm:col-span-3 rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingNews(null)}
                        className="px-4 py-2 rounded-full text-xs font-semibold text-[#4b6b56] cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!editingNews.title.trim()) return;
                          const cleaned: NewsItem = {
                            ...editingNews,
                            content: editingNews.content.map((c) => c.trim()).filter(Boolean),
                          };
                          updateState((prev) => {
                            const exists = prev.news.some((n) => n.id === cleaned.id);
                            return {
                              ...prev,
                              news: exists
                                ? prev.news.map((n) => (n.id === cleaned.id ? cleaned : n))
                                : [cleaned, ...prev.news],
                            };
                          });
                          setEditingNews(null);
                          notify("Berita berhasil disimpan.");
                        }}
                        className="px-5 py-2 rounded-full bg-[#14532d] text-white text-xs font-bold cursor-pointer"
                      >
                        Simpan Berita
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {data.news.map((item) => (
                    <div
                      key={item.id}
                      className="bg-white rounded-2xl p-4 border border-emerald-900/10 flex gap-3.5"
                    >
                      <div className="w-20 h-20 rounded-xl overflow-hidden bg-[#dcfce7] shrink-0">
                        <SmartImage
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <span className="text-[11px] font-semibold text-[#15803d]">
                          {item.category} · {item.date}
                        </span>
                        <h4 className="font-display font-bold text-sm text-[#14532d] line-clamp-2 mt-0.5">
                          {item.title}
                        </h4>
                        <div className="flex gap-2 mt-2">
                          <button
                            type="button"
                            onClick={() => setEditingNews(item)}
                            className="px-2.5 py-1 rounded-md bg-[#dcfce7] text-[#14532d] text-xs font-semibold cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              updateState((prev) => ({
                                ...prev,
                                news: prev.news.filter((n) => n.id !== item.id),
                              }));
                              notify("Berita dihapus.");
                            }}
                            className="px-2.5 py-1 rounded-md bg-red-50 text-red-700 text-xs font-semibold cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== TAB 7: GALERI FOTO ==================== */}
            {activeTab === "galeri" && (
              <div className="space-y-5">
                <div className="flex items-center justify-between">
                  <h3 className="font-display font-bold text-lg text-[#14532d]">
                    Foto Galeri ({data.gallery.length})
                  </h3>
                  <button
                    type="button"
                    onClick={() =>
                      setEditingGallery({
                        id: `gal-${Date.now()}`,
                        title: "",
                        category: "Belajar",
                        caption: "",
                        image: MADRASAH_IMAGES.classroomStudy,
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#14532d] text-white text-xs font-bold cursor-pointer"
                  >
                    <Plus className="w-4 h-4" />
                    <span>Tambah Foto</span>
                  </button>
                </div>

                {editingGallery && (
                  <div className="bg-white rounded-2xl p-5 border-2 border-[#15803d] space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <input
                        type="text"
                        value={editingGallery.title}
                        onChange={(e) =>
                          setEditingGallery({ ...editingGallery, title: e.target.value })
                        }
                        placeholder="Judul foto..."
                        className="sm:col-span-2 rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                      <select
                        value={editingGallery.category}
                        onChange={(e) =>
                          setEditingGallery({
                            ...editingGallery,
                            category: e.target.value as GalleryPhoto["category"],
                          })
                        }
                        className="rounded-xl border border-emerald-900/20 bg-white px-3 py-2 text-sm"
                      >
                        <option value="Belajar">Belajar</option>
                        <option value="Tahfidz">Tahfidz</option>
                        <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                        <option value="Lomba">Lomba</option>
                      </select>
                      <div className="sm:col-span-3">
                        <ImageUploadField
                          label="File / URL Foto Galeri"
                          value={editingGallery.image}
                          onChange={(val) => setEditingGallery({ ...editingGallery, image: val })}
                        />
                      </div>
                      <textarea
                        rows={2}
                        value={editingGallery.caption}
                        onChange={(e) =>
                          setEditingGallery({ ...editingGallery, caption: e.target.value })
                        }
                        placeholder="Deskripsi singkat foto..."
                        className="sm:col-span-3 rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <button
                        type="button"
                        onClick={() => setEditingGallery(null)}
                        className="px-4 py-2 rounded-full text-xs font-semibold text-[#4b6b56] cursor-pointer"
                      >
                        Batal
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (!editingGallery.title.trim()) return;
                          updateState((prev) => {
                            const exists = prev.gallery.some((g) => g.id === editingGallery.id);
                            return {
                              ...prev,
                              gallery: exists
                                ? prev.gallery.map((g) =>
                                    g.id === editingGallery.id ? editingGallery : g
                                  )
                                : [editingGallery, ...prev.gallery],
                            };
                          });
                          setEditingGallery(null);
                          notify("Foto galeri disimpan.");
                        }}
                        className="px-5 py-2 rounded-full bg-[#14532d] text-white text-xs font-bold cursor-pointer"
                      >
                        Simpan Foto
                      </button>
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {data.gallery.map((photo) => (
                    <div
                      key={photo.id}
                      className="bg-white rounded-2xl overflow-hidden border border-emerald-900/10 flex flex-col"
                    >
                      <div className="aspect-[4/3] bg-[#dcfce7]">
                        <SmartImage
                          src={photo.image}
                          alt={photo.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4 flex-1 flex flex-col justify-between">
                        <div>
                          <span className="text-[11px] font-semibold text-[#15803d]">
                            {photo.category}
                          </span>
                          <h4 className="font-display font-bold text-sm text-[#14532d] mt-0.5">
                            {photo.title}
                          </h4>
                        </div>
                        <div className="flex gap-2 mt-3 pt-2 border-t border-emerald-900/10">
                          <button
                            type="button"
                            onClick={() => setEditingGallery(photo)}
                            className="px-2.5 py-1 rounded-md bg-[#dcfce7] text-[#14532d] text-xs font-semibold cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              updateState((prev) => ({
                                ...prev,
                                gallery: prev.gallery.filter((g) => g.id !== photo.id),
                              }));
                              notify("Foto dihapus dari galeri.");
                            }}
                            className="px-2.5 py-1 rounded-md bg-red-50 text-red-700 text-xs font-semibold cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* ==================== TAB 8: PPDB & FAQ ==================== */}
            {activeTab === "ppdb" && (
              <div className="space-y-6">
                {/* Pendaftar PPDB Masuk */}
                <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-display font-bold text-lg text-[#14532d]">
                        Data Pendaftar PPDB Online ({data.ppdbSubmissions.length})
                      </h3>
                      <p className="text-xs text-[#4b6b56]">
                        Calon siswa yang mengisi formulir PPDB di website otomatis tercatat di sini.
                      </p>
                    </div>
                  </div>

                  {data.ppdbSubmissions.length === 0 ? (
                    <div className="p-6 rounded-xl bg-[#f4faf5] text-center text-sm text-[#4b6b56]">
                      Belum ada pendaftar baru di sesi browser ini.
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {data.ppdbSubmissions.map((sub) => (
                        <div
                          key={sub.id}
                          className="p-4 rounded-xl bg-[#f4faf5] border border-emerald-900/10 flex flex-col md:flex-row md:items-center justify-between gap-4"
                        >
                          <div className="space-y-1">
                            <div className="flex flex-wrap items-center gap-2">
                              <span className="font-display font-bold text-sm text-[#14532d]">
                                {sub.namaSiswa}
                              </span>
                              <span className="text-xs font-mono text-[#4b6b56]">
                                NIK: {sub.nik}
                              </span>
                              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-[#dcfce7] text-[#14532d]">
                                {sub.kelasDituju} · {sub.pilihanProgram}
                              </span>
                            </div>
                            <p className="text-xs text-[#2c4435]">
                              Ortu: {sub.namaAyah} &amp; {sub.namaIbu} · WA: {sub.noHpOrtu} · Daftar:{" "}
                              {sub.submittedAt}
                            </p>
                          </div>

                          <div className="flex flex-wrap items-center gap-2 shrink-0">
                            <select
                              value={sub.status}
                              onChange={(e) => {
                                const nextStatus = e.target.value as PpdbSubmission["status"];
                                updateState((prev) => ({
                                  ...prev,
                                  ppdbSubmissions: prev.ppdbSubmissions.map((s) =>
                                    s.id === sub.id ? { ...s, status: nextStatus } : s
                                  ),
                                }));
                                notify("Status pendaftar diperbarui.");
                              }}
                              className="rounded-lg border border-emerald-900/20 bg-white px-2.5 py-1.5 text-xs font-semibold text-[#14532d]"
                            >
                              <option value="Menunggu">Menunggu</option>
                              <option value="Terverifikasi">Terverifikasi</option>
                              <option value="Diterima">Diterima</option>
                            </select>
                            <a
                              href={`https://wa.me/${sub.noHpOrtu.replace(/^0/, "62").replace(/\D/g, "")}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-[#15803d] text-white text-xs font-semibold"
                            >
                              <MessageCircle className="w-3.5 h-3.5" />
                              <span>WA Ortu</span>
                            </a>
                            <button
                              type="button"
                              onClick={() => {
                                updateState((prev) => ({
                                  ...prev,
                                  ppdbSubmissions: prev.ppdbSubmissions.filter(
                                    (s) => s.id !== sub.id
                                  ),
                                }));
                                notify("Data pendaftar dihapus.");
                              }}
                              className="p-1.5 rounded-lg bg-red-50 text-red-700 cursor-pointer"
                              aria-label="Hapus pendaftar"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Info PPDB */}
                <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 space-y-3">
                  <h3 className="font-display font-bold text-lg text-[#14532d]">
                    Informasi Tahun Ajaran &amp; Biaya PPDB
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#14532d] mb-1">
                        Tahun Ajaran PPDB
                      </label>
                      <input
                        type="text"
                        value={data.identity.tahunAjaranPPDB}
                        onChange={(e) =>
                          updateState((prev) => ({
                            ...prev,
                            identity: { ...prev.identity, tahunAjaranPPDB: e.target.value },
                          }))
                        }
                        className="w-full rounded-xl border border-emerald-900/20 px-3 py-2 text-sm font-mono"
                      />
                    </div>
                    <div className="sm:col-span-2">
                      <label className="block text-xs font-semibold text-[#14532d] mb-1">
                        Keterangan Biaya Pendaftaran
                      </label>
                      <textarea
                        rows={2}
                        value={data.ppdbInfo.biaya}
                        onChange={(e) =>
                          updateState((prev) => ({
                            ...prev,
                            ppdbInfo: { ...prev.ppdbInfo, biaya: e.target.value },
                          }))
                        }
                        className="w-full rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                      />
                    </div>
                  </div>
                </div>

                {/* FAQ */}
                <div className="bg-white rounded-2xl p-5 border border-emerald-900/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-display font-bold text-lg text-[#14532d]">
                      Kelola FAQ ({data.faqs.length})
                    </h3>
                    <button
                      type="button"
                      onClick={() => {
                        setEditingFaqIdx("new");
                        setFaqDraft({ question: "", answer: "" });
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#14532d] text-white text-xs font-bold cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Tambah FAQ</span>
                    </button>
                  </div>

                  {editingFaqIdx !== null && (
                    <div className="p-4 rounded-xl border-2 border-[#15803d] bg-[#f4faf5] space-y-3">
                      <input
                        type="text"
                        value={faqDraft.question}
                        onChange={(e) => setFaqDraft({ ...faqDraft, question: e.target.value })}
                        placeholder="Pertanyaan..."
                        className="w-full rounded-lg border border-emerald-900/20 bg-white px-3 py-2 text-sm"
                      />
                      <textarea
                        rows={2}
                        value={faqDraft.answer}
                        onChange={(e) => setFaqDraft({ ...faqDraft, answer: e.target.value })}
                        placeholder="Jawaban..."
                        className="w-full rounded-lg border border-emerald-900/20 bg-white px-3 py-2 text-sm"
                      />
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => setEditingFaqIdx(null)}
                          className="px-3 py-1.5 text-xs font-semibold text-[#4b6b56] cursor-pointer"
                        >
                          Batal
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            if (!faqDraft.question.trim()) return;
                            updateState((prev) => {
                              const next = [...prev.faqs];
                              if (editingFaqIdx === "new") {
                                next.push(faqDraft);
                              } else {
                                next[editingFaqIdx] = faqDraft;
                              }
                              return { ...prev, faqs: next };
                            });
                            setEditingFaqIdx(null);
                            notify("FAQ berhasil disimpan.");
                          }}
                          className="px-4 py-1.5 rounded-full bg-[#14532d] text-white text-xs font-bold cursor-pointer"
                        >
                          Simpan FAQ
                        </button>
                      </div>
                    </div>
                  )}

                  <div className="space-y-2.5">
                    {data.faqs.map((faq, idx) => (
                      <div
                        key={idx}
                        className="p-3.5 rounded-xl bg-[#f4faf5] border border-emerald-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                      >
                        <div>
                          <p className="font-semibold text-sm text-[#14532d]">{faq.question}</p>
                          <p className="text-xs text-[#4b6b56] line-clamp-2 mt-0.5">{faq.answer}</p>
                        </div>
                        <div className="flex gap-2 shrink-0">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingFaqIdx(idx);
                              setFaqDraft(faq);
                            }}
                            className="px-3 py-1 rounded-md bg-white border border-emerald-900/15 text-[#14532d] text-xs font-semibold cursor-pointer"
                          >
                            Edit
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              updateState((prev) => ({
                                ...prev,
                                faqs: prev.faqs.filter((_, i) => i !== idx),
                              }));
                              notify("FAQ dihapus.");
                            }}
                            className="px-3 py-1 rounded-md bg-red-50 text-red-700 text-xs font-semibold cursor-pointer"
                          >
                            Hapus
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ==================== TAB 9: BACKUP & SANDI ==================== */}
            {activeTab === "pengaturan" && (
              <div className="space-y-6">
                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-900/10 space-y-4">
                  <h3 className="font-display font-bold text-lg text-[#14532d]">
                    Ubah Kata Sandi Admin
                  </h3>
                  <div className="flex flex-col sm:flex-row gap-3 max-w-md">
                    <input
                      type="text"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Masukkan kata sandi baru..."
                      className="flex-1 min-h-[42px] rounded-xl border border-emerald-900/20 px-3 py-2 text-sm"
                    />
                    <button
                      type="button"
                      onClick={() => {
                        if (newPassword.trim().length < 4) {
                          notify("Sandi minimal 4 karakter.");
                          return;
                        }
                        updateState((prev) => ({ ...prev, adminPassword: newPassword.trim() }));
                        setNewPassword("");
                        notify("Kata sandi admin diperbarui.");
                      }}
                      className="px-5 py-2 rounded-full bg-[#14532d] text-white text-xs font-bold cursor-pointer"
                    >
                      Simpan Sandi
                    </button>
                  </div>
                </div>

                <div className="bg-white rounded-2xl p-5 sm:p-6 border border-emerald-900/10 space-y-4">
                  <h3 className="font-display font-bold text-lg text-[#14532d]">
                    Cadangkan &amp; Pulihkan Data Website (JSON)
                  </h3>
                  <p className="text-sm text-[#4b6b56]">
                    Unduh seluruh data yang telah diubah sebagai file JSON untuk cadangan, atau
                    impor kembali kapan saja.
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={handleExportJson}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#14532d] text-white text-xs sm:text-sm font-bold cursor-pointer"
                    >
                      <Download className="w-4 h-4" />
                      <span>Export Data (.json)</span>
                    </button>

                    <input
                      ref={importFileRef}
                      type="file"
                      accept="application/json"
                      onChange={handleImportJson}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => importFileRef.current?.click()}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#dcfce7] text-[#14532d] text-xs sm:text-sm font-bold cursor-pointer"
                    >
                      <Upload className="w-4 h-4" />
                      <span>Import Data (.json)</span>
                    </button>

                    {confirmReset ? (
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => {
                            resetToDefault();
                            setConfirmReset(false);
                            notify("Seluruh data dikembalikan ke pengaturan awal.");
                          }}
                          className="px-4 py-2.5 rounded-full bg-red-600 text-white text-xs font-bold cursor-pointer"
                        >
                          Ya, Reset Semua Data
                        </button>
                        <button
                          type="button"
                          onClick={() => setConfirmReset(false)}
                          className="px-4 py-2.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold cursor-pointer"
                        >
                          Batal
                        </button>
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => setConfirmReset(true)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-red-200 text-red-700 hover:bg-red-50 text-xs sm:text-sm font-semibold cursor-pointer"
                      >
                        <RotateCcw className="w-4 h-4" />
                        <span>Reset ke Data Awal</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
