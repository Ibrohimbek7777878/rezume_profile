import React from 'react';
import { motion } from 'framer-motion';

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  badge: string;
  period: string;
  location: string;
  bullets: string[];
  tech: string[];
  accentColor: string;
}

const EXPERIENCES: ExperienceItem[] = [
  {
    id: 'mebel-city',
    role: 'Full Stack Dasturchi',
    company: 'Mebel City (Bittada Ekotizimi)',
    badge: 'Hozirgi Ish Joyi',
    period: 'Oxirgi 6+ oy — Hozirgacha',
    location: 'Toshkent, O‘zbekiston',
    bullets: [
      "Bittada Usta: Mebel ustalari uchun to‘liq platformani (backend + web frontend) noldan ishlab chiqib, muvaffaqiyatli ishga tushirdim.",
      "Platformaning rasmiy Android ilovasini yaratib, Google Play do‘konida e‘lon qildim.",
      "Bittada ERP loyihasida jamoa bilan faol ishtirok etdim, loyiha hozir ham davom etmoqda.",
      "Kompaniya Telegram boti (@mebelcity_bittada_bot) ni ishlab chiqib, xizmatlarni mijozlarga maksimal yaqinlashtirdim.",
      "Online to‘lov tizimlari (Payme, Click) integratsiyasini to‘liq joriy qildim.",
      "Hozirda Bittada Usta xizmatlarini sotish (sotuv) yo‘nalishini kengaytirish va yangi modullar ustida ishlayapman.",
    ],
    tech: ['Node.js', 'React', 'Next.js', 'Android', 'PostgreSQL', 'Payme / Click API', 'Telegram Bot'],
    accentColor: '#38bdf8',
  },
  {
    id: 'stratix-system',
    role: 'Full Stack Dasturchi',
    company: 'Stratix System (IT Kompaniyasi)',
    badge: '3 Ta Yirik Loyiha Boshqaruvi',
    period: '2 oy',
    location: 'O‘zbekiston',
    bullets: [
      "3 ta yirik loyihada qatnashdim; loyihalarning boshlanishi, texnik topshiriq (TZ) yozish hamda loyihani to‘liq olib chiqishda boshchilik qildim.",
      "1-loyiha: IT kompaniyaning o‘zining rasmiy web saytini to‘liq ishlab chiqib ishga tushirdik va foydalanildi.",
      "2-loyiha: Onlayn buxgalteriya uchun ERP tizimini ishlab chiqdik, serverga joylashtirdik va onlayn to‘lov tizimlarini integratsiya qildik.",
      "3-loyiha: Onlayn meditsina (tibbiyot klinikalari) uchun maxsus ERP tizimini yaratdik.",
    ],
    tech: ['Python', 'Django', 'React', 'PostgreSQL', 'Server Deploy', 'Online To‘lov', 'Docker'],
    accentColor: '#8b5cf6',
  },
  {
    id: 'independent-startups',
    role: 'Telegram Bot & Web Dasturchi',
    company: 'Mustaqil / Startup Loyihalar',
    badge: '1+ Yil Amaliyot',
    period: '1+ yil',
    location: 'Sirdaryo / Masofaviy',
    bullets: [
      "Telegram botlar yaratish bo‘yicha 1 yillik chuqur va mustaqil amaliy tajriba.",
      "O‘quv markazlar uchun qulay va moslashuvchan boshqaruv web platformasini ishlab chiqdim.",
      "Bir nechta startup g‘oyalarini MVP darajasigacha olib chiqdim, kodlar GitHub'da (@Ibrohimbek7777878) ochiq.",
      "Real jamoa loyihalarida Git va GitHub orqali samarali hamkorlikda ishlash ko‘nikmasi.",
    ],
    tech: ['Python', 'Asyncio', 'Aiogram', 'Next.js', 'TailwindCSS', 'Git / GitHub'],
    accentColor: '#10b981',
  },
];

