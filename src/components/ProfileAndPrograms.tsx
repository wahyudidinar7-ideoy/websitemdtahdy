import React from "react";
import {
  CheckCircle2,
  BookOpen,
  Sparkles,
  Palette,
  HeartHandshake,
  Trophy,
  Landmark,
  ShieldCheck,
} from "lucide-react";
import { ProgramItem } from "../data/madrasahData";
import { useMadrasah } from "../context/MadrasahContext";

const renderProgramIcon = (name: ProgramItem["iconName"]) => {
  const iconClass = "w-6 h-6 text-[#14532d]";
  switch (name) {
    case "book-open":
      return <BookOpen className={iconClass} aria-hidden="true" />;
    case "mosque":
      return <Landmark className={iconClass} aria-hidden="true" />;
    case "sparkles":
      return <Sparkles className={iconClass} aria-hidden="true" />;
    case "palette":
      return <Palette className={iconClass} aria-hidden="true" />;
    case "heart":
      return <HeartHandshake className={iconClass} aria-hidden="true" />;
    case "trophy":
      return <Trophy className={iconClass} aria-hidden="true" />;
  }
};

export const ProfileAndPrograms: React.FC = () => {
  const { data } = useMadrasah();
  const { identity, profile, programs } = data;

  return (
    <>
      {/* <!-- SECTION PROFIL MADRASAH --> */}
      <section id="profil" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#15803d] tracking-wide">
              Tentang &amp; Profil Madrasah
            </p>
            <h2
              className="font-display font-bold text-3xl sm:text-4xl text-[#14532d] mt-2 tracking-tight"
              style={{ textWrap: "balance" }}
            >
              Mengenal Lebih Dekat {identity.namaSingkat}
            </h2>
          </div>

          {/* Grid Sejarah + Identitas Resmi */}
          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Sejarah & Tujuan */}
            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-emerald-900/10 space-y-5">
              <h3 className="font-display font-bold text-xl text-[#14532d]">
                Sejarah Singkat Madrasah
              </h3>
              <div className="space-y-4 text-[#2c4435] text-base leading-relaxed">
                {profile.sejarah.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>

              <div className="pt-4 border-t border-emerald-900/10">
                <h4 className="font-display font-bold text-base text-[#14532d] mb-2">
                  Tujuan Pendidikan Madrasah
                </h4>
                <p className="text-sm sm:text-base text-[#2c4435] leading-relaxed">
                  {profile.tujuan}
                </p>
              </div>
            </div>

            {/* Kartu Identitas Lembaga */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-emerald-900/10">
              <div className="flex items-center justify-between gap-3 pb-4 border-b border-emerald-900/10">
                <h3 className="font-display font-bold text-xl text-[#14532d]">
                  Identitas Resmi
                </h3>
                <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#14532d] bg-[#dcfce7] px-3 py-1 rounded-full">
                  <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Akreditasi {identity.akreditasi}</span>
                </span>
              </div>

              <dl className="divide-y divide-emerald-900/10 text-sm mt-2">
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#4b6b56]">Nama Madrasah</dt>
                  <dd className="font-semibold text-[#112a1c] text-right">
                    {identity.namaSingkat}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#4b6b56]">NSM / NPSN</dt>
                  <dd className="font-mono font-semibold text-[#112a1c] tabular-nums text-right">
                    {identity.nsm} / {identity.npsn}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#4b6b56]">Tahun Berdiri</dt>
                  <dd className="font-mono font-semibold text-[#112a1c] tabular-nums text-right">
                    {identity.tahunBerdiri}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#4b6b56]">Kepala Madrasah</dt>
                  <dd className="font-semibold text-[#112a1c] text-right">
                    {identity.kepalaMadrasah}, {identity.gelarKepala}
                  </dd>
                </div>
                <div className="py-3 flex justify-between gap-4">
                  <dt className="text-[#4b6b56] shrink-0">Jam Layanan</dt>
                  <dd className="font-semibold text-[#112a1c] text-right">
                    {identity.jamLayanan}
                  </dd>
                </div>
                <div className="py-3">
                  <dt className="text-[#4b6b56] mb-1">Alamat Lengkap</dt>
                  <dd className="font-medium text-[#112a1c] leading-relaxed">
                    {identity.alamatLengkap}
                  </dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Visi (1 Kotak Besar Hijau dengan Corak Daun & Embun) & Misi */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-5 rounded-2xl leaf-dew-emerald-surface text-white p-7 sm:p-9 flex flex-col justify-center shadow-md relative overflow-hidden">
              <div className="absolute inset-0 islamic-pattern-dark pointer-events-none" />
              <p className="relative text-xs font-bold uppercase tracking-widest text-amber-300">
                Visi Madrasah
              </p>
              <blockquote className="relative font-display font-bold text-xl sm:text-2xl leading-snug mt-4 text-white">
                &ldquo;{profile.visi}&rdquo;
              </blockquote>
            </div>

            <div className="lg:col-span-7 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-emerald-900/10">
              <h3 className="font-display font-bold text-xl text-[#14532d] mb-5">
                Misi Madrasah
              </h3>
              <ul className="space-y-3.5">
                {profile.misi.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2
                      className="w-5 h-5 text-[#15803d] shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    <span className="text-[#2c4435] text-sm sm:text-base leading-relaxed">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 4 Nilai Unggulan */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {profile.nilaiUnggulan.map((nilai, idx) => (
              <div
                key={nilai.title}
                className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-900/10 transition-transform duration-200 hover:-translate-y-1"
              >
                <div className="text-xs font-mono font-semibold text-[#15803d] tabular-nums">
                  0{idx + 1} · Nilai Unggulan
                </div>
                <h4 className="font-display font-bold text-lg text-[#14532d] mt-1.5">
                  {nilai.title}
                </h4>
                <p className="text-sm text-[#3b5946] mt-2 leading-relaxed">{nilai.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <!-- SECTION PROGRAM UNGGULAN --> */}
      <section id="program" className="py-16 lg:py-24 leaf-dew-band border-y border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#15803d] tracking-wide">
              Kurikulum &amp; Program Unggulan
            </p>
            <h2
              className="font-display font-bold text-3xl sm:text-4xl text-[#14532d] mt-2 tracking-tight"
              style={{ textWrap: "balance" }}
            >
              Enam Pilar Pendidikan Terpadu untuk Tumbuh Kembang Optimal
            </h2>
            <p className="text-base text-[#3b5946] mt-3 leading-relaxed">
              Menggabungkan penguatan iman, hafalan Al-Qur&apos;an, Kurikulum Merdeka yang bermakna,
              serta pengembangan minat bakat siswa.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <article
                key={program.id}
                className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-emerald-900/10 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
              >
                <div>
                  <div className="flex items-center justify-between gap-4 mb-5">
                    <div className="w-12 h-12 rounded-2xl bg-[#dcfce7] flex items-center justify-center shrink-0">
                      {renderProgramIcon(program.iconName)}
                    </div>
                    <span className="font-mono text-sm font-semibold text-[#15803d] tabular-nums">
                      {program.number}
                    </span>
                  </div>

                  <h3 className="font-display font-bold text-xl text-[#14532d]">
                    {program.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#b45309] mt-1">
                    {program.subtitle}
                  </p>
                  <p className="text-sm text-[#2c4435] mt-3 leading-relaxed">
                    {program.description}
                  </p>
                </div>

                <ul className="mt-5 pt-4 border-t border-emerald-900/10 space-y-2">
                  {program.highlights.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-xs sm:text-sm text-[#1e3a28]"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-[#15803d] shrink-0 mt-0.5"
                        aria-hidden="true"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
