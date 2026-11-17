// ============================================================================
// DATA IDENTITAS & KONTEN MADRASAH
// Silakan ubah seluruh data di bawah ini sesuai dengan data resmi madrasah Anda.
// Untuk foto, ganti path di bawah dengan foto asli madrasah di folder public/ atau src/assets/images/
// ============================================================================

export interface MadrasahIdentity {
  namaSingkat: string;
  namaLengkap: string;
  jenjang: string;
  nsm: string;
  npsn: string;
  akreditasi: string;
  tahunBerdiri: number;
  kepalaMadrasah: string;
  gelarKepala: string;
  alamatLengkap: string;
  desa: string;
  kecamatan: string;
  kabupaten: string;
  provinsi: string;
  whatsappNumber: string; // Format internasional tanpa + untuk link wa.me
  whatsappDisplay: string;
  email: string;
  instagram: string;
  facebook: string;
  youtube: string;
  jamLayanan: string;
  tahunAjaranPPDB: string;
  videoProfilYoutubeId: string;
  googleMapsEmbedUrl: string;
}

export const MADRASAH_IDENTITY: MadrasahIdentity = {
  namaSingkat: "MI Al-Irsyad Nusantara",
  namaLengkap: "Madrasah Ibtidaiyah Al-Irsyad Nusantara",
  jenjang: "MI (Madrasah Ibtidaiyah)",
  nsm: "111233020045",
  npsn: "60711482",
  akreditasi: "A (Unggul)",
  tahunBerdiri: 1998,
  kepalaMadrasah: "H. Ahmad Fauzan Hakim",
  gelarKepala: "S.Pd.I., M.Pd.",
  alamatLengkap: "Jl. Raya Pesantren No. 28, Desa Sukamaju, Kec. Cileunyi, Kab. Bandung, Jawa Barat 40622",
  desa: "Sukamaju",
  kecamatan: "Cileunyi",
  kabupaten: "Bandung",
  provinsi: "Jawa Barat",
  whatsappNumber: "6281234567890",
  whatsappDisplay: "+62 812-3456-7890",
  email: "info@mialirsyadnusantara.sch.id",
  instagram: "@mialirsyad.nusantara",
  facebook: "MI Al-Irsyad Nusantara Official",
  youtube: "Al-Irsyad Nusantara TV",
  jamLayanan: "Senin – Sabtu, 07.00 – 14.00 WIB",
  tahunAjaranPPDB: "2026/2027",
  // Ganti ID video YouTube ini dengan video profil resmi madrasah
  videoProfilYoutubeId: "ysz5S6PUM-U",
  // Ganti URL embed Google Maps dengan titik lokasi resmi madrasah
  googleMapsEmbedUrl:
    "https://www.google.com/maps?q=-6.9395,107.7245&hl=id&z=15&output=embed",
};

// Ganti foto-foto di bawah dengan foto asli madrasah Anda
export const MADRASAH_IMAGES = {
  // Ganti foto ini dengan foto gerbang/gedung madrasah asli
  campusHero: "/src/assets/images/madrasah_campus_hero_1794953937941.jpg",
  // Ganti foto ini dengan foto kegiatan mengaji / tahfidz siswa asli
  studentsQuran: "/src/assets/images/madrasah_students_quran_1794953939378.jpg",
  // Ganti foto ini dengan foto kegiatan belajar di kelas asli
  classroomStudy: "/src/assets/images/madrasah_classroom_study_1794953939740.jpg",
  // Ganti foto ini dengan foto Kepala Madrasah asli
  principalPortrait: "/src/assets/images/madrasah_principal_portrait_1794953939963.jpg",
  // Ganti foto ini dengan foto ekstrakurikuler hadrah / kaligrafi asli
  hadrahActivity: "/src/assets/images/madrasah_hadrah_activity_1794953940663.jpg",
  // Ganti foto ini dengan foto prestasi / lomba MTQ / olimpiade asli
  competitionTrophy: "/src/assets/images/madrasah_competition_trophy_1794953941298.jpg",
};

