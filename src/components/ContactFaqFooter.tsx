import React, { useState, useEffect } from "react";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ChevronDown,
  ArrowUp,
  MessageCircle,
  GraduationCap,
  Instagram,
  Facebook,
  Youtube,
  ShieldCheck,
} from "lucide-react";
import { useMadrasah } from "../context/MadrasahContext";

interface ContactFaqFooterProps {
  onOpenAdmin: () => void;
}

export const ContactFaqFooter: React.FC<ContactFaqFooterProps> = ({ onOpenAdmin }) => {
  const { data } = useMadrasah();
  const { identity, faqs } = data;
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setShowBackToTop(window.scrollY > 450);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const waGeneralUrl = `https://wa.me/${identity.whatsappNumber}?text=${encodeURIComponent(
    `Assalamu'alaikum Admin ${identity.namaSingkat}, saya ingin bertanya informasi mengenai madrasah dan PPDB.`
  )}`;

  return (
    <>
      {/* <!-- SECTION KONTAK, LOKASI & FAQ --> */}
      <section
        id="kontak"
        className="py-16 lg:py-24 leaf-dew-band border-t border-emerald-900/10"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-sm font-semibold text-[#15803d] tracking-wide">
              Hubungi Kami &amp; Tanya Jawab
            </p>
            <h2
              className="font-display font-bold text-3xl sm:text-4xl text-[#14532d] mt-2 tracking-tight"
              style={{ textWrap: "balance" }}
            >
              Lokasi Madrasah, Layanan Informasi &amp; FAQ
            </h2>
          </div>

          <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Informasi Kontak & Peta */}
            <div className="lg:col-span-6 space-y-6">
              <div className="bg-white rounded-2xl p-6 sm:p-7 shadow-sm border border-emerald-900/10 space-y-4">
                <h3 className="font-display font-bold text-xl text-[#14532d]">
                  Sekretariat &amp; Layanan Orang Tua
                </h3>

                <div className="space-y-3.5 text-sm text-[#2c4435]">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#15803d] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[#112a1c]">Alamat Madrasah</p>
                      <p className="mt-0.5 leading-relaxed">{identity.alamatLengkap}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Phone className="w-5 h-5 text-[#15803d] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[#112a1c]">Telepon &amp; WhatsApp Resmi</p>
                      <a
                        href={waGeneralUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-mono font-semibold text-[#15803d] hover:underline mt-0.5 inline-block"
                      >
                        {identity.whatsappDisplay}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Mail className="w-5 h-5 text-[#15803d] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[#112a1c]">Email Resmi</p>
                      <a
                        href={`mailto:${identity.email}`}
                        className="text-[#15803d] hover:underline mt-0.5 inline-block"
                      >
                        {identity.email}
                      </a>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock className="w-5 h-5 text-[#15803d] shrink-0 mt-0.5" aria-hidden="true" />
                    <div>
                      <p className="font-semibold text-[#112a1c]">Jam Layanan Tata Usaha</p>
                      <p className="mt-0.5">{identity.jamLayanan}</p>
                    </div>
                  </div>
                </div>

                {/* Media Sosial */}
                <div className="pt-4 border-t border-emerald-900/10 flex flex-wrap gap-3 text-xs font-semibold">
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#f4faf5] text-[#14532d] border border-emerald-900/10">
                    <Instagram className="w-4 h-4 text-[#15803d]" aria-hidden="true" />
                    <span>{identity.instagram}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#f4faf5] text-[#14532d] border border-emerald-900/10">
                    <Facebook className="w-4 h-4 text-[#15803d]" aria-hidden="true" />
                    <span>{identity.facebook}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#f4faf5] text-[#14532d] border border-emerald-900/10">
                    <Youtube className="w-4 h-4 text-[#15803d]" aria-hidden="true" />
                    <span>{identity.youtube}</span>
                  </span>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="bg-white rounded-2xl p-2 shadow-sm border border-emerald-900/10">
                <div className="aspect-[16/10] rounded-xl overflow-hidden bg-[#dcfce7]">
                  <iframe
                    src={identity.googleMapsEmbedUrl}
                    title={`Peta Lokasi ${identity.namaSingkat}`}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    className="w-full h-full border-0"
                  />
                </div>
              </div>
            </div>

            {/* Accordion FAQ */}
            <div className="lg:col-span-6 bg-white rounded-2xl p-6 sm:p-8 shadow-sm border border-emerald-900/10">
              <h3 className="font-display font-bold text-xl text-[#14532d] mb-2">
                Pertanyaan yang Sering Diajukan (FAQ)
              </h3>
              <p className="text-sm text-[#4b6b56] mb-6">
                Jawaban cepat seputar fasilitas, beasiswa, program tahfidz, dan alur pendaftaran.
              </p>

              <div className="divide-y divide-emerald-900/10">
                {faqs.map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={`${faq.question}-${idx}`} className="py-3.5 first:pt-0 last:pb-0">
                      <button
                        type="button"
                        aria-expanded={isOpen}
                        onClick={() => setOpenFaqIndex(isOpen ? null : idx)}
                        className="w-full min-h-[44px] flex items-center justify-between gap-4 text-left font-display font-bold text-sm sm:text-base text-[#14532d] hover:text-[#15803d] transition-colors cursor-pointer"
                      >
                        <span>{faq.question}</span>
                        <ChevronDown
                          className={`w-5 h-5 shrink-0 transition-transform duration-200 ${
                            isOpen ? "rotate-180 text-[#15803d]" : "text-[#4b6b56]"
                          }`}
                          aria-hidden="true"
                        />
                      </button>
                      {isOpen && (
                        <p className="mt-2.5 text-sm text-[#2c4435] leading-relaxed pr-6">
                          {faq.answer}
                        </p>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* <!-- FOOTER --> */}
      <footer className="relative overflow-hidden leaf-dew-emerald-surface text-white pt-14 pb-8">
        <div className="absolute inset-0 islamic-pattern-dark pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 pb-10 border-b border-white/15">
            {/* Kolom 1: Tentang */}
            <div className="space-y-3">
              <div className="flex items-center gap-2.5">
                <span className="w-9 h-9 rounded-xl bg-white/15 text-amber-300 flex items-center justify-center shrink-0">
                  <GraduationCap className="w-5 h-5" aria-hidden="true" />
                </span>
                <span className="font-display font-bold text-lg text-white">
                  {identity.namaSingkat}
                </span>
              </div>
              <p className="text-sm text-emerald-100/85 leading-relaxed">
                Lembaga pendidikan dasar Islam berakreditasi {identity.akreditasi} yang memadukan Kurikulum Merdeka,
                Diniyah Takmiliyah, dan Tahfidz Al-Qur&apos;an sejak {identity.tahunBerdiri}.
              </p>
              <p className="text-xs font-mono text-amber-200">
                NSM: {identity.nsm} · NPSN: {identity.npsn}
              </p>
            </div>

            {/* Kolom 2: Menu Cepat */}
            <div>
              <h3 className="font-display font-bold text-base text-white mb-4">Menu Cepat</h3>
              <ul className="space-y-2.5 text-sm text-emerald-100/85">
                <li>
                  <a href="#beranda" className="hover:text-amber-300 transition-colors">
                    Beranda
                  </a>
                </li>
                <li>
                  <a href="#profil" className="hover:text-amber-300 transition-colors">
                    Profil &amp; Visi Misi
                  </a>
                </li>
                <li>
                  <a href="#program" className="hover:text-amber-300 transition-colors">
                    Program Unggulan
                  </a>
                </li>
                <li>
                  <a href="#jenjang" className="hover:text-amber-300 transition-colors">
                    Jenjang &amp; Kelas
                  </a>
                </li>
                <li>
                  <a href="#ppdb" className="hover:text-amber-300 transition-colors">
                    PPDB Online {identity.tahunAjaranPPDB}
                  </a>
                </li>
                <li>
                  <button
                    type="button"
                    onClick={onOpenAdmin}
                    className="inline-flex items-center gap-1.5 text-amber-200 hover:text-white transition-colors cursor-pointer"
                  >
                    <ShieldCheck className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Login Menu Admin</span>
                  </button>
                </li>
              </ul>
            </div>

            {/* Kolom 3: Kontak */}
            <div>
              <h3 className="font-display font-bold text-base text-white mb-4">Kontak Resmi</h3>
              <ul className="space-y-2.5 text-sm text-emerald-100/85">
                <li>WA: {identity.whatsappDisplay}</li>
                <li>Email: {identity.email}</li>
                <li>IG: {identity.instagram}</li>
                <li>FB: {identity.facebook}</li>
                <li>YT: {identity.youtube}</li>
              </ul>
            </div>

            {/* Kolom 4: Peta Lokasi & Layanan */}
            <div>
              <h3 className="font-display font-bold text-base text-white mb-4">
                Lokasi &amp; Layanan
              </h3>
              <p className="text-sm text-emerald-100/85 leading-relaxed">
                {identity.alamatLengkap}
              </p>
              <p className="text-xs text-amber-200 mt-3">{identity.jamLayanan}</p>
              <a
                href="#kontak"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-white underline underline-offset-4 hover:text-amber-300 mt-3"
              >
                <MapPin className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Lihat Peta Lokasi</span>
              </a>
            </div>
          </div>

          {/* Copyright & Back to Top */}
          <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm text-emerald-100/80">
            <p>© 2026 {identity.namaSingkat}. Semua Hak Dilindungi.</p>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-amber-200 hover:text-white transition-colors cursor-pointer"
            >
              <span>Kembali ke Atas</span>
              <ArrowUp className="w-4 h-4" aria-hidden="true" />
            </button>
          </div>
        </div>
      </footer>

      {/* Tombol Mengambang: Back to Top + WhatsApp di Kanan Bawah */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        {showBackToTop && (
          <button
            type="button"
            onClick={scrollToTop}
            aria-label="Kembali ke atas halaman"
            className="w-11 h-11 rounded-full bg-white text-[#14532d] border border-emerald-900/20 shadow-lg hover:bg-[#dcfce7] flex items-center justify-center transition-all cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <a
          href={waGeneralUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Hubungi panitia via WhatsApp"
          className="inline-flex items-center gap-2 h-12 px-4 sm:px-5 rounded-full bg-[#16a34a] hover:bg-[#15803d] text-white font-semibold text-sm shadow-xl transition-transform hover:-translate-y-0.5"
        >
          <MessageCircle className="w-5 h-5 shrink-0" aria-hidden="true" />
          <span className="hidden sm:inline whitespace-nowrap">Chat WhatsApp</span>
        </a>
      </div>
    </>
  );
};
