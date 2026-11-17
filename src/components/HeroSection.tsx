import React from "react";
import { ArrowRight, BookCheck, Award } from "lucide-react";
import { useMadrasah } from "../context/MadrasahContext";
import { SmartImage } from "./SmartImage";

export const HeroSection: React.FC = () => {
  const { data } = useMadrasah();
  const { identity, images, heroStats } = data;

  return (
    /* <!-- SECTION HERO --> */
    <section
      id="beranda"
      className="relative overflow-hidden bg-[#14532d] text-white"
    >
      {/* Background Foto Kampus + Corak Daun & Embun dengan Overlay Hijau Tua */}
      <div className="absolute inset-0">
        <SmartImage
          src={images.campusHero}
          alt={`Lingkungan ${identity.namaLengkap}`}
          className="w-full h-full object-cover opacity-20"
        />
        <div
          className="absolute inset-0 opacity-30 bg-cover bg-center mix-blend-soft-light"
          style={{
            backgroundImage: 'url("/src/assets/images/emerald_leaves_dew_1794959050820.jpg")',
          }}
        />
        <div
          className="absolute inset-0 islamic-pattern-dark"
          style={{
            background:
              "linear-gradient(125deg, rgba(20, 83, 45, 0.90) 0%, rgba(21, 128, 61, 0.80) 55%, rgba(16, 65, 36, 0.90) 100%)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-14 lg:pt-20 lg:pb-20">
        {/* Hero Split 2 Kolom */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Kolom Kiri: Teks Utama */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/12 border border-white/20 text-amber-200 text-xs sm:text-sm font-medium">
              <Award className="w-4 h-4 text-amber-300 shrink-0" aria-hidden="true" />
              <span>Madrasah Berakreditasi {identity.akreditasi} · Berbasis Kurikulum Merdeka + Diniyah</span>
            </div>

            <h1
              className="font-display font-extrabold tracking-tight text-white leading-[1.14]"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.35rem)",
                textWrap: "balance",
              }}
            >
              Mendidik Anak Beriman, Berilmu, dan Berakhlak Mulia
            </h1>

            <p className="text-base sm:text-lg text-emerald-50/90 leading-relaxed max-w-2xl">
              {identity.namaLengkap} menghadirkan pendidikan dasar Islam terpadu yang
              menumbuhkan kecintaan pada Al-Qur&apos;an, penguasaan sains dan literasi, serta adab
              mulia dalam lingkungan belajar yang asri dan ramah anak.
            </p>

            {/* 2 Tombol CTA */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-2">
              <a
                href="#ppdb"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 rounded-full bg-[#f59e0b] hover:bg-[#fbbf24] text-[#052e16] font-bold text-sm sm:text-base transition-all duration-200 hover:-translate-y-0.5 shadow-md whitespace-nowrap"
              >
                <span>Daftar PPDB Sekarang</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </a>
              <a
                href="#profil"
                className="inline-flex items-center justify-center gap-2 min-h-[48px] px-7 py-3 rounded-full border-2 border-white/60 hover:border-white hover:bg-white/10 text-white font-semibold text-sm sm:text-base transition-all duration-200 whitespace-nowrap"
              >
                <span>Lihat Profil Madrasah</span>
              </a>
            </div>
          </div>

          {/* Kolom Kanan: Frame Foto Madrasah & Siswa Mengaji */}
          <div className="lg:col-span-5 relative">
            <div className="relative rounded-3xl overflow-hidden border-4 border-white/20 shadow-2xl bg-[#0f3d21]">
              <div className="aspect-[4/3]">
                <SmartImage
                  src={images.campusHero}
                  alt={`Gedung dan halaman hijau ${identity.namaSingkat}`}
                  fallbackTitle="Gedung Madrasah Asri"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Scrim & Caption Halus */}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#052e16]/90 via-[#052e16]/45 to-transparent p-5 pt-12">
                <p className="text-xs text-emerald-200 font-medium">
                  Kampus Hijau · Desa {identity.desa}, {identity.kabupaten}
                </p>
                <p className="text-sm font-semibold text-white mt-0.5">
                  Lingkungan Belajar Nyaman &amp; Kondusif
                </p>
              </div>

              {/* Badge PPDB Dibuka */}
              <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f59e0b] text-[#052e16] text-xs font-bold shadow-md">
                <BookCheck className="w-3.5 h-3.5" aria-hidden="true" />
                <span>PPDB {identity.tahunAjaranPPDB} Dibuka</span>
              </div>
            </div>

            {/* Inset Kartu Foto Siswa Mengaji */}
            <div className="hidden sm:flex items-center gap-3.5 bg-white text-[#112a1c] p-3 rounded-2xl shadow-xl border border-emerald-900/10 max-w-[300px] -mt-10 ml-auto mr-4 relative z-10">
              <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                <SmartImage
                  src={images.studentsQuran}
                  alt="Siswa madrasah sedang mengaji Al-Qur'an"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <p className="font-display font-bold text-sm text-[#14532d] leading-snug">
                  Program Tahfidz Harian
                </p>
                <p className="text-xs text-[#3b5946] mt-0.5 leading-snug">
                  Target hafalan Juz 30 &amp; Juz 29 bersanad
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Strip 4 Statistik Utama */}
        <div className="mt-12 lg:mt-16 grid grid-cols-2 lg:grid-cols-4 gap-4">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl bg-white/10 backdrop-blur-sm border border-white/15 px-5 py-4 sm:py-5"
            >
              <div className="font-display font-extrabold text-2xl sm:text-3xl text-amber-300 tabular-nums">
                {stat.value}
              </div>
              <div className="text-sm font-semibold text-white mt-1">{stat.label}</div>
              <div className="text-xs text-emerald-100/80 mt-0.5">{stat.unit}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