export const HERO_STATS = [
  { label: "Siswa Aktif", value: "486", unit: "Peserta Didik" },
  { label: "Guru & Tendik", value: "34", unit: "Pendidik Tersertifikasi" },
  { label: "Rombongan Belajar", value: "18", unit: "Ruang Kelas Nyaman" },
  { label: "Pengalaman Mendidik", value: "1998", unit: "28 Tahun Berkiprah" },
];

export const PROFILE_DATA = {
  sejarah: [
    "MI Al-Irsyad Nusantara didirikan pada tahun 1998 oleh para tokoh masyarakat dan ulama setempat yang memiliki kepedulian mendalam terhadap pendidikan dasar Islam yang berkualitas dan terjangkau.",
    "Berawal dari tiga ruang kelas sederhana dengan 42 santri angkatan pertama, madrasah ini terus bertumbuh melalui dukungan wali murid, komite, serta dedikasi para pendidik hingga memperoleh status Akreditasi A dari Badan Akreditasi Nasional.",
    "Kini MI Al-Irsyad Nusantara memadukan Kurikulum Merdeka Kementerian Agama dengan penguatan Diniyah Takmiliyah dan program Tahfidz Al-Qur'an, melahirkan generasi yang cakap sains sekaligus kokoh akhlaknya.",
  ],
  visi: "Terwujudnya generasi muslim yang beriman kokoh, berilmu luas, hafizh Al-Qur'an, dan berakhlak karimah serta unggul dalam prestasi akademik maupun non-akademik.",
  misi: [
    "Menanamkan akidah Islam Ahlussunnah wal Jama'ah dan pembiasaan ibadah harian sejak dini.",
    "Menyelenggarakan pembelajaran Kurikulum Merdeka yang aktif, mendalam, kreatif, dan menyenangkan.",
    "Membimbing siswa menghafal Al-Qur'an minimal Juz 30 dan Juz 29 dengan bacaan tartil bersanad.",
    "Mengembangkan budaya literasi, numerasi, sains, serta keterampilan abad ke-21 berbasis teknologi.",
    "Membentuk karakter disiplin, jujur, peduli sesama, dan cinta tanah air melalui kegiatan pembiasaan dan ekstrakurikuler.",
  ],
  tujuan:
    "Mencetak lulusan Madrasah Ibtidaiyah yang siap melanjutkan ke jenjang SMP/MTs unggulan maupun pesantren modern dengan bekal hafalan Al-Qur'an, adab Islami yang teruji, serta kemampuan akademik yang kompetitif.",
  nilaiUnggulan: [
    {
      title: "Tahfidz",
      desc: "Setoran hafalan Al-Qur'an harian terukur dengan metode talaqqi dan muraja'ah terstruktur.",
    },
    {
      title: "Akhlak",
      desc: "Pembiasaan adab kepada orang tua, guru, dan sesama dalam seluruh aktivitas madrasah.",
    },
    {
      title: "Literasi",
      desc: "Penguasaan baca tulis Al-Qur'an, literasi Bahasa Indonesia, Arab, dan dasar Bahasa Inggris.",
    },
    {
      title: "Karakter",
      desc: "Kemandirian, kedisiplinan, kepemimpinan, dan kepedulian sosial melalui pramuka dan infaq.",
    },
  ],
};

export interface ProgramItem {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  highlights: string[];
  iconName: "book-open" | "mosque" | "sparkles" | "palette" | "heart" | "trophy";
}

