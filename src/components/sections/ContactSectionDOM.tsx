import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { TRANSLATIONS } from '../../i18n/translations';
import { MagneticText } from '../ui/MagneticText';
import { MagneticButton } from '../ui/MagneticButton';

const LINKEDIN_URL = 'https://www.linkedin.com/in/ibrohimbek-sultonov-92098a3a5/';
const GITHUB_URL = 'https://github.com/Ibrohimbek7777878';
const TELEGRAM_URL = 'https://t.me/sultonbe78';
const PHONE_NUMBER = '+998 94 951 80 03';

export const ContactSectionDOM: React.FC = () => {
  const {
    language,
    setHoveredContactBtn,
    triggerBurst,
  } = useStore();

  const t = TRANSLATIONS[language];
  const [copiedKey, setCopiedKey] = useState<string | null>(null);

  const handleCopy = (text: string, key: string) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text);
    }
    setCopiedKey(key);
    triggerBurst();
    setTimeout(() => {
      setCopiedKey(null);
    }, 2200);
  };

  const handleBackToTop = () => {
    // Lenis smooth scroll back to 0 with reverse cinematic trajectory
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number, opts: unknown) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0, {
        duration: 2.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-between px-4 sm:px-8 md:px-20 max-w-6xl mx-auto pt-20 sm:pt-32 pb-12 sm:pb-16 z-20 pointer-events-auto select-none"
    >
      {/* Top Header Tag */}
      <div className="space-y-4 sm:space-y-6">
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 px-3 py-1 rounded-full border border-cyan-400/30 bg-slate-900/60 backdrop-blur-md">
            [ 07 / 07 ] — ALOQA VA HAMKORLIK
          </span>
          <div className="h-[1px] w-24 sm:w-28 bg-gradient-to-r from-cyan-400/60 to-transparent" />
        </div>

        {/* Magnetic Text Repulsion Title: "Keling, birga quramiz" */}
        <div className="py-1 sm:py-2">
          <MagneticText
            text={t.contactTitle}
            className="text-3xl sm:text-5xl md:text-7xl text-white leading-tight cursor-default"
          />
        </div>

        <p className="text-slate-400 text-sm sm:text-lg md:text-2xl font-light max-w-3xl leading-relaxed">
          {t.contactSubtitle}
        </p>
      </div>

      {/* 4 Crystal-Clear Corporate Branded Channels */}
      <div className="my-8 sm:my-14 grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {/* 1. TELEGRAM CARD */}
        <div
          onMouseEnter={() => setHoveredContactBtn('telegram')}
          onMouseLeave={() => setHoveredContactBtn(null)}
          className="relative"
        >
          <MagneticButton
            variant="none"
            data-cursor="Telegram"
            onClick={() => {
              handleCopy('@sultonbe78', 'telegram');
              window.open(TELEGRAM_URL, '_blank');
            }}
            className="w-full text-left"
          >
            <div className="w-full p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-950/90 hover:bg-slate-900 border-2 border-sky-500/40 hover:border-sky-400 text-white transition-all duration-300 backdrop-blur-2xl shadow-xl hover:shadow-[0_0_40px_rgba(14,165,233,0.3)] group cursor-pointer">
              <div className="flex items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-5">
                  {/* Official Telegram Round Blue Badge */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#229ED9] shadow-[0_0_25px_rgba(34,158,217,0.5)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-6 h-6 sm:w-9 sm:h-9 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm4.64 6.8c-.15 1.58-.8 5.42-1.13 7.19-.14.75-.42 1-.68 1.03-.58.05-1.02-.38-1.58-.75-.88-.58-1.38-.94-2.23-1.5-.99-.65-.35-1.01.22-1.59.15-.15 2.71-2.48 2.76-2.69a.2.2 0 00-.05-.18c-.06-.05-.14-.03-.21-.02-.09.02-1.49.95-4.22 2.79-.4.27-.76.41-1.08.4-.36-.01-1.04-.2-1.55-.37-.63-.2-1.12-.31-1.08-.66.02-.18.27-.36.75-.55 2.92-1.27 4.86-2.11 5.83-2.51 2.78-1.16 3.35-1.36 3.73-1.36.08 0 .27.02.39.12.1.08.13.19.14.27-.01.06.01.24 0 .4z" />
                    </svg>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                      <span className="font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider text-sky-400">
                        TELEGRAM CHAT
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-sky-500/20 text-sky-300 border border-sky-400/30">
                        ONLINE
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white group-hover:text-sky-300 transition-colors">
                      @sultonbe78
                    </div>
                    <p className="text-[11px] sm:text-sm text-slate-300 font-light mt-0.5 sm:mt-1">
                      To‘g‘ridan-to‘g‘ri tezkor xabar yozish & takliflar
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
                  <div className="w-11 h-11 rounded-full bg-slate-800/90 border border-sky-400/40 text-sky-400 flex items-center justify-center group-hover:bg-sky-400 group-hover:text-slate-950 transition-colors">
                    ↗
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                    Ochish
                  </span>
                </div>
              </div>
            </div>
          </MagneticButton>

          {/* Spring Copied Tooltip */}
          <AnimatePresence>
            {copiedKey === 'telegram' && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -45, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-sky-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg pointer-events-none z-30"
              >
                {t.copiedToast}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 2. GITHUB CARD */}
        <div
          onMouseEnter={() => setHoveredContactBtn('github')}
          onMouseLeave={() => setHoveredContactBtn(null)}
          className="relative"
        >
          <MagneticButton
            variant="none"
            data-cursor="GitHub"
            onClick={() => {
              handleCopy(GITHUB_URL, 'github');
              window.open(GITHUB_URL, '_blank');
            }}
            className="w-full text-left"
          >
            <div className="w-full p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-950/90 hover:bg-slate-900 border-2 border-purple-500/40 hover:border-purple-400 text-white transition-all duration-300 backdrop-blur-2xl shadow-xl hover:shadow-[0_0_40px_rgba(168,85,247,0.3)] group cursor-pointer">
              <div className="flex items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-5">
                  {/* Official GitHub Dark Badge with Crisp White Octocat */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#24292e] border-2 border-purple-400/50 shadow-[0_0_25px_rgba(168,85,247,0.4)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-6 h-6 sm:w-9 sm:h-9 text-white fill-current" viewBox="0 0 24 24">
                      <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                    </svg>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                      <span className="font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider text-purple-400">
                        GITHUB REPO
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-400/30">
                        KODLAR
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white group-hover:text-purple-300 transition-colors">
                      @Ibrohimbek7777878
                    </div>
                    <p className="text-[11px] sm:text-sm text-slate-300 font-light mt-0.5 sm:mt-1">
                      Ochiq manba kodlari, arxitektura va loyihalar
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
                  <div className="w-11 h-11 rounded-full bg-slate-800/90 border border-purple-400/40 text-purple-400 flex items-center justify-center group-hover:bg-purple-400 group-hover:text-slate-950 transition-colors">
                    ↗
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                    Ko‘rish
                  </span>
                </div>
              </div>
            </div>
          </MagneticButton>

          {/* Spring Copied Tooltip */}
          <AnimatePresence>
            {copiedKey === 'github' && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -45, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-purple-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg pointer-events-none z-30"
              >
                {t.copiedToast}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 3. LINKEDIN CARD */}
        <div
          onMouseEnter={() => setHoveredContactBtn('linkedin')}
          onMouseLeave={() => setHoveredContactBtn(null)}
          className="relative"
        >
          <MagneticButton
            variant="none"
            data-cursor="LinkedIn"
            onClick={() => {
              handleCopy(LINKEDIN_URL, 'linkedin');
              window.open(LINKEDIN_URL, '_blank');
            }}
            className="w-full text-left"
          >
            <div className="w-full p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-950/90 hover:bg-slate-900 border-2 border-blue-600/40 hover:border-blue-400 text-white transition-all duration-300 backdrop-blur-2xl shadow-xl hover:shadow-[0_0_40px_rgba(10,102,194,0.35)] group cursor-pointer">
              <div className="flex items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-5">
                  {/* Official LinkedIn Blue Badge with Crisp White In Logo */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-[#0A66C2] shadow-[0_0_25px_rgba(10,102,194,0.5)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-6 h-6 sm:w-9 sm:h-9 text-white fill-current" viewBox="0 0 24 24">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 8.76a1.59 1.59 0 1 0-.02-3.18 1.59 1.59 0 0 0 .02 3.18M5.07 18.5h2.78v-8.37H5.07v8.37z" />
                    </svg>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                      <span className="font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider text-blue-400">
                        LINKEDIN PROFIL
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-400/30">
                        KARYERA
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white group-hover:text-blue-300 transition-colors">
                      Ibrohimbek Sultonov
                    </div>
                    <p className="text-[11px] sm:text-sm text-slate-300 font-light mt-0.5 sm:mt-1">
                      Kasbiy rezyume, tajriba va biznes aloqalar
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
                  <div className="w-11 h-11 rounded-full bg-slate-800/90 border border-blue-400/40 text-blue-400 flex items-center justify-center group-hover:bg-blue-400 group-hover:text-slate-950 transition-colors">
                    ↗
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                    O‘tish
                  </span>
                </div>
              </div>
            </div>
          </MagneticButton>

          {/* Spring Copied Tooltip */}
          <AnimatePresence>
            {copiedKey === 'linkedin' && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -45, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-blue-500 text-white font-bold text-xs uppercase tracking-wider shadow-lg pointer-events-none z-30"
              >
                {t.copiedToast}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* 4. TELEFON CARD */}
        <div
          onMouseEnter={() => setHoveredContactBtn('phone')}
          onMouseLeave={() => setHoveredContactBtn(null)}
          className="relative"
        >
          <MagneticButton
            variant="none"
            data-cursor="Qo‘ng‘iroq"
            onClick={() => {
              handleCopy(PHONE_NUMBER, 'phone');
              window.open(`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`);
            }}
            className="w-full text-left"
          >
            <div className="w-full p-4 sm:p-6 sm:p-7 rounded-2xl sm:rounded-3xl bg-slate-950/90 hover:bg-slate-900 border-2 border-emerald-500/40 hover:border-emerald-400 text-white transition-all duration-300 backdrop-blur-2xl shadow-xl hover:shadow-[0_0_40px_rgba(16,185,129,0.3)] group cursor-pointer">
              <div className="flex items-center justify-between gap-3 sm:gap-4">
                <div className="flex items-center gap-3 sm:gap-5">
                  {/* Official Emerald Call Badge with Crisp White Phone Handset */}
                  <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl bg-emerald-600 shadow-[0_0_25px_rgba(16,185,129,0.5)] flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition-transform duration-300">
                    <svg className="w-6 h-6 sm:w-8 sm:h-8 text-white fill-none stroke-current" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                  </div>

                  <div>
                    <div className="flex items-center gap-2 mb-0.5 sm:mb-1">
                      <span className="font-mono text-[11px] sm:text-xs font-black uppercase tracking-wider text-emerald-400">
                        TELEFON QO‘NG‘IROQ
                      </span>
                      <span className="text-[9px] sm:text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30">
                        TEZKOR
                      </span>
                    </div>
                    <div className="text-xl sm:text-2xl md:text-3xl font-extrabold text-white group-hover:text-emerald-300 transition-colors">
                      {PHONE_NUMBER}
                    </div>
                    <p className="text-[11px] sm:text-sm text-slate-300 font-light mt-0.5 sm:mt-1">
                      To‘g‘ridan-to‘g‘ri telefon muloqoti & SMS
                    </p>
                  </div>
                </div>

                <div className="hidden sm:flex flex-col items-end gap-1 flex-shrink-0">
                  <div className="w-11 h-11 rounded-full bg-slate-800/90 border border-emerald-400/40 text-emerald-400 flex items-center justify-center group-hover:bg-emerald-400 group-hover:text-slate-950 transition-colors">
                    📞
                  </div>
                  <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest mt-0.5">
                    Qo‘ng‘iroq
                  </span>
                </div>
              </div>
            </div>
          </MagneticButton>

          {/* Spring Copied Tooltip */}
          <AnimatePresence>
            {copiedKey === 'phone' && (
              <motion.div
                initial={{ opacity: 0, y: 10, scale: 0.8 }}
                animate={{ opacity: 1, y: -45, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.8 }}
                transition={{ type: 'spring', damping: 15, stiffness: 300 }}
                className="absolute top-0 left-1/2 -translate-x-1/2 px-4 py-1.5 rounded-full bg-emerald-400 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-lg pointer-events-none z-30"
              >
                {t.copiedToast}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Corporate Meta Specs: Location, Salary, Resume */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-6 py-6 sm:py-8 border-y border-slate-800/80">
        {/* Location */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          <span className="text-[11px] sm:text-xs font-mono uppercase text-slate-400 block mb-1">
            Joylashuv (Location)
          </span>
          <span className="text-base sm:text-lg md:text-xl font-bold text-white">
            Toshkent / Sirdaryo
          </span>
          <span className="text-[11px] sm:text-xs text-slate-400 block mt-1 font-light">
            Masofaviy (Remote) yoki Relokatsiya
          </span>
        </div>

        {/* Salary */}
        <div className="p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 backdrop-blur-md">
          <span className="text-[11px] sm:text-xs font-mono uppercase text-slate-400 block mb-1">
            Maosh kutmasi (Salary)
          </span>
          <span className="text-base sm:text-lg md:text-xl font-bold text-cyan-400 font-mono">
            600$+ Kelishiladi
          </span>
          <span className="text-[11px] sm:text-xs text-slate-400 block mt-1 font-light">
            Loyiha ko‘lami & vazifalarga ko‘ra
          </span>
        </div>

        {/* CV Download / Quick Link */}
        <div
          onClick={() => window.open('/Ibrohim_Sultonov_Rezyume.pdf', '_blank')}
          data-cursor="Rezyume (PDF)"
          className="group p-4 sm:p-6 rounded-2xl bg-slate-900/60 border border-slate-800 hover:border-cyan-400/50 cursor-pointer transition-all backdrop-blur-md"
        >
          <span className="text-[11px] sm:text-xs font-mono uppercase text-slate-400 block mb-1">
            Rezyume (CV Document)
          </span>
          <span className="text-base sm:text-lg md:text-xl font-bold text-white group-hover:text-cyan-400 transition-colors flex items-center justify-between">
            <span>Yuklab olish (PDF)</span>
            <span className="text-xs sm:text-sm font-mono text-cyan-400">↓ 63KB</span>
          </span>
          <span className="text-[11px] sm:text-xs text-slate-400 block mt-1 font-light">
            Mebel City & Startup tajribalari bilan
          </span>
        </div>
      </div>

      {/* Footer Bar */}
      <footer className="pt-10 sm:pt-16 flex flex-col md:flex-row items-center justify-between gap-5 sm:gap-6 text-xs text-slate-500 font-mono text-center md:text-left">
        <div>
          © 2026 {t.footerRights}
        </div>

        {/* Quick Social Badges */}
        <div className="flex flex-wrap items-center justify-center gap-x-3 sm:gap-x-4 gap-y-2">
          <a
            href={GITHUB_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-purple-400 transition-colors font-medium"
          >
            GitHub
          </a>
          <span>•</span>
          <a
            href={LINKEDIN_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-blue-400 transition-colors font-medium"
          >
            LinkedIn
          </a>
          <span>•</span>
          <a
            href={TELEGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sky-400 transition-colors font-medium"
          >
            Telegram
          </a>
          <span>•</span>
          <a
            href={`tel:${PHONE_NUMBER.replace(/\s+/g, '')}`}
            className="hover:text-emerald-400 transition-colors font-medium"
          >
            {PHONE_NUMBER}
          </a>
        </div>

        {/* Rocket Back-to-Top Button */}
        <button
          onClick={handleBackToTop}
          data-cursor="Uchish 🚀"
          className="group px-5 sm:px-6 py-2.5 sm:py-3 rounded-full bg-slate-900/80 border border-slate-700 hover:border-cyan-400 text-white font-medium flex items-center gap-2 hover:shadow-[0_0_25px_rgba(56,189,248,0.4)] transition-all duration-300 text-xs sm:text-sm"
        >
          <span className="transform transition-transform duration-300 group-hover:-translate-y-1">
            🚀
          </span>
          <span>{t.backToTop}</span>
        </button>
      </footer>
    </section>
  );
};
