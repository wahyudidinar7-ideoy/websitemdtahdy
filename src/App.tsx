import { useState, lazy, Suspense } from "react";
import { MadrasahProvider } from "./context/MadrasahContext";
import { Navbar } from "./components/Navbar";
import { HeroSection } from "./components/HeroSection";
import { ProfileAndPrograms } from "./components/ProfileAndPrograms";
import { ClassesAndTeachers } from "./components/ClassesAndTeachers";
import { PpdbSection } from "./components/PpdbSection";
import { NewsAndGallery } from "./components/NewsAndGallery";
import { ContactFaqFooter } from "./components/ContactFaqFooter";

const AdminPanel = lazy(() =>
  import("./components/AdminPanel").then((m) => ({ default: m.AdminPanel }))
);

export default function App() {
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  return (
    <MadrasahProvider>
      <div className="min-h-screen islamic-pattern-bg text-[#112a1c] flex flex-col">
        {/* SECTION 1: HEADER / NAVBAR (Sticky) */}
        <Navbar onOpenAdmin={() => setIsAdminOpen(true)} />

        <main className="flex-1">
          {/* SECTION 2: HERO */}
          <HeroSection />

          {/* SECTION 3: PROFIL MADRASAH & SECTION 4: PROGRAM UNGGULAN */}
          <ProfileAndPrograms />

          {/* SECTION 5: JENJANG & KELAS & SECTION 6: GURU & SAMBUTAN KEPALA */}
          <ClassesAndTeachers />

          {/* SECTION 7: PPDB ONLINE */}
          <PpdbSection />

          {/* SECTION 8: BERITA & PENGUMUMAN & SECTION 9: GALERI & VIDEO */}
          <NewsAndGallery />

          {/* SECTION 10: KONTAK, LOKASI, FAQ & FOOTER */}
          <ContactFaqFooter onOpenAdmin={() => setIsAdminOpen(true)} />
        </main>

        {/* MENU ADMIN (Edit, Tambah, Hapus Konten & Kelola PPDB) */}
        {isAdminOpen && (
          <Suspense fallback={null}>
            <AdminPanel isOpen={isAdminOpen} onClose={() => setIsAdminOpen(false)} />
          </Suspense>
        )}
      </div>
    </MadrasahProvider>
  );
}