export const PROGRAMS: ProgramItem[] = [
  {
    id: "tahfidz",
    number: "01",
    title: "Tahfidz Al-Qur'an",
    subtitle: "Target Hafalan Terstruktur per Jenjang",
    description:
      "Pembinaan hafalan Al-Qur'an harian menggunakan metode talaqqi dan tasmi' bersama guru tahfidz bersertifikat. Setiap kelas memiliki target hafalan yang terpantau orang tua melalui buku mutaba'ah.",
    highlights: ["Target Juz 30 (Kelas 1–4)", "Target Juz 29 & Surat Pilihan (Kelas 5–6)", "Wisuda & Uji Publik Tahfidz"],
    iconName: "book-open",
  },
  {
    id: "diniyah",
    number: "02",
    title: "Diniyah Takmiliyah Ula (DTU)",
    subtitle: "Penguatan Ilmu Agama Komprehensif",
    description:
      "Kurikulum kepesantrenan dasar yang terintegrasi langsung dalam jadwal harian siswa untuk membangun pemahaman syariat dan wawasan keislaman secara mendalam.",
    highlights: ["Al-Qur'an & Hadis Pilihan", "Aqidah, Akhlak & Fiqih Ibadah", "SKI & Dasar Bahasa Arab"],
    iconName: "mosque",
  },
  {
    id: "kurikulum",
    number: "03",
    title: "Kurikulum Merdeka + Pembelajaran Mendalam",
    subtitle: "Mindful, Meaningful & Joyful Learning",
    description:
      "Pendekatan belajar yang menghargai keunikan potensi setiap anak melalui proyek P5-PPRA, eksperimen sains sederhana, dan diskusi aktif di ruang kelas yang nyaman.",
    highlights: ["Pendekatan Mindful & Joyful", "Proyek Profil Pelajar Rahmatan lil 'Alamin", "Asesmen Diagnostik Berkala"],
    iconName: "sparkles",
  },
  {
    id: "ekskul",
    number: "04",
    title: "Ekstrakurikuler Bakat & Minat",
    subtitle: "Penyaluran Potensi Non-Akademik",
    description:
      "Wadah pengembangan kreativitas, seni budaya Islam, kepemimpinan, olahraga, dan literasi digital setiap akhir pekan bersama pelatih berpengalaman.",
    highlights: ["Pramuka & Kepanduan", "Hadrah, Rebana & Kaligrafi", "Robotik Dasar, Komputer & Panahan"],
    iconName: "palette",
  },
  {
    id: "karakter",
    number: "05",
    title: "Pembinaan Karakter & Ibadah",
    subtitle: "Pembiasaan Harian di Lingkungan Madrasah",
    description:
      "Pendidikan karakter tidak sekadar teori di buku, melainkan dipraktikkan setiap pagi sebelum dan sesudah kegiatan belajar mengajar berlangsung.",
    highlights: ["Sholat Dhuha & Dzuhur Berjamaah", "Zikir Pagi & Doa Harian", "Infaq Jumat & Bakti Sosial"],
    iconName: "heart",
  },
  {
    id: "prestasi",
    number: "06",
    title: "Bimbingan Prestasi & Olimpiade",
    subtitle: "Klinik Kompetisi Akademik & Keagamaan",
    description:
      "Program pembinaan intensif bagi siswa berpotensi untuk mewakili madrasah pada berbagai ajang kompetisi tingkat kecamatan, kabupaten, hingga provinsi.",
    highlights: ["Bimbingan MTQ & MHQ", "KSM & Olimpiade Sains/Matematika", "Pidato 3 Bahasa & Cerdas Cermat"],
    iconName: "trophy",
  },
];

export interface ClassLevel {
  kelas: string;
  rombel: string;
  waliKelas: string;
  jumlahSiswa: number;
  programKhusus: string;
}

export const CLASS_LEVELS: ClassLevel[] = [
  {
    kelas: "Kelas 1",
    rombel: "3 Rombel (1A, 1B, 1C)",
    waliKelas: "Ustadzah Siti Aminah, S.Pd.I.",
    jumlahSiswa: 82,
    programKhusus: "Calistung Menyenangkan, Tahsin Metode Ummi & Hafalan An-Naba – Al-Balad",
  },
  {
    kelas: "Kelas 2",
    rombel: "3 Rombel (2A, 2B, 2C)",
    waliKelas: "Ustadzah Nurul Hidayati, S.Pd.",
    jumlahSiswa: 84,
    programKhusus: "Pembiasaan Sholat Fardhu, Hafalan Juz 30 Lanjutan & Dasar Bahasa Arab",
  },
  {
    kelas: "Kelas 3",
    rombel: "3 Rombel (3A, 3B, 3C)",
    waliKelas: "Ustadz M. Ridwan Kamil, S.Pd.I.",
    jumlahSiswa: 80,
    programKhusus: "Target Khatam Juz 30, Praktik Wudhu & Proyek Literasi Sains",
  },
  {
    kelas: "Kelas 4",
    rombel: "3 Rombel (4A, 4B, 4C)",
    waliKelas: "Ustadzah Ratna Dewi Sari, S.Pd.",
    jumlahSiswa: 81,
    programKhusus: "Tahfidz Juz 29 Awal, Diniyah Fiqih Ibadah & Dasar Komputer",
  },
  {
    kelas: "Kelas 5",
    rombel: "3 Rombel (5A, 5B, 5C)",
    waliKelas: "Ustadz Hendra Wijaya, M.Pd.",
    jumlahSiswa: 79,
    programKhusus: "Klinik Olimpiade KSM, Leadership Pramuka & Hafalan Surat Pilihan",
  },
  {
    kelas: "Kelas 6",
    rombel: "3 Rombel (6A, 6B, 6C)",
    waliKelas: "Ustadzah Hj. Khadijah, S.Ag.",
    jumlahSiswa: 80,
    programKhusus: "Persiapan Asesmen Madrasah, Munaqosyah Tahfidz & Bimbingan Lanjut SMP/MTs",
  },
];

