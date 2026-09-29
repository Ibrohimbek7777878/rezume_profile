import React from 'react';
import { useLenisGsap } from './hooks/useLenisGsap';
import { ExperienceCanvas } from './components/canvas/ExperienceCanvas';
import { PreloaderOverlay } from './components/ui/PreloaderOverlay';
import { CustomCursor } from './components/ui/CustomCursor';
import { Navbar } from './components/ui/Navbar';
import { SectionTrack } from './components/sections/SectionTrack';
import { WebGLErrorBoundary } from './components/ui/WebGLFallback';
import { useStore } from './store/useStore';

export const App: React.FC = () => {
  // 1. Initialize Lenis smooth scroll and synchronize with GSAP ScrollTrigger
  useLenisGsap();
  const theme = useStore((state) => state.theme);

  return (
    <div
      className={`relative min-h-screen font-sans antialiased overflow-x-hidden transition-colors duration-500 ${
        theme === 'dark' ? 'bg-[#070b16] text-[#e6edf7]' : 'bg-[#f1f5f9] text-[#0f172a]'
      }`}
    >
      {/* 0. Keyboard Accessibility Skip Link */}
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:top-6 focus:left-6 focus:z-[999999] focus:bg-cyan-400 focus:text-navy-950 focus:px-5 focus:py-2.5 focus:rounded-xl font-bold text-xs shadow-2xl"
      >
        Asosiy kontentga o‘tish (Skip to content)
      </a>

      {/* 1. Custom Interactive Cursor (12px dot + 44px spring ring + "Ko'rish" flying arrow) */}
      <CustomCursor />

      {/* 2. Fullscreen Cinematic Preloader Overlay with 3D Monogram & Slot Counter */}
      <PreloaderOverlay />

      {/* 3. Floating Navigation Bar (Auto-hide, Active Indicator, Rolling Text, Languages, Theme) */}
      <Navbar />

      {/* 4. Fixed Single 3D World Canvas with WebGL Error Boundary Fallback */}
      <WebGLErrorBoundary>
        <ExperienceCanvas />
      </WebGLErrorBoundary>

      {/* 5. Scrollable 7-Section Cinematic Trajectory Track */}
      <main id="main-content">
        <SectionTrack />
      </main>
    </div>
  );
};

export default App;
