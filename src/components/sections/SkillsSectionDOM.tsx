import React from 'react';
import { useStore, TechCategory } from '../../store/useStore';

const CATEGORIES: { id: TechCategory; label: string }[] = [
  { id: 'ALL', label: 'Barchasi (All)' },
  { id: 'BACKEND', label: 'Backend' },
  { id: 'FRONTEND', label: 'Frontend' },
  { id: 'MOBILE', label: 'Mobil' },
  { id: 'OTHER', label: 'Boshqa (Ecosystem)' },
];

const SKILLS_DATA = [
  { id: 'node', name: 'Node.js', category: 'BACKEND' as const, badge: 'Backend', desc: 'Asinxron arxitektura, REST API va yuqori yuklamali mikroxizmatlar' },
  { id: 'python', name: 'Python', category: 'BACKEND' as const, badge: 'Backend', desc: 'Toza kod, avtomatlashtirish, ma’lumotlar bilan ishlash' },
  { id: 'django', name: 'Django', category: 'BACKEND' as const, badge: 'Backend', desc: 'Xavfsiz ORM, autentifikatsiya va yirik korxona ERP backend' },
  { id: 'postgres', name: 'PostgreSQL', category: 'BACKEND' as const, badge: 'Database', desc: 'Murakkab SQL so‘rovlar, indeksatsiya va ACID modellashtirish' },
  { id: 'react', name: 'React', category: 'FRONTEND' as const, badge: 'Frontend', desc: 'Zamonaviy SPA, custom hooklar va reaktiv interfeyslar' },
  { id: 'nextjs', name: 'Next.js', category: 'FRONTEND' as const, badge: 'Frontend', desc: 'SSR, SSG, Server Actions, optimal SEO va tezkor yuklanish' },
  { id: 'javascript', name: 'JavaScript', category: 'FRONTEND' as const, badge: 'Core', desc: 'ES6+, DOM manipulatsiyasi, hodisalar oqimi va asinxronlik' },
  { id: 'htmlcss', name: 'HTML5 & CSS3', category: 'FRONTEND' as const, badge: 'UI/UX', desc: 'Semantik struktura, TailwindCSS, Flexbox/Grid va adaptiv dizayn' },
  { id: 'android', name: 'Android (Google Play)', category: 'MOBILE' as const, badge: 'Mobile', desc: 'Google Play do‘koniga rasmiy e’lon qilingan mobil ilova' },
  { id: 'telegram', name: 'Telegram Bot API', category: 'OTHER' as const, badge: 'Bot/API', desc: 'Avtomatlashtirilgan CRM botlar, to‘lovlar va webhooklar' },
  { id: 'git', name: 'Git / GitHub', category: 'OTHER' as const, badge: 'DevOps', desc: 'Versiyalarni boshqarish, jamoaviy branch strategiyasi va CI/CD' },
];

export const SkillsSectionDOM: React.FC = () => {
  const activeCategory = useStore((state) => state.activeCategory);
  const setActiveCategory = useStore((state) => state.setActiveCategory);
  const selectedChip = useStore((state) => state.selectedChip);
  const setSelectedChip = useStore((state) => state.setSelectedChip);

  const filteredSkills = SKILLS_DATA.filter(
    (s) => activeCategory === 'ALL' || s.category === activeCategory
  );

  return (
    <section
      id="skills"
      className="min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-20 max-w-6xl mx-auto py-20 sm:py-28 select-none relative z-10 pointer-events-auto"
    >
      <div className="space-y-3 mb-6 sm:mb-8">
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400">
          [ 04 / 07 ] — KO‘NIKMALAR VA TEXNOLOGIYALAR
        </span>
        <h2 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white font-heading">
          Texnologiyalar{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">
            Stacki
          </span>
        </h2>
        <p className="text-slate-400 text-xs sm:text-sm md:text-base max-w-2xl font-light leading-relaxed">
          Loyihalarda amalda qo‘llanilgan asosiy vositalar va platformalar. Kategoriyalar bo‘yicha filtrlang yoki bosing:
        </p>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 sm:gap-3 pt-3 sm:pt-4">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => {
                setActiveCategory(cat.id);
                setSelectedChip(null);
              }}
              className={`px-3.5 sm:px-5 py-1.5 sm:py-2.5 rounded-full font-mono text-[11px] sm:text-xs tracking-wider uppercase transition-all duration-300 border ${
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

      {/* Interactive Responsive Skills Chips Grid (Mobile & Desktop Friendly) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 my-4">
        {filteredSkills.map((skill) => {
          const isSelected = selectedChip === skill.id;
          return (
            <div
              key={skill.id}
              onClick={() => setSelectedChip(isSelected ? null : skill.id)}
              className={`p-4 rounded-2xl border transition-all duration-300 backdrop-blur-xl cursor-pointer ${
                isSelected
                  ? 'bg-cyan-950/80 border-cyan-400 shadow-[0_0_30px_rgba(56,189,248,0.25)] scale-[1.02]'
                  : 'bg-slate-900/80 border-slate-700/70 hover:border-cyan-400/60 hover:bg-slate-900'
              }`}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="font-heading font-extrabold text-white text-base sm:text-lg">
                  {skill.name}
                </span>
                <span className="text-[10px] font-mono uppercase tracking-wider px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {skill.badge}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-2 font-light leading-relaxed">
                {skill.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* Footer Helper */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 pt-4 border-t border-slate-800/80 text-xs font-mono text-slate-400">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>Fonda 3D orbitadagi chiplar bilan to‘liq sinxronlangan</span>
        </div>
        {selectedChip && (
          <button
            onClick={() => setSelectedChip(null)}
            className="text-cyan-400 hover:text-white underline"
          >
            Filtrni tozalash ✕
          </button>
        )}
      </div>
    </section>
  );
};