export const STUDY_HOURS = [
  {
    hari: "Senin – Kamis",
    waktu: "07.00 – 13.30 WIB",
    keterangan: "Sholat Dhuha, Diniyah, Kurikulum Merdeka & Dzuhur Berjamaah",
  },
  {
    hari: "Jumat",
    waktu: "07.00 – 11.15 WIB",
    keterangan: "Zikir Pagi, Infaq Jumat, Yasin/Al-Kahfi Bersama & Pembelajaran Tematik",
  },
  {
    hari: "Sabtu",
    waktu: "07.00 – 12.00 WIB",
    keterangan: "Senam Pagi, Pramuka, Hadrah, Kaligrafi, Robotik & Bimbingan Prestasi",
  },
];

export interface TeacherItem {
  id: string;
  nama: string;
  jabatan: string;
  pendidikan: string;
  bidang: string;
  foto: string;
  inisial: string;
}

export const TEACHERS: TeacherItem[] = [
  {
    id: "t1",
    nama: "H. Ahmad Fauzan Hakim, S.Pd.I., M.Pd.",
    jabatan: "Kepala Madrasah",
    pendidikan: "S2 Manajemen Pendidikan Islam",
    bidang: "Kepemimpinan & Supervisi Kurikulum",
    foto: MADRASAH_IMAGES.principalPortrait,
    inisial: "AF",
  },
  {
    id: "t2",
    nama: "Ustadzah Hj. Khadijah Munawaroh, S.Ag.",
    jabatan: "Waka Kurikulum & Guru PAI",
    pendidikan: "S1 Pendidikan Agama Islam",
    bidang: "Aqidah Akhlak & Fiqih Ibadah",
    foto: MADRASAH_IMAGES.studentsQuran,
    inisial: "KM",
  },
  {
    id: "t3",
    nama: "Ustadz Abdul Mughni, Al-Hafidz, S.Pd.I.",
    jabatan: "Koordinator & Guru Tahfidz",
    pendidikan: "S1 Ilmu Al-Qur'an & Tafsir",
    bidang: "Tahfidz 30 Juz & Tahsin Metode Ummi",
    foto: MADRASAH_IMAGES.studentsQuran,
    inisial: "AM",
  },
  {
    id: "t4",
    nama: "Ustadzah Ratna Dewi Sari, S.Pd.",
    jabatan: "Guru Kelas & Pembina Sains",
    pendidikan: "S1 Pendidikan Guru Madrasah Ibtidaiyah",
    bidang: "Matematika, IPAS & Bimbingan KSM",
    foto: MADRASAH_IMAGES.classroomStudy,
    inisial: "RD",
  },
  {
    id: "t5",
    nama: "Ustadz M. Ridwan Kamil, S.Pd.I.",
    jabatan: "Guru Bahasa Arab & Pembina Ekskul",
    pendidikan: "S1 Pendidikan Bahasa Arab",
    bidang: "Bahasa Arab, Pramuka & Hadrah",
    foto: MADRASAH_IMAGES.hadrahActivity,
    inisial: "RK",
  },
  {
    id: "t6",
    nama: "Fajar Pratama Nugraha, S.Kom.",
    jabatan: "Kepala Tata Usaha & Operator",
    pendidikan: "S1 Teknik Informatika",
    bidang: "EMIS, Layanan PPDB & Lab Komputer",
    foto: MADRASAH_IMAGES.campusHero,
    inisial: "FP",
  },
];

