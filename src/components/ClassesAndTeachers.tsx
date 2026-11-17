import React from "react";
import { Clock, GraduationCap, Users } from "lucide-react";
import { useMadrasah } from "../context/MadrasahContext";
import { SmartImage } from "./SmartImage";

export const ClassesAndTeachers: React.FC = () => {
  const { data } = useMadrasah();
  const { classLevels, studyHours, principalMessage, teachers, images } = data;

  return (
    <>
      {/* <!-- SECTION JENJANG & KELAS --> */}
      <section id="jenjang" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#15803d] tracking-wide">
              Jenjang &amp; Rombongan Belajar
            </p>
            <h2
              className="font-display font-bold text-3xl sm:text-4xl text-[#14532d] mt-2 tracking-tight"
              style={{ textWrap: "balance" }}
            >
              Struktur Kelas 1 s.d. Kelas 6 &amp; Jadwal Belajar
            </h2>
            <p className="text-base text-[#3b5946] mt-3 leading-relaxed">
              Setiap jenjang dibimbing oleh wali kelas dan tim guru tahfidz dengan rasio pendampingan
              yang terjaga agar perkembangan akademik dan adab siswa terpantau optimal.
            </p>
          </div>

          {/* Tabel Kelas (Desktop & Tablet) */}
          <div className="mt-10 hidden md:block bg-white rounded-2xl shadow-sm border border-emerald-900/10 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="bg-[#14532d] text-white text-xs sm:text-sm font-semibold">
                    <th className="py-4 px-5">Jenjang Kelas</th>
                    <th className="py-4 px-5">Wali Kelas Koordinator</th>
                    <th className="py-4 px-5 text-center">Jumlah Siswa</th>
                    <th className="py-4 px-5">Program Khusus</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-900/10 text-sm">
                  {classLevels.map((row, idx) => (
                    <tr
                      key={`${row.kelas}-${idx}`}
                      className="hover:bg-[#f4faf5] transition-colors"
                    >
                      <td className="py-4 px-5 align-top whitespace-nowrap">
                        <div className="font-display font-bold text-[#14532d]">{row.kelas}</div>
                        <div className="text-xs text-[#4b6b56] mt-0.5">{row.rombel}</div>
                      </td>
                      <td className="py-4 px-5 align-top font-medium text-[#112a1c]">
                        {row.waliKelas}
                      </td>
                      <td className="py-4 px-5 align-top text-center">
                        <span className="font-mono font-semibold text-[#14532d] tabular-nums">
                          {row.jumlahSiswa}
                        </span>
                        <span className="text-xs text-[#4b6b56] ml-1">siswa</span>
                      </td>
                      <td className="py-4 px-5 align-top text-[#2c4435] leading-relaxed">
                        {row.programKhusus}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Kartu Kelas (Mobile 360px - 767px) */}
          <div className="mt-8 grid grid-cols-1 gap-4 md:hidden">
            {classLevels.map((row, idx) => (
              <div
                key={`${row.kelas}-${idx}`}
                className="bg-white rounded-2xl p-5 shadow-sm border border-emerald-900/10 space-y-2.5"
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <h3 className="font-display font-bold text-lg text-[#14532d]">
                      {row.kelas}
                    </h3>
                    <p className="text-xs text-[#4b6b56]">{row.rombel}</p>
                  </div>
                  <div className="inline-flex items-center gap-1.5 text-sm font-mono font-bold text-[#14532d] bg-[#dcfce7] px-3 py-1 rounded-full tabular-nums">
                    <Users className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>{row.jumlahSiswa}</span>
                  </div>
                </div>
                <p className="text-xs font-medium text-[#112a1c]">
                  Wali Kelas: {row.waliKelas}
                </p>
                <p className="text-sm text-[#2c4435] leading-relaxed pt-2 border-t border-emerald-900/10">
                  {row.programKhusus}
                </p>
              </div>
            ))}
          </div>

          {/* Informasi Jam Belajar */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-5">
            {studyHours.map((item) => (
              <div
                key={item.hari}
                className="bg-white rounded-2xl p-6 shadow-sm border border-emerald-900/10 flex flex-col justify-between"
              >
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-xl bg-[#dcfce7] text-[#14532d] flex items-center justify-center shrink-0">
                    <Clock className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <div>
                    <h3 className="font-display font-bold text-base text-[#14532d]">
                      {item.hari}
                    </h3>
                    <p className="font-mono text-sm font-semibold text-[#b45309] tabular-nums">
                      {item.waktu}
                    </p>
                  </div>
                </div>
                <p className="text-sm text-[#2c4435] mt-3.5 leading-relaxed">
                  {item.keterangan}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* <!-- SECTION GURU & TENAGA KEPENDIDIKAN --> */}
      <section id="guru" className="py-16 lg:py-24 bg-[#eef8f0]/80 border-y border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#15803d] tracking-wide">
              Pimpinan &amp; Pendidik
            </p>
            <h2
              className="font-display font-bold text-3xl sm:text-4xl text-[#14532d] mt-2 tracking-tight"
              style={{ textWrap: "balance" }}
            >
              Guru &amp; Tenaga Kependidikan Berdedikasi
            </h2>
          </div>

          {/* Kata Sambutan Kepala Madrasah */}
          <div className="mt-10 bg-white rounded-2xl p-6 sm:p-8 lg:p-10 shadow-sm border border-emerald-900/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-4">
                <div className="aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden border border-emerald-900/10 shadow-md">
                  <SmartImage
                    src={images.principalPortrait}
                    alt={`Foto ${principalMessage.nama}, ${principalMessage.jabatan}`}
                    fallbackTitle={principalMessage.nama}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              <div className="lg:col-span-8 space-y-5">
                <p className="text-xs font-semibold uppercase tracking-wider text-[#15803d]">
                  Sambutan Kepala Madrasah
                </p>
                <blockquote className="text-base sm:text-lg text-[#1e3a28] leading-relaxed">
                  &ldquo;{principalMessage.quote}&rdquo;
                </blockquote>
                <div className="pt-4 border-t border-emerald-900/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <p className="font-display font-bold text-lg text-[#14532d]">
                      {principalMessage.nama}
                    </p>
                    <p className="text-sm text-[#4b6b56]">{principalMessage.jabatan}</p>
                  </div>
                  <p className="font-serif italic text-xl text-[#15803d] select-none">
                    {principalMessage.nama.split(",")[0]}
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Grid Minimal 6 Guru & Tendik */}
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {teachers.map((teacher) => (
              <article
                key={teacher.id}
                className="bg-white rounded-2xl overflow-hidden shadow-sm border border-emerald-900/10 transition-all duration-200 hover:-translate-y-1 hover:shadow-md flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#dcfce7]">
                  <SmartImage
                    src={teacher.foto}
                    alt={`${teacher.nama} - ${teacher.jabatan}`}
                    fallbackTitle={teacher.nama}
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-xs font-semibold text-[#15803d]">
                      {teacher.jabatan}
                    </p>
                    <h3 className="font-display font-bold text-lg text-[#14532d] mt-1 leading-snug">
                      {teacher.nama}
                    </h3>
                    <p className="text-sm text-[#2c4435] mt-2">{teacher.bidang}</p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-emerald-900/10 flex items-center gap-2 text-xs text-[#4b6b56]">
                    <GraduationCap className="w-4 h-4 text-[#15803d] shrink-0" aria-hidden="true" />
                    <span>{teacher.pendidikan}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
};
