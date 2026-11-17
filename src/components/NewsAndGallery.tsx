import React, { useState, useEffect, useMemo } from "react";
import {
  Megaphone,
  Search,
  X,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ZoomIn,
  PlayCircle,
} from "lucide-react";
import { GalleryCategory, NewsItem } from "../data/madrasahData";
import { useMadrasah } from "../context/MadrasahContext";
import { SmartImage } from "./SmartImage";

const GALLERY_FILTERS: GalleryCategory[] = [
  "Semua",
  "Belajar",
  "Tahfidz",
  "Ekstrakurikuler",
  "Lomba",
];

export const NewsAndGallery: React.FC = () => {
  const { data } = useMadrasah();
  const { announcements, news, gallery, identity } = data;
  const [searchQuery, setSearchQuery] = useState("");
  const [activeArticle, setActiveArticle] = useState<NewsItem | null>(null);
  const [galleryFilter, setGalleryFilter] = useState<GalleryCategory>("Semua");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredNews = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return news;
    return news.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.category.toLowerCase().includes(q) ||
        item.summary.toLowerCase().includes(q)
    );
  }, [searchQuery, news]);

  const filteredGallery = useMemo(() => {
    if (galleryFilter === "Semua") return gallery;
    return gallery.filter((photo) => photo.category === galleryFilter);
  }, [galleryFilter, gallery]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setActiveArticle(null);
        setLightboxIndex(null);
      } else if (lightboxIndex !== null) {
        if (e.key === "ArrowRight") {
          setLightboxIndex((prev) =>
            prev !== null ? (prev + 1) % filteredGallery.length : null
          );
        } else if (e.key === "ArrowLeft") {
          setLightboxIndex((prev) =>
            prev !== null
              ? (prev - 1 + filteredGallery.length) % filteredGallery.length
              : null
          );
        }
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [lightboxIndex, filteredGallery.length]);

  const currentLightboxPhoto =
    lightboxIndex !== null ? filteredGallery[lightboxIndex] : null;

  return (
    <>
      {/* <!-- SECTION BERITA & PENGUMUMAN --> */}
      <section id="berita" className="py-16 lg:py-24 leaf-dew-band border-y border-emerald-900/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#15803d] tracking-wide">
                Kabar Madrasah
              </p>
              <h2
                className="font-display font-bold text-3xl sm:text-4xl text-[#14532d] mt-2 tracking-tight"
                style={{ textWrap: "balance" }}
              >
                Pengumuman Penting &amp; Berita Terkini
              </h2>
            </div>

            {/* Pencarian Berita */}
            <div className="w-full md:w-80 relative">
              <label htmlFor="news-search" className="sr-only">
                Cari berita madrasah
              </label>
              <Search
                className="w-4 h-4 text-[#4b6b56] absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none"
                aria-hidden="true"
              />
              <input
                id="news-search"
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Cari judul atau topik berita..."
                className="w-full min-h-[44px] pl-10 pr-10 py-2.5 rounded-full bg-white border border-emerald-900/15 text-sm text-[#112a1c] focus:outline-none focus:ring-2 focus:ring-[#15803d] shadow-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Hapus pencarian berita"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#4b6b56] hover:text-[#14532d] p-1"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* 3 Pengumuman Penting */}
          <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
            {announcements.map((ann) => (
              <div
                key={ann.id}
                className="bg-white rounded-2xl p-5 sm:p-6 shadow-sm border border-amber-300/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-600 text-white text-xs font-bold">
                      <Megaphone className="w-3.5 h-3.5" aria-hidden="true" />
                      <span>{ann.tag}</span>
                    </span>
                    <span className="text-xs text-[#4b6b56] font-medium">{ann.date}</span>
                  </div>
                  <h3 className="font-display font-bold text-base text-[#14532d] leading-snug">
                    {ann.title}
                  </h3>
                  <p className="text-sm text-[#2c4435] mt-2 leading-relaxed">{ann.summary}</p>
                </div>
              </div>
            ))}
          </div>

          {/* 6 Kartu Berita */}
          {filteredNews.length === 0 ? (
            <div className="mt-10 bg-white rounded-2xl p-10 text-center border border-emerald-900/10">
              <p className="font-display font-bold text-lg text-[#14532d]">
                Berita tidak ditemukan
              </p>
              <p className="text-sm text-[#4b6b56] mt-1">
                Tidak ada artikel yang cocok dengan kata kunci &ldquo;{searchQuery}&rdquo;.
              </p>
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                className="mt-4 inline-flex items-center px-5 py-2 rounded-full bg-[#14532d] text-white text-sm font-semibold hover:bg-[#15803d] transition-colors"
              >
                Tampilkan Semua Berita
              </button>
            </div>
          ) : (
            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredNews.map((item) => (
                <article
                  key={item.id}
                  className="bg-white rounded-2xl overflow-hidden shadow-sm border border-emerald-900/10 flex flex-col justify-between transition-all duration-200 hover:-translate-y-1 hover:shadow-md"
                >
                  <div>
                    <div className="aspect-[4/3] overflow-hidden bg-[#dcfce7]">
                      <SmartImage
                        src={item.image}
                        alt={item.title}
                        fallbackTitle={item.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 text-xs text-[#4b6b56] font-medium">
                        <span className="text-[#15803d] font-semibold">{item.category}</span>
                        <span aria-hidden="true">·</span>
                        <span>{item.date}</span>
                      </div>
                      <h3 className="font-display font-bold text-lg text-[#14532d] mt-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-sm text-[#2c4435] mt-2.5 leading-relaxed line-clamp-3">
                        {item.summary}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-1">
                    <button
                      type="button"
                      onClick={() => setActiveArticle(item)}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#15803d] hover:text-[#14532d] transition-colors cursor-pointer"
                    >
                      <span>Baca Selengkapnya</span>
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Modal Baca Berita */}
      {activeArticle && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="article-modal-title"
          className="fixed inset-0 z-50 bg-black/65 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setActiveArticle(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-emerald-900/15"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="aspect-[16/9] relative overflow-hidden bg-[#14532d]">
              <SmartImage
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover"
              />
              <button
                type="button"
                onClick={() => setActiveArticle(null)}
                aria-label="Tutup berita"
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 hover:bg-white text-[#14532d] flex items-center justify-center shadow-md cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 sm:p-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2 text-xs text-[#4b6b56] font-medium">
                <span className="text-[#15803d] font-semibold">{activeArticle.category}</span>
                <span aria-hidden="true">·</span>
                <span>{activeArticle.date}</span>
                <span aria-hidden="true">·</span>
                <span>Oleh {activeArticle.author}</span>
              </div>
              <h3
                id="article-modal-title"
                className="font-display font-bold text-2xl text-[#14532d] leading-snug"
              >
                {activeArticle.title}
              </h3>
              <div className="space-y-3 text-sm sm:text-base text-[#2c4435] leading-relaxed pt-2">
                {activeArticle.content.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>
              <div className="pt-4 border-t border-emerald-900/10 flex justify-end">
                <button
                  type="button"
                  onClick={() => setActiveArticle(null)}
                  className="px-6 py-2.5 rounded-full bg-[#14532d] hover:bg-[#15803d] text-white text-sm font-semibold transition-colors cursor-pointer"
                >
                  Tutup Artikel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <!-- SECTION GALERI & VIDEO --> */}
      <section id="galeri" className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="max-w-2xl">
              <p className="text-sm font-semibold text-[#15803d] tracking-wide">
                Dokumentasi Kegiatan
              </p>
              <h2
                className="font-display font-bold text-3xl sm:text-4xl text-[#14532d] mt-2 tracking-tight"
                style={{ textWrap: "balance" }}
              >
                Galeri Foto &amp; Video Profil Madrasah
              </h2>
            </div>

            {/* Filter Galeri */}
            <div
              role="group"
              aria-label="Filter kategori galeri"
              className="flex flex-wrap items-center gap-2"
            >
              {GALLERY_FILTERS.map((category) => (
                <button
                  key={category}
                  type="button"
                  onClick={() => {
                    setGalleryFilter(category);
                    setLightboxIndex(null);
                  }}
                  className={`min-h-[40px] px-4 py-1.5 rounded-full text-xs sm:text-sm font-semibold transition-colors whitespace-nowrap cursor-pointer ${
                    galleryFilter === category
                      ? "bg-[#14532d] text-white shadow-xs"
                      : "bg-white text-[#1e3a28] border border-emerald-900/15 hover:bg-[#dcfce7]/60"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Grid 8 Foto Galeri */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {filteredGallery.map((photo, idx) => (
              <button
                key={photo.id}
                type="button"
                onClick={() => setLightboxIndex(idx)}
                className="group relative bg-white rounded-2xl overflow-hidden shadow-sm border border-emerald-900/10 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532d] cursor-pointer"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#dcfce7]">
                  <SmartImage
                    src={photo.image}
                    alt={photo.title}
                    fallbackTitle={photo.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-gradient-to-t from-[#052e16]/85 via-[#052e16]/20 to-transparent opacity-85 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-4">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[11px] font-semibold text-amber-300">
                      {photo.category}
                    </span>
                    <ZoomIn className="w-4 h-4 text-white/90" aria-hidden="true" />
                  </div>
                  <p className="font-display font-bold text-sm text-white mt-0.5 leading-snug">
                    {photo.title}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* 1 Video Profil Madrasah (16:9 Responsive Embed) */}
          <div className="mt-12 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-emerald-900/10">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 space-y-3">
                <div className="inline-flex items-center gap-2 text-xs font-semibold text-[#15803d]">
                  <PlayCircle className="w-4 h-4" aria-hidden="true" />
                  <span>Video Profil Resmi</span>
                </div>
                <h3 className="font-display font-bold text-2xl text-[#14532d]">
                  Mengintip Suasana Belajar di {identity.namaSingkat}
                </h3>
                <p className="text-sm sm:text-base text-[#2c4435] leading-relaxed">
                  Saksikan keseharian siswa-siswi kami mulai dari pembiasaan sholat dhuha pagi,
                  setoran hafalan Al-Qur&apos;an, pembelajaran kelas Kurikulum Merdeka, hingga
                  kegiatan ekstrakurikuler akhir pekan.
                </p>
                <p className="text-xs text-[#4b6b56]">
                  Kanal Resmi: {identity.youtube}
                </p>
              </div>

              <div className="lg:col-span-7">
                <div className="aspect-video rounded-2xl overflow-hidden bg-[#14532d] border border-emerald-900/10 shadow-md">
                  <iframe
                    src={`https://www.youtube.com/embed/${identity.videoProfilYoutubeId}`}
                    title={`Video Profil ${identity.namaSingkat}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    loading="lazy"
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lightbox Galeri */}
      {currentLightboxPhoto && lightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Pratinjau foto galeri"
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xs flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-[#0b2917] rounded-2xl overflow-hidden border border-white/15 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-5 py-3.5 border-b border-white/10 text-white">
              <div className="text-xs sm:text-sm font-medium text-emerald-100">
                <span className="font-mono text-amber-300 tabular-nums">
                  {lightboxIndex + 1} / {filteredGallery.length}
                </span>
                <span className="mx-2" aria-hidden="true">
                  ·
                </span>
                <span>{currentLightboxPhoto.category}</span>
              </div>
              <button
                type="button"
                onClick={() => setLightboxIndex(null)}
                aria-label="Tutup lightbox"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="relative bg-black flex items-center justify-center">
              <div className="w-full max-h-[68vh] aspect-[4/3] sm:aspect-[16/10]">
                <SmartImage
                  src={currentLightboxPhoto.image}
                  alt={currentLightboxPhoto.title}
                  className="w-full h-full object-contain"
                />
              </div>

              {filteredGallery.length > 1 && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex(
                        (lightboxIndex - 1 + filteredGallery.length) % filteredGallery.length
                      )
                    }
                    aria-label="Foto sebelumnya"
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="w-6 h-6" />
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setLightboxIndex((lightboxIndex + 1) % filteredGallery.length)
                    }
                    aria-label="Foto berikutnya"
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/60 hover:bg-black/85 text-white flex items-center justify-center border border-white/20 transition-colors cursor-pointer"
                  >
                    <ChevronRight className="w-6 h-6" />
                  </button>
                </>
              )}
            </div>

            <div className="px-6 py-4 text-white">
              <h3 className="font-display font-bold text-lg">{currentLightboxPhoto.title}</h3>
              <p className="text-sm text-emerald-100/85 mt-1">
                {currentLightboxPhoto.caption}
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