export const PRINCIPAL_MESSAGE = {
  quote:
    "Assalamu'alaikum warahmatullahi wabarakatuh. Di era perkembangan zaman yang serba cepat, anak-anak kita membutuhkan fondasi iman yang kokoh sekaligus bekal kecakapan ilmu pengetahuan yang relevan. Di MI Al-Irsyad Nusantara, kami berkomitmen mendampingi setiap putra-putri Bapak/Ibu agar tumbuh menjadi pribadi yang mencintai Al-Qur'an, santun dalam bertutur kata, serta percaya diri meraih cita-cita terbaiknya.",
  nama: "H. Ahmad Fauzan Hakim, S.Pd.I., M.Pd.",
  jabatan: "Kepala MI Al-Irsyad Nusantara",
};

export const PPDB_INFO = {
  jadwal: [
    { tahap: "Gelombang 1", tanggal: "1 Desember 2025 – 28 Februari 2026", status: "Dibuka" },
    { tahap: "Gelombang 2", tanggal: "1 Maret 2026 – 30 Juni 2026", status: "Segera" },
    { tahap: "Observasi & Pemetaan", tanggal: "Setiap Sabtu pukul 08.00 – 11.00 WIB", status: "Terjadwal" },
  ],
  syaratUmum: [
    "Beragama Islam dan siap mengikuti program pembiasaan ibadah & tahfidz.",
    "Berusia minimal 6 tahun pada tanggal 1 Juli 2026 (prioritas 6,5–7 tahun).",
    "Mengisi formulir pendaftaran secara online atau langsung di sekretariat madrasah.",
    "Mengikuti kegiatan observasi kesiapan belajar bersama orang tua.",
  ],
  dokumen: [
    "Fotokopi Kartu Keluarga (KK) terbaru — 2 lembar",
    "Fotokopi Akta Kelahiran calon siswa — 2 lembar",
    "Fotokopi KTP Ayah & Ibu — masing-masing 1 lembar",
    "Pas foto berwarna ukuran 3x4 latar belakang merah — 4 lembar",
    "Surat Keterangan / Ijazah TK/RA/PAUD (jika sudah ada)",
  ],
  biaya: "Pendaftaran Formulir GRATIS (Rp 0). Rincian infaq pengembangan pendidikan & seragam diinformasikan transparan saat verifikasi berkas, dengan program beasiswa yatim/dhuafa serta potongan khusus hafizh.",
  alur: [
    {
      step: "01",
      title: "Isi Formulir Online",
      desc: "Lengkapi data calon siswa dan orang tua melalui formulir PPDB di halaman ini.",
    },
    {
      step: "02",
      title: "Verifikasi Berkas",
      desc: "Konfirmasi via WhatsApp dan serahkan fotokopi berkas ke sekretariat madrasah.",
    },
    {
      step: "03",
      title: "Observasi & Pemetaan",
      desc: "Pengenalan lingkungan belajar santai untuk melihat kesiapan motorik dan bacaan anak.",
    },
    {
      step: "04",
      title: "Pengumuman & Daftar Ulang",
      desc: "Hasil seleksi disampaikan via WhatsApp resmi madrasah dalam 3 hari kerja.",
    },
  ],
};

export interface AnnouncementItem {
  id: string;
  title: string;
  date: string;
  summary: string;
  tag: string;
}

