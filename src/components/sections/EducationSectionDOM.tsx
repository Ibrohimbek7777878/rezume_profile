import React from 'react';
import { motion } from 'framer-motion';

interface EducationItem {
  id: string;
  name: string;
  role: string;
  period: string;
  desc: string;
  skills: string[];
  highlight: string;
}

const EDUCATION_DATA: EducationItem[] = [
  {
    id: 'nextin',
    name: 'Nextin IT Academy',
    role: 'Full Stack Web Dasturlash (Intensive)',
    period: 'Toshkent / Sirdaryo',
    desc: 'Zamonaviy web arxitektura, React va Next.js ekotizimlari, Node.js va Django backend xizmatlarini mustaqil va jamoaviy ravishda qurish bo‘yicha chuqur amaliy dastur.',
    skills: ['React', 'Next.js', 'Node.js', 'Django', 'PostgreSQL', 'REST API'],
    highlight: 'Asosiy yo‘nalish',
  },
  {
    id: 'it-live',
    name: 'IT Live Academy',
    role: 'Backend & Dasturlash Asoslari',
    period: 'Amaliy Kurslar',
    desc: 'Python dasturlash tili, ma’lumotlar tuzilmalari, relyatsion ma’lumotlar bazalari (PostgreSQL) va server mantiqini professional darajada o‘rganish.',
    skills: ['Python', 'PostgreSQL', 'Algorithms', 'Clean Code'],
    highlight: 'Amaliyot',
  },
  {
    id: 'guliston-academy',
    name: 'Guliston Academy',
    role: 'Fundamental Dasturlash & IT Start',
    period: 'Guliston, Sirdaryo',
    desc: 'Axborot texnologiyalari, kompyuter arxitekturasi va dasturiy ta’minotning fundamental asoslarini o‘zlashtirish, dastlabki loyihalar boshqaruvi.',
    skills: ['Computer Science', 'Frontend Asoslari', 'Algoritmik Mantiq'],
    highlight: 'Boshlang‘ich poydevor',
  },
];

export const EducationSectionDOM: React.FC = () => {
  return (
    <section
      id="education"
      className="relative min-h-screen flex flex-col justify-center px-4 sm:px-8 md:px-20 max-w-6xl mx-auto py-20 sm:py-28 z-20 pointer-events-auto select-none"
    >
      {/* Section Header */}
      <div className="space-y-3 sm:space-y-4 mb-10 sm:mb-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 px-3 py-1 rounded-full border border-cyan-400/30 bg-slate-900/60 backdrop-blur-md">
            [ 06 / 07 ] — TA‘LIM VA MALAKA
          </span>
          <div className="h-[1px] w-24 bg-gradient-to-r from-cyan-400/60 to-transparent" />
        </div>

        {/* Clip-Path Reveal Title for "Nextin IT Academy" & Education */}
        <div className="overflow-hidden">
          <motion.h2
            initial={{
              clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
              y: 60,
              opacity: 0,
            }}
            whileInView={{
              clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
              y: 0,
              opacity: 1,
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            className="text-3xl sm:text-5xl md:text-7xl font-extrabold text-white font-heading tracking-tight"
          >
            Nextin IT Academy{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-violet-400">
              & Malaka
            </span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-slate-400 text-sm sm:text-base md:text-xl font-light max-w-2xl"
        >
          Doimiy o‘sish, mustahkam poydevor va ilg‘or texnologiyalarni chuqur o‘rganish yo‘li:
        </motion.p>
      </div>

      {/* Education Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
        {EDUCATION_DATA.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={{
              clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)',
              opacity: 0,
              y: 40,
            }}
            whileInView={{
              clipPath: 'polygon(0 0%, 100% 0%, 100% 100%, 0 100%)',
              opacity: 1,
              y: 0,
            }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{
              duration: 0.85,
              delay: idx * 0.18,
              ease: [0.16, 1, 0.3, 1],
            }}
            data-cursor="Ochish"
            className="group relative rounded-3xl p-7 flex flex-col justify-between backdrop-blur-xl border border-slate-700/60 bg-slate-900/60 hover:bg-slate-900/90 hover:border-cyan-400/50 transition-all duration-500 shadow-xl hover:shadow-[0_0_35px_rgba(56,189,248,0.15)]"
          >
            {/* Top Indicator */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-mono uppercase tracking-wider text-cyan-400 px-2.5 py-0.5 rounded-full border border-cyan-400/30 bg-cyan-950/40">
                  {item.highlight}
                </span>
                <span className="font-mono text-xs text-slate-500">
                  0{idx + 1}
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {item.name}
                </h3>
                <p className="text-sm text-cyan-400/90 font-medium mt-1">
                  {item.role}
                </p>
                <p className="text-xs text-slate-500 font-mono mt-0.5">
                  {item.period}
                </p>
              </div>

              <p className="text-slate-300 text-xs md:text-sm leading-relaxed font-light">
                {item.desc}
              </p>
            </div>

            {/* Skills Tags */}
            <div className="pt-6 mt-6 border-t border-slate-800">
              <div className="flex flex-wrap gap-1.5">
                {item.skills.map((s, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-[10px] font-mono uppercase text-slate-400 bg-slate-800/80 px-2 py-0.5 rounded border border-slate-700/50"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};
