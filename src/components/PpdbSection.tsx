import React, { useState } from "react";
import {
  CheckCircle2,
  FileText,
  Calendar,
  Send,
  MessageCircle,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import { useMadrasah } from "../context/MadrasahContext";

interface PpdbFormState {
  namaSiswa: string;
  nik: string;
  tempatTanggalLahir: string;
  jenisKelamin: "Laki-laki" | "Perempuan";
  namaAyah: string;
  namaIbu: string;
  noHpOrtu: string;
  alamat: string;
  asalTk: string;
  kelasDituju: string;
  pilihanProgram: "Reguler" | "Tahfidz";
}

const INITIAL_FORM: PpdbFormState = {
  namaSiswa: "",
  nik: "",
  tempatTanggalLahir: "",
  jenisKelamin: "Laki-laki",
  namaAyah: "",
  namaIbu: "",
  noHpOrtu: "",
  alamat: "",
  asalTk: "",
  kelasDituju: "Kelas 1",
  pilihanProgram: "Reguler",
};

export const PpdbSection: React.FC = () => {
  const { data, addPpdbSubmission } = useMadrasah();
  const { identity, ppdbInfo } = data;
  const [form, setForm] = useState<PpdbFormState>(INITIAL_FORM);
  const [errorMsg, setErrorMsg] = useState<string>("");
  const [submittedData, setSubmittedData] = useState<PpdbFormState | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errorMsg) setErrorMsg("");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.namaSiswa.trim() ||
      !form.nik.trim() ||
      !form.tempatTanggalLahir.trim() ||
      !form.namaAyah.trim() ||
      !form.namaIbu.trim() ||
      !form.noHpOrtu.trim() ||
      !form.alamat.trim()
    ) {
      setErrorMsg("Mohon lengkapi seluruh kolom bertanda wajib (*) sebelum mengirim formulir.");
      return;
    }

    if (!/^\d{16}$/.test(form.nik.trim())) {
      setErrorMsg("NIK calon siswa harus terdiri dari 16 digit angka.");
      return;
    }

    if (form.noHpOrtu.replace(/\D/g, "").length < 10) {
      setErrorMsg("Mohon masukkan nomor HP/WhatsApp orang tua yang valid (minimal 10 digit).");
      return;
    }

    setErrorMsg("");
    addPpdbSubmission(form);
    setSubmittedData(form);
  };

  const buildWhatsappUrl = (formData: PpdbFormState) => {
    const text = [
      `Assalamu'alaikum Panitia PPDB ${identity.namaSingkat},`,
      `Saya ingin mengonfirmasi pendaftaran PPDB Online ${identity.tahunAjaranPPDB}:`,
      ``,
      `• Nama Siswa: ${formData.namaSiswa}`,
      `• NIK: ${formData.nik}`,
      `• Tempat/Tgl Lahir: ${formData.tempatTanggalLahir}`,
      `• Jenis Kelamin: ${formData.jenisKelamin}`,
      `• Nama Ayah / Ibu: ${formData.namaAyah} / ${formData.namaIbu}`,
      `• No. HP Ortu: ${formData.noHpOrtu}`,
      `• Asal TK/PAUD: ${formData.asalTk || "-"}`,
      `• Kelas Dituju: ${formData.kelasDituju}`,
      `• Pilihan Program: ${formData.pilihanProgram}`,
      `• Alamat: ${formData.alamat}`,
      ``,
      `Mohon informasi jadwal verifikasi berkas & observasi. Terima kasih.`,
    ].join("\n");

    return `https://wa.me/${identity.whatsappNumber}?text=${encodeURIComponent(text)}`;
  };

  const handleReset = () => {
    setSubmittedData(null);
    setForm(INITIAL_FORM);
    setErrorMsg("");
  };

  return (
    /* <!-- SECTION PPDB --> */
    <section id="ppdb" className="py-16 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl">
          <p className="text-sm font-semibold text-[#15803d] tracking-wide">
            Penerimaan Peserta Didik Baru
          </p>
          <h2
            className="font-display font-bold text-3xl sm:text-4xl text-[#14532d] mt-2 tracking-tight"
            style={{ textWrap: "balance" }}
          >
            PPDB Online Tahun Ajaran {identity.tahunAjaranPPDB}
          </h2>
          <p className="text-base text-[#3b5946] mt-3 leading-relaxed">
            Pendaftaran dapat dilakukan langsung secara daring melalui formulir di bawah ini tanpa
            biaya formulir, dilanjutkan konfirmasi berkas bersama panitia via WhatsApp.
          </p>
        </div>

        {/* Alur Pendaftaran 4 Langkah */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {ppdbInfo.alur.map((step) => (
            <div
              key={step.step}
              className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-900/10"
            >
              <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-[#14532d] text-amber-300 font-mono font-bold text-sm tabular-nums">
                {step.step}
              </span>
              <h3 className="font-display font-bold text-lg text-[#14532d] mt-4">
                {step.title}
              </h3>
              <p className="text-sm text-[#2c4435] mt-2 leading-relaxed">{step.desc}</p>
            </div>
          ))}
        </div>

        {/* Grid Kiri: Informasi Syarat & Jadwal | Kanan: Formulir PPDB */}
        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Kolom Informasi PPDB */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-emerald-900/10">
              <div className="flex items-center gap-2.5 mb-4">
                <Calendar className="w-5 h-5 text-[#15803d]" aria-hidden="true" />
                <h3 className="font-display font-bold text-lg text-[#14532d]">
                  Jadwal Pendaftaran
                </h3>
              </div>
              <div className="divide-y divide-emerald-900/10 text-sm">
                {ppdbInfo.jadwal.map((j) => (
                  <div key={j.tahap} className="py-3 flex items-start justify-between gap-3">
                    <div>
                      <p className="font-semibold text-[#112a1c]">{j.tahap}</p>
                      <p className="text-xs text-[#4b6b56] mt-0.5">{j.tanggal}</p>
                    </div>
                    <span className="text-xs font-semibold text-[#14532d] bg-[#dcfce7] px-2.5 py-1 rounded-full shrink-0">
                      {j.status}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-emerald-900/10 space-y-5">
              <div>
                <h3 className="font-display font-bold text-lg text-[#14532d] mb-3">
                  Syarat &amp; Usia Minimal
                </h3>
                <ul className="space-y-2.5">
                  {ppdbInfo.syaratUmum.map((syarat, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-sm text-[#2c4435]">
                      <CheckCircle2
                        className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{syarat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-emerald-900/10">
                <div className="flex items-center gap-2 mb-3">
                  <FileText className="w-4 h-4 text-[#15803d]" aria-hidden="true" />
                  <h4 className="font-display font-bold text-base text-[#14532d]">
                    Dokumen yang Dibawa
                  </h4>
                </div>
                <ul className="space-y-2 text-sm text-[#2c4435] list-disc list-inside">
                  {ppdbInfo.dokumen.map((dok, idx) => (
                    <li key={idx}>{dok}</li>
                  ))}
                </ul>
              </div>

              <div className="pt-4 border-t border-emerald-900/10 bg-[#fefce8] -mx-6 -mb-6 sm:-mx-7 sm:-mb-7 p-6 sm:p-7 rounded-b-2xl">
                <h4 className="font-display font-bold text-sm text-[#14532d]">
                  Informasi Biaya Pendaftaran
                </h4>
                <p className="text-sm text-[#2c4435] mt-1.5 leading-relaxed">{ppdbInfo.biaya}</p>
              </div>
            </div>
          </div>

          {/* Kolom Formulir PPDB Online */}
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-emerald-900/10">
            <div className="pb-5 border-b border-emerald-900/10">
              <h3 className="font-display font-bold text-2xl text-[#14532d]">
                Formulir PPDB Online
              </h3>
              <p className="text-sm text-[#4b6b56] mt-1">
                Isi data calon peserta didik dengan benar sesuai Kartu Keluarga dan Akta Kelahiran.
              </p>
            </div>

            {submittedData ? (
              <div className="mt-6 rounded-2xl bg-[#f0fdf4] border border-[#15803d]/25 p-6 sm:p-7 space-y-5">
                <div className="flex items-start gap-3.5">
                  <CheckCircle2
                    className="w-7 h-7 text-[#15803d] shrink-0 mt-0.5"
                    aria-hidden="true"
                  />
                  <div>
                    <h4 className="font-display font-bold text-lg text-[#14532d]">
                      Formulir Berhasil Disiapkan!
                    </h4>
                    <p className="text-sm sm:text-base text-[#1e3a28] mt-1 leading-relaxed">
                      Terima kasih, formulir PPDB berhasil dikirim. Panitia akan menghubungi
                      Bapak/Ibu via WhatsApp.
                    </p>
                  </div>
                </div>

                <dl className="bg-white rounded-xl p-4 border border-emerald-900/10 text-sm space-y-2">
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#4b6b56]">Nama Calon Siswa</dt>
                    <dd className="font-semibold text-[#112a1c] text-right">
                      {submittedData.namaSiswa}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#4b6b56]">NIK</dt>
                    <dd className="font-mono font-semibold text-[#112a1c] tabular-nums">
                      {submittedData.nik}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#4b6b56]">Kelas / Program</dt>
                    <dd className="font-semibold text-[#14532d] text-right">
                      {submittedData.kelasDituju} · Program {submittedData.pilihanProgram}
                    </dd>
                  </div>
                  <div className="flex justify-between gap-4">
                    <dt className="text-[#4b6b56]">No. HP Orang Tua</dt>
                    <dd className="font-mono font-semibold text-[#112a1c] tabular-nums">
                      {submittedData.noHpOrtu}
                    </dd>
                  </div>
                </dl>

                <div className="flex flex-col sm:flex-row gap-3 pt-1">
                  <a
                    href={buildWhatsappUrl(submittedData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 min-h-[46px] px-6 py-3 rounded-full bg-[#15803d] hover:bg-[#14532d] text-white font-bold text-sm transition-colors shadow-sm"
                  >
                    <MessageCircle className="w-4 h-4" aria-hidden="true" />
                    <span>Konfirmasi via WhatsApp</span>
                  </a>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center justify-center gap-2 min-h-[46px] px-5 py-3 rounded-full border border-emerald-900/20 hover:bg-white text-[#14532d] font-semibold text-sm transition-colors"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    <span>Isi Formulir Lain</span>
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="mt-6 space-y-5" noValidate>
                {errorMsg && (
                  <div
                    role="alert"
                    className="flex items-start gap-2.5 rounded-xl bg-red-50 border border-red-200 text-red-800 px-4 py-3 text-sm"
                  >
                    <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                    <span>{errorMsg}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="sm:col-span-2">
                    <label
                      htmlFor="namaSiswa"
                      className="block text-sm font-semibold text-[#14532d] mb-1.5"
                    >
                      Nama Lengkap Siswa <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="namaSiswa"
                      name="namaSiswa"
                      type="text"
                      required
                      value={form.namaSiswa}
                      onChange={handleChange}
                      placeholder="Contoh: Muhammad Rayyan Pratama"
                      className="w-full min-h-[44px] rounded-xl border border-emerald-900/20 px-4 py-2.5 text-sm text-[#112a1c] focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="nik"
                      className="block text-sm font-semibold text-[#14532d] mb-1.5"
                    >
                      NIK Siswa (16 Digit) <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="nik"
                      name="nik"
                      type="text"
                      inputMode="numeric"
                      maxLength={16}
                      required
                      value={form.nik}
                      onChange={handleChange}
                      placeholder="3204xxxxxxxxxxxx"
                      className="w-full min-h-[44px] rounded-xl border border-emerald-900/20 px-4 py-2.5 text-sm font-mono text-[#112a1c] focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="tempatTanggalLahir"
                      className="block text-sm font-semibold text-[#14532d] mb-1.5"
                    >
                      Tempat / Tanggal Lahir <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="tempatTanggalLahir"
                      name="tempatTanggalLahir"
                      type="text"
                      required
                      value={form.tempatTanggalLahir}
                      onChange={handleChange}
                      placeholder="Bandung, 14 Mei 2020"
                      className="w-full min-h-[44px] rounded-xl border border-emerald-900/20 px-4 py-2.5 text-sm text-[#112a1c] focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="jenisKelamin"
                      className="block text-sm font-semibold text-[#14532d] mb-1.5"
                    >
                      Jenis Kelamin <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="jenisKelamin"
                      name="jenisKelamin"
                      value={form.jenisKelamin}
                      onChange={handleChange}
                      className="w-full min-h-[44px] rounded-xl border border-emerald-900/20 bg-white px-4 py-2.5 text-sm text-[#112a1c] focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                    >
                      <option value="Laki-laki">Laki-laki</option>
                      <option value="Perempuan">Perempuan</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="asalTk"
                      className="block text-sm font-semibold text-[#14532d] mb-1.5"
                    >
                      Asal TK / RA / PAUD
                    </label>
                    <input
                      id="asalTk"
                      name="asalTk"
                      type="text"
                      value={form.asalTk}
                      onChange={handleChange}
                      placeholder="Contoh: RA Al-Hidayah"
                      className="w-full min-h-[44px] rounded-xl border border-emerald-900/20 px-4 py-2.5 text-sm text-[#112a1c] focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="namaAyah"
                      className="block text-sm font-semibold text-[#14532d] mb-1.5"
                    >
                      Nama Ayah Kandung <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="namaAyah"
                      name="namaAyah"
                      type="text"
                      required
                      value={form.namaAyah}
                      onChange={handleChange}
                      placeholder="Nama lengkap ayah"
                      className="w-full min-h-[44px] rounded-xl border border-emerald-900/20 px-4 py-2.5 text-sm text-[#112a1c] focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="namaIbu"
                      className="block text-sm font-semibold text-[#14532d] mb-1.5"
                    >
                      Nama Ibu Kandung <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="namaIbu"
                      name="namaIbu"
                      type="text"
                      required
                      value={form.namaIbu}
                      onChange={handleChange}
                      placeholder="Nama lengkap ibu"
                      className="w-full min-h-[44px] rounded-xl border border-emerald-900/20 px-4 py-2.5 text-sm text-[#112a1c] focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="noHpOrtu"
                      className="block text-sm font-semibold text-[#14532d] mb-1.5"
                    >
                      No. HP / WhatsApp Ortu <span className="text-red-600">*</span>
                    </label>
                    <input
                      id="noHpOrtu"
                      name="noHpOrtu"
                      type="tel"
                      required
                      value={form.noHpOrtu}
                      onChange={handleChange}
                      placeholder="0812xxxxxxxx"
                      className="w-full min-h-[44px] rounded-xl border border-emerald-900/20 px-4 py-2.5 text-sm font-mono text-[#112a1c] focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="kelasDituju"
                      className="block text-sm font-semibold text-[#14532d] mb-1.5"
                    >
                      Kelas yang Dituju <span className="text-red-600">*</span>
                    </label>
                    <select
                      id="kelasDituju"
                      name="kelasDituju"
                      value={form.kelasDituju}
                      onChange={handleChange}
                      className="w-full min-h-[44px] rounded-xl border border-emerald-900/20 bg-white px-4 py-2.5 text-sm text-[#112a1c] focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                    >
                      <option value="Kelas 1">Kelas 1 (Siswa Baru)</option>
                      <option value="Kelas 2">Kelas 2 (Pindahan)</option>
                      <option value="Kelas 3">Kelas 3 (Pindahan)</option>
                      <option value="Kelas 4">Kelas 4 (Pindahan)</option>
                      <option value="Kelas 5">Kelas 5 (Pindahan)</option>
                      <option value="Kelas 6">Kelas 6 (Pindahan)</option>
                    </select>
                  </div>

                  <div className="sm:col-span-2">
                    <span className="block text-sm font-semibold text-[#14532d] mb-2">
                      Pilihan Program <span className="text-red-600">*</span>
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(["Reguler", "Tahfidz"] as const).map((prog) => (
                        <label
                          key={prog}
                          className={`flex items-center gap-3 min-h-[48px] px-4 py-3 rounded-xl border cursor-pointer transition-colors ${
                            form.pilihanProgram === prog
                              ? "border-[#15803d] bg-[#f0fdf4] text-[#14532d] font-semibold"
                              : "border-emerald-900/20 bg-white text-[#2c4435] hover:bg-[#f4faf5]"
                          }`}
                        >
                          <input
                            type="radio"
                            name="pilihanProgram"
                            value={prog}
                            checked={form.pilihanProgram === prog}
                            onChange={handleChange}
                            className="accent-[#15803d] w-4 h-4"
                          />
                          <div className="text-sm">
                            <span>Program {prog}</span>
                            <span className="block text-xs font-normal text-[#4b6b56]">
                              {prog === "Reguler"
                                ? "Kurikulum Merdeka + Diniyah + Tahfidz Juz 30"
                                : "Kelas Khusus Target Hafalan 3–5 Juz"}
                            </span>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div className="sm:col-span-2">
                    <label
                      htmlFor="alamat"
                      className="block text-sm font-semibold text-[#14532d] mb-1.5"
                    >
                      Alamat Lengkap Tempat Tinggal <span className="text-red-600">*</span>
                    </label>
                    <textarea
                      id="alamat"
                      name="alamat"
                      rows={3}
                      required
                      value={form.alamat}
                      onChange={handleChange}
                      placeholder="Jalan, RT/RW, Desa/Kelurahan, Kecamatan"
                      className="w-full rounded-xl border border-emerald-900/20 px-4 py-2.5 text-sm text-[#112a1c] focus:outline-none focus:ring-2 focus:ring-[#15803d]"
                    />
                  </div>
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 min-h-[48px] px-8 py-3 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-[#052e16] font-bold text-sm sm:text-base transition-all duration-200 shadow-sm cursor-pointer"
                  >
                    <Send className="w-4 h-4" aria-hidden="true" />
                    <span>Kirim Formulir PPDB</span>
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