export const ANNOUNCEMENTS: AnnouncementItem[] = [
  {
    id: "ann-1",
    title: "Pendaftaran Peserta Didik Baru (PPDB) Tahun Ajaran 2026/2027 Resmi Dibuka",
    date: "10 November 2026",
    summary: "Gelombang 1 dibuka hingga kuota 84 siswa baru terpenuhi. Tersedia Program Reguler dan Kelas Khusus Tahfidz.",
    tag: "Penting",
  },
  {
    id: "ann-2",
    title: "Jadwal Uji Publik & Tasmi' Hafalan Juz 30 Semester Ganjil",
    date: "04 November 2026",
    summary: "Dilaksanakan pada Sabtu, 28 November 2026 di Aula Utama Madrasah bersama wali murid kelas 3–6.",
    tag: "Penting",
  },
  {
    id: "ann-3",
    title: "Pengumpulan Berkas Beasiswa Prestasi & KIP Madrasah Tahap II",
    date: "29 Oktober 2026",
    summary: "Wali murid penerima manfaat dimohon menyerahkan kelengkapan administrasi ke Ruang Tata Usaha maksimal pukul 13.00 WIB.",
    tag: "Penting",
  },
];

export interface NewsItem {
  id: string;
  title: string;
  date: string;
  category: string;
  author: string;
  image: string;
  summary: string;
  content: string[];
}

export const NEWS_ITEMS: NewsItem[] = [
  {
    id: "news-1",
    title: "Penerimaan Santri Baru Tahun Ajaran 2026/2027 Dibuka dengan Kuota Terbatas",
    date: "14 November 2026",
    category: "PPDB",
    author: "Panitia PPDB",
    image: MADRASAH_IMAGES.campusHero,
    summary:
      "MI Al-Irsyad Nusantara membuka pendaftaran siswa baru untuk program Reguler dan Tahfidz. Orang tua dapat mendaftar secara daring tanpa dipungut biaya formulir.",
    content: [
      "Panitia Penerimaan Peserta Didik Baru (PPDB) MI Al-Irsyad Nusantara resmi membuka pendaftaran untuk tahun ajaran 2026/2027 mulai gelombang pertama.",
      "Tahun ini madrasah menyediakan 3 rombongan belajar kelas 1 dengan kapasitas maksimal 28 siswa per kelas agar pendampingan guru kelas dan guru tahfidz tetap optimal.",
      "Calon wali murid dapat mengisi formulir PPDB online langsung di website madrasah dan melakukan konfirmasi jadwal observasi melalui nomor WhatsApp resmi panitia.",
    ],
  },
  {
    id: "news-2",
    title: "Khidmatnya Peringatan Maulid Nabi Muhammad SAW Bersama Seluruh Siswa dan Wali Murid",
    date: "02 November 2026",
    category: "Keagamaan",
    author: "Tim Kesiswaan",
    image: MADRASAH_IMAGES.hadrahActivity,
    summary:
      "Acara diisi dengan lantunan sholawat tim Hadrah siswa, tausiyah akhlak mulia, serta pembagian santunan bagi siswa yatim di lingkungan madrasah.",
    content: [
      "Halaman utama MI Al-Irsyad Nusantara dipenuhi suasana syahdu saat peringatan Maulid Nabi Muhammad SAW diselenggarakan bersama komite sekolah dan orang tua.",
      "Tim Hadrah Al-Irsyad yang terdiri dari siswa kelas 4 hingga 6 tampil memukau membawakan qasidah sholawat pembuka acara, dilanjutkan dengan dongeng keteladanan Rasulullah SAW.",
      "Kegiatan ditutup dengan doa bersama dan penyaluran infaq jumat siswa untuk santunan anak yatim serta warga prasejahtera di sekitar Desa Sukamaju.",
    ],
  },
  {
    id: "news-3",
    title: "Siswa MI Al-Irsyad Nusantara Raih Juara Umum Lomba MTQ & KSM Tingkat Kecamatan",
    date: "22 Oktober 2026",
    category: "Prestasi",
    author: "Humas Madrasah",
    image: MADRASAH_IMAGES.competitionTrophy,
    summary:
      "Kontingen madrasah berhasil membawa pulang 5 piala emas dari cabang Tartil Al-Qur'an, MHQ 1 Juz, Pidato Bahasa Arab, dan Matematika Terintegrasi.",
    content: [
      "Kabar membanggakan datang dari ajang Musabaqah Tilawatil Qur'an (MTQ) dan Kompetisi Sains Madrasah (KSM) tingkat Kecamatan Cileunyi tahun 2026.",
      "Delegasi MI Al-Irsyad Nusantara berhasil meraih Juara 1 pada cabang MHQ Putra, Juara 1 Tartil Putri, Juara 1 KSM Matematika Terintegrasi, serta Juara 2 Pidato Islami.",
      "Kepala Madrasah menyampaikan apresiasi tinggi kepada para siswa dan pembimbing yang telah berlatih tekun selama tiga bulan terakhir.",
    ],
  },
  {
    id: "news-4",
    title: "Khataman Al-Qur'an dan Imtihan Metode Ummi Diikuti 68 Siswa Kelas Akhir",
    date: "12 Oktober 2026",
    category: "Tahfidz",
    author: "Tim Tahfidz",
    image: MADRASAH_IMAGES.studentsQuran,
    summary:
      "Sebanyak 68 siswa dinyatakan lulus munaqosyah tartil dan hafalan Juz 30 di hadapan tim penguji eksternal serta disaksikan langsung oleh orang tua.",
    content: [
      "Suasana haru menyelimuti prosesi Khataman Al-Qur'an dan Imtihan ke-11 yang digelar di masjid lingkungan MI Al-Irsyad Nusantara.",
      "Para peserta diuji secara terbuka mengenai kelancaran hafalan surat-surat Juz 30, ketepatan tajwid, serta pemahaman gharib dan tajwid dasar.",
      "Program ini merupakan wujud komitmen madrasah memastikan setiap lulusan mampu membaca Al-Qur'an dengan tartil sebelum melangkah ke jenjang SMP atau MTs.",
    ],
  },
  {
    id: "news-5",
    title: "Gerakan Jumat Berkah & Bakti Sosial Wujudkan Kepedulian Sosial Sejak Dini",
    date: "03 Oktober 2026",
    category: "Karakter",
    author: "Pembina Karakter",
    image: MADRASAH_IMAGES.classroomStudy,
    summary:
      "Melalui program Infaq Jumat rutin, siswa menyalurkan 150 paket sembako dan alat tulis kepada warga lansia serta anak-anak di sekitar desa.",
    content: [
      "Pembiasaan karakter peduli sesama kembali diwujudkan melalui kegiatan Bakti Sosial Triwulanan yang dikelola langsung oleh perwakilan siswa dan guru pembina.",
      "Dana yang terkumpul berasal dari penyisihan uang jajan siswa setiap hari Jumat yang dikumpulkan dengan penuh keikhlasan.",
      "Anak-anak belajar merasakan indahnya berbagi secara langsung dengan menyapa warga sekitar madrasah.",
    ],
  },
  {
    id: "news-6",
    title: "Wisuda Tahfidz Angkatan XII: Melahirkan Generasi Qur'ani Berprestasi",
    date: "18 September 2026",
    category: "Tahfidz",
    author: "Humas Madrasah",
    image: MADRASAH_IMAGES.studentsQuran,
    summary:
      "Sebanyak 42 hafizh cilik kategori 2 Juz dan 3 Juz menerima syahadah penghargaan pada puncak acara Wisuda Tahfidz tahun ini.",
    content: [
      "Wisuda Tahfidz Angkatan XII menjadi momentum penting bagi keluarga besar MI Al-Irsyad Nusantara dalam merayakan capaian hafalan para santri.",
      "Selain penyematan mahkota simbolik kepada orang tua sebagai bentuk bakti anak, madrasah juga memberikan beasiswa bebas SPP selama satu semester bagi tiga peraih nilai tasmi' terbaik.",
    ],
  },
];

