import React, { createContext, useContext, useState, useEffect } from "react";
import {
  ANNOUNCEMENTS,
  AnnouncementItem,
  CLASS_LEVELS,
  ClassLevel,
  FAQ_ITEMS,
  FaqItem,
  GALLERY_PHOTOS,
  GalleryPhoto,
  HERO_STATS,
  MADRASAH_IDENTITY,
  MADRASAH_IMAGES,
  MadrasahIdentity,
  NEWS_ITEMS,
  NewsItem,
  PPDB_INFO,
  PRINCIPAL_MESSAGE,
  PROFILE_DATA,
  PROGRAMS,
  ProgramItem,
  STUDY_HOURS,
  TEACHERS,
  TeacherItem,
} from "../data/madrasahData";

export interface HeroStatItem {
  label: string;
  value: string;
  unit: string;
}

export interface StudyHourItem {
  hari: string;
  waktu: string;
  keterangan: string;
}

export interface PpdbSubmission {
  id: string;
  submittedAt: string;
  status: "Menunggu" | "Terverifikasi" | "Diterima";
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

export interface MadrasahPortalState {
  identity: MadrasahIdentity;
  images: typeof MADRASAH_IMAGES;
  heroStats: HeroStatItem[];
  profile: typeof PROFILE_DATA;
  programs: ProgramItem[];
  classLevels: ClassLevel[];
  studyHours: StudyHourItem[];
  teachers: TeacherItem[];
  principalMessage: typeof PRINCIPAL_MESSAGE;
  ppdbInfo: typeof PPDB_INFO;
  announcements: AnnouncementItem[];
  news: NewsItem[];
  gallery: GalleryPhoto[];
  faqs: FaqItem[];
  ppdbSubmissions: PpdbSubmission[];
  adminPassword: string;
}

const STORAGE_KEY = "madrasah_portal_state_v1";

const DEFAULT_STATE: MadrasahPortalState = {
  identity: MADRASAH_IDENTITY,
  images: MADRASAH_IMAGES,
  heroStats: HERO_STATS,
  profile: PROFILE_DATA,
  programs: PROGRAMS,
  classLevels: CLASS_LEVELS,
  studyHours: STUDY_HOURS,
  teachers: TEACHERS,
  principalMessage: PRINCIPAL_MESSAGE,
  ppdbInfo: PPDB_INFO,
  announcements: ANNOUNCEMENTS,
  news: NEWS_ITEMS,
  gallery: GALLERY_PHOTOS,
  faqs: FAQ_ITEMS,
  ppdbSubmissions: [],
  adminPassword: "admin123",
};

interface MadrasahContextValue {
  data: MadrasahPortalState;
  updateState: (updater: (prev: MadrasahPortalState) => MadrasahPortalState) => void;
  addPpdbSubmission: (submission: Omit<PpdbSubmission, "id" | "submittedAt" | "status">) => void;
  resetToDefault: () => void;
  importState: (nextState: MadrasahPortalState) => void;
}

const MadrasahContext = createContext<MadrasahContextValue | null>(null);

export const MadrasahProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<MadrasahPortalState>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (!saved) return DEFAULT_STATE;
      const parsed = JSON.parse(saved) as Partial<MadrasahPortalState>;
      return {
        ...DEFAULT_STATE,
        ...parsed,
        identity: { ...DEFAULT_STATE.identity, ...(parsed.identity || {}) },
        images: { ...DEFAULT_STATE.images, ...(parsed.images || {}) },
        profile: { ...DEFAULT_STATE.profile, ...(parsed.profile || {}) },
        principalMessage: {
          ...DEFAULT_STATE.principalMessage,
          ...(parsed.principalMessage || {}),
        },
        ppdbInfo: { ...DEFAULT_STATE.ppdbInfo, ...(parsed.ppdbInfo || {}) },
      };
    } catch {
      return DEFAULT_STATE;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore quota errors gracefully
    }
  }, [data]);

  const updateState = (updater: (prev: MadrasahPortalState) => MadrasahPortalState) => {
    setData((prev) => updater(prev));
  };

  const addPpdbSubmission = (
    submission: Omit<PpdbSubmission, "id" | "submittedAt" | "status">
  ) => {
    const entry: PpdbSubmission = {
      ...submission,
      id: `ppdb-${Date.now()}`,
      submittedAt: new Date().toLocaleDateString("id-ID", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Menunggu",
    };
    setData((prev) => ({
      ...prev,
      ppdbSubmissions: [entry, ...prev.ppdbSubmissions],
    }));
  };

  const resetToDefault = () => {
    localStorage.removeItem(STORAGE_KEY);
    setData(DEFAULT_STATE);
  };

  const importState = (nextState: MadrasahPortalState) => {
    setData({
      ...DEFAULT_STATE,
      ...nextState,
      identity: { ...DEFAULT_STATE.identity, ...(nextState.identity || {}) },
      images: { ...DEFAULT_STATE.images, ...(nextState.images || {}) },
      profile: { ...DEFAULT_STATE.profile, ...(nextState.profile || {}) },
      principalMessage: {
        ...DEFAULT_STATE.principalMessage,
        ...(nextState.principalMessage || {}),
      },
      ppdbInfo: { ...DEFAULT_STATE.ppdbInfo, ...(nextState.ppdbInfo || {}) },
    });
  };

  return (
    <MadrasahContext.Provider
      value={{ data, updateState, addPpdbSubmission, resetToDefault, importState }}
    >
      {children}
    </MadrasahContext.Provider>
  );
};

export const useMadrasah = (): MadrasahContextValue => {
  const ctx = useContext(MadrasahContext);
  if (!ctx) {
    throw new Error("useMadrasah must be used within MadrasahProvider");
  }
  return ctx;
};
