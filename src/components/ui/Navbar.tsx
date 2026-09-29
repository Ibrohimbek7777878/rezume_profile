import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useStore } from '../../store/useStore';
import { Language, TRANSLATIONS } from '../../i18n/translations';

const NAV_ITEMS = [
  { id: 'hero', key: 'heroStatus' as const, label: 'Bosh sahifa' },
  { id: 'about', key: 'navAbout' as const, label: 'Men haqimda' },
  { id: 'experience', key: 'navExperience' as const, label: 'Tajriba' },
  { id: 'skills', key: 'navSkills' as const, label: 'Ko‘nikmalar' },
  { id: 'projects', key: 'navProjects' as const, label: 'Loyihalar' },
  { id: 'education', key: 'navEducation' as const, label: 'Ta‘lim' },
  { id: 'contact', key: 'navContact' as const, label: 'Aloqa' },
];

export const Navbar: React.FC = () => {
  const { language, setLanguage, theme, toggleTheme, scrollProgress } = useStore();
  const t = TRANSLATIONS[language];

  const [isHidden, setIsHidden] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const lastScrollY = useRef(0);
  const [themeAnimCoords, setThemeAnimCoords] = useState<{ x: number; y: number } | null>(null);

  // 1. Hide / Show on Scroll Direction
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > 150 && currentScrollY > lastScrollY.current + 8) {
        setIsHidden(true);
      } else if (currentScrollY < lastScrollY.current - 8 || currentScrollY < 120) {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 2. Active Section Identification based on 0..1 Scroll Progress
  const activeSection = (() => {
    if (scrollProgress < 0.12) return 'hero';
    if (scrollProgress < 0.28) return 'about';
    if (scrollProgress < 0.44) return 'experience';
    if (scrollProgress < 0.60) return 'skills';
    if (scrollProgress < 0.76) return 'projects';
    if (scrollProgress < 0.90) return 'education';
    return 'contact';
  })();

  const scrollToSection = (id: string) => {
    setMobileOpen(false);
    const element = document.getElementById(id);
    if (!element) return;

    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: HTMLElement | string | number, opts: unknown) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(element, { offset: 0, duration: 1.6 });
    } else {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // 3. Theme Toggle with Circular Clip-Path Expansion
  const handleThemeToggle = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    setThemeAnimCoords({ x, y });

    toggleTheme();
    setTimeout(() => {
      setThemeAnimCoords(null);
    }, 850);
  };

  return (
    <>
      {/* Circular Clip-Path Expanding Theme Transition Overlay */}
      <AnimatePresence>
        {themeAnimCoords && (
          <motion.div
            initial={{
              clipPath: `circle(0px at ${themeAnimCoords.x}px ${themeAnimCoords.y}px)`,
              opacity: 1,
            }}
            animate={{
              clipPath: `circle(150vmax at ${themeAnimCoords.x}px ${themeAnimCoords.y}px)`,
              opacity: 1,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`fixed inset-0 pointer-events-none z-[99999] ${
              theme === 'dark' ? 'bg-[#070b16]' : 'bg-[#f1f5f9]'
            }`}
          />
        )}
      </AnimatePresence>

      {/* Main Floating Navbar */}
      <motion.header
        animate={{ y: isHidden ? -100 : 0 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed top-0 left-0 w-full z-50 flex items-center justify-between px-6 md:px-12 py-4 pointer-events-none select-none"
      >
        {/* Brand / Logo */}
        <div
          onClick={() => scrollToSection('hero')}
          data-cursor="Boshiga"
          className="pointer-events-auto cursor-pointer flex items-center gap-3 group"
        >
          <div className="w-10 h-10 rounded-2xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-center font-heading font-black text-cyan-400 group-hover:border-cyan-400 transition-colors backdrop-blur-md shadow-lg">
            IS
          </div>
          <div className="hidden sm:block">
            <span className="font-heading font-extrabold text-sm text-white tracking-wide block group-hover:text-cyan-400 transition-colors">
              Ibrohim Sultonov
            </span>
            <span className="text-[10px] font-mono text-cyan-400 tracking-wider uppercase block">
              Full Stack Developer
            </span>
          </div>
        </div>

        {/* Center Desktop Navigation with Sliding Active Pill & Roll Text Hover */}
        <nav
          aria-label="Asosiy navigatsiya"
          className="hidden lg:flex pointer-events-auto items-center gap-1 p-1.5 rounded-full bg-slate-900/70 border border-slate-700/70 backdrop-blur-xl shadow-2xl"
        >
          {NAV_ITEMS.map((item) => {
            const isActive = activeSection === item.id;
            const textLabel = item.id === 'hero' ? 'Asosiy' : (t[item.key] || item.label);

            return (
              <button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                data-cursor={textLabel}
                className="relative px-4 py-2 text-xs font-medium rounded-full transition-colors duration-200 overflow-hidden group"
              >
                {/* Active Sliding Pill Indicator */}
                {isActive && (
                  <motion.div
                    layoutId="activeNavPill"
                    transition={{ type: 'spring', damping: 26, stiffness: 320 }}
                    className="absolute inset-0 bg-cyan-400/15 border border-cyan-400/40 rounded-full shadow-[0_0_15px_rgba(56,189,248,0.2)]"
                  />
                )}

                {/* Vertical Rolling Text Hover Animation */}
                <div className="relative h-4 overflow-hidden leading-4 flex flex-col items-center">
                  <span
                    className={`block transform transition-transform duration-300 group-hover:-translate-y-full ${
                      isActive ? 'text-cyan-400 font-bold' : 'text-slate-300'
                    }`}
                  >
                    {textLabel}
                  </span>
                  <span className="block transform translate-y-full transition-transform duration-300 group-hover:translate-y-0 text-cyan-300 font-bold absolute top-0">
                    {textLabel}
                  </span>
                </div>
              </button>
            );
          })}
        </nav>

        {/* Controls: Language Switcher (EN, UZ, RU, TR) & Theme Toggle */}
        <div className="pointer-events-auto flex items-center gap-3">
          {/* Language Switcher Pill */}
          <div className="hidden sm:flex items-center p-1 rounded-full bg-slate-900/80 border border-slate-700/70 backdrop-blur-md">
            {(['uz', 'en', 'ru', 'tr'] as Language[]).map((lng) => (
              <button
                key={lng}
                onClick={() => setLanguage(lng)}
                className={`px-2.5 py-1 text-[11px] font-mono uppercase font-bold rounded-full transition-all ${
                  language === lng
                    ? 'bg-cyan-400 text-navy-950 shadow-md'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {lng}
              </button>
            ))}
          </div>

          {/* Theme Toggle Button */}
          <button
            onClick={handleThemeToggle}
            data-cursor="Mavzu"
            aria-label="Yorug' yoki qorong'i rejimni almashtirish"
            className="w-10 h-10 rounded-2xl bg-slate-900/80 border border-slate-700/80 flex items-center justify-center text-base hover:border-cyan-400 transition-colors backdrop-blur-md shadow-lg"
          >
            {theme === 'dark' ? '🌙' : '☀️'}
          </button>

          {/* Mobile Hamburger Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            data-cursor="Menyu"
            aria-label="Mobil menyu"
            className="lg:hidden w-10 h-10 rounded-2xl bg-slate-900/80 border border-slate-700/80 flex flex-col items-center justify-center gap-1 hover:border-cyan-400 transition-colors backdrop-blur-md shadow-lg"
          >
            <span
              className={`w-5 h-0.5 bg-white transition-transform ${
                mobileOpen ? 'rotate-45 translate-y-1.5' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white transition-opacity ${
                mobileOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-5 h-0.5 bg-white transition-transform ${
                mobileOpen ? '-rotate-45 -translate-y-1.5' : ''
              }`}
            />
          </button>
        </div>
      </motion.header>

      {/* Full-Screen Mobile Drawer Expanding with Circular Clip-Path */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: 'circle(0% at calc(100% - 32px) 32px)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 32px) 32px)' }}
            exit={{ clipPath: 'circle(0% at calc(100% - 32px) 32px)' }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-navy-950/98 backdrop-blur-2xl flex flex-col justify-between p-8 md:p-14 lg:hidden pointer-events-auto"
          >
            <div className="pt-20 space-y-6">
              <span className="font-mono text-xs uppercase tracking-[0.25em] text-cyan-400 block">
                NAVIGATSIYA
              </span>
              <div className="flex flex-col gap-4">
                {NAV_ITEMS.map((item, idx) => {
                  const textLabel = item.id === 'hero' ? 'Bosh sahifa' : (t[item.key] || item.label);
                  return (
                    <button
                      key={item.id}
                      onClick={() => scrollToSection(item.id)}
                      className="text-left text-2xl md:text-4xl font-extrabold text-white hover:text-cyan-400 transition-colors flex items-center justify-between"
                    >
                      <span>{textLabel}</span>
                      <span className="font-mono text-xs text-slate-500">0{idx + 1}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Mobile Footer with Languages */}
            <div className="pt-8 border-t border-slate-800 space-y-4">
              <span className="text-xs font-mono uppercase text-slate-400 block">
                Tilni tanlang (Language):
              </span>
              <div className="flex items-center gap-2">
                {(['uz', 'en', 'ru', 'tr'] as Language[]).map((lng) => (
                  <button
                    key={lng}
                    onClick={() => setLanguage(lng)}
                    className={`flex-1 py-2 text-xs font-mono uppercase font-bold rounded-xl border ${
                      language === lng
                        ? 'bg-cyan-400 text-navy-950 border-cyan-400 shadow-lg'
                        : 'border-slate-800 text-slate-300'
                    }`}
                  >
                    {lng}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