export type GalleryCategory = "Semua" | "Belajar" | "Tahfidz" | "Ekstrakurikuler" | "Lomba";

export interface GalleryPhoto {
  id: string;
  title: string;
  category: Exclude<GalleryCategory, "Semua">;
  caption: string;
  image: string;
}

export const GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "g1",
    title: "Setoran Tahfidz Pagi di Masjid Madrasah",
    category: "Tahfidz",
    caption: "Siswa kelas 4 melaksanakan setoran hafalan Juz 30 secara talaqqi bersama guru pembimbing.",
    image: MADRASAH_IMAGES.studentsQuran,
  },
  {
    id: "g2",
    title: "Diskusi Kelompok Pembelajaran Mendalam",
    category: "Belajar",
    caption: "Siswa berkolaborasi memecahkan proyek IPAS Kurikulum Merdeka dengan suasana ceria.",
    image: MADRASAH_IMAGES.classroomStudy,
  },
  {
    id: "g3",
    title: "Latihan Hadrah & Seni Kaligrafi Islam",
    category: "Ekstrakurikuler",
    caption: "Kegiatan ekstrakurikuler rutin setiap Sabtu pagi melatih seni musik islami dan kaligrafi.",
    image: MADRASAH_IMAGES.hadrahActivity,
  },
  {
    id: "g4",
    title: "Juara Umum MTQ & Olimpiade KSM",
    category: "Lomba",
    caption: "Kebanggaan siswa MI Al-Irsyad Nusantara membawa pulang piala juara tingkat kecamatan.",
    image: MADRASAH_IMAGES.competitionTrophy,
  },
  {
    id: "g5",
    title: "Lingkungan Kampus Hijau & Asri",
    category: "Belajar",
    caption: "Suasana halaman madrasah yang teduh, bersih, dan ramah anak di pagi hari.",
    image: MADRASAH_IMAGES.campusHero,
  },
  {
    id: "g6",
    title: "Tasmi' Al-Qur'an Terbuka",
    category: "Tahfidz",
    caption: "Pembinaan tartil dan pelancaran bacaan Al-Qur'an dalam kelompok kecil.",
    image: MADRASAH_IMAGES.studentsQuran,
  },
  {
    id: "g7",
    title: "Praktikum Literasi & Sains Terpadu",
    category: "Belajar",
    caption: "Pembelajaran bermakna di kelas dengan media belajar konkret dan interaktif.",
    image: MADRASAH_IMAGES.classroomStudy,
  },
  {
    id: "g8",
    title: "Pementasan Tim Rebana & Seni Islami",
    category: "Ekstrakurikuler",
    caption: "Persiapan tim seni hadrah menjelang festival seni madrasah tingkat kabupaten.",
    image: MADRASAH_IMAGES.hadrahActivity,
  },
];

