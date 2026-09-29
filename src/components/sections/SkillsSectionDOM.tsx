import React from 'react';
import { useStore, TechCategory } from '../../store/useStore';

const CATEGORIES: { id: TechCategory; label: string }[] = [
  { id: 'ALL', label: 'Barchasi (All)' },
  { id: 'BACKEND', label: 'Backend' },
  { id: 'FRONTEND', label: 'Frontend' },
  { id: 'MOBILE', label: 'Mobil' },
  { id: 'OTHER', label: 'Boshqa (Ecosystem)' },
];

export const SkillsSectionDOM: React.FC = () => {
  const activeCategory = useStore((state) => state.activeCategory);
  const setActiveCategory = useStore((state) => state.setActiveCategory);
  const selectedChip = useStore((state) => state.selectedChip);
  const setSelectedChip = useStore((state) => state.setSelectedChip);

  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-between px-6 md:px-20 max-w-6xl mx-auto py-24 select-none relative z-10 pointer-events-auto"
    >
      <div className="space-y-3">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">
          [ 04 / 07 ] — 3D ORBITAL TIZIM
        </span>
        <h2 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white font-heading">
          Texnologiyalar
        </h2>
        <p className="text-slate-400 text-sm md:text-base max-w-xl font-light">
          Texnologiyalar 3D orbitalarda aylanadi. Kursorni yaqinlashtirib ularni itarishingiz yoki kategoriya filtrlari orqali saralashingiz mumkin.
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-3 pt-6">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedChip(null);
              }}
              className={`px-5 py-2.5 rounded-full font-mono text-xs tracking-wider uppercase transition-all duration-300 border ${
                activeCategory === cat.id
                  ? 'bg-cyan-400 text-navy-950 font-bold border-cyan-300 shadow-[0_0_20px_rgba(56,189,248,0.4)] scale-105'
                  : 'bg-navy-900/60 border-slate-700/80 text-slate-300 hover:border-cyan-400/60 hover:text-white backdrop-blur-md'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Helper Notice */}
      <div className="flex justify-between items-end pt-12">
        <div className="bg-navy-950/70 p-4 rounded-xl border border-slate-800 text-xs font-mono text-slate-400 max-w-sm backdrop-blur-md">
          <span className="text-cyan-400 font-bold block mb-1">INTERAKTIV KO‘RSATMA:</span>
          3D chip ustiga bosing — u yadro atrofida kattalashib qisqa tavsifini ochadi.
        </div>

        {selectedChip && (
          <button
            onClick={() => setSelectedChip(null)}
            className="px-4 py-2 rounded-lg bg-navy-900 border border-slate-700 text-xs font-mono text-cyan-300 hover:bg-slate-800"
          >
            Tanlovni bekor qilish ✕
          </button>
        )}
      </div>
    </section>
  );
};
