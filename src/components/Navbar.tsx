import React, { useState, useEffect } from "react";
import { Menu, X, GraduationCap, ShieldCheck } from "lucide-react";
import { useMadrasah } from "../context/MadrasahContext";

const NAV_LINKS = [
  { label: "Beranda", href: "#beranda" },
  { label: "Profil", href: "#profil" },
  { label: "Program", href: "#program" },
  { label: "Guru", href: "#guru" },
  { label: "PPDB", href: "#ppdb" },
  { label: "Berita", href: "#berita" },
  { label: "Galeri", href: "#galeri" },
  { label: "Kontak", href: "#kontak" },
];

interface NavbarProps {
  onOpenAdmin: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin }) => {
  const { data } = useMadrasah();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-shadow duration-200 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-emerald-900/10"
          : "bg-white/92 backdrop-blur-md border-b border-emerald-900/10"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Zona 1: Logo + Nama Madrasah */}
        <a
          href="#beranda"
          className="flex items-center gap-2.5 shrink-0 whitespace-nowrap focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532d] rounded-lg"
        >
          <span className="w-9 h-9 rounded-xl bg-[#14532d] text-amber-300 flex items-center justify-center shrink-0 shadow-xs">
            <GraduationCap className="w-5 h-5" aria-hidden="true" />
          </span>
          <span className="font-display font-bold text-base sm:text-lg tracking-tight text-[#14532d]">
            {data.identity.namaSingkat}
          </span>
        </a>

        {/* Zona 2: Navigasi Utama Desktop */}
        <nav aria-label="Navigasi Utama" className="hidden lg:flex items-center gap-4 xl:gap-5">
          {NAV_LINKS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[#1e3a28] hover:text-[#15803d] transition-colors whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#15803d]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Zona 3: Tombol Admin, PPDB Online + Hamburger */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            type="button"
            onClick={onOpenAdmin}
            aria-label="Buka Menu Admin"
            className="hidden sm:inline-flex items-center justify-center gap-1.5 px-3.5 py-2 rounded-full border border-emerald-900/20 hover:bg-[#dcfce7]/70 text-[#14532d] font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-[#15803d]" aria-hidden="true" />
            <span>Admin</span>
          </button>

          <a
            href="#ppdb"
            className="inline-flex items-center justify-center px-4 sm:px-5 py-2 rounded-full bg-[#f59e0b] hover:bg-[#d97706] text-[#052e16] font-semibold text-xs sm:text-sm transition-colors whitespace-nowrap shrink-0 shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#14532d]"
          >
            PPDB Online
          </a>

          <button
            type="button"
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav-drawer"
            aria-label={menuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl border border-emerald-900/15 text-[#14532d] hover:bg-[#dcfce7]/60 transition-colors cursor-pointer"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Menu Mobile & Tablet */}
      {menuOpen && (
        <nav
          id="mobile-nav-drawer"
          aria-label="Navigasi Seluler"
          className="lg:hidden bg-white border-t border-emerald-900/10 px-4 py-4 shadow-lg space-y-2.5"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {NAV_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={handleLinkClick}
                className="flex items-center justify-center min-h-[44px] px-3 py-2 rounded-xl text-sm font-medium text-[#14532d] bg-[#f4faf5] hover:bg-[#dcfce7] transition-colors text-center"
              >
                {item.label}
              </a>
            ))}
          </div>
          <button
            type="button"
            onClick={() => {
              setMenuOpen(false);
              onOpenAdmin();
            }}
            className="w-full min-h-[44px] flex items-center justify-center gap-2 rounded-xl bg-[#14532d] text-white text-sm font-semibold cursor-pointer"
          >
            <ShieldCheck className="w-4 h-4 text-amber-300" aria-hidden="true" />
            <span>Menu Admin (Edit, Tambah, Hapus)</span>
          </button>
        </nav>
      )}
    </header>
  );
};