export interface FaqItem {
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: "Apakah madrasah menyediakan layanan antar jemput siswa?",
    answer:
      "Ya, bekerja sama dengan paguyuban transportasi wali murid, tersedia layanan antar jemput armada terverifikasi untuk rute sekitar Kecamatan Cileunyi, Rancaekek, dan Jatinangor dengan biaya terjangkau yang disepakati langsung bersama koordinator armada.",
  },
  {
    question: "Apakah tersedia program beasiswa bagi siswa berprestasi atau kurang mampu?",
    answer:
      "Tersedia. MI Al-Irsyad Nusantara menyalurkan Program Indonesia Pintar (PIP) Kemenag, beasiswa bebas SPP penuh bagi anak yatim dan dhuafa, serta apresiasi potongan biaya bagi peraih prestasi MTQ/KSM dan hafalan Al-Qur'an terbaik.",
  },
  {
    question: "Apakah madrasah ini memiliki fasilitas asrama?",
    answer:
      "Saat ini MI Al-Irsyad Nusantara menyelenggarakan pendidikan reguler pulang-pergi (full day hingga pukul 13.30 WIB). Bagi keluarga dari luar kota yang menginginkan program mukim, kami memiliki kerja sama pembinaan dengan Pondok Pesantren Tahfidz Al-Hidayah yang berjarak 300 meter dari madrasah.",
  },
  {
    question: "Bagaimana cara mendaftar PPDB Online di MI Al-Irsyad Nusantara?",
    answer:
      "Orang tua cukup mengisi Formulir PPDB Online yang tersedia di bagian PPDB pada website ini, lalu menekan tombol kirim dan konfirmasi via WhatsApp. Panitia akan menjadwalkan penyerahan fotokopi berkas dan observasi kesiapan anak.",
  },
  {
    question: "Apakah semua siswa wajib mengikuti program tahfidz Al-Qur'an?",
    answer:
      "Benar. Seluruh siswa mengikuti pembinaan Tahfidz Reguler dengan target minimal hafal Juz 30 saat lulus. Bagi siswa yang ingin menambah target hafalan hingga 3–5 Juz tersedia pilihan Kelas Khusus Tahfidz.",
  },
];
