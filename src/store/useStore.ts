import { create } from 'zustand';
import { Language } from '../i18n/translations';

export type TechCategory = 'ALL' | 'BACKEND' | 'FRONTEND' | 'MOBILE' | 'OTHER';
export type ThemeMode = 'dark' | 'light';

export interface AppState {
  // Preloader state
  isLoaded: boolean;
  preloaderPhase: 'loading' | 'imploding' | 'exploding' | 'finished';
  setPreloaderPhase: (phase: 'loading' | 'imploding' | 'exploding' | 'finished') => void;
  setIsLoaded: (loaded: boolean) => void;

  // Scroll state
  scrollProgress: number;
  scrollVelocity: number;
  setScrollState: (progress: number, velocity: number) => void;

  // Cursor state
  cursorText: string;
  cursorVariant: 'default' | 'hover' | 'text';
  setCursorText: (text: string) => void;
  setCursorVariant: (variant: 'default' | 'hover' | 'text') => void;

  // Skills interactive orbit filter
  activeCategory: TechCategory;
  setActiveCategory: (cat: TechCategory) => void;
  selectedChip: string | null;
  setSelectedChip: (chip: string | null) => void;

  // Theme & Language
  theme: ThemeMode;
  toggleTheme: () => void;
  language: Language;
  setLanguage: (lang: Language) => void;

  // Contact Interactive Orb State
  hoveredContactBtn: 'telegram' | 'github' | 'linkedin' | 'phone' | null;
  setHoveredContactBtn: (btn: 'telegram' | 'github' | 'linkedin' | 'phone' | null) => void;
  burstCount: number;
  triggerBurst: () => void;

  // WebGL Fallback
  webglSupported: boolean;
  setWebglSupported: (supported: boolean) => void;
}

export const useStore = create<AppState>((set) => ({
  isLoaded: false,
  preloaderPhase: 'loading',
  setPreloaderPhase: (phase) => set({ preloaderPhase: phase }),
  setIsLoaded: (loaded) => set({ isLoaded: loaded }),

  scrollProgress: 0,
  scrollVelocity: 0,
  setScrollState: (progress, velocity) => set({ scrollProgress: progress, scrollVelocity: velocity }),

  cursorText: '',
  cursorVariant: 'default',
  setCursorText: (text) => set({ cursorText: text }),
  setCursorVariant: (variant) => set({ cursorVariant: variant }),

  activeCategory: 'ALL',
  setActiveCategory: (cat) => set({ activeCategory: cat }),
  selectedChip: null,
  setSelectedChip: (chip) => set({ selectedChip: chip }),

  theme: 'dark',
  toggleTheme: () => set((state) => ({ theme: state.theme === 'dark' ? 'light' : 'dark' })),
  language: 'uz',
  setLanguage: (lang) => set({ language: lang }),

  hoveredContactBtn: null,
  setHoveredContactBtn: (btn) => set({ hoveredContactBtn: btn }),
  burstCount: 0,
  triggerBurst: () => set((state) => ({ burstCount: state.burstCount + 1 })),

  webglSupported: true,
  setWebglSupported: (supported) => set({ webglSupported: supported }),
}));
