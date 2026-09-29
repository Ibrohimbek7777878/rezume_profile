import React from 'react';
import { ScrambleTitle } from '../ui/ScrambleTitle';
import { MagneticButton } from '../ui/MagneticButton';
import { useStore } from '../../store/useStore';
import { TRANSLATIONS } from '../../i18n/translations';

export const HeroSectionDOM: React.FC = () => {
  const language = useStore((state) => state.language);
  const t = TRANSLATIONS[language];

  return (
    <section
      id="hero"
      className="min-h-screen w-full flex flex-col justify-center items-center text-center px-6 relative z-10 pointer-events-none select-none py-28"
    >
      {/* 1. Radar-Pulsing Status Badge */}
      <div className="pointer-events-auto inline-flex items-center gap-3 px-5 py-2 rounded-full bg-navy-900/80 border border-slate-700/60 backdrop-blur-md shadow-[0_0_20px_rgba(34,197,94,0.15)] mb-8">
        <div className="relative flex items-center justify-center w-3 h-3">
          <span className="animate-radar absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500 shadow-[0_0_10px_#10b981]" />
        </div>
        <span className="text-xs uppercase tracking-widest font-mono font-bold text-emerald-400">
          {t.heroStatus}
        </span>
      </div>

      {/* 2. Space reserved for the 40,000 GPU particle name: "IBROHIM SULTONOV"
          The 3D points in R3F canvas render right here in world coordinates [0, 0.5, 0] */}
      <div className="h-32 md:h-44 w-full max-w-4xl flex items-center justify-center">
        {/* Screen reader only text for full accessibility and SEO */}
        <h1 className="sr-only">Ibrohim Sultonov — Senior Full Stack Developer</h1>
      </div>

      {/* 3. Subtitle with 3D rotateX entrance and hover scramble */}
      <div className="pointer-events-auto mt-2 mb-6">
        <ScrambleTitle
          text={t.heroRole}
          className="text-2xl md:text-5xl font-extrabold tracking-tight font-heading"
        />
      </div>

      {/* Location Chip */}
      <div className="pointer-events-auto inline-flex items-center gap-2 text-slate-400 text-sm md:text-base font-light mb-10">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
          <circle cx="12" cy="10" r="3" />
        </svg>
        <span>{t.heroLocation}</span>
      </div>

      {/* 4. Magnetic Action Buttons with Inner Click Ripple */}
      <div className="pointer-events-auto flex flex-wrap items-center justify-center gap-5">
        <MagneticButton
          href="#contact"
          variant="primary"
          cursorText="Yozish"
          className="px-8 py-4"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
          </svg>
          <span>{t.btnContact}</span>
        </MagneticButton>

        <MagneticButton
          onClick={() => {
            window.open('/Ibrohim_Sultonov_Rezyume.pdf', '_blank');
          }}
          variant="secondary"
          cursorText="Yuklash"
          className="px-8 py-4"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
            <polyline points="7 10 12 15 17 10" />
            <line x1="12" y1="15" x2="12" y2="3" />
          </svg>
          <span>{t.btnResume}</span>
        </MagneticButton>
      </div>
    </section>
  );
};