export const ExperienceSectionDOM: React.FC = () => {
  return (
    <section
      id="experience"
      className="min-h-screen flex flex-col justify-start px-6 md:px-20 max-w-6xl mx-auto py-28 select-none relative z-20 pointer-events-auto"
    >
      {/* Section Header */}
      <div className="space-y-4 mb-16">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 px-3 py-1 rounded-full border border-cyan-400/30 bg-slate-900/60 backdrop-blur-md">
            [ 03 / 07 ] — KARYERA VA ISH TAJRIBASI
          </span>
          <div className="h-[1px] w-24 bg-gradient-to-r from-cyan-400/60 to-transparent" />
        </div>

        <h2 className="text-4xl md:text-7xl font-extrabold tracking-tight text-white font-heading">
          Ish{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-sky-300 to-violet-400">
            Tajribasi
          </span>
        </h2>
        <p className="text-slate-400 text-base md:text-xl max-w-2xl font-light">
          Real foydalanuvchilar, korxonalar va ishlab chiqarish sohalarida amalda ishlayotgan mahsulotlar yaratish tarixi:
        </p>
      </div>

      {/* Vertical Interactive Timeline */}
      <div className="relative border-l-2 border-slate-800 ml-4 md:ml-8 pl-6 md:pl-12 space-y-12">
        {EXPERIENCES.map((exp, idx) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.7, delay: idx * 0.15 }}
            className="relative group"
          >
            {/* Pulsing Timeline Marker Node */}
            <div
              className="absolute -left-[31px] md:-left-[55px] top-6 w-6 h-6 rounded-full bg-navy-950 border-2 flex items-center justify-center transition-transform group-hover:scale-125"
              style={{ borderColor: exp.accentColor }}
            >
              <div
                className="w-2.5 h-2.5 rounded-full"
                style={{ backgroundColor: exp.accentColor }}
              />
            </div>

            {/* Experience Card */}
            <div className="rounded-3xl p-7 md:p-9 bg-slate-900/90 border border-slate-700/80 hover:border-cyan-400/60 transition-all duration-300 backdrop-blur-xl shadow-2xl space-y-6">
              {/* Card Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800 pb-5">
                <div>
                  <div className="flex items-center gap-3 mb-1.5 flex-wrap">
                    <span className="text-xs font-mono uppercase tracking-wider px-3 py-1 rounded-full border border-cyan-400/30 bg-cyan-950/40 text-cyan-300 font-semibold">
                      {exp.badge}
                    </span>
                    <span className="text-xs text-slate-400 font-mono">
                      📍 {exp.location}
                    </span>
                  </div>

                  <h3 className="text-2xl md:text-3xl font-extrabold text-white font-heading">
                    {exp.role}
                  </h3>
                  <span
                    className="text-base md:text-lg font-semibold block mt-0.5"
                    style={{ color: exp.accentColor }}
                  >
                    {exp.company}
                  </span>
                </div>

                <div className="text-left md:text-right">
                  <span className="text-xs font-mono px-3.5 py-1.5 rounded-xl bg-slate-800/90 border border-slate-700 text-slate-300 inline-block font-medium">
                    {exp.period}
                  </span>
                </div>
              </div>

              {/* Responsibilities & Achievements */}
              <ul className="space-y-3 text-slate-300 text-sm md:text-base leading-relaxed font-light">
                {exp.bullets.map((bullet, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-3">
                    <span className="text-cyan-400 font-bold mt-1 text-sm flex-shrink-0">
                      ▹
                    </span>
                    <span>{bullet}</span>
                  </li>
                ))}
              </ul>

              {/* Technologies Applied */}
              <div className="pt-4 border-t border-slate-800/80 flex flex-wrap gap-2">
                {exp.tech.map((t, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-xs font-mono text-slate-300 bg-slate-800/80 px-3 py-1 rounded-lg border border-slate-700/60"
                  >
                    {t}
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
